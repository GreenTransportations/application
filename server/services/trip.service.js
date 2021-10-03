// Services for the Trip Model
const express = require("express");
const mongoose = require("mongoose");
const tripServices = express.Router();

// Configs, Utilities and Enums
const config = require("../configs/server.config");
const { log } = require("../utils/log.util");
const { validateHeader, validateUser } = require("../utils/common.util");

// Connect to Database
mongoose.connect(config.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
connection = mongoose.connection;

connection.once('open', () => {
    log.print("trip.service", "MongoDB database connection established successfully");
})


// Mongoose Model [trip]
let Trip = require("../models/trip.model");
let User = require("../models/user.model");



tripServices.use(validateHeader, validateUser)
//====================================================================================
/* All trips 
    Display the information of all trips in the Db.
*/
// ../trip/all
tripServices.route("/all").get((_, res) => { 
    log.print("/trip/all", "GET");
    
    // Find all trips
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
    
    // Find all trips that have live flag set to true
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

tripServices.route("/my/live").get((req, res) => {
    log.print("/trip/my/live", "GET");
    Trip.findOne({ user: req.user._id, isLive: true }).exec((err, trip) => {
        if (err) {
            log.print("/trip/all", err);
            res.status(500).json({
                err: "Error in finding trip"
            });
        } else {
            // Return the trips object to success
            res.status(200).json(trip);
        }
    })
})


/* Create a new trip
    A user is able to create a new trip in this POST request.
*/
tripServices.route("/create").post((req, res) => {
    log.print("/trip/create", "POST");
    // const NOW = new Date();

    let newTrip = null;
    // Create new trip following the model
    try {
        newTrip = new Trip({
            vehicles: req.body.vehicles.map((id) => mongoose.Types.ObjectId(id)),
            user: req.user._id,
            emission: req.body.emission,
            km: req.body.km,
            origin: req.body.origin,
            destination: req.body.destination,
            stops: req.body.stops,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            totalTime: req.body.totalTime,
            isLive: true,
        });
    
        newTrip.save();
    } catch(e) {
        log.print("/trip/create", e);
        res.status(500).json({
            err: "Cannot create new Trip"
        });
    }

    res.status(200).json(newTrip);
})


// finish a trip
tripServices.route("/finish").post((req, res) => {
    log.print("/trip/:id", "POST");

    const NOW = new Date();
    // Update any Trip
    Trip.findById(req.body.id, (err, trip) => {
        if (err) {
            log.print("/trip/:id", err);
            res.status(500).json({
                err: "Error in finding Trip with this ID"
            });
            
        } else {

            User.findById(trip.user, (err, user) => {
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
                    
                    user.total.mileage += trip.km;
                    user.total.emission += trip.emission;
                    user.total.trip += 1;
                    user.save();
                    res.status(200).json(trip);
                }
            })
        }
    });
})

module.exports = tripServices;