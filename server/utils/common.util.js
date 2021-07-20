const mongoose = require("mongoose");

const config = require("../configs/server.config");

mongoose.connect(config.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
connection = mongoose.connection;

connection.once('open', () => {
    console.log("common.util", "MongoDB database connection established successfully")
})

let Auth = require("../models/auth.model");
let User = require("../models/user.model");


// Validate the header and access code contain in the header
exports.validateHeader = (req, res, next) => {
    try {
        if (req.headers['authorization']) {
            const accessCode = req.headers['authorization'];
            console.log(accessCode)
            Auth.findOne({ accessCode: accessCode, activated: true }, (err, auth) => {
                if (err) {
                    return res.status(403).json({
                        err: "Invalid Header"
                    });
                } else if (!auth) {
                    console.log("AUTH not found")
                    return res.status(403).json({
                        err: "Access Denied"
                    });
                } else {
                    req.authId = auth._id;
                    return next();
                }
            });
        } else {
            return res.status(401).json({
                msg: "Invalid Header"
            });
        }
    } catch (err) {
        return res.status(403).json({
            msg: "Invalid Header"
        });
    }
}


// Validate the user
exports.validateUser = (req, res, next) => {
    User.findOne({ auth: req.authId }, (err, user) => {
        if (err) {
            return res.status(500).json({
                msg: "Error validating member"
            });
        } else {
            req.user = user;
            return next();
        }
    });
}

// Generate random string with the specified length
exports.randomString = (length) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)]
    };
    return result;
}