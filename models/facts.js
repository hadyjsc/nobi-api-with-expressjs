'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const facts = sequelize.define(
        'facts', {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            type: {
                type: DataTypes.ENUM({
                    values: ['jokes', 'facts']
                })
            },
            target: {
                type: DataTypes.STRING
            },
            value: {
                type: DataTypes.JSONB
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
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            hooks: {
                beforeCreate: (facts, opt) => {
                    facts.unix_created_at = Math.floor(Date.now() / 1000)
                    facts.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                },
                beforeUpdate: (facts, opt) => {
                    facts.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
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
    facts.associate = function(models) {};
    return facts;
};