const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DrugSchema = new mongoose.Schema(
    {
       name: {type: String, required: true},
       interactions: [{
           drug: {type: Schema.Types.ObjectId, ref: 'Drug'},
           effect: {type: String, required: true}
       }],
       contraindications: [{type: String, required: true}]
    }
);

const Drug = mongoose.model('Drug', DrugSchema);
module.exports = Drug;


