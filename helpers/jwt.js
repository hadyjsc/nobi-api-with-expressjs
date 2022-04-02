require('dotenv').config();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync(process.env.SSL_KEY_PATH, 'UTF-8');
const publicKey = fs.readFileSync(process.env.SSL_CERT_PATH, 'UTF-8');

module.exports = {
    verify: function(token) {
        let verified = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
        return verified;
    },
    sign: function(obj) {
        return jwt.sign(obj, privateKey, { algorithm: 'RS256' });
    }
};