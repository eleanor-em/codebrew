const mongoose = require('mongoose');
const MedicalProfessional = mongoose.model('MedicalProfessional');
const Patient = mongoose.model('Patient');
const totp = require('./totp');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

function addUser(req, res) {
    if (req.body.auth === 'KZonfDKmCHktCGdBGaglmyFmzNgZN4gi') {
        MedicalProfessional.find({email: req.body.email}, function (err, medicalProfessional) {
            //cannot find the medical professional, add user
            if (err) {
                console.log(err);
                res.send({status: false});
            } else {
                if (medicalProfessional.length === 0) {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            console.log('[DEBUG] failed hashing password');
                            res.send({status: false});
                        } else {
                            const passwordHash = hash;
                            let newMedicalProfessional = new MedicalProfessional({
                                email: req.body.email,
                                name: req.body.name,
                                role: req.body.role,
                                passwordHash,
                            })

                            newMedicalProfessional.save(function (err, data) {
                                if (err) {
                                    console.log('[DEBUG] failed saving medical professional');
                                    console.log(err);
                                    res.send({status: false});
                                } else {
                                    res.send({status: true});
                                }
                            })
                        }
                    });
                } else {
                    res.send({status: false});
                }
            }
        })
    } else {
        console.log('[DEBUG] admin auth incorrect');
        res.send({status: false});
    }
}

function login(req, res) {
    MedicalProfessional.find({email: req.body.email}, function (err, data) {
        if (err || data.length === 0) {
            console.log('[DEBUG] failed to find medical professional: ' + req.body.email);
            res.send({status: false});
        } else {
            const user = data[0];
            bcrypt.compare(req.body.password, user.passwordHash, (err, result) => {
                if (result === true) {
                    user.sessionToken = crypto.randomBytes(32).toString('hex');
                    const expiry = new Date();
                    expiry.setHours(expiry.getHours() + 12);
                    user.expiry = expiry;
                    user.save((err, _) => {
                        if (err) {
                            console.log('[DEBUG] failed to set session token');
                            res.send({status: false});
                        } else {
                            res.send({status: true, sessionToken: user.sessionToken});
                        }
                    });
                } else {
                    console.log('[DEBUG} failed to verify password for: ' + req.body.email);
                    res.send({status: false});
                }
            });
        }
    });
}

function accessPatient(req, res) {
    MedicalProfessional.find({sessionToken: req.body.sessionToken}, (err, data) => {
        if (err || data.length === 0) {
            console.log('[DEBUG] failed to find user for session');
            res.send({status: false, logout: true});
        } else {
            const user = data[0];
            console.log(user.expiry.getTime());
            console.log(Date.now());
            if (Date.now() < user.expiry.getTime()) {
                Patient.find({phone: req.body.phone, confirmed: true})
                    .populate('prescriptions')
                    .populate({
                        path: 'prescriptions',
                        populate: {path: 'drug'}
                    })
                    .exec((err, data) => {
                    if (err || data.length === 0) {
                        console.log('[DEBUG] failed to find patient while accessing');
                        res.send({status: false, logout: false});
                    } else {
                        const patient = data[0];
                        totp(patient.patient_key)
                            .then(otp => {
                                if (otp === req.body.otp) {
                                    patient.accessToken = crypto.randomBytes(32).toString('hex');
                                    const date = new Date();
                                    date.setHours(date.getHours() + 1);
                                    patient.accessExpiry = date;
                                    patient.save((err, _) => {
                                        if (err) {
                                            console.log('[DEBUG] error saving patient expiry');
                                            res.send({status: false, logout: false});
                                        } else {
                                            res.send({status: true, token: patient.accessToken});
                                        }
                                    })
                                } else {
                                    console.log('[DEBUG] OTP validation failed');
                                    res.send({status: false, logout: false});
                                }
                            }).catch(err => {
                                console.log('[DEBUG] error generating OTP: ' + err);
                                res.send({status: false, logout: false});
                        });
                    }
                })
            } else {
                console.log('[DEBUG] session expired');
                res.send({status: false, logout: true});
            }
        }
    })
}

function getPrescriptions(req, res) {
    Patient.find({acecssToken: req.body.accessToken}, (err, data) => {
        if (err || data.length === 0) {
            console.log('[DEBUG] error finding patient');
            res.send({status: false});
        } else {
            const patient = data[0];
            if (Date.now() < patient.accessExpiry.getTime()) {
                res.send({status: true, prescriptions: patient.prescriptions});
            } else {
                console.log('[DEBUG] patient access token expired');
                res.send({status: false});
            }
        }
    })
}

module.exports = {
    addUser, login, accessPatient, getPrescriptions
}
