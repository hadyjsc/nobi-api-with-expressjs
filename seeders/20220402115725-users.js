'use strict';
const moment = require('moment');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'users', [{
                id: 'f0faf0de-d981-4765-9f27-b9304c3e8fd8',
                name: JSON.stringify({ text: 'Hady Eka Saputra', given: 'Hady', family: null, prefix: null, suffix: null }),
                phone_number: '6285211110000',
                email: 'hady_dev@mail.com',
                password: '$2a$13$JOc3dB9h9Y.JzEzO1z7KlesfBdw3MFO3zB0fBfUKfst/MqxoM6KF.',
                status: 2,
                role_id: '7641fe84-60ef-44af-a3bd-cd33af25af0d',
                unix_created_at: Math.floor(Date.now() / 1000),
                created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                created_by: 'f0faf0de-d981-4765-9f27-b9304c3e8fd8',
                updated_at: null,
                updated_by: null,
                deleted_at: null,
                deleted_by: null
            }, {
                id: 'dfd8ded6-f92b-44b2-9157-c0f26af0f44f',
                name: JSON.stringify({ text: 'Jhon Doe', given: 'Jhon', family: 'Doe', prefix: null, suffix: null }),
                phone_number: '6285211111111',
                email: 'jhon_doe@mail.com',
                password: '$2a$13$JOc3dB9h9Y.JzEzO1z7KlesfBdw3MFO3zB0fBfUKfst/MqxoM6KF.',
                status: 2,
                role_id: '798d5fbf-3f0f-4d2a-a774-0d18ea2b1291',
                unix_created_at: Math.floor(Date.now() / 1000),
                created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                created_by: 'dfd8ded6-f92b-44b2-9157-c0f26af0f44f',
                updated_at: null,
                updated_by: null,
                deleted_at: null,
                deleted_by: null
            }, {
                id: 'f83a9ee7-1533-4a28-b922-99f43863dacd',
                name: JSON.stringify({ text: 'Jhane Doe', given: 'Jhane', family: 'Doe', prefix: null, suffix: null }),
                phone_number: '6285211112222',
                email: 'jhane_doe@mail.com',
                password: '$2a$13$JOc3dB9h9Y.JzEzO1z7KlesfBdw3MFO3zB0fBfUKfst/MqxoM6KF.',
                status: 2,
                role_id: '798d5fbf-3f0f-4d2a-a774-0d18ea2b1291',
                unix_created_at: Math.floor(Date.now() / 1000),
                created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                created_by: 'f83a9ee7-1533-4a28-b922-99f43863dacd',
                updated_at: null,
                updated_by: null,
                deleted_at: null,
                deleted_by: null
            }, {
                id: '8f2851fe-bc60-4bb7-9a6f-f4d6d3e8f732',
                name: JSON.stringify({ text: 'Siti', given: 'Siti', family: null, prefix: null, suffix: null }),
                phone_number: '6285211113333',
                email: 'siti@mail.com',
                password: '$2a$13$JOc3dB9h9Y.JzEzO1z7KlesfBdw3MFO3zB0fBfUKfst/MqxoM6KF.',
                status: 2,
                role_id: '798d5fbf-3f0f-4d2a-a774-0d18ea2b1291',
                unix_created_at: Math.floor(Date.now() / 1000),
                created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                created_by: '8f2851fe-bc60-4bb7-9a6f-f4d6d3e8f732',
                updated_at: null,
                updated_by: null,
                deleted_at: null,
                deleted_by: null
            }, {
                id: '3831a6f8-f095-4eef-b3c3-fdda8e4416e6',
                name: JSON.stringify({ text: 'Samsul Bahri', given: 'Samsul', family: null, prefix: null, suffix: null }),
                phone_number: '6285211114444',
                email: 'samsul@mail.com',
                password: '$2a$13$JOc3dB9h9Y.JzEzO1z7KlesfBdw3MFO3zB0fBfUKfst/MqxoM6KF.',
                status: 2,
                role_id: '798d5fbf-3f0f-4d2a-a774-0d18ea2b1291',
                unix_created_at: Math.floor(Date.now() / 1000),
                created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
                created_by: '3831a6f8-f095-4eef-b3c3-fdda8e4416e6',
                updated_at: null,
                updated_by: null,
                deleted_at: null,
                deleted_by: null
            }], {}
        );
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('users', null, {});
    }
};