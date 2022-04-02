'use strict';
const withDateNoTz = require('sequelize-date-no-tz-postgres');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('transactions', { id: Sequelize.INTEGER });
         */
        const SequelizeNoTz = withDateNoTz(Sequelize);

        let attributes = {
            id: {
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false
            },
            trx_id: {
                type: Sequelize.STRING,
                unique: true
            },
            user_id: {
                type: Sequelize.UUID,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'NO ACTION',
                onDelete: 'NO ACTION'
            },
            amount: {
                type: Sequelize.DECIMAL(10, 8)
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

        await queryInterface.createTable('transactions', attributes);
        await queryInterface.addIndex('transactions', ['user_id'], {
            name: 'transactions_user_id_idx'
        })
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('transactions');
         */
        await queryInterface.dropTable('transactions');
    }
};