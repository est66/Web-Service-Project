module.exports = function(app) {



    var users = require('../controllers/user.controller');
    //http://apidocjs.com/#param-api-success
    // -----Create a new User-----
    /**
     * @api {post} /users Create a new user
     * @apiName create
     * @apiGroup User
     *
     * @apiParam (Request body) {String} firstName First name of the user
     * @apiParam (Request body) {String} lastName  Last name of the user
     *
     * @apiSuccess {Object} user Return an object of the user just created
     * @apiUse User
     */
    app.post('/users', users.create);


    // -----Retrieve all Users-----
    /**
     * @api {get} /users Request all user's information
     * @apiName findAllAndFilter
     * @apiGroup User
     *
     * @apiSuccess {Object[]} users Return an array of all users
     * @apiUse User
     * 
     */

    app.get('/users', users.findAllAndFilter);


    // -----Retrieve a single User with id-----
    /**
     * @api {get} /users/:id Request a user's information
     * @apiName findOne
     * @apiGroup User
     *
     * @apiParam {Number} id Unique identifier of the user
     *
     * @apiSuccess {Object} user Return an object of the user
     * @apiUse User
     */

    app.get('/users/:id', users.findOne);


    // -----Update of User with id and body data (partial update) -----
    /**
     * @api {put} /users/:id Update a user with id
     * @apiName updateFields
     * @apiGroup User
     *
     * @apiParam (URL path parameters) {Number} id Unique identifier of the user
     *
     * @apiSuccess {Object} user Return an object of the user just updated
     * @apiUse User
     */
    app.put('/users/:id', users.updateFields);


    // -----Delete a User with id -----
    /**
     * @api {delete} /users/:id Delete a user with id
     * @apiName delete
     * @apiGroup User
     *
     *
     * @apiSuccess (200) {String} response deleted confirmation message "User deleted successfully!"
     * 
     */
    app.delete('/users/:id', users.delete);

}