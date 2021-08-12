// Services for the Vehicle Model
const express = require("express");
const mongoose = require("mongoose");
const vehicleServices = express.Router();

// Configs, Utilities and Enums
const config = require("../configs/server.config");

// Connect to Database
mongoose.connect(config.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
connection = mongoose.connection;

connection.once('open', () => {
    console.log("user.service", "MongoDB database connection established successfully");
})


// Mongoose Model [Vehicle]
let Vehicle = require("../models/vehicle.model");


/* All Vehicles 
    Display the information of all vehicles in the Db.
*/
// ../vehicle/all
vehicleServices.route("/all").get((_, res) => {
    console.log("/vehicle/all", "GET");
    
    // Find all vehicles
    Vehicle.find({}, (err, vehicles) => {
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

/* Specific Vehicle GET
    Get a specific vehicle by its ID.
*/
vehicleServices.route("/:id").get((req, res) => {
    console.log("/vehicle/:id", "GET");

    // Find specific vehicle
    Vehicle.findById(req.params.id, (err, vehicle) => {
        if (err) {
            console.log("/vehicle/:id", err);
            res.status(500).json({
                err: "Error in finding this vehicle"
            });
        } else {
            res.status(200).json(vehicle);
        }
    });
})

/* Create a new Vehicle
    A user is able to create a new Vehicle in this POST request.
*/
vehicleServices.route("/create").post((req, res) => {
    console.log("/vehicle/create", "POST");

    // Create new Vehicle following the model
    try{
        const newVehicle = new Vehicle({
            make: req.body.make.trim(),
            model: req.body.model.trim(),
            date: new Date(req.body.date.trim()),
            reg_no: req.body.reg_no.trim(),
            fuel_eff: req.body.fuel_eff.trim(),
            gvm: req.body.gvm.trim(),
            gcm: req.body.gcm.trim()
        });
    
        newVehicle.save();
    }
    catch(e){
        console.log("/vehicle/create/", e);
        res.status(500).json({
            err: "Cannot create new Vehicle"
        });
    }

    res.status(200).json(newUser);
})

// Update Vehicle of :id
vehicleServices.route("/:id").post((req, res) => {
    console.log("/vehicle/:id", "POST");

    // Update any Vehicle
    Vehicle.findByIdAndUpdate(req.params.id, { 
        make: req.body.make.trim(),
        model: req.body.model.trim(),
        date: new Date(req.body.date.trim()),
        reg_no: req.body.reg_no.trim(),
        fuel_eff: req.body.fuel_eff.trim(),
        gvm: req.body.gvm.trim(),
        gcm: req.body.gcm.trim()
    }, (err, vehicle) => {
        if (err) {
            console.log("/vehicle/:id", err);
            res.status(500).json({
                err: "Error in finding Vehicle with this ID"
            });
            
        } else {
            res.status(200).json(vehicle);
        }
    });
})

module.exports = vehicleServices;