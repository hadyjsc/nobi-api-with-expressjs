'use strict';
const moment = require('moment')

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define(
        'users', {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            name: {
                type: DataTypes.JSONB
            },
            phone_number: {
                type: DataTypes.STRING(16)
            },
            email: {
                type: DataTypes.STRING
            },
            username: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            auth_key: {
                type: DataTypes.TEXT
            },
            verification_token: {
                type: DataTypes.TEXT
            },
            access_token: {
                type: DataTypes.TEXT
            },
            password_reset_token: {
                type: DataTypes.TEXT
            },
            status: {
                type: DataTypes.INTEGER
            },
            login_pin: {
                type: DataTypes.INTEGER
            },
            role_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'roles',
                    key: 'id'
                },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
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
                beforeCreate: (users, opt) => {
                    users.unix_created_at = Math.floor(Date.now() / 1000)
                    users.created_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                },
                beforeUpdate: (users, opt) => {
                    users.updated_at = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
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
    users.associate = function(models) {
        users.belongsTo(models.roles, { foreignKey: 'role_id', as: 'role' });
    };
    return users;
};