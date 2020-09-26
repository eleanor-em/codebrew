const mongoose = require('mongoose');
const Patient = mongoose.model('Patient');

function registerPatient(req, res) {
  Patient.find({phone: req.body.phone}, function(err, patient){
    //cannot find the patient, create phone
    if(err){
      
    } else{
      console.log(patient);
      if (patient.length === 0) {
        let newPatient = new Patient({
          phone: req.body.phone,
          name: req.body.name
        })
        
        newPatient.save(function(err, data){
          if(err){
            res.send('error-saving');
          } else {
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
  Patient.find({phone: req.body.phone, SMSpasscode: req.body.SMSpasscode}, function(err, patient) {

  }) 
}

module.exports = {
  registerPatient: registerPatient
}