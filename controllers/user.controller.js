var express = require('express');
var User = require('../models/user.model');
var mongoose = require('mongoose');

exports.create = function(req, res) {
    // Create and Save a new User
    if (!req.body.username) {
        res.status(400).send({ message: "User can not be empty" });
    }

    var user = new User(req.body);
    //User({ username: req.body.username || "Unnamed User", email: req.body.email });

    user.save(function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while creating User." });
        } else {
            res.status(200).send(data);
        }
    });
};

exports.findAllAndFilter = function(req, res) {
    // Retrieve and return all Users from the database.
    let query = User.find();
    //FILTERS
    //add filters to query if in req.query
    if (req.query.role)
        query = query.where('uid').in(req.query.uid);
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

    // Retrieve and return all Issues from the database.
    query.exec(function(err, Issues) {
        if (err) {
            res.status(500).send({ message: "Some error occurred while retrieving Issues." });
        } else {
            res.status(200).send(Issues);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single User with a id
    //if (!mongoose.Types.ObjectId.isValid(req.query.uid))
    console.log(req.params.id, "Yeahhhh!")
    User.findOne({
        $or: [
            { 'username': req.params.id }, { '_id': req.params.id }
        ]
    }, function(err, data) {
        if (err) {
            console.log(err.message);
            res.status(500).send({ message: "Could not retrieve User with id " + req.params.id });
        } else {
            res.status(200).send(data);
        }
    });
};

exports.updateFields = function(req, res) {
    // Update (partial) a User identified by the id in the request
    User.findByIdAndUpdate(
        // The id of the User to find
        req.params.id,
        //Update each field of User
        { $set: req.body },

        // Return the updated version and create user if does no exist
        { upsert: true, new: true },
        // Update user data
        (err, data) => {
            // Handle any possible database errors
            if (err) {
                res.status(500).send({ message: "Could not update User with id " + req.params.id });
            } else {
                console.log(data);
                res.status(200).send(data);
            }
        }
    )
};

exports.delete = function(req, res) {
    // Delete a User with the specified id in the request
    User.remove({ _id: req.params.id }, function(err, data) {
        if (err) {
            res.status(500).send({ message: "Could not delete User with id " + req.params.id });
        } else {
            res.status(204).send({ message: "User deleted successfully!" })
        }
    });


};