var express = require('express');
var Issue = require('../models/issue.model');
var mongoose = require('mongoose');

exports.create = function(req, res) {
    // Create and Save a new Issue
    if (!req.body.description || !req.body.uid) {
        res.status(400).send({ message: "Issue can not be empty" });
    }
    var issue = new Issue(req.body);
    issue.uid = req.body.uid;

    issue.save(function(err, data) {
        if (err) {
            console.log(err);
            res.status(422).send(err);

        } else {
            res.status(201).send(data);
        }
    });
};

exports.findAllAndFilter = function(req, res) {

    // Retrieve and return all issues from the database.
    let query = Issue.find();
    //FILTERS
    //add filters to query if in req.query
    if (req.query.uid)
        query = query.where('uid').in(req.query.uid);
    if (req.query.status)
        query = query.where('status').in(req.query.status);
    //PAGINATION
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
    // Find a single Issue with a id

    Issue.findById(req.params.id, function(err, data) {
        if (err) {
            res.status(404).send({ message: "No issue found with ID " + req.params.id });
        } else {
            res.status(200).send(data);
        }
    });
};

exports.updateFields = function(req, res) {
    // Update (partial) an Issue identified by the id in the request
    Issue.findById(req.params.id, function(err, issue) {
        if (err) {
            return res.status(404).send({ message: "No issue found with ID " + req.params.id });
            //handleError(err.message);
        }
        //ADD THE NEW VALUE TO UPDATE AND VALIDATE STATUS TRANISITION (can't do that in model)
        let newIssue = req.body;
        if (newIssue.status) {
            if (issue.status == 'new' && (newIssue.status == "new" || newIssue.status == "inProgress" || newIssue.status == "canceled")) console.log("Statuts Updated");
            else if (issue.status == 'inProgress' && (newIssue.status == "canceled" || newIssue.status == "completed")) console.log("Statuts Updated");
            else {
                console.log("Error with Statuts transition");
                return res.status(500).send({ message: "You can't transit from : " + issue.status + " status to " + newIssue.status + " status" });
            }
            issue.status = newIssue.status;
        }
        if (newIssue.description) issue.description = newIssue.description;
        if (newIssue.imageUrl) issue.imageUrl = newIssue.imageUrl;
        if (newIssue.latitude) issue.latitude = newIssue.latitude;
        if (newIssue.longitude) issue.longitude = newIssue.longitude;
        if (newIssue.tags) issue.tags = newIssue.tags;
        //SAVE THE NEW VALUE
        issue.save(

            // Update issue data
            (err, data) => {
                // Handle any possible database errors
                if (err) {
                    res.status(422).send(err);
                } else {
                    console.log(data);
                    res.status(200).send(data);
                }
            }
        )
    })



};

exports.delete = function(req, res) {
    // Delete a Issue with the specified id in the request
    Issue.remove({ _id: req.params.id }, function(err, data) {
        if (err) {
            res.status(404).send({ message: "No issue found with ID " + req.params.id });
        } else {
            res.status(204).send({ message: "No content" })
        }
    });


};