const mongoose = require("mongoose");

let Test = mongoose.Schema({
    name: { type: String },
    date: { type: Date },
    activated: { type: Boolean },
    amount: { type: Number },
});

module.exports = mongoose.model("test", Test);

