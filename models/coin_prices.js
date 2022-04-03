'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const coin_prices = sequelize.define(
        'coin_prices', {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING
            },
            ticker: {
                type: DataTypes.STRING(50)
            },
            coin_id: {
                type: DataTypes.BIGINT
            },
            code: {
                type: DataTypes.STRING(50)
            },
            exchange: {
                type: DataTypes.STRING(50)
            },
            invalid: {
                type: DataTypes.INTEGER
            },
            record_time: {
                type: DataTypes.BIGINT
            },
            usd: {
                type: DataTypes.STRING
            },
            idr: {
                type: DataTypes.STRING
            },
            hnst: {
                type: DataTypes.STRING
            },
            eth: {
                type: DataTypes.STRING
            },
            btc: {
                type: DataTypes.STRING
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
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            hooks: {
                beforeCreate: (coin_prices, opt) => {
                    coin_prices.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                },
                beforeUpdate: (coin_prices, opt) => {
                    coin_prices.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                },
                beforeBulkCreate: async(instances, options) => {
                    for (const item of instances) {
                        item.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                    }
                }
            }
        }
    );
    coin_prices.associate = function(models) {};
    return coin_prices;
};