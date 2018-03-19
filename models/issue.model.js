//Require Mongoose
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;
// Define a schema
var issueSchema = Schema({
    uid: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['new', 'inProgress', 'canceled', 'completed'],
        default: 'new',
        /*  CANT VALIDATE OBJECT FROM MODEL !
                validate: {
                    // Manually validate uniqueness to send a "pretty" validation error
                    // rather than a MongoDB duplicate key error
                    validator: validateStatutsTransition,
                    message: 'Statuts {VALUE} is not valid'
                }
                */
    }, //the description of the issue:
    description: {
        type: String,
        maxlength: 1000,
        required: false,
    }, //a detailed description of the issue
    imageUrl: {
        type: String,
        maxlength: 500,
        required: false,
    }, //a URL to a picture of the issue
    latitude: Number,
    longitude: Number,
    tags: [ // Nested array of tags
        {
            tag: String
        }
    ]
}, {
    timestamps: {
        createdAt: 'createdAt',
        updateAt: 'updatedAt'
    }
});
/* CANT VALIDATE FROM MODEL
function validateStatutsTransition(value) {
    //Validate statuts transition
    console.log("Executed sync", this.status, value);
    const issueStatus = this.status;
    if (issueStatus == 'new' && (value == "new" || value == "inProgress" || value == "canceled")) console.log("Statuts Updated");
    else if (issueStatus == 'inProgress' && (value == "canceled" || value == "completed")) console.log("Statuts Updated");
    else {
        console.log("error when update an issue");
        return false
    }
    return true;
}

function AsyncValidateStatutsTransition(value) {
    //Validate statuts transition
    console.log("Executed");
    const issueStatus = this.status;
    if (issueStatus == 'new' && (value == "new" || value == "inProgress" || value == "canceled")) console.log("Statuts Updated");
    else if (issueStatus == 'inProgress' && (value == "canceled" || value == "completed")) console.log("Statuts Updated");
    else {
        console.log("error when update an issue");
        return false
    }
    return true;
}
*/

// Create the model from the schema and export it
module.exports = mongoose.model('Issue', issueSchema)