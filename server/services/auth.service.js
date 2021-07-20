const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const authServices = express.Router();


// Configs, Utilities and Enums
const config = require("../configs/server.config");
const { validateHeader, validateUser, validateUserTypes, randomString } = require("../utils/common.util");

// Connect to Database
mongoose.connect(config.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
connection = mongoose.connection;

connection.once('open', () => {
    console.log("auth.service", "MongoDB database connection established successfully");
})


// Mongoose Model
let Auth = require("../models/auth.model");
let User = require("../models/user.model");



// =============================================================================================================
// Create the First User if there are no user exist on the app
console.log("auth.service", "Creating First User");
Auth.findOne({username: "FirstUser"}, (err, auth) => { 
    if (err) {
        console.log("auth.service", "Error in creating first user");
    } else if (auth) {
        console.log("auth.service", "First User already Exist!");
    } else {
        bcrypt.hash("FirstUser", config.SALT_ROUNDS, (err, hash) => {
            if (err) {
                console.log("auth.service", "Error in creating first user")
            } else {
                const firstAuth = new Auth({
                    username: "FirstUser",
                    password: hash,
                    accessCode: randomString(100),
                    activated: true
                })
                firstAuth.save();
                const firstUser = new User({
                    firstname: "First",
                    lastname: "User",
                    DOB: new Date(),
                    email: "first.user@placeholder.com",
                    mobile: "0432442340",
                    auth: firstAuth._id
                });
                firstUser.save()
                
                console.log("auth.service", "First User successfully created!");
            }
        });
    }
})
// =============================================================================================================



// Service Routes
// login API
// ../auth/login
authServices.route("/login").post((req, res) => {
    console.log("/auth/login", "POST");

    
    // Check if username is valid
    Auth.findOne({ username: req.body.username, activated: true }, (err, auth) => {
        if (err) {
            res.status(500).json({
                err: "Error Authorization"
            });
        } else if (!auth) {
            res.status(401).json({
                err: "Access Denied"
            });
        } else {

            // Compared hashed password with the incoming password
            bcrypt.compare(req.body.password, auth.password, (err, result) => {
                if (err) {
                    res.status(500).json({
                        err: "Error Authorization"
                    });
                } else if (!result) {
                    res.status(401).json({
                        err: "Access Denied"
                    });
                } else {

                    User.findOne({ auth: auth._id }, (err, user) => {
                        if (err) {
                            res.status(500).json({
                                err: "Error Authorization"
                            });
                        } else if (!user) {
                            res.status(401).json({
                                err: "Access Denied"
                            });
                        } else {
                            res.status(200).json({
                                user: user,
                                accessCode: auth.accessCode
                            });
                        }
                    })
                }
            });
        }
    })
})

// Signup API
// ../auth/login
authServices.route("/create").post(validateHeader, validateUser, (req, res) => {
    console.log("/auth/create", "POST");

    // Get any auth with the new username to avoid duplicate auth
    Auth.findOne({ username: req.body.username }, (err, auth) => {
        if (err) {
            res.status(500).json({
                err: "Error in Creation"
            })
        } else if (auth) {
            res.status(401).json({
                err: "Username already exist!"
            })
        } else {

            // Hash the password
            bcrypt.hash(req.body.password, config.SALT_ROUNDS, (err, hash) => {
                if (err) {
                    res.status(500).json({
                        err: "Error in hashing the password!"
                    })
                } else {
                    const newAuth = new Auth({
                        username: req.body.username,
                        password: hash,
                        accessCode: randomString(100),
                        activated: true
                    });
                    newAuth.save();    

                    const newUser = new User({
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        DOB: new Date(req.body.dob),
                        email: req.body.email,
                        mobile: req.body.mobile,
                        auth: newAuth._id
                    });
                    newUser.save();

                    res.status(200).json({
                        ...newUser._doc,
                        auth:{
                            _id: newAuth._id,
                            username: newAuth.username
                        }
                    });
                }
            });
        }
    })

})


// Change username & password API
// ../auth/:id
authServices.route("/:id").post(validateHeader, validateUser, (req, res) => {
    console.log("/auth/:id", "POST");

    // If user is updating their own auth  -> update their auth
    if (req.user._id.equals(req.params.id)){
        // Get the targeted auth
        Auth.findById(req.authId, (err, auth) => {
            if (err) {
                res.status(500).json({
                    err: "Error in Creation"
                })
            } else if (!auth) {
                res.status(404).json({
                    err: "Auth not found!"
                })
            } else {

                // Get any auth with the new username to avoid duplicate auth
                Auth.findOne({ username: req.body.username }, (err, checkAuth) => {
                    if (err) {
                        res.status(500).json({
                            err: "Error in Creation"
                        })
                    } else if (checkAuth && !checkAuth._id.equals(auth._id)) {
                        res.status(401).json({
                            err: "Username already exist!"
                        })
                    } else {
                        if (req.body.password.length > 0 ) {

                            // Hash the password
                            bcrypt.hash(req.body.password, config.SALT_ROUNDS, (err, hash) => {
                                if (err) {
                                    res.status(500).json({
                                        err: "Error in hash!"
                                    })
                                } else {
                                    auth.username = req.body.username;
                                    auth.password = hash;
                                    auth.accessCode = randomString(100);
                                    auth.save();
                                    res.status(200).json(auth);
                                }
                            });
        
                        } else {
                            auth.username = req.body.username;
                            auth.save();
                            res.status(200).json(auth);
                        }
                    }
                })
            }
        })
    } else {
        // If user is updating other account -> access denied
        res.status(403).json({
            err: "Access Denied"
        })
    }
})



module.exports = authServices;