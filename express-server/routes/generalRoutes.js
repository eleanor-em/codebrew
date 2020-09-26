const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patientController');

router.post('/registerPatient', patientController.registerPatient);

module.exports = router;