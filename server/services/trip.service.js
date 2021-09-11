// Services for the Trip Model
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


// Mongoose Model [trip]
let Trip = require("../models/trip.model");

//============================================================================================
log.print("trip.service", "Creating Test Trip");
Trip.where({})
    .exec((err, trips) => { 
        if (err) {
            log.print("trip.service", "Error in creating test trip");
        } else if (trips.length > 0 ) {
            log.print("trip.service", "Test Trip already Exist!");
        } else {
            const TOTAL_TIME = 2;
            const NOW = new Date();
            const END = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate(), NOW.getHours() + TOTAL_TIME);

            const testTrip = new Trip({
                vehicles: [mongoose.Types.ObjectId("61235c43b6ef1225fcd05a37")],
                user: mongoose.Types.ObjectId("6114f493705e4d04485cf653"),
                emission: Math.ceil(Math.random() * 1000),
                km: Math.ceil(Math.random() * 100),
                source: "Some Starting Location",
                destination: "Some Destination",
                stops: [],
                date: NOW,
                startTime: NOW,
                endTime: END,
                totalTime: END.getTime() - NOW.getTime(),
                isLive: false
            });
            testTrip.save()
            
            log.print("trip.service", "First Trip successfully created!");

        }
    })


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
            user: req.body.user._id,
            emission: req.body.emission,
            km: req.body.km,
            source: req.body.source,
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
        log.print("/trip/create/", e);
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
            trip.endTime = NOW;
            trip.totalTime = NOW.getTime() - trip.startTime.getTime();
            trip.isLive = false;
            trip.save();
            res.status(200).json(trip);
        }
    });
})

module.exports = tripServices;