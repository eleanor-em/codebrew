  const mongoose = require('mongoose');
  const { Schema } = mongoose;

  const PatientSchema = new mongoose.Schema({
    phone:  {type: Number, required: true, unique: true},
    name: {type: String, required: true},
    patient_key: {type: String, required: true},
    prescriptions:  [{type: Schema.Types.ObjectId, ref: "Prescription"}],
    confirmed: {type: Boolean, required: true},
    SMSpasscode: Number
  }
);

const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;
