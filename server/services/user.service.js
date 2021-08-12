const express = require("express");
const mongoose = require("mongoose");
const userServices = express.Router();

// Configs, Utilities and Enums
const config = require("../configs/server.config");
const { USER_TYPE } = require("../enums/user.enum");


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
userServices.route("/all").get((req, res) => {
    console.log("/user/all", "GET");
    
    let query = {};
    
    if (req.query) {
        if (req.query.type && (req.query.type.toUpperCase() === USER_TYPE.DRIVER || req.query.type.toUpperCase() === USER_TYPE.MANAGER)) {
            query["type"] = req.query.type.toUpperCase();
        }
    }
    // Find all users
    User.where(query)
        .exec((err, users) => {
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


// Update User with :id
userServices.route("/:id").post((req, res) => {
    console.log("/user/:id", "POST");
    let dob = new Date(req.body.dob);

    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!req.body.name || req.body.name.trim().length === 0) {
        res.status(401).json({
            err: "Missing name!"
        });
        return;

    } else if (!(dob instanceof Date && !isNaN(dob))) {
        res.status(401).json({
            err: "invalid date of birth!"
        });
        return;

    } else if (!req.body.mobile || req.body.mobile.trim().length === 0) {
        res.status(401).json({
            err: "Missing name!"
        });
        return;

    } else if (!req.body.email ||  req.body.email.trim() === 0 ||!emailRegex.test(req.body.email.trim())) {
        res.status(401).json({
            err: "invalid email!"
        });
        return;
    } 

    let name = req.body.name.trim();
    let email = req.body.email.trim();
    let mobile = req.body.mobile.trim();

    // Update any User
    User.findByIdAndUpdate(req.params.id, { 
        name: name,
        DOB: dob,
        email: email,
        mobile: mobile,
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