const express = require('express');
const router = express.Router();

const generalController = require('../controllers/generalController');

router.get('/helloMessage', generalController.sendHello);

module.exports = router;