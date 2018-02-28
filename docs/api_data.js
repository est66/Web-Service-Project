define({ "api": [
  {
    "type": "delete",
    "url": "/api/people",
    "title": "",
    "version": "0.0.0",
    "filename": "routes/user.route.js",
    "group": "C__laragon_www_WebServices_backend_web_service_project_web_service_project_routes_user_route_js",
    "groupTitle": "C__laragon_www_WebServices_backend_web_service_project_web_service_project_routes_user_route_js",
    "name": "DeleteApiPeople",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "size": "3..30",
            "optional": false,
            "field": "name",
            "description": "<p>The person's name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "allowedValues": [
              "\"male,female\""
            ],
            "optional": false,
            "field": "gender",
            "description": "<p>The person's gender</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": true,
            "field": "birthDate",
            "description": "<p>The person's birth date</p>"
          }
        ]
      }
    }
  },
  {
    "type": "get",
    "url": "/users/:userId",
    "title": "Request a user's information",
    "name": "findOne",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique identifier of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last name of the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/user.route.js",
    "groupTitle": "User"
  }
] });
