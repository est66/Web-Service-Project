module.exports = function(app) {

    var issues = require('../controllers/issue.controller');

    //---Relative to Unique User---
    // Create a new issue attached to a unique user
    app.post('/issues', issues.create);

    //---Not relative to Users---
    // Retrieve all issues and filter by user
    app.get('/issues', issues.findAllAndFilter);

    // Retrieve a single issue with id
    app.get('/issues/:id', issues.findOne);

    // Update of issue with id and body data (partial update) 
    app.put('/issues/:id', issues.updateFields);

    // Delete an issue with id
    app.delete('/issues/:id', issues.delete);
}