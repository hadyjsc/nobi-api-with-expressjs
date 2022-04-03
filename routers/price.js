const express = require('express');
const router = express.Router();

const { authenticate, multer } = require('../middlewares')
const { PriceController } = require('../controllers');

router.post('/upload', authenticate, multer.upload.single('file'), PriceController.upload)
router.get('/', authenticate, PriceController.list)
router.get('/low-high', authenticate, PriceController.lowToHigh)
router.get('/history', authenticate, PriceController.history)

module.exports = router