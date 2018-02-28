var express = require('express');
var Issue = require('../models/issue.model');
var mongoose = require('mongoose');

exports.create = function(req, res) {
    // Create and Save a new Issue
    if (!req.body.title || !req.body.description || !req.body.uid) {
        res.status(400).send({ message: "Issue can not be empty" });
    }
    var issue = new Issue(req.body);
    issue.uid = req.body.uid;
    //Issue({ issuename: req.body.title || "Untitled Issue" });

    issue.save(function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send({
                message: "Some error occurred while creating Issue."

            });
        } else {
            res.status(200).send(data);
        }
    });
};

exports.findAllAndFilter = function(req, res) {
    //FILTERS
    //add filters to query if in req.query
    let query = Issue.find();
    if (req.query.uid)
        query = query.where('uid').in(req.query.uid);
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
    // Find a single Issue with a id
    Issue.findById(req.params.id, function(err, data) {
        if (err) {
            res.status(500).send({ message: "Could not retrieve Issue with id " + req.params.id });
        } else {
            res.status(200).send(data);
        }
    });
};

exports.updateFields = function(req, res) {
    // Update (partial) an Issue identified by the id in the request
    Issue.findByIdAndUpdate(
        // The id of the Issue to find
        req.params.id,
        //Update each field of Issue
        { $set: req.body },

        // Return the updated version and create issue if does no exist
        { upsert: true, new: true },
        // Update issue data
        (err, data) => {
            // Handle any possible database errors
            if (err) {
                res.status(500).send({ message: "Could not update Issue with id " + req.params.id });
            } else {
                console.log(data);
                res.status(200).send(data);
            }
        }
    )
};

exports.delete = function(req, res) {
    // Delete a Issue with the specified id in the request
    Issue.remove({ _id: req.params.id }, function(err, data) {
        if (err) {
            res.status(500).send({ message: "Could not delete Issue with id " + req.params.id });
        } else {
            res.status(200).send({ message: "Issue deleted successfully!" })
        }
    });


};