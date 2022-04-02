const express = require('express');
const router = express.Router();

const { authenticate, multer } = require('../middlewares')
const { PriceController } = require('../controllers');

router.post('/upload', authenticate, multer.upload.single('file'), PriceController.upload)

module.exports = router