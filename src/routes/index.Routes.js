const express = require('express');
const controller = require('../controllers/indexController');
const {search} = require('../controllers/mainController')
const router = express.Router();


router.get('/', controller.index);
router.get('/search', search)

module.exports = router;
