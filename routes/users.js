var express = require('express');
var router = express.Router();
const User = require("../models/user");
//GET ALL
// Finds all instances of users
app.get('/api/employees', function(req, res) {

    User.find((err, users) => {

        if (err) return res.status(500).send(err)
            // send the list of all users
        return res.status(200).send(users);
    });
});
//GET BY ID
app.get('/api/employees/:employee_id', function(req, res) {
    let id = req.params.uid;
    Employee.findById(id, function(err, user) {

        if (err) return res.status(500).send(err)
            // send the user
        res.status(200).send(user);
    });
});

/* POST new user */
router.post('/', function(req, res, next) {
    // Create a new document from the JSON in the request body
    const newUser = new User(req.body);
    // Save that document
    newUser.save(function(err, savedUser) {
        if (err) {
            return next(err);
        }
        // Send the saved document in the response
        res.send(savedUser);
    });
});
module.exports = router;