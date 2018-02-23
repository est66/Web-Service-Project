const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define a schema
const issueSchema = new Schema({
    uId: Schema.Types.ObjectId,
    sharedUId: [Schema.Types.ObjectId],
    title: String,
    body: String,
    date: { type: Date, default: Date.now }, // Default value
    comments: [ // Nested array of documents
        {
            body: String,
            date: Date
        }
    ],
    meta: { // Nested document
        votes: Number,
        favs: Number
    }
});