const totp = require('./totp');

const mongoose = require('mongoose');
const Prescription = require('../models/prescription');
const Patient = mongoose.model('Patient');
const crypto = require('crypto');
const sendSmsCode = require('./sendSmsCode');

function registerPatient(req, res) {
  Patient.find({phone: req.body.phone}, function(err, patient){
    //cannot find the patient, create phone
    if(err){
      console.log(err);
    } else{
      if (patient.length === 0) {
        let newPatient = new Patient({
          phone: req.body.phone,
          name: req.body.name,
          SMSpasscode: '123456',
          confirmed: false,
          patient_key: crypto.randomBytes(32).toString('hex'),
        })

        newPatient.save(function(err, _){
          if(err){
            res.send('error-saving');
          } else {
            sendSmsCode(newPatient.SMSpasscode, newPatient.phone);
            res.send({status: true});
          }
        })
      } else {
        res.send({status: false});
      }
    }
  })
}

function confirmPhoneNumber(req, res) {
  Patient.find({phone: req.body.phone, SMSpasscode: req.body.SMSpasscode}, function(err, docs) {
    if (err) {
      console.log(err);
    } else {
      if (docs.length === 0) {
        res.send({status: false})
      } else {
        docs[0].confirmed = true;
        docs[0].save(function(err, data) {
          if(err){
            res.send('error-saving');
          } else {
            res.send({status: true, patient_key: docs[0].patient_key});
          }
        })
      }
    }
  }) 
}

function getUserPrescriptions(req, res) {
  Patient.find({phone: req.body.phone, patient_key: req.body.patient_key, confirmed: true})
    .populate('prescriptions')
    .populate({
        path: 'prescriptions',
        populate: {path: 'drug'}
    })
    .exec(function(err, docs) {
      if(err) {
        console.log(err);
      } else {
        if(docs.length === 0) {
          res.send({status: false})
        } else {
          // test
          totp(docs[0].patient_key).then(console.log);
          res.send({status: true, prescriptions: docs[0].prescriptions})
        }
      }
    })
}


module.exports = {
  registerPatient: registerPatient,
  confirmPhoneNumber: confirmPhoneNumber,
  getUserPrescriptions: getUserPrescriptions
}