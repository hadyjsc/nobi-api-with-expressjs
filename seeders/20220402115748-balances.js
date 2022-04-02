'use strict';
const moment = require('moment');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'balances', [{
                    id: '849f4b53-e875-4940-ae83-13fec46d503c',
                    user_id: 'dfd8ded6-f92b-44b2-9157-c0f26af0f44f',
                    amount_available: '0.00674223',
                    unix_created_at: Math.floor(Date.now() / 1000),
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    created_by: null,
                    updated_at: null,
                    updated_by: null,
                    deleted_at: null,
                    deleted_by: null
                },
                {
                    id: 'f9a54e4c-ee53-4dc7-9c47-1d0fc9c7dd2b',
                    user_id: 'f83a9ee7-1533-4a28-b922-99f43863dacd',
                    amount_available: '1.00000000',
                    unix_created_at: Math.floor(Date.now() / 1000),
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    created_by: null,
                    updated_at: null,
                    updated_by: null,
                    deleted_at: null,
                    deleted_by: null
                },
                {
                    id: '121debab-fa28-4de9-899d-258cb4a5b41d',
                    user_id: '8f2851fe-bc60-4bb7-9a6f-f4d6d3e8f732',
                    amount_available: '0.00000001',
                    unix_created_at: Math.floor(Date.now() / 1000),
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    created_by: null,
                    updated_at: null,
                    updated_by: null,
                    deleted_at: null,
                    deleted_by: null
                },
                {
                    id: 'd344d3ba-0bae-4b95-9397-ae94a19960d4',
                    user_id: '3831a6f8-f095-4eef-b3c3-fdda8e4416e6',
                    amount_available: '21.00000000',
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
        await queryInterface.bulkDelete('balances', null, {});
    }
};