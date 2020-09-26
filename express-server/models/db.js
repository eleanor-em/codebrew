/* Purpose: Configuration file for mongodb database */

const mongoose = require('mongoose');

// Registering the models defined for the project.
require('./drug');
require('./medicalProfessional');
require('./patient');
require('./prescription');

const dbURL = "mongodb://eleanorm.info:27420";

const options = {
    dbName: "Bridge",
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
