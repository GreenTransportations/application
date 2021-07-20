const mongoose = require("mongoose");

let Auth = mongoose.Schema({
    username: { type: String },
    password: { type: String },
    accessCode: { type: String },
    activated: { type: Boolean }
});

module.exports = mongoose.model("auth", Auth);

