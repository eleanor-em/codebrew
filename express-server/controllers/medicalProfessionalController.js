

const mongoose = require('mongoose');
const MedicalProfessional = mongoose.model('MedicalProfessional');


function addUser(req, res) {
  MedicalProfessional.find({phone: req.body.phone}, function(err, medicalProfessional){
    //cannot find the medical professional, add user
    if(err){
      console.log(err);
    } else{
      if (medicalProfessional.length === 0) {
        let newMedicalProfessional = new MedicalProfessional({
          phone: req.body.phone,
          name: req.body.name,
          role: req.body.role
        })
        
        newMedicalProfessional.save(function(err, data){
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


module.exports = {
    addUser: addUser
}
