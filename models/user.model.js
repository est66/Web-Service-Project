//Require Mongoose
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;
// Define a schema
var userSchema = Schema({
    firstname: { type: String, unique: false, minlength: 2, maxlength: 20 },
    lastname: { type: String, unique: false, maxlength: 2, maxlength: 20 },
    role: { type: String, enum: ['citzen', 'manager'] },
}, { timestamps: { createdAt: 'createdAt' } });


//validation for first and last name
/*
function checkFirstName(value) {
    return new Promise(function(resolve, reject) {

        setTimeout(function() {
            resolve(false);
        }, 5);
    });
}*/
// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema)