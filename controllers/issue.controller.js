var express = require('express');
var Issue = require('../models/issue.model');
var mongoose = require('mongoose');

exports.create = function(req, res) {
    // Create and Save a new Issue
    if (!req.body.title || !req.body.body) {
        res.status(400).send({ message: "Issue can not be empty" });
    }

    var issue = new Issue(req.body);
    issue.uid = req.params.userId;
    //Issue({ issuename: req.body.title || "Untitled Issue" });

    issue.save(function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send({ message: "Some error occurred while creating Issue." });
        } else {
            res.status(200).send(data);
        }
    });
};

exports.findAllOfUser = function(req, res) {
    // Retrieve and return all Issues from the database.
    Issue.find({ "uid": req.params.userId }, function(err, Issues) {
        if (err) {
            res.status(500).send({ message: "Some error occurred while retrieving Issues." });
        } else {
            res.status(200).send(Issues);
        }
    });
};


exports.findAll = function(req, res) {
    // Retrieve and return all Issues from the database.
    Issue.find(function(err, Issues) {
        if (err) {
            res.status(500).send({ message: "Some error occurred while retrieving Issues." });
        } else {
            res.status(200).send(Issues);
        }
    });
};

exports.findOne = function(req, res) {
    // Find a single Issue with a issueId
    Issue.findById(req.params.issueId, function(err, data) {
        if (err) {
            res.status(500).send({ message: "Could not retrieve Issue with id " + req.params.issueId });
        } else {
            res.status(200).send(data);
        }
    });
};

exports.updateDoc = function(req, res) {
    // Update a Issue identified by the issueId in the request
    Issue.findById(req.params.issueId, function(err, Issue) {
        if (err) {
            res.status(500).send({ message: "Could not find a Issue with id " + req.params.issueId });
        }
        //Replace each field of Issue

        Issue.title = req.body.title;
        Issue.body = req.body.body;

        // Update issue data (document are remplaced by antoher)
        Issue.save(function(err, data) {
            // Handle any possible database errors
            if (err) {
                res.status(500).send({ message: "Could not update Issue with id " + req.params.issueId });
            } else {
                res.status(200).send(data);
            }
        });
    });
};

exports.updateFields = function(req, res) {
    // Update (partial) an Issue identified by the issueId in the request
    Issue.findByIdAndUpdate(
        // The id of the Issue to find
        req.params.issueId,
        //Update each field of Issue
        { $set: req.body },

        // Return the updated version and create issue if does no exist
        { upsert: true, new: true },
        // Update issue data
        (err, data) => {
            // Handle any possible database errors
            if (err) {
                res.status(500).send({ message: "Could not update Issue with id " + req.params.issueId });
            } else {
                console.log(data);
                res.status(200).send(data);
            }
        }
    )
};

exports.delete = function(req, res) {
    // Delete a Issue with the specified issueId in the request
    Issue.remove({ _id: req.params.issueId }, function(err, data) {
        if (err) {
            res.status(500).send({ message: "Could not delete Issue with id " + req.params.id });
        } else {
            res.status(200).send({ message: "Issue deleted successfully!" })
        }
    });


};