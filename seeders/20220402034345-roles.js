'use strict';
const moment = require('moment');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'roles', [{
                    id: '7641fe84-60ef-44af-a3bd-cd33af25af0d',
                    name: 'Admin',
                    alias: 'admin',
                    unix_created_at: Math.floor(Date.now() / 1000),
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    created_by: null,
                    updated_at: null,
                    updated_by: null,
                    deleted_at: null,
                    deleted_by: null
                },
                {
                    id: '798d5fbf-3f0f-4d2a-a774-0d18ea2b1291',
                    name: 'Basic',
                    alias: 'basic',
                    unix_created_at: Math.floor(Date.now() / 1000),
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    created_by: null,
                    updated_at: null,
                    updated_by: null,
                    deleted_at: null,
                    deleted_by: null
                }
            ], {}
        );
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('roles', null, {});
    }
};