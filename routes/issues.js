var express = require('express');
var router = express.Router();

/* GET issues listing. */
router.get('/', function(req, res, next) {
    User.find().sort('name').exec(function(err, users) {
        if (err) {
            return next(err);
        }
        res.send(users);
    });
});

/* POST new issues */
router.post('/', function(req, res, next) {
    // Retrieve the model from another file
    const Blog = mongoose.model('Blog');
    // Create a document with it
    let blog = new Blog({
        title: 'Teaching Mongoose',
        body: 'So cool',
        comments: [
            { body: 'orly?', date: new Date(2015, 10, 20, 15, 14) },
            { body: 'yarly', date: new Date(2015, 10, 20, 15, 17) }
        ],
        meta: {
            votes: 0,
            favs: 3
        }
    });
});
blog.save(function(err) { // This will insert a new document
    if (err) {
        return console.warn('Could not save blog because: ' + err.message);
    }
    console.log('Saved blog');
    blog.meta.votes = 5; // Update something
    blog.save(function(err, updatedBlog) { // This will update the document
        if (err) {
            return console.warn('Could not save blog because: ' + err.message);
        }
        console.log('Updated blog');

    });
});
// Export
module.exports = router;