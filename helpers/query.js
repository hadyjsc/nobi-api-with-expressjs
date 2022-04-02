const CRUDOptions = require('./crudOptions');
const _ = require('lodash');
const index = require('../models')
const { QueryTypes } = require('sequelize');

/**
 * Created By : Hady Eka Saputra
 * 
 * Class query have basic CRUD for sequelize, query can simplify result after get the data
 * This helper class is customable and can modify if you want to siplify again.
 * 
 * Empample:
 * 
 * - table_name     = name of models, not string. you must import file models and put as parameter table() function
 * - column         = coloumn name in table what you want to get
 * - condition      = sequelize where condition format
 * - include        = sequelize include format (joining table in sequelize)
 * - number         = this data have numbering or integer format
 * - sorting        = data for order function in sequelize, the data get from filtering process
 * - format         = format is type of pagination, only have 2 format default or custom
 * - limit          = this data have numbering or integer format and refer to limit parameter from data request
 * - page           = this data also have numbering or integer format and from data request
 * - data           = data is totaly from other get process using helper query class, if on create function data is body request what you want save into database
 * - options        = this is paramater on destroy/ delete function, options is sequelize parameter like set cascade value to check relation to other table 
 *  
 * Find All
 * new Query().table(table_name).all() 
 * 
 * Find All with specific attribute
 * new Query().table(table_name).attributes(column).all()
 * 
 * Find All with where condition
 * new Query().table(table_name).where(condition).all()
 * 
 * Find All with limit data
 * new Query().table(table_name).limit(limit).all()
 * 
 * Find All with sort data
 * new Query().table(table_name).sort(limit).all()
 * 
 * Find All with join with other table
 * new Query().table(table_name).join(include).all()
 * 
 * Find All with where and pagination
 * new Query().table(table_name).where(condition).pagination('default', limit, page, data).all()
 * 
 * Find ALl with implement each funtion
 * new Query().table(table_name).attributes(column).where(condition).limit(limit).sort(limit).join(include).pagination('default', limit, page, data).all()
 * 
 * Find One
 * new Query().table(table_name).one()
 * 
 */

class Query {
    constructor() {
        this.t = undefined; // table
        this.a = {}; // attributes or column data
        this.w = {}; // where condition
        this.j = undefined; // table joining
        this.l = undefined; // limit
        this.s = undefined; // sorting data
        this.g = undefined; // grouping data
        this.paging = undefined; // create paging for data
        this.o = undefined; // offset data for pagination
    }

    /**
     * Function to set the table name
     * @param {String} data 
     * @returns Model
     */
    table(data) {
        this.t = data;
        return this;
    }

    /**
     * Function to set the attribute data
     * @param {String} data 
     * @returns 
     */
    attributes(data) {
        let column = [];

        if (Array.isArray(data)) {
            this.a = data;
        } else {
            if (data !== '*' && data !== undefined) {
                column = data.split(',');
                this.a = column;
            }
        }
        return this;
    }

    /**
     * Function to set where condition 
     * @param {JSON} condition 
     * @returns JSON
     */
    where(condition) {
        this.w = condition;
        return this;
    }

    /**
     * Function to set joining table
     * @param {Array} include 
     * @returns Array
     */
    join(include) {
        this.j = include;
        return this;
    }

    /**
     * Function to set limit of data
     * @param {Number} number 
     * @returns Number
     */
    limit(number) {
        this.l = number ? number : undefined;
        return this;
    }

    /**
     * Function to set ordering/ sorting the data
     * @param {JSON} sorting 
     * @returns JSON
     */
    sort(sorting) {
        let sorted = CRUDOptions.getSort(sorting);
        this.s = sorted;
        return this;
    }

    /**
     * Function to set grouping the data
     * @param {Array} attribute 
     * @returns Array
     */
    group(attribute) {
        this.g = attribute;
        return this;
    }

    /**
     * Function to set pagination the data
     * @param {String} format default or custom
     * @param {Number} limit
     * @param {Number} page
     * @param {JSON} data total data from select allow [] if format is default
     * @returns Number
     */
    pagination(format, limit, page, data) {
        if (format === 'default') {
            let skip, limit_default, page_default;
            if (page && limit) {
                skip = page !== '[]' ? 0 + (page - 1) * limit : 0;
            } else {
                limit = limit_default = 10;
                page = page_default = 1;
                skip = page !== '[]' ? 0 + (page_default - 1) * limit_default : 0;
            }
            this.paging = {
                limit: Number(limit),
                page: Number(page),
                current_page: Number(page) || 1
            };
            this.o = skip;
            this.l = limit
        } else {
            let paging = [];
            if (limit) {
                let chunkSize = limit;
                let chunk = _.chunk(data, chunkSize);

                let start = 1;
                for (let i = 0; i < chunk.length; i++) {
                    const element = chunk[i];

                    const first = element[0].unix_created_at;
                    const last = element[element.length - 1].unix_created_at;
                    paging.push({ number: start++, first, last });
                }
            }
            this.paging = {
                current_page: page,
                total_page: paging.length,
                first_page: paging.length > 1 ? paging[0] : undefined,
                last_page: paging.length > 1 ? paging[paging.length - 1] : undefined,
                page: paging
            };
        }

        return this;
    }

    /**
     * Query to find all the data from database and return with pagination
     * @returns 
     */
    async all() {
        let table = this.t;
        let attributes = this.a;
        let where = this.w;
        let include = this.j;
        let limit = this.l;
        let order = this.s;
        let group = this.g;
        let offset = this.o;
        let paging = this.paging;

        try {
            let data = await table.findAll({ attributes, where, include, limit, group, order, offset });
            if (data.length > 0) {
                if (paging) {
                    if (offset !== null) {
                        let count = await table.count({ attributes, where, include, group, order });
                        let total = 0;
                        if (Array.isArray(count)) {
                            total = Number(count.length / paging.limit);
                        } else {
                            total = Number(count / paging.limit);
                        }
                        paging.total_page = Number.isInteger(total) ?
                            Number(total.toFixed(0)) :
                            ((total % 1) >= 0.5) ? Number((total).toFixed(0)) : Number((total + 1).toFixed(0));
                        paging.first_page = 1;
                        paging.last_page = paging.total_page;
                        paging.total_data = count.length || count;
                    }

                    return {
                        code: 200,
                        title: 'Success',
                        message: 'Data found',
                        type: 'success',
                        pagination: paging || undefined,
                        data: data
                    };
                } else {
                    return this.success(200, 'Data found.', data)
                }

            } else {
                return this.warning(200, 'Data not found')
            }
        } catch (e) {
            return this.error('Query -> all()', e);
        }
    }

    /**
     * Query to find one data from database
     * @returns 
     */
    async one() {
        let table = this.t;
        let attributes = this.a;
        let where = this.w;
        let include = this.j;
        let order = this.s;

        try {
            let data = await table.findOne({ attributes, where, include, order });
            if (data) {
                return this.success(200, 'Data found', data)
            } else {
                return this.warning(200, 'Data not found')
            }
        } catch (e) {
            return this.error('Query -> one()', e);
        }
    }

    /**
     * Query to count total data in database
     * @returns JSON
     */
    async count() {
        let table = this.t;
        let where = this.w;
        let include = this.j;
        let group = this.g;

        try {
            let count = await table.count({ where, include, group });
            if (count) {
                return this.success(200, 'Data found.', count)
            } else {
                return this.warning(200, 'Data not found')
            }
        } catch (e) {
            return this.error('Query -> count()', e);
        }
    }

    /**
     * Query to insert single data in one time
     * @param {Json} data 
     * @returns 
     */
    async insert(data) {
        let table = this.t;
        try {
            let created = await table.create(data);
            if (created) {
                return this.success(201, 'Data saved.', created)
            } else {
                return this.warning(200, 'Unable to save')
            }
        } catch (e) {
            return this.error('Query -> insert()', e);
        }
    }

    /**
     * Query for insert multiple data in one time.
     * @param {Array} data 
     * @returns 
     */
    async batchInsert(data) {
        let table = this.t;
        try {
            let created = await table.bulkCreate(data);
            if (created) {
                return this.success(201, 'Data saved')
            } else {
                return this.warning(200, 'Unable to save.')
            }
        } catch (e) {
            return this.error('Query -> batchInsert()', e);
        }
    }

    /**
     * Query for update data from database
     * @param {JSON} data 
     * @returns 
     */
    async update(data) {
        let table = this.t;
        let where = this.w;
        try {
            let updated = await table.update(data, { where, individualHooks: true, returning: true });
            if (updated[0]) {
                return this.success(200, 'Data updated.', updated[1][0])
            } else {
                return this.warning(200, 'Unable to update.')
            }
        } catch (e) {
            return this.error('Query -> update()', e);
        }
    }

    /**
     * Query for update data from database
     * @param {JSON} data 
     * @returns 
     */
    async batchUpdate(data) {
        let table = this.t;
        let where = this.w;
        try {
            let updated = await table.update(data, { where, individualHooks: true });
            if (updated[0]) {
                return this.success(200, 'Data updated.', updated)
            } else {
                return this.warning(200, 'Unable to update.')
            }
        } catch (e) {
            return this.error('Query -> batchUpdate()', e);
        }
    }

    /**
     * Query for delete data from database, this query will removed permanently the data and can't restore from database.
     * @param {Json} options 
     * @returns 
     */
    async delete(options) {
        let table = this.t;
        let where = this.w;
        try {
            let destroyed = await table.destroy({ where, options });
            if (destroyed) {
                return this.success(200, 'Data is deleted.')
            } else {
                return this.warning(200, 'Unable to delete.')
            }
        } catch (e) {
            return this.error('Query -> delete()', e);
        }
    }

    /**
     * Query for find one data and create
     * @param {*} data 
     * @returns 
     */
    async oneCreate(data) {
        let table = this.t
        let where = this.w
        let include = this.j;
        let order = this.s;
        try {
            let check = await table.findOne({ where, include, order })
            if (check) {
                return this.success(200, 'Data found.', check)
            } else {
                let created = await table.create(data);
                if (created) {
                    return this.success(201, 'Data saved.', created)
                } else {
                    return this.warning(200, 'Unable to save.')
                }
            }
        } catch (e) {
            return this.error('Query -> findUpdate()', e);
        }
    }

    /**
     * Query for find one the data and then update if exist or create the data if not exist in the database.
     * @param {JSON} data 
     * @returns 
     */
    async oneUpdateOrCreate(data) {
        let table = this.t
        let where = this.w
        let include = this.j;
        let order = this.s;

        try {
            let detail = await table.findOne({ where, include, order });
            if (detail) {
                let updated = await table.update(data, { where: { id: detail.id }, individualHooks: true });
                if (updated[0]) {
                    let updated_data = await table.findOne({ where: { id: detail.id }, include, order })
                    return this.success(201, 'Data updated.', updated_data)
                } else {
                    return this.warning(200, 'Unable to update.')
                }
            } else {
                let created = await table.create(data);
                if (created) {
                    return this.success(201, 'Data saved.', created)
                } else {
                    return this.warning(200, 'Unable to save.')
                }
            }
        } catch (e) {
            return this.error('Query -> findUpdate()', e);
        }
    }

    /**
     * Raw query using sequelize, type is DML of query sql and then sql in query sql
     * Example SQL Query : SELECT * FROM table_name WHERE id = :id
     * @param {*} type 
     * @param {*} sql 
     * @returns 
     */
    async raw(type, sql) {
        let table = this.t
        let where = this.w
        let query_type = null

        if (type === 'select') {
            query_type = QueryTypes.SELECT
        }

        const query = await index.sequelize.query(sql, {
            replacements: where,
            model: index[table],
            mapToModel: false,
            raw: true,
            type: query_type
        }).then(result => {
            if (result) {
                return { code: 200, message: 'Success to execute query.', result }
            } else {
                return { code: 500, message: 'Unable to execute sql query.' }
            }
        }).catch(error => {
            return { code: 400, message: error };
        });

        if (query.code === 200) {
            if (type === 'select') {
                return this.success(200, 'Data found', query.result)
            }
        } else {
            if (query.code === 500) {
                return this.warning(200, query.message)
            } else {
                return this.error(`Query -> raw(${type}) `, query.message)
            }
        }
    }

    /**
     * Show success notification
     * @param {Integer} code 
     * @param {String} message 
     * @param {*} dt 
     * @returns 
     */
    success(code, message, dt) {
        return { code, title: 'Success.', message, type: 'success', data: dt ? dt : null }
    }

    /**
     * Show warning notification
     * @param {Integer} code 
     * @param {String} message 
     * @param {*} dt 
     * @returns 
     */
    warning(code, message, dt) {
        return { code, title: 'Warning!', message, type: 'warning', data: dt ? dt : null }
    }

    /**
     * Show error notification
     * @param {String} location 
     * @param {JSON} data 
     * @returns 
     */
    error(location, data) {
        let detail = {};
        if (process.env.NODE_ENV === 'development') {
            detail = {
                error_location: location,
                error_message: data.message,
                error_detail: data.parent
            };
        } else {
            detail = {
                error_location: location,
                error_message: data.message
            };
        }

        let message = [];

        if (data.name === 'SequelizeDatabaseError') {
            message = "Can't process database query or syntax error";
        } else if (['SequelizeValidationError', 'Error'].includes(data.name)) {
            message = data.message
        } else {
            message = 'Internal server error';
        }
        return {
            code: 400,
            title: 'Error',
            message,
            type: 'error',
            data: detail
        };
    }
}
module.exports = Query;