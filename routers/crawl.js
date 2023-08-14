const express = require('express');
const router = express.Router();

const { CrawlController } = require('../controllers')

router.get('/baby-name', CrawlController.index)

module.exports = router