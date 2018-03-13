module.exports = function(app) {



    var users = require('../controllers/user.controller');
    //http://apidocjs.com/#param-api-success
    // -----Create a new User-----
    /**
     * @api {post} /users Create a new user
     * @apiName create
     * @apiGroup User
     * @apiDescription Registers a new user.
     *
     * @apiParam (Request body) {String{2..20}} firstName First name of the user
     * @apiParam (Request body) {String{2..20}} lastName  Last name of the user
     * @apiParam (Request body) {String="citzen","manager"} role Role of the user
     *
     * @apiSuccess {Object} user Return an object of the user just created
     * @apiUse User
     * 
     * @apiExample Example
     *     POST /users HTTP/1.1
     *     Content-Type: application/json
     *
     *     {
     *       "firstName": "Donald",
     *       "lastName": "Trump",
     *       "role": "citzen"
     *     }
     *
     * @apiSuccessExample 201 Created
     *     HTTP/1.1 201 Created
     *     Content-Type: application/json
     *     Location: https://comem-webserv-2018h.herokuapp.com/users/58b2926f5e1def0123e97bc0
     *
     *     {
     *       "_id": "58b2926f5e1def0123e97bc0",
     *       "firstName": "Donald",
     *       "lastName": "Trump",
     *       "role": "citzen"
     *       "createdAt": "2017-01-01T14:31:87.000Z"
     *     }
     */
    app.post('/users', users.create);


    // -----Retrieve all Users-----
    /**
     * @api {get} /users Request all user's information
     * @apiName findAllAndFilter
     * @apiGroup User
     * @apiDescription Get all users
     * 
     * @apiUse Pagination
     * @apiParam (URL query parameters) {String} role Filter by role
     * @apiParam (URL query parameters) {String} lastname Filter by lastname
     * @apiParam (URL query parameters) {String} firstname Filter by firstname
     *
     * @apiSuccess {Object[]} users Return an array of all users
     * @apiUse User
     * 
     * @apiExample Example
     *     GET /users?role=citzen&page=2&pageSize=50 HTTP/1.1
     *
     * @apiSuccessExample 200 OK
     *     HTTP/1.1 200 OK
     *     Content-Type: application/json
     *     Link: &lt;https://comem-webserv-2018h.herokuapp.com/users?page=1&pageSize=50&gt; rel="first prev"
     *
     *     [
     *       {
     *       "_id": "58b2926f5e1def0123e97bc0",
     *       "firstName": "Donald",
     *       "lastName": "Trump",
     *       "role": "citzen",
     *       "createdAt": "2017-01-01T14:31:87.000Z"
     *       },
     *       {
     *       "_id": "58b2926f5e1def0123e97bc1",
     *       "firstName": "Donalda",
     *       "lastName": "Trumpa",
     *       "role": "citzen",
     *       "createdAt": "2017-01-01T14:31:87.000Z"
     *       }
     *     ]
     */
    app.get('/users', users.findAllAndFilter);


    // -----Retrieve a single User with id-----
    /**
     * @api {get} /users/:id Request a user's information
     * @apiName findOne
     * @apiGroup User
     * @apiDescription Get a user.
     * 
     * @apiParam {Number} id Unique identifier of the user
     * 
     * @apiSuccess {Object} user Return an object of the user
     * @apiUse User
     * 
     * @apiExample Example
     *     GET /users/58b2926f5e1def0123e97bc0 HTTP/1.1
     *
     * @apiSuccessExample 200 OK
     *     HTTP/1.1 200 OK
     *     Content-Type: application/json
     *
     *     {
     *       "_id": "58b2926f5e1def0123e97bc0",
     *       "firstName": "Donald",
     *       "lastName": "Trump",
     *       "role": "citzen",
     *       "createdAt": "2017-01-01T14:31:87.000Z"
     *     }
     */

    app.get('/users/:id', users.findOne);


    // -----Update of User with id and body data (partial update) -----
    /**
     * @api {put} /users/:id Update a user with id
     * @apiName updateFields
     * @apiGroup User
     *
     * @apiParam (Request body) {String{2..20}} firstName First name of the user
     * @apiParam (Request body) {String{2..20}} lastName  Last name of the user
     * @apiParam (Request body) {String="citzen","manager"} role Role of the user
     * 
     * @apiParam (URL path parameters) {Number} id Unique identifier of the user
     *
     * @apiSuccess {Object} user Return an object of the user just updated
     * @apiUse User
     * 
     * @apiExample Example
     *     PUT /users/58b2926f5e1def0123e97bc0 HTTP/1.1
     *     Content-Type: application/json
     *
     *     {
     *       "firstName": "Donaldy",
     *       "lastName": "Trumpy",
     *     }
     *
     * @apiSuccessExample 200 OK
     *     HTTP/1.1 200 OK
     *     Content-Type: application/json
     *
     *     {
     *       "_id": "58b2926f5e1def0123e97bc0",
     *       "firstName": "Donaldy",
     *       "lastName": "Trumpy",
     *       "role": "citzen",
     *       "createdAt": "2017-01-01T14:31:87.000Z"
     *     }
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
     * @apiExample Example
     *     DELETE /users/58b2926f5e1def0123e97bc0 HTTP/1.1
     *
     * @apiSuccessExample 204 No Content
     *     HTTP/1.1 204 No Content
     */
    app.delete('/users/:id', users.delete);

}