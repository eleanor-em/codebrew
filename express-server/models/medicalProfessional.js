const mongoose = require('mongoose');

const {Schema} = mongoose;

const MedicalProfessionalSchema = new mongoose.Schema({
    phone: {type: Number, required: true, unique: true},
    role: {
        type: String,
        enum: ['GP', 'pharmacist']
    },
    email: String,
    passwordHash: String
});

const MedicalProfessional = mongoose.model('MedicalProfessional', MedicalProfessionalSchema);
module.exports = MedicalProfessional;