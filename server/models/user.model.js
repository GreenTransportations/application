const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name: { type: String },
    DOB: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    type: { type: String },
    total: {
        mileage: { type: Number },
        emission: { type: Number },
        trip: { type: Number },
    },
    auth: { type: mongoose.Schema.Types.ObjectId, ref: "auth" },
});

//Export the model
module.exports = mongoose.model('user', userSchema);