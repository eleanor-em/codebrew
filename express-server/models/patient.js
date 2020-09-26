  import mongoose from 'mongoose';
  const { Schema } = mongoose;

  const patientSchema = new Schema({
    phone:  {type: Number, required: true, unique: true},
    name: String,
    patient_key: String,
    prescriptions:  [{type: Schema.Types.ObjectId, ref: "Prescription"}],
    confirmed: Boolean,
    SMSpasscode: Number
  }
);

  
