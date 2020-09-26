/* Purpose: Configuration file for mongodb database */

const mongoose = require('mongoose');

// Registering the models defined for the project.
require('./drug');
require('./medicalProfessional');
require('./patient');
require('./prescription');

const dbURL = "mongodb+srv://dbUser:healthhack2020@cluster0.en946.mongodb.net/prescript?retryWrites=true&w=majority";

const options = {
    dbName: "prescript",
    useNewUrlParser: true,
    useCreateIndex: true
};

// Connect to the database.
mongoose.connect(dbURL, options, function(err) {
    if (!err) {
        console.log("Connected to MongoDB.");
    } else {
        console.log("Failed to connect to MongoDB.");
    }
});

const db = mongoose.connection;

module.exports.db = db;
