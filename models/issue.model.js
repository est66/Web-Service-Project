//Require Mongoose
var mongoose = require('mongoose');
//Define a schema
var Schema = mongoose.Schema;
// Define a schema
var issueSchema = Schema({
    uid: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    statuts: { type: String, enum: ['new', 'inProgress', 'canceled', 'completed'], required: true }, //the status of the issue:
    description: { type: String, maxlength: 1000, required: false, }, //a detailed description of the issue
    imageUrl: { type: String, maxlength: 500, required: false, }, //a URL to a picture of the issue
    latitude: Number,
    longitude: Number,
    tags: [ // Nested array of documents
        { tag: String }
    ]
}, {
    timestamps: { createdAt: 'createdAt' }
});
// Create the model from the schema and export it
module.exports = mongoose.model('Issue', issueSchema)