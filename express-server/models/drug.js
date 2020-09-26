const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DrugSchema = new mongoose.Schema(
    {
       name: {type: String, required: true},
       interactions: [{
           drug: {type: Schema.Types.ObjectId, ref: 'Drug'},
           effect: {type: String}
       }],
       contraindications: [{type: String}]
    }
);

const Drug = mongoose.model('Drug', DrugSchema);
module.exports = Drug;


