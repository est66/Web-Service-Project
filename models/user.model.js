//Require Mongoose
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;
// Define a schema
var userSchema = Schema({
    firstname: {
      type: String,
      unique: false,
      minlenght: 3,
      maxlength: 20,
      required: true
    },
    lastname: {
      type: String,
      unique: false,
      minlenght: 3,
      maxlength: 20,
      required: true,
    },
    role: {
      type: String,
      enum: ['citizen', 'manager'],
      required: true,
    }
  } , { timestamps: { createdAt: 'created_at' } }
  );

userSchema.index({ firstname: 1, lastname: 1 }, { unique: true });
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
