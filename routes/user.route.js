module.exports = function(app) {



    var users = require('../controllers/user.controller');

    // Create a new User
    app.post('/users', users.create);

    // Retrieve all Users
    app.get('/users', users.findAll);

    /**
     * @api {get} /users/:id Request a user's information
     * @apiName findOne
     * @apiGroup User
     *
     * @apiParam {Number} id Unique identifier of the user
     *
     * @apiSuccess {String} firstName First name of the user
     * @apiSuccess {String} lastName  Last name of the user
     */

    // Retrieve a single User with id
    app.get('/users/:id', users.findOne);

    // Update of User with id and body data (partial update) 
    app.put('/users/:id', users.updateFields);
    /**
     * @api {delete} /api/people
     * @apiUse PersonInRequestBody
     * 
     */
    // Delete a User with id
    app.delete('/users/:id', users.delete);


}