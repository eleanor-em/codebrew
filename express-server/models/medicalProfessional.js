const mongoose = require('mongoose');

const {Schema} = mongoose;

const MedicalProfessionalSchema = new mongoose.Schema({
    name: {type: String},
    phone: {type: Number},
    role: {
        type: String,
        enum: ['GP', 'pharmacist'],
        required: true
    },
    email: {type: String, required: true},
    passwordHash: {type: String, required: true}
});

const MedicalProfessional = mongoose.model('MedicalProfessional', MedicalProfessionalSchema);
module.exports = MedicalProfessional;