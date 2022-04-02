const _ = require('lodash');
const moment = require('moment');
const { Sequelize, Op } = require('sequelize');

class CRUDOptions {
    static getInclude(table) {
        let include = [];

        if (table.length > 0) {
            if (table[0].hasOwnProperty('model')) {
                return table;
            } else {
                for (let i = 0; i < table.length; i++) {
                    include.push(table[i]);
                }

                return include;
            }
        } else {
            return include;
        }
    }

    static getSort(order) {
        let sorting = [];
        if (order) {
            Object.entries(order).forEach(([key, value]) => {
                var attribute = key.substring(5, key.length);
                sorting.push([attribute, value]);
            });
        }

        return sorting;
    }

    static setDataSort(data) {
        let order = _.pickBy(data, function(v, k) {
            return _.includes(k, 'sort_');
        });
        return order;
    }

    static setDataGroup(data) {
        let dt = data.group;
        if (dt) {
            let group = dt.split(',')
            return group;
        } else {
            return undefined;
        }
    }

    static async setDataFilter(data, table) {
        let where = {};
        let formats = null;
        let start_date = _.omitBy(data, (value, key) => !key.startsWith('start_'));
        let end_date = _.omitBy(data, (value, key) => !key.startsWith('end_'));

        where[table] = {}
        if (Object.keys(start_date).length > 0 && Object.keys(end_date).length > 0) {
            let start = [];
            let end = [];
            for (const key in start_date) {
                let label = key.substring(6, key.length);
                const element = start_date[key];
                let attribute = await this.checkAttribute(label, table);
                start[attribute] = element
            }

            for (const key in end_date) {
                let label = key.substring(4, key.length);
                const element = end_date[key];
                let attribute = await this.checkAttribute(label, table);
                end[attribute] = element
            }

            for (const key in start) {
                if (Object.hasOwnProperty.call(start, key) == Object.hasOwnProperty.call(end, key)) {
                    if (Object.keys(start_date)[0].search(table) > -1 && Object.keys(end_date)[0].search(table) > -1) {
                        where[table][key] = {
                            [Op.between]: [start[key], end[key]]
                        };
                    }
                }

            }
        }

        if (Object.keys(start_date).length > 0 && Object.keys(end_date).length == 0) {
            for (const key in start_date) {
                let label = key.substring(6, key.length);
                const element = start_date[key];
                let attribute = await this.checkAttribute(label, table);
                if (attribute) {
                    where[table][attribute] = {
                        [Op.gte]: element
                    };
                }
            }
        }
        if (Object.keys(start_date).length == 0 && Object.keys(end_date).length > 0) {
            for (const key in end_date) {
                let label = key.substring(4, key.length);
                const element = end_date[key];
                let attribute = await this.checkAttribute(label, table);
                if (attribute) {
                    where[table][attribute] = {
                        [Op.lte]: element
                    };
                }
            }
        }

        let filter = _.omitBy(data, (value, key) => !key.startsWith('filter_'));
        Object.entries(filter).forEach(([key, value]) => {
            var label = key.substring(7, key.length);
            if (label.search(table) > -1) {
                var tableLength = table.length + 1;
                var attribute = label.substr(tableLength, label.length);

                if (attribute.search('time') > -1) {
                    formats = [moment.ISO_8601, 'HH:mm:ss'];
                }
                if (attribute.search('date') > -1) {
                    formats = [moment.ISO_8601, 'YYYY-MM-DD'];
                }
                if (moment(value, formats, true).isValid() && !_.isArray(value)) {
                    if (attribute.indexOf('start') > -1) {
                        where[table][attribute] = {
                            [Op.gte]: value
                        };
                    }
                    if (attribute.indexOf('end') > -1) {
                        where[table][attribute] = {
                            [Op.lte]: value
                        };
                    }
                    if (attribute.indexOf('start') === -1 && attribute.indexOf('end') === -1) {
                        where[table][attribute] = Sequelize.where(Sequelize.fn('date', Sequelize.col(attribute)), '=', value);
                    }
                } else {
                    if (attribute.indexOf('.') > -1) {
                        where[table][attribute] = {
                            [Op.iLike]: '%' + value + '%'
                        };
                    } else {
                        if (attribute.indexOf('id') > -1) {
                            let arr_val = (value.search(',') > -1) ? value.split(',') : value
                            if (_.isArray(arr_val)) {
                                where[table][attribute] = {
                                    [Op.in]: arr_val
                                };
                            } else {
                                where[table][attribute] = arr_val;
                            }
                        } else {
                            if (_.isNaN(Number(value))) {
                                if (value === 'true' || value === 'false') {
                                    where[table][attribute] = value;
                                } else {
                                    let arr_val = (value.search(',') > -1) ? value.split(',') : value
                                    if (Array.isArray(arr_val)) {
                                        where[table][attribute] = {
                                            [Op.in]: arr_val
                                        };
                                    } else {
                                        where[table][attribute] = {
                                            [Op.iLike]: '%' + value + '%'
                                        };
                                    }
                                }
                            } else {
                                where[table][attribute] = value
                            }
                        }
                    }
                }
            }
        });

        return where;
    }

    static async setPagingDefault(data) {
        var limited, skip;

        limited = data.limit !== 'null' ? data.limit : 10;
        skip = data.page !== 'null' ? 0 + (data.page - 1) * data.limit : 0;

        return { limit: limited, page: isNaN(skip) ? 0 : skip };
    }

    static setPaging(limit, data) {
        let paging = [];
        if (limit) {
            let chunkSize = limit;
            let chunk = _.chunk(data.data, chunkSize);

            let start = 1;
            for (let i = 0; i < chunk.length; i++) {
                const element = chunk[i];

                const first = element[0].unix_created_at;
                const last = element[element.length - 1].unix_created_at;
                paging.push({ page: start++, first, last });
            }
        }

        return paging;
    }

    static async checkAttribute(label, table) {
        let attribute = null;
        if (label.search(table) > -1) {
            let tableLength = table.length + 1;
            attribute = label.substr(tableLength, label.length);
        }

        return attribute;
    }
}

module.exports = CRUDOptions;