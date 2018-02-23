const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define a schema
const userSchema = new Schema({
    username: String,
    password: String,
    firstname: String,
    surname: String,
    creationDate: { type: Date, default: Date.now }, // Default value
    phone: Number
});