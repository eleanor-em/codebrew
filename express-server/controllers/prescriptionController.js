const mongoose = require('mongoose');
const Prescription = mongoose.model('Prescription');
const MedicalProfessional = mongoose.model('MedicalProfessional');
const Drug = mongoose.model('Drug');

function addPrescription(req, res) {
    console.log(req.body)
    if (req.body.prescriber) {
        MedicalProfessional.find({name: req.body.prescriber}, function(err, professional) {
            if (err) {
                console.log('error fetching professional');
                res.send({status: 'Professional cannot be found in System'});
            } else {
                Drug.find({name: req.body.drugName}, function(err, drug) {
                    if (err) {
                        console.log('Drug not found');
                        res.send({status: 'Drug not found'});
                    } else {
                        console.log(professional)
                        console.log(drug)

                        let newPrescription = new Prescription({
                            drug: drug[0],
                            numberOfPills: req.body.numberOfPills,
                            frequency: req.body.frequency,
                            duration: req.body.duration,
                            prescriber: professional[0]._id,
                            totalRepeats: req.body.totalRepeats,
                            currentRepeat: req.body.currentRepeat,
                            expiryDate: req.body.expiry
                        });

                        newPrescription.save(function(save_err, data) {
                            console.log(data)
                            if(save_err) {
                                res.send(save_err);
                            } else {
                                res.send({status: true})
                            }
                        })
                    }
                })
            }
        })
    }
}

module.exports = {
    addPrescription: addPrescription
}