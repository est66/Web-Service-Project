module.exports = function(app) {

    var issues = require('../controllers/issue.controller');

    //---Relative to Unique User---
    // Create a new issue attached to a unique user
    app.post('/users/:userId/issues', issues.create);
    // Retrieve all issues of unique User
    app.get('/users/:userId/issues/', issues.findAllOfUser);

    //---Not relative to Users---
    // Retrieve all issues
    app.get('/issues', issues.findAll);

    // Retrieve a single issue with issueId
    app.get('/issues/:issueId', issues.findOne);

    // FILTER : Retrieve all issues of one category
    //app.get('/issues-name/:issuesName', issues.findByCategory);

    // FILTER : Retrieve all issues of one category
    //app.get('/issues-category/:categoryName', issues.findByName);

    // Update an issue with issueId (replace document) 
<<<<<<< HEAD
    // app.put('/issues/:issueId', issues.update);
=======
    // app.put('/issues/:issueId', issues.updateDoc);
>>>>>>> a94fbbd8c640de2735312ff4bc73e4dcc5516fa5

    // Update of issue with issueId and body data (partial update) 
    app.put('/issues/:issueId', issues.updateFields);

    // Delete an issue with issueId
    app.delete('/issues/:issueId', issues.delete);
}