const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patientController');
const prescriptionController = require('../controllers/prescriptionController');
const medicalProfessionalController = require('../controllers/medicalProfessionalController');
const sessionController = require('../controllers/sessionController');

router.post('/registerPatient', patientController.registerPatient);
router.post('/confirmPhoneNumber', patientController.confirmPhoneNumber);
router.post('/getUserPrescriptions', patientController.getUserPrescriptions);
router.post('/addUser', medicalProfessionalController.addUser);
router.post('/addPrescription', prescriptionController.addPrescription);
router.post('/validateLogin', sessionController.validateLogin);
router.post('/requiresLogin', sessionController.requiresLogin);
router.post('/logout', sessionController.logout);


module.exports = router;
