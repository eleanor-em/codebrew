const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patientController');
const patientController = require('../controllers/medicalProfessionalController');

router.post('/registerPatient', patientController.registerPatient);
router.post('/confirmPhoneNumber', patientController.confirmPhoneNumber);
router.post('/getUserPrescriptions', patientController.getUserPrescriptions);
router.post('/addUser', medicalProfessionalController.addUser);


module.exports = router;
