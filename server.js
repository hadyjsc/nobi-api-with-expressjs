/**
 * Load environment file into server.js
 */
const app_root = require('app-root-path');
const dotenvExpand = require('dotenv-expand');
dotenvExpand.expand(require('dotenv').config({ path: app_root.path + '/.env' }));

if (process.env.NODE_ENV === 'development') {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
}
/**
 * Include required node module into server.js
 */
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
app.set('trust proxy', true);

/**
 * HTTP/s server with certificate
 */
let server;
if (JSON.parse(process.env.SSL)) {
    let privateKey = fs.readFileSync(`${process.env.SSL_KEY_PATH}`, 'utf8');
    let certificate = fs.readFileSync(`${process.env.SSL_CERT_PATH}`, 'utf8');
    let credentials = {};
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing') {
        credentials = {
            key: privateKey,
            cert: certificate,
            requestCert: false,
            rejectUnauthorized: false
        };
    } else {
        let caBundle = fs.readFileSync(`${process.env.SSL_BUNDLE_PATH}`, 'utf8');
        credentials = {
            key: privateKey,
            ca: caBundle,
            cert: certificate
        };
    }
    const protocols = require('https');
    server = protocols.createServer(credentials, app);
} else {
    const protocols = require('http');
    server = protocols.createServer(app);
}

/**
 * Inisialization port from enviroment
 * if not such in configuration set to default port like 3000 or other number
 */
const PORT = process.env.PORT || 3000;

/** Middleware */
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** Call the router */
const router = require('./routers');
app.use('/', router);

/** Set error handle message for sequelize or server error */
const error_handling = require('./error_handling');
app.use(error_handling);

/** Listen server with port */
server.listen(PORT, process.env.WEB, () => {
    console.log(`${process.env.SYSTEM_TITLE} is running on port:${PORT}`);
});

module.exports = app;