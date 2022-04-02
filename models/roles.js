'use strict';
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const roles = sequelize.define(
        'roles', {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    notNull: {
                        args: true,
                        msg: 'required'
                    }
                }
            },
            alias: {
                type: DataTypes.STRING(100)
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
                beforeCreate: (roles, opt) => {
                    roles.unix_created_at = Math.floor(Date.now() / 1000)
                    roles.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                },
                beforeUpdate: (roles, opt) => {
                    roles.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
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
    roles.associate = function(models) {
        roles.hasMany(models.users, { as: 'users' });
    };
    return roles;
};