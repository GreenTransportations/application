const mongoose = require("mongoose");

/*  Declare the Schema of the Mongo model for Trip
    This model will be used to track CO2 emissions
    and drivers/vehicles in a trip
*/
var tripSchema = new mongoose.Schema({
    make:{
        type:String,
        required:true,
    },
    // foreign keys
    // One Trip -> Many Vehicle
    vehicles: [
        {type: mongoose.Schema.Types.ObjectId, ref: "vehicle"}
    ],
    // One trip -> one User
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: "user"
    },
    emission:{
        type: Number,
        required: false
    },
    mileage:{
        type: Number,
        required: false
    },
    source:{
        type: String, // change to Location Model later
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    stops:[
        {type: String} // change to Location Model later
    ],
    date:{
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: false
    },
    endTime: {
        type: String,
        required: false
    },
    totalTime:{
        type: String,
        required: false
    },
    km:{
        type: Number,
        required: false
    },
});

//Export the model
module.exports = mongoose.model('trip', tripSchema);