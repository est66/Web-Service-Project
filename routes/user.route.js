module.exports = function(app) {



    var users = require('../controllers/user.controller');
    //http://apidocjs.com/#param-api-success
    // -----Create a new User-----
    /**
     * @api {post} /users POST USER
     * @apiName create
     * @apiGroup User
     * @apiDescription Registers a new user.
     *
     * @apiUse UserInRequestBody
     * @apiSuccess {Object} user Return an object of the user just created
     * @apiUse UserInResponseBody
     * @apiUse UserValidationError
     * @apiUse UserValidationError
     * 
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
     * @api {get} /users GET USERS
     * @apiName findAllAndFilter
     * @apiGroup User
     * @apiDescription Get all users
     * @apiDescription Retrieves a paginated list of user.
     * 
     * @apiSuccess {Object[]} users Return an array of all users
     * @apiUse UserInResponseBody
     * @apiUse Pagination
     * 
     * @apiParam (URL query parameters) {String} role Filter by role
     * @apiParam (URL query parameters) {String} lastname Filter by lastname
     * @apiParam (URL query parameters) {String} firstname Filter by firstname
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
     * @api {get} /users/:id GET USER
     * @apiName findOne
     * @apiGroup User
     * @apiDescription Get a user.
     * 
     * @apiParam {Number} id Unique identifier of the user
     * 
     * @apiUse UserIdInUrlPath
     * @apiSuccess {Object} user Return an object of the user
     * @apiUse UserInResponseBody
     * @apiUse UserNotFoundError
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
     * @api {put} /users/:id UPDATE USER
     * @apiName updateFields
     * @apiGroup User
     * @apiDescription Replaces all the user's data (the request body must represent a full, valid user).
     * 
     * @apiUse UserIdInUrlPath
     * @apiUse UserInRequestBody
     * @apiSuccess {Object} user Return an object of the user just updated
     * @apiUse UserInResponseBody
     * @apiUse UserNotFoundError
     * 
     * 
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
     * @api {delete} /users/:id DELETE USER
     * @apiName delete
     * @apiGroup User
     * @apiDescription Permanently deletes a user.
     * 
     * @apiUse UserIdInUrlPath
     * @apiUse UserNotFoundError
     *
     * @apiExample Example
     *     DELETE /users/58b2926f5e1def0123e97bc0 HTTP/1.1
     *
     * @apiSuccessExample 204 No Content
     *     HTTP/1.1 204 No Content
     */
    app.delete('/users/:id', users.delete);

}