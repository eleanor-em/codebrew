const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patientController');

router.post('/registerPatient', patientController.registerPatient);
router.post('/confirmPhoneNumber', patientController.confirmPhoneNumber);
router.post('/getUserPrescriptions', patientController.getUserPrescriptions);

module.exports = router;