module.exports = function(app) {

    var issues = require('../controllers/issue.controller');

    //---Relative to Unique User---
    // Create a new issue attached to a unique user
    app.post('/users/:userId/issues', users.create);
    // Retrieve all issues of unique User
    app.get('/users/:userId/issues/', issues.findAll);

    //---Not relative to Users---
    // Retrieve all issues
    app.get('/issues', issues.findAll);

    // Retrieve a single issue with issueId
    app.get('/issues/:issueId', issues.findOne);

    // Update an issue with issueId (replace document) 
    // app.put('/issues/:issueId', issues.updateFields);

    // (partial) Update of issue with issueId and body data
    app.put('/issues/:issueId', issues.updateFields);

    // Delete an issue with issueId
    app.delete('/issues/:issueId', issues.delete);
}