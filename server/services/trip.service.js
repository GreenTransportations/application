// Services for the Vehicle Model
const express = require("express");
const mongoose = require("mongoose");
const tripServices = express.Router();

// Configs, Utilities and Enums
const config = require("../configs/server.config");
const { log } = require("../utils/log.util");

// Connect to Database
mongoose.connect(config.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
connection = mongoose.connection;

connection.once('open', () => {
    log.print("trip.service", "MongoDB database connection established successfully");
})


// Mongoose Model [Vehicle]
let Trip = require("../models/trip.model");


/* All trips 
    Display the information of all trips in the Db.
*/
// ../trip/all
tripServices.route("/all").get((_, res) => { 
    log.print("/trip/all", "GET");
    
    // Find all vehicles
    Trip.find({}, (err, trips) => {
        if (err) {
            log.print("/trip/all", err);
            res.status(500).json({
                err: "Error in finding trips"
            });
        } else {
            // Return the trips object to success
            res.status(200).json(trips);
        }
    });
})


tripServices.route("/all/live").get((_, res) => { 
    log.print("/trip/all", "GET");
    
    // Find all vehicles
    Trip.find({isLive: true}, (err, trips) => {
        if (err) {
            log.print("/trip/all", err);
            res.status(500).json({
                err: "Error in finding trips"
            });
        } else {
            // Return the trips object to success
            res.status(200).json(trips);
        }
    });
})

/* Create a new Vehicle
    A user is able to create a new Vehicle in this POST request.
*/
tripServices.route("/create").post((req, res) => {
    log.print("/vehicle/create", "POST");
    const NOW = new Date();

    let newTrip = null;
    // Create new Vehicle following the model
    try {
        newTrip = new Trip({
            vehicles: req.body.vehicles.map((id) => mongoose.Types.ObjectId(id)),
            user: req.user._id,
            emission: req.body.emission,
            km: req.body.km,
            source: req.body.source.trim(),
            destination: req.body.destination.trim(),
            stops: req.body.stops,
            date: NOW,
            startTime: NOW,
            endTime: null,
            totalTime: null,
            isLive: true,
        });
    
        newTrip.save();
    } catch(e) {
        log.print("/vehicle/create/", e);
        res.status(500).json({
            err: "Cannot create new Vehicle"
        });
    }

    res.status(200).json(newTrip);
})


// finish a trip
tripServices.route("/finish").post((req, res) => {
    log.print("/trip/:id", "POST");

    const NOW = new Date();
    // Update any Vehicle
    Trip.findById(req.body.id, (err, trip) => {
        if (err) {
            log.print("/trip/:id", err);
            res.status(500).json({
                err: "Error in finding Trip with this ID"
            });
            
        } else {
            trip.endTime = NOW;
            trip.totalTime = NOW.getTime() - trip.startTime.getTime();
            trip.isLive = false;
            trip.save();
            res.status(200).json(trip);
        }
    });
})

module.exports = tripServices;