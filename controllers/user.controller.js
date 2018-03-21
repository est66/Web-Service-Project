var express = require('express');
var User = require('../models/user.model');
var mongoose = require('mongoose');

exports.create = function(req, res) {
    // Create and Save a new User
    if (!req.body.firstname) {
        res.status(400).send({ message: "firstname can not be empty" });
    }

    if (!req.body.lastname) {
        res.status(400).send({ message: "lastname can not be empty" });
    }

    if (!req.body.role) {
        res.status(400).send({ message: "role can not be empty" });
    }

    var user = new User(req.body);
    //User({ username: req.body.username || "Unnamed User", email: req.body.email });

    user.save(function(err, data) {
        if (err) {
            console.log(err);
            res.status(422).send({ message: "Some of the user's properties are invalid." });
        } else {
            res.status(201).send(data);
        }
    });
};

exports.findAllAndFilter = function(req, res) {
    // Retrieve and return all Users from the database.
    let query = User.find();
    //FILTERS
    //add filters to query if in req.query
    if (req.query.role)
        query = query.where('role').in(req.query.role);
    if (req.query.firstname)
        query = query.where('firstname').in(req.query.firstname);
    if (req.query.lastname)
        query = query.where('lastname').in(req.query.lastname);

    //pagination
    // Parse the "page" param (default to 1 if invalid)
    let page = parseInt(req.query.page, 10);
    if (isNaN(page) || page < 1) {
        page = 1;
    }
    // Parse the "pageSize" param (default to 100 if invalid)
    let pageSize = parseInt(req.query.pageSize, 10);
    if (isNaN(pageSize) || pageSize < 0 || pageSize > 100) {
        pageSize = 100;
    }
    // Apply skip and limit to select the correct page of elements
    query = query.skip((page - 1) * pageSize).limit(pageSize);

    // Retrieve and return all Users from the database.
    query.exec(function(err, Users) {
        if (err) {
            res.status(500).send({ message: "Some error occurred while retrieving Users." });
        } else {
            res.status(200).send(Users);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single User with a id
    //if (!mongoose.Types.ObjectId.isValid(req.query.uid))

    User.findById(req.params.id, function(err, data) {
        console.log(data);
        if (err) {
            console.log(err.message);
            res.status(404).send({ message: "No user found with id " + req.params.id });
        } else {
            res.status(200).send(data);
        }
    });
};

exports.updateFields = function(req, res) {
    User.findById(req.params.id, function(err, data) {
        if (err) return res.status(404).send({ message: "No user found with id " + req.params.id });
        // Update (partial) a User identified by the id in the request
        User.findById(req.params.id, function(err, user) {
            if (err) {
                return res.status(404).send({ message: "No user found with ID " + req.params.id });
                //handleError(err.message);
            }
            let newUser = req.body;
            if (newUser.firstname) user.firstname = newUser.firstname;
            if (newUser.lastname) user.lastname = newUser.lastname;
            if (newUser.role) user.role = newUser.role;
            //SAVE THE NEW VALUE
            user.save(
                // Update user data
                (err, data) => {
                    // Handle any possible database errors
                    if (err) {
                        res.status(422).send({ message: "Some of the user's properties with ID " + req.params.id + " are invalid " });
                    } else {
                        console.log(data);
                        res.status(200).send(data);
                    }
                }
            )
        })

    });
};

exports.delete = function(req, res) {
    // Delete a User with the specified id in the request
    User.remove({ _id: req.params.id }, function(err, data) {
        if (err) {
            res.status(404).send({ message: "No user found with ID " + req.params.id });
        } else {
            res.status(204).send({ message: "No content" })
        }
    });


};