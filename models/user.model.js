//Require Mongoose
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;
// Define a schema
var userSchema = Schema({
    username: String,
    email: String
    password: String,
    creationDate: { type: Date, default: Date.now }, //Default value
});
// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema)