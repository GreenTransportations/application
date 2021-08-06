const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var vehicleSchema = new mongoose.Schema({
    make:{
        type:String,
        required:true,
    },
    model:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    reg_no:{
        // registration number
        type:Number,
        required:true,
    },
    fuel_eff:{
        // fuel efficiency in L/km
        type:String,
        required:true,
    },
});

//Export the model
module.exports = mongoose.model('vehicle', vehicleSchema);