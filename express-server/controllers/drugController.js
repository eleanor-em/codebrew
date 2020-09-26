const mongoose = require('mongoose');
const Drug = mongoose.model('Drug');

function getAllDrugs(req, res) {
    Drug.find({}, (err, docs) => {
        if (err) {
            console.log('failed looking up drugs');
            res.send({status: false});
        } else {
            res.send({status: true, drugs: docs});
        }
    });
}

module.exports = {
    getAllDrugs
}