const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {Schema} = mongoose;

const MedicalProfessionalSchema = new mongoose.Schema({
    name: {type: String},
    role: {
        type: String,
        enum: ['GP', 'pharmacist'],
        required: true
    },
    email: {type: String, required: true},
    passwordHash: {type: String, required: true},
    sessionToken: {type: String},
    expiry: {type: Date}
});

const MedicalProfessional = mongoose.model('MedicalProfessional', MedicalProfessionalSchema);
module.exports = MedicalProfessional;
