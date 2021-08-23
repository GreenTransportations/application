const express = require("express");
const mongoose = require("mongoose");
const testServices = express.Router();

// Configs, Utilities and Enums
const config = require("../configs/server.config");
const { log } = require("../utils/log.util");


// Connect to Database
mongoose.connect(config.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
connection = mongoose.connection;

connection.once('open', () => {
    log.print("test.service", "MongoDB database connection established successfully");
})


// Mongoose Model
let Test = require("../models/test.model");


testServices.route("/all").get((req, res) => {
    log.print("/test/all", "GET");
    
    // Find all sections
    Test.find({}, (err, tests) => {
        if (err) {
            log.print("/test/all", err);
            res.status(500).json({
                err: "Error in finding tests"
            });
        } else {
            res.status(200).json(tests);
        }
    });
})


testServices.route("/create").post((req, res) => {
    log.print("/test/create", "POST");

    // Create new sections
    const newTest = new Test({
        name: req.body.name,
        date: new Date(req.body.date),
        amount: req.body.amount,
        activated: req.body.activated
    });
    newTest.save();
    
    res.status(200).json(newTest);
})


testServices.route("/:id").post((req, res) => {
    log.print("/test/:id", "POST");

    // Update any sections
    Test.findByIdAndUpdate(req.params.id, { 
        name: req.body.name, 
        date: new Date(req.body.date), 
        amount: req.body.amount, 
        activated: req.body.activated 
    }, (err, test) => {
        if (err) {
            log.print("/test/:id", err);
            res.status(500).json({
                err: "Error in finding tests"
            });
            
        } else {
            res.status(200).json(test);
        }
    });
})


module.exports = testServices;