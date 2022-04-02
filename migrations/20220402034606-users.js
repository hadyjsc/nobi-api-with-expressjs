'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */

        const SequelizeNoTz = withDateNoTz(Sequelize);

        let attributes = {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false
            },
            name: {
                type: Sequelize.JSONB
            },
            phone_number: {
                type: Sequelize.STRING(16)
            },
            email: {
                type: Sequelize.STRING
            },
            username: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            auth_key: {
                type: Sequelize.TEXT
            },
            verification_token: {
                type: Sequelize.TEXT
            },
            access_token: {
                type: Sequelize.TEXT
            },
            password_reset_token: {
                type: Sequelize.TEXT
            },
            status: {
                type: Sequelize.INTEGER
            },
            login_pin: {
                type: Sequelize.INTEGER
            },
            role_id: {
                type: Sequelize.UUID,
                references: {
                    model: 'roles',
                    key: 'id'
                },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
            },
            unix_created_at: {
                type: Sequelize.BIGINT
            },
            created_at: {
                type: SequelizeNoTz.DATE_NO_TZ
            },
            created_by: {
                type: Sequelize.UUID
            },
            updated_at: {
                type: SequelizeNoTz.DATE_NO_TZ
            },
            updated_by: {
                type: Sequelize.UUID
            },
            deleted_at: {
                type: SequelizeNoTz.DATE_NO_TZ
            },
            deleted_by: {
                type: Sequelize.UUID
            }
        };

        await queryInterface.createTable('users', attributes);
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('users');
    }
};