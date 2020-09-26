  import mongoose from 'mongoose';
  const { Schema } = mongoose;

  const PatientSchema = new mongoose.Schema({
    phone:  {type: Number, required: true, unique: true},
    name: String,
    patient_key: String,
    prescriptions:  [{type: Schema.Types.ObjectId, ref: "Prescription"}],
    confirmed: Boolean,
    SMSpasscode: Number
  }
);

const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;
