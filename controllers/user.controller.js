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

exports.findAll = function(req, res) {
    // Retrieve and return all Users from the database.
    User.find(function(err, Users) {
        if (err) {
            res.status(500).send({ message: "Some error occurred while retrieving Users." });
        } else {
            res.status(200).send(Users);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single User with a userId
    User.findById(req.params.userId, function(err, data) {
        if (err) {
            res.status(500).send({ message: "Could not retrieve User with id " + req.params.userId });
        } else {
            res.status(200).send(data);
        }
    });
};

exports.updateDoc = function(req, res) {
    // Update a User identified by the userId in the request
    User.findById(req.params.userId, function(err, User) {
        if (err) {
            res.status(500).send({ message: "Could not find a User with id " + req.params.userId });
        }
        //Replace each field of User

        User.username = req.body.username;
        User.email = req.body.email;

        // Update user data (document are remplaced by antoher)
        User.save(function(err, data) {
            // Handle any possible database errors
            if (err) {
                res.status(500).send({ message: "Could not update User with id " + req.params.userId });
            } else {
                res.status(200).send(data);
            }
        });
    });
};

exports.updateFields = function(req, res) {
    // Update (partial) a User identified by the userId in the request
    User.findByIdAndUpdate(
        // The id of the User to find
        req.params.userId,
        //Update each field of User
        { $set: req.body },

        // Return the updated version and create user if does no exist
        { upsert: true, new: true },

        // Update user data
        (err, data) => {
            // Handle any possible database errors
            if (err) {
                res.status(500).send({ message: "Could not update User with id " + req.params.userId });
            } else {
                console.log(data);
                res.status(200).send(data);
            }
        }
    )
};

exports.delete = function(req, res) {
    // Delete a User with the specified userId in the request
    User.remove({ _id: req.params.userId }, function(err, data) {
        if (err) {
            res.status(500).send({ message: "Could not delete User with id " + req.params.id });
        } else {
            res.status(200).send({ message: "User deleted successfully!" })
        }
    });
};