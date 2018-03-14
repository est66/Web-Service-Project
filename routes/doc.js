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
 * @apiError {Object} 422/UnprocessableEntity Some of the person's properties are invalid
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