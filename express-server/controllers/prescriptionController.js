const mongoose = require('mongoose');
const Patient = mongoose.model('Patient');
const Prescription = mongoose.model('Prescription');
const MedicalProfessional = mongoose.model('MedicalProfessional');
const Drug = mongoose.model('Drug');

function addPrescription(req, res) {
    MedicalProfessional.find({sessionToken: req.body.sessionToken}, function(err, docs) {
        if (err || docs.length === 0) {
            console.log('error fetching professional');
            res.send({status: false});
        } else {
            const professional = docs[0];
            if (professional.role === 'GP' && new Date() < professional.expiry.getTime()) {
                Drug.find({name: req.body.drugName}, function (err, drugs) {
                    if (err || drugs.length === 0) {
                        console.log('Drug not found: ' + req.body.drugName);
                        res.send({status: false});
                    } else {
                        const drug = drugs[0];
                        Patient.find({accessToken: req.body.accessToken}, (err, docs) => {
                            if (err || docs.length === 0) {
                                console.log('patient not found');
                                res.send({status: false});
                            } else {
                                const patient = docs[0];
                                if (Date.now() < patient.accessExpiry.getTime()) {
                                    const expiryDate = new Date();
                                    expiryDate.setMonth(expiryDate.getMonth() + 6);

                                    let newPrescription = new Prescription({
                                        drug,
                                        numberOfPills: req.body.numberOfPills,
                                        frequency: req.body.frequency,
                                        duration: req.body.duration,
                                        prescriber: professional._id,
                                        totalRepeats: req.body.totalRepeats,
                                        currentRepeat: 0,
                                        expiryDate
                                    });

                                    newPrescription.save(function (save_err, data) {
                                        if (save_err) {
                                            console.log('error saving prescription');
                                            console.log(save_err);
                                            res.send({status: false});
                                        } else {
                                            patient.prescriptions.push(data._id);
                                            patient.save((err, _) => {
                                                if (err) {
                                                    console.log('error updating patient');
                                                    res.send({status: false});
                                                } else {
                                                    res.send({status: true})
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    console.log('[DEBUG] patient access expired');
                                    res.send({status: false});
                                }
                            }
                        });
                    }
                })
            } else {
                console.log('[DEBUG] session token expired or wrong permission');
                res.send({status: false});
            }
        }
    })
}

function dispense(req, res) {
    MedicalProfessional.find({sessionToken: req.body.sessionToken}, function(err, docs) {
        if (err || docs.length === 0) {
            console.log('error fetching professional');
            res.send({status: false});
        } else {
            const professional = docs[0];
            if (professional.role === 'pharmacist' && new Date() < professional.expiry.getTime()) {
                Patient.find({accessToken: req.body.accessToken}, (err, docs) => {
                    if (err || docs.length === 0) {
                        console.log('[DEBUG] error looking up patient');
                        res.send({status: false});
                    } else {
                        const patient = docs[0];
                        if (Date.now() < patient.accessExpiry.getTime()) {
                            Prescription.find({_id: req.body.prescription}, (err, docs) => {
                                if (err || docs.length === 0) {
                                    console.log('[DEBUG] error fetching prescription');
                                    res.send({status: false});
                                } else {
                                    const prescription = docs[0];
                                    prescription.currentRepeat += 1;
                                    if (prescription.currentRepeat > prescription.totalRepeats) {
                                        Prescription.deleteOne({_id: req.body.prescription}, (err, _) => {
                                            if (err) {
                                                console.log('error deleting prescription');
                                                res.send({status: false})
                                            } else {
                                                res.send({status: true});
                                            }
                                        });
                                    } else {
                                        prescription.save((err, _) => {
                                            if (err) {
                                                console.log('error saving prescription');
                                                res.send({status: false});
                                            } else {
                                                console.log('prescription for '+ patient.name + ': now ' + prescription.currentRepeat + '/' + prescription.totalRepeats);
                                                res.send({status: true})
                                            }
                                        });
                                    }
                                }
                            });
                        } else {
                            console.log('[DEBUG] patient access token expired');
                            res.send({status: false});
                        }
                    }
                });
            } else {
                console.log('[DEBUG] session token expired or wrong permission');
                res.send({status: false});
            }
        }
    });
}

module.exports = {
    addPrescription, dispense
}