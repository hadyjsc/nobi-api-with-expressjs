'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('facts', { id: Sequelize.INTEGER });
         */
        const SequelizeNoTz = withDateNoTz(Sequelize);

        let attributes = {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false
            },
            type: {
                type: Sequelize.ENUM({
                    values: ['jokes', 'facts']
                })
            },
            target: {
                type: Sequelize.STRING
            },
            value: {
                type: Sequelize.JSONB
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

        await queryInterface.createTable('facts', attributes);
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('facts');
         */
        await queryInterface.dropTable('facts');
    }
};