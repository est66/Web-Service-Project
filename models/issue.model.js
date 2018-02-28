//Require Mongoose
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;
// Define a schema
var issueSchema = Schema({
    uid: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    title: String,
    description: String,
    comments: [ // Nested array of documents
        {
            body: String,
            date: Date
        }
    ],
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
module.exports = mongoose.model('Issue', issueSchema)