const express = require('express');
const router = express.Router();

const { FactController } = require('../controllers')

router.get('/joke', FactController.joke)
router.get('/dogs', FactController.dogs)
router.get('/cats', FactController.cats)
router.get('/fetch/:type', FactController.fetchData)

module.exports = router