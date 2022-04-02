require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DEV_USERNAME,
        password: process.env.DEV_PASSWORD,
        database: `${process.env.DEV_DATABASE}`,
        host: process.env.DEV_HOST,
        port: process.env.DEV_PORT || 5432,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        rejectUnauthorized: false,
        dialectOptions: {
            useUTC: false,
            dateStrings: true,
            typeCast: function(field, next) {
                if (field.type === 'DATETIME' || field.type === 'DATE') {
                    return field.string();
                }
                return next();
            }
        },
    },
    test: {
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD,
        database: `${process.env.TEST_DATABASE}`,
        host: process.env.TEST_HOST,
        port: process.env.TEST_PORT || 5432,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        rejectUnauthorized: false,
        dialectOptions: {
            useUTC: false,
            dateStrings: true,
            typeCast: function(field, next) {
                if (field.type === 'DATETIME' || field.type === 'DATE') {
                    return field.string();
                }
                return next();
            }
        },
        timezone: `Asia/Jakarta`
    },
    production: {
        username: process.env.PROD_USERNAME,
        password: process.env.PROD_PASSWORD,
        database: `${process.env.PROD_DATABASE}`,
        host: process.env.PROD_HOST,
        port: process.env.PROD_PORT || 5432,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        rejectUnauthorized: false,
        dialectOptions: {
            useUTC: false,
            dateStrings: true,
            typeCast: function(field, next) {
                if (field.type === 'DATETIME' || field.type === 'DATE') {
                    return field.string();
                }
                return next();
            }
        },
        timezone: `ASIA/JAKARTA`
    }
};