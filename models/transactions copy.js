'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const transactions = sequelize.define(
        'transactions', {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            trx_id: {
                type: DataTypes.STRING,
                unique: {
                    args: true,
                    msg: 'Transaction number has been taken!'
                }
            },
            user_id: {
                type: DataTypes.UUID
            },
            amount: {
                type: DataTypes.DECIMAL(10, 8)
            },
            unix_created_at: {
                type: DataTypes.BIGINT,
            },
            created_at: {
                type: DataTypes.DATE,
            },
            created_by: {
                type: DataTypes.UUID
            },
            updated_at: {
                type: DataTypes.DATE
            },
            updated_by: {
                type: DataTypes.UUID
            },
            deleted_at: {
                type: DataTypes.DATE
            },
            deleted_by: {
                type: DataTypes.UUID
            }
        }, {
            indexes: [{
                unique: false,
                fields: ['user_id']
            }],
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            hooks: {
                beforeCreate: (transactions, opt) => {
                    transactions.unix_created_at = Math.floor(Date.now() / 1000)
                    transactions.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                },
                beforeUpdate: (transactions, opt) => {
                    transactions.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                },
                beforeBulkCreate: async(instances, options) => {
                    for (const item of instances) {
                        item.unix_created_at = Math.floor(Date.now() / 1000)
                        item.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                    }
                }
            }
        }
    );
    transactions.associate = function(models) {};
    return transactions;
};