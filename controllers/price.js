const csv = require('csv-parser')
const fs = require('fs');
const { Op } = require('sequelize');
const CRUDOptions = require('../helpers/crudOptions');
const Query = require('../helpers/query');
const { coin_prices, sequelize } = require('../models')

class Price {
    static async list(req, res) {
        const { limit, page, column } = req.query;
        let condition = await CRUDOptions.setDataFilter(req.query, 'prices');
        let order = CRUDOptions.setDataSort(req.query);
        let group = CRUDOptions.setDataGroup(req.query)

        let list = await new Query()
            .table(coin_prices)
            .attributes(column)
            .where(condition.prices)
            .sort(order)
            .group(group)
            .limit(limit)
            .pagination('default', limit, page)
            .all();

        res.send(list);
    }

    static async upload(req, res) {
        const { file } = req
        let dir = file && file.path ? file.path : null;

        let csvData = [];
        fs.createReadStream(dir)
            .pipe(csv())
            .on('data', function(csvrow) {
                delete csvrow.id
                csvData.push(csvrow)
            })
            .on('end', async() => {
                if (csvData.length > 0) {
                    let insert = await new Query().table(coin_prices).batchInsert(csvData)
                    if (insert.type === 'success') {
                        fs.unlinkSync(dir)
                    }
                    res.status(insert.code).json(insert)
                } else {
                    res.status(200).json({
                        code: 200,
                        title: 'Invalid Data',
                        type: 'warning',
                        message: 'Can\'t import the data.'
                    })
                }
            });
    }

    static async lowToHigh(req, res) {
        const { week, year, ticker, currency } = req.query

        let raw = "select MIN(" + currency + ") AS min, MAX(" + currency + ") AS max from coin_prices where DATE_PART('week', created_at) = :week and date_part('year', created_at) = :year and ticker = :ticker;"

        let data = await new Query().table(coin_prices)
            .where({ week, year, ticker })
            .raw('select', raw)

        data.data = {
            year,
            week,
            currency,
            min: data.data[0]['min'] ? data.data[0]['min'] : 0,
            max: data.data[0]['max'] ? data.data[0]['max'] : 0
        }

        res.send(data)
    }

    static async history(req, res) {
        const { start_date, end_date, ticker, currency, limit, page } = req.query

        let condition = []

        if (start_date && end_date) {
            condition.push({
                created_at: {
                    [Op.between]: [start_date, end_date],
                },
                ticker
            })
        } else if (start_date && !end_date) {
            condition.push({
                created_at: {
                    [Op.gte]: start_date
                },
                ticker
            })
        } else if (!start_date && end_date) {
            condition.push({
                created_at: {
                    [Op.lte]: start_date
                },
                ticker
            })
        }

        let attribute = ['id', ['created_at', 'datetime'],
            [`${currency}`, 'price']
        ]

        let data = await new Query().table(coin_prices)
            .attributes(attribute)
            .where(condition)
            .pagination('default', limit, page)
            .group(['coin_prices.id'])
            .all()
        res.send(data)
    }
}

module.exports = Price