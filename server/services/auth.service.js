const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const authServices = express.Router();


// Configs, Utilities and Enums
const config = require("../configs/server.config");
const { validateHeader, validateUser, randomString } = require("../utils/common.util");
const { USER_TYPE } = require("../enums/user.enum");

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
                    name: "First Manager",
                    DOB: new Date(),
                    email: "first.user@placeholder.com",
                    mobile: "0432442340",
                    auth: firstAuth._id,
                    type: USER_TYPE.MANAGER,
                    total: {
                        mileage: 0,
                        emission: 0,
                        trip: 0,
                    }
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
                            console.log(auth.accessCode);
                        }
                    })
                }
            });
        }
    })
})

// Signup API
// ../auth/signup
authServices.route("/signup").post((req, res) => {
    console.log("/auth/signup", "POST");

    let dob = new Date(req.body.dob);

    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!req.body.username || req.body.username.trim().length === 0) {
        res.status(401).json({
            err: "Missing username!"
        });
        return;

    } else if (!req.body.name || req.body.name.trim().length === 0) {
        res.status(401).json({
            err: "Missing name!"
        });
        return;

    } else if (!req.body.mobile || req.body.mobile.trim().length === 0) {
        res.status(401).json({
            err: "Missing mobile!"
        });
        return;

    } else if (!(dob instanceof Date && !isNaN(dob))) {
        res.status(401).json({
            err: "invalid date of birth!"
        });
        return;

    } else if (!req.body.email ||  req.body.email.trim() === 0 ||!emailRegex.test(req.body.email.trim())) {
        res.status(401).json({
            err: "invalid email!"
        });
        return;

    } else if (!req.body.password || req.body.password.trim().length === 0) {
        res.status(401).json({
            err: "Missing password!"
        });
        return;

    } else if (req.body.type && (req.body.type.trim().toUpperCase() !== USER_TYPE.DRIVER && req.body.type.trim().toUpperCase() !== USER_TYPE.MANAGER)) {
        res.status(401).json({
            err: "Invalid Type!"
        });
        return;
    }

    let username = req.body.username.trim();
    let name = req.body.name.trim();
    let password = req.body.password.trim();
    let email = req.body.email.trim();
    let mobile = req.body.mobile.trim();
    let type = req.body.type.trim().toUpperCase();

    
    // Get any auth with the new username to avoid duplicate auth
    Auth.findOne({ username: username }, (err, auth) => {
        if (err) {
            res.status(500).json({
                err: "Error in Creation"
            });

        } else if (auth) {
            res.status(401).json({
                err: "Username already exist!"
            });
            
        } else {

            // Hash the password
            bcrypt.hash(password, config.SALT_ROUNDS, (err, hash) => {
                if (err) {
                    res.status(500).json({
                        err: "Error in hashing the password!"
                    })
                } else {
                    const newAuth = new Auth({
                        username: username,
                        password: hash,
                        accessCode: randomString(100),
                        activated: true
                    });
                    newAuth.save();    

                    const newUser = new User({
                        name: name,
                        DOB: dob,
                        email: email,
                        mobile: mobile,
                        auth: newAuth._id,
                        type: type,
                        total: {
                            mileage: 0,
                            emission: 0,
                            trip: 0,
                        }
                    });
                    newUser.save();

                    res.status(200).json({
                        user: newUser._doc,
                        accessCode: newAuth.accessCode

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