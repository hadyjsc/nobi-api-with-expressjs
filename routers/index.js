const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({ message: 'Welcome to NOBI Project' });
});

/** Auth API */
const auth = require('./auth')
router.use('/api/v1/auth', auth)

/** Facts API */
const fact = require('./fact')
router.use('/api/v1/fact', fact)

/** Transaction API */
const transaction = require('./transaction')
router.use('/api/v1/transaction', transaction)

/** Price API */
const price = require('./price')
router.use('/api/v1/price', price)

module.exports = router;