const express = require('express');
const router = express.Router();

const { authenticate } = require('../middlewares')
const { TransactionController } = require('../controllers')

router.post('/', authenticate, TransactionController.create)

module.exports = router