const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {Schema} = mongoose;

const MedicalProfessionalSchema = new mongoose.Schema({
    name: {type: String},
    role: {
        type: String,
        enum: ['GP', 'pharmacist'],
        required: true
    },
    email: {type: String, required: true},
    passwordHash: {type: String, required: true}
});

// Hashing a password before saving it to the database
MedicalProfessionalSchema.pre("save", function(next) {
    let user = this;
    bcrypt.hash(user.passwordHash, 10, (err, hash) => {
        if (err) {
            return next(err);
        } else {
            user.passwordHash = hash;
            next();
        }
    });
});

// Authenticate input against database.
MedicalProfessionalSchema.statics.authenticate = (email, passwordHash, cb) => {
    MedicalProfessional.findOne({email: email})
        .exec((err, user) => {
            if (err) {
                return cb(err);
            } else if (!user) {
                const err = new Error("User not found");
                err.status = 401;
                return cb(err);
            }
            bcrypt.compare(passwordHash, user.passwordHash, (err, result) => {
                if (result == true) {
                    return cb(null, user);
                } else {
                    return cb(err);
                }
            });
        });
};

const MedicalProfessional = mongoose.model('MedicalProfessional', MedicalProfessionalSchema);
module.exports = MedicalProfessional;
