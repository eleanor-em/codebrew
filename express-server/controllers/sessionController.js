// Handles a medical professionals session when logged in

const mongoose = require('mongoose');
const MedicalProfessional = mongoose.model('MedicalProfessional');



const crypto = require('crypto');
const bcrypt = require('bcrypt');



// Validate the user input against the database, and create a user session if
// the validation succeeds.
const validateLogin = (req, res, next) => {

    MedicalProfessional.authenticate(req.body.email, req.body.passwordHash, (err, user) => {
        if (!err) {
            if (user) {
                req.session.passwordHash = user.passwordHash;
                res.redirect('/');
            } else {
                res.redirect("back");
            }
        } else {
            return next(err);
        }
    });
}



// Requires the user to login to proceed to the next function.
const requiresLogin = (req, res, next) => {
    if (req.session && req.session.passwordHash) {
        next();
    } else {
        res.redirect("back");
    }
}

// Delete the session of a user and logs them out
const logout = (req, res, next) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                next(err);
            } else {
                res.status(200).json({
                    redirectUrl: "/"
                });
            }
        });
    }
}

// // Fetch the user data based on ID.
// const getUserByID = (req, res, next) => {
//     MedicalProfessional.findById(req.session.passwordHash)
//         .populate('invitations.receivedFrom')
//         .exec(function(err, data) {
//             if(err) {
//                 console.log(err)
//             } else {
//                 res.send(data);
//             }
//         })
// }




module.exports = {
    validateLogin: validateLogin,
    requiresLogin: requiresLogin,
    logout: logout,
}
