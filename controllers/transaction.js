const Query = require("../helpers/query")
const { balances, transactions, sequelize } = require("../models")
const moment = require('moment')

class Transaction {
    static async create(req, res) {
        const { decoded } = req
        const { trx_id, amount } = req.body

        if (amount != '0.00000001') {
            let balance = await new Query().table(balances).where({ user_id: decoded.id }).one()
            if (balance.type === 'success') {
                let available = balance.data.amount_available
                if (available < amount) {
                    return res.status(200).json({
                        code: 200,
                        type: 'warning',
                        title: 'Minimum Balance',
                        message: 'Sorry your balance is not enough to proceed the transaction.'
                    })
                } else {
                    try {
                        const trx = await sequelize.transaction(async(trx) => {
                            await transactions.findOne({ where: { trx_id }, lock: true, transaction: trx })
                            let create = await transactions.create({
                                trx_id,
                                amount,
                                user_id: decoded.id,
                                created_by: decoded.id,
                                created_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                            }, {
                                transaction: trx
                            })
                            let current = available - amount
                            let update = await balances.update({
                                amount_available: current,
                                updated_at: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                                updated_by: decoded.id
                            }, {
                                where: {
                                    user_id: decoded.id
                                },
                                transaction: trx,
                                individualHooks: true,
                                returning: true
                            })

                            return {
                                user_id: create.user_id,
                                trx_id,
                                amount: create.amount,
                                amount_available: update[1][0].amount_available
                            }
                        })

                        res.status(201).send({
                            code: 201,
                            title: 'Transaction Success',
                            type: 'success',
                            data: trx
                        })

                    } catch (error) {
                        res.status(400).send({
                            code: 400,
                            title: 'Transaction Failed.',
                            type: 'error',
                            message: error.message
                        })
                    }
                }
            } else {
                res.status(200).json(balance)
            }
        } else {
            return res.status(200).json({
                code: 200,
                type: 'warning',
                title: 'Minimum Amount',
                message: 'Sorry your amount is not allowt to proceed the transaction.'
            })
        }
    }
}

module.exports = Transaction