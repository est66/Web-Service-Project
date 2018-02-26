module.exports = function(app) {

    var users = require('../controllers/user.controller');


    // Create a new User
    app.post('/users', users.create);

    // Retrieve all Users
    app.get('/users', users.findAll);

    // Retrieve a single User with userId
    app.get('/users/:userId', users.findOne);

    // Update a User with userId (replace document) 
    // app.put('/users/:userId', users.updateDoc);

    // Update of User with userId and body data (partial update) 
    app.put('/users/:userId', users.updateFields);

    // Delete a User with userId
    app.delete('/users/:userId', users.delete);


}