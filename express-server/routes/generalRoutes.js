const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patientController');
const prescriptionController = require('../controllers/prescriptionController');
const medicalProfessionalController = require('../controllers/medicalProfessionalController');

router.post('/registerPatient', patientController.registerPatient);
router.post('/confirmPhoneNumber', patientController.confirmPhoneNumber);
router.post('/getUserPrescriptions', patientController.getUserPrescriptions);
router.post('/addUser', medicalProfessionalController.addUser);
router.post('/addPrescription', prescriptionController.addPrescription);
router.post('/login', medicalProfessionalController.login);
router.post('/accessPatient', medicalProfessionalController.accessPatient);
router.post('/getPrescriptions', medicalProfessionalController.getPrescriptions);


module.exports = router;
