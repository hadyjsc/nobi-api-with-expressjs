'use strict';
const moment = require('moment');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'transactions', [{
                    id: '7641fe84-60ef-44af-a3bd-cd33af25af0d',
                    trx_id: '8578cae9-4d9a-4dd3-b160-e9154366b9d0',
                    user_id: 'dfd8ded6-f92b-44b2-9157-c0f26af0f44f',
                    amount: '0.01000000',
                    unix_created_at: Math.floor(Date.now() / 1000),
                    created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                    created_by: null,
                    updated_at: null,
                    updated_by: null,
                    deleted_at: null,
                    deleted_by: null
                },
                {
                    id: 'b838ec2e-930d-4e85-ac45-76196eefe868',
                    trx_id: 'e4a39d21-221c-40fb-be2b-1b49e685f236',
                    user_id: 'dfd8ded6-f92b-44b2-9157-c0f26af0f44f',
                    amount: '0.02000000',
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
        await queryInterface.bulkDelete('transactions', null, {});
    }
};