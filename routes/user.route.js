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
    //      -------- API DOCS DEFINE ---------
    /**
     * @apiDefine UserInResponseBody
     * @apiSuccess {String} user.firstName Firstname of the user
     * @apiSuccess {String} user.lastName  Lastname of the user
     * @apiSuccess {String} user.role  Role of the user
     * @apiSuccess {String} user.createdAt  Creation date of the user
     * 
     */

/**
 * @apiDefine UserValidationError
 *
 * @apiError {Object} 422/UnprocessableEntity Some of the user's properties are invalid
 *
 * @apiErrorExample {json} 422 Unprocessable Entity
 *     HTTP/1.1 422 Unprocessable Entity
 *     Content-Type: application/json
 *
 *     {
 *       "message": "Person validation failed",
 *       "errors": {
 *         "gender": {
 *           "kind": "enum",
 *           "message": "`foo` is not a valid enum value for path `gender`.",
 *           "name": "ValidatorError",
 *           "path": "gender",
 *           "properties": {
 *             "enumValues": [
 *               "male",
 *               "female"
 *             ],
 *             "message": "`{VALUE}` is not a valid enum value for path `{PATH}`.",
 *             "path": "gender",
 *             "type": "enum",
 *             "value": "foo"
 *           },
 *           "value": "foo"
 *         }
 *       }
 *     }
 */

/**
 * @apiDefine UserInRequestBody
 * @apiParam (Request body) {String{2..20}} firstName First name of the user
 * @apiParam (Request body) {String{2..20}} lastName  Last name of the user
 * @apiParam (Request body) {String="citzen","manager"} role Role of the user
 * 
 */
/**
 * @apiDefine Pagination
 * @apiParam (URL query parameters) {Number} page The page to retrieve
 * @apiParam (URL query parameters) {Number} pageSize The number of object in page
 * 
 * 
 */

/**
 * @apiDefine UserIdInUrlPath
 * @apiParam (URL path parameters) {String} id The unique identifier of the user to retrieve
 */

/**
 * @apiDefine UserNotFoundError
 *
 * @apiError {Object} 404/NotFound No user was found corresponding to the ID in the URL path
 *
 * @apiErrorExample {json} 404 Not Found
 *     HTTP/1.1 404 Not Found
 *     Content-Type: text/plain
 *
 *     No user found with ID 58b2926f5e1def0123e97bc0
 */