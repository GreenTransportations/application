// Services for the Vehicle Model
const express = require("express");
const mongoose = require("mongoose");
const vehicleService = express.Router();

// Configs, Utilities and Enums
const config = require("../configs/server.config");

// Connect to Database
mongoose.connect(config.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
connection = mongoose.connection;

connection.once('open', () => {
    console.log("user.service", "MongoDB database connection established successfully");
})


// Mongoose Model [Vehicle]
let User = require("../models/vehicle.model");


/* All Vehicles 
    Display the information of all vehicles in the Db.
*/
// ../vehicle/all
vehicleService.route("/all").get((_, res) => {
    console.log("/vehicle/all", "GET");
    
    // Find all vehicles
    Test.find({}, (err, vehicles) => {
        if (err) {
            console.log("/vehicle/all", err);
            res.status(500).json({
                err: "Error in finding vehicles"
            });
        } else {
            // Return the vehicles object to success
            res.status(200).json(vehicles);
        }
    });
})

