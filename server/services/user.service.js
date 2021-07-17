const express = require("express");
const mongoose = require("mongoose");
const userServices = express.Router();

// Configs, Utilities and Enums
const config = require("../configs/server.config");


// Connect to Database
mongoose.connect(config.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
connection = mongoose.connection;

connection.once('open', () => {
    console.log("user.service", "MongoDB database connection established successfully");
})


// Mongoose Model
let User = require("../models/user.model");

// All Users
// ../user/all
userServices.route("/all").get((_, res) => {
    console.log("/user/all", "GET");
    
    // Find all sections
    Test.find({}, (err, users) => {
        if (err) {
            console.log("/user/all", err);
            res.status(500).json({
                err: "Error in finding users"
            });
        } else {
            res.status(200).json(users);
        }
    });
})

// Signup page POST request
// ../user/create
userServices.route("/create").post((req, res) => {
    console.log("/user/create", "POST");

    // Create new User
    const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        DOB: new Date(req.body.dob),
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password // needs to be hashed...
    });
    newUser.save();
    
    res.status(200).json(newUser);
})


// Update User with :id
userServices.route("/:id").post((req, res) => {
    console.log("/user/:id", "POST");

    // Update any User
    User.findByIdAndUpdate(req.params.id, { 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        DOB: new Date(req.body.dob),
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password // needs to be hashed...
    }, (err, user) => {
        if (err) {
            console.log("/user/:id", err);
            res.status(500).json({
                err: "Error in finding User"
            });
            
        } else {
            res.status(200).json(user);
        }
    });
})


// Needs: Delete User

module.exports = userServices;