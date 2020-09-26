  const mongoose = require('mongoose');
  const { Schema } = mongoose;

  const PatientSchema = new mongoose.Schema({
    phone:  {type: String, required: true, unique: true},
    name: String,
    patient_key: String,
    prescriptions:  [{type: Schema.Types.ObjectId, ref: "Prescription"}],
    confirmed: Boolean,
    SMSpasscode: String,
    accessToken: String,
    accessExpiry: Date,
  }
);

const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;
