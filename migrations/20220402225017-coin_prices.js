'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('coin_prices', { id: Sequelize.INTEGER });
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
                type: Sequelize.STRING
            },
            ticker: {
                type: Sequelize.STRING(50)
            },
            coin_id: {
                type: Sequelize.BIGINT
            },
            code: {
                type: Sequelize.STRING(50)
            },
            exchange: {
                type: Sequelize.STRING(50)
            },
            invalid: {
                type: Sequelize.INTEGER
            },
            record_time: {
                type: Sequelize.BIGINT
            },
            usd: {
                type: Sequelize.STRING
            },
            idr: {
                type: Sequelize.STRING
            },
            hnst: {
                type: Sequelize.STRING
            },
            eth: {
                type: Sequelize.STRING
            },
            btc: {
                type: Sequelize.STRING
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

        await queryInterface.createTable('coin_prices', attributes);
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('coin_prices');
         */
        await queryInterface.dropTable('coin_prices');
    }
};