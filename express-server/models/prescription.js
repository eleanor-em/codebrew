const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PrescriptionSchema = new mongoose.Schema(
    {
        drug: {type: Schema.Types.ObjectId, ref: "Drug", required:true},
        numberOfPills: {type: Number, required:true},
        frequency: {type: String, required:true},
        duration: {type: String, required: true},
        prescriber: {type: Schema.Types.ObjectId, ref:"MedicalProfessional", required: true},
        totalRepeats: {type: Number, required: true},
        currentRepeat: {type: Number, default: 0},
        expiryDate: {type: Date, required: true}
    }
);

const Prescription = mongoose.model('Prescription', PrescriptionSchema);
module.exports = Prescription;

