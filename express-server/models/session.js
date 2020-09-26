const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SessionSchema = new mongoose.Schema(
    {
       patient_id: {type: Number, required: true},
       medi_pro_id: {type: Number, required: true},
       key: {type: String, required: true},
       expiry: {type : Date, default: new Date(+new Date() + 30*60*1000)}
    }
);

const Session = mongoose.model('Session', SessionSchema);
module.exports = Session;