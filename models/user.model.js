//Require Mongoose
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;
// Define a schema
var userSchema = Schema({
    username: { type: String, unique: false },
    meta: { // Nested document
        //deleted: { type: Boolean, default: false },
        resolved: { type: Boolean, default: false },
        //Main date of issues
        creationDate: { type: Date, default: Date.now },
        updatedDate: { type: Date, default: Date.now },
        resolvedDate: { type: Date, default: null },
        //deletedDate: { type: Date, default: null },
    }
});
// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema)