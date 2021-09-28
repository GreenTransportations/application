// Services for the Vehicle Model
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const vehicleServices = express.Router();

// Configs, Utilities and Enums
const config = require("../configs/server.config");
const { log } = require("../utils/log.util");
const { validateHeader, validateUser } = require("../utils/common.util");
const vehicleJSON = require('../models/vehicles.json');

// Connect to Database
mongoose.connect(config.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
connection = mongoose.connection;

connection.once('open', () => {
    log.print("vehicle.service", "MongoDB database connection established successfully");
})


// Mongoose Model [Vehicle]
let Vehicle = require("../models/vehicle.model");

// =============================================================================================================
// Populate the database with the vehicle.json data, if it is not already there
log.print("vehicle.service", "Initialising Vehicle Database...");
const createVehicle = (vObj) => {
    // reg_no must be unique
    Vehicle.findOne({reg_no: vObj.reg_no}, (err, vehicle) => {
        if (err) {
            log.print("vehicle.service", "Error in creating vehicle");
            log.print(err);
        } else if (vehicle) {
            log.print("vehicle.service", vehicle.reg_no + " " + "already exists!");
        } else {
            const NOW = new Date();
            const fueleff = vObj.fuel_eff.split('L/100km')[0];// L/100km
            const newVehicle = new Vehicle({
                make: vObj.make,
                series: vObj.series,
                model: vObj.model,
                date: NOW,
                reg_no: vObj.reg_no,
                fuel_eff: fueleff,
                gvm: vObj.gvm,
                gcm: vObj.gcm
            });

            newVehicle.save()
            
            log.print("vehicle.service", vObj.reg_no + " " + "successfully created!");
        }
    })
}


let all_vehicles = Object.entries(vehicleJSON);
all_vehicles = all_vehicles.map(kv => ({series: kv[0], models: kv[1]}));
all_vehicles.forEach(series_list => {
    series_list.models
    .forEach(car => createVehicle(car))
});



// =============================================================================================================
vehicleServices.use(validateHeader, validateUser)
/* All Vehicles 
    Display the information of all vehicles in the Db.
*/
// ../vehicle/all
vehicleServices.route("/all").get((_, res) => { 
    log.print("/vehicle/all", "GET");
    
    // Find all vehicles
    Vehicle.find({}, (err, vehicles) => {
        if (err) {
            log.print("/vehicle/all", err);
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
    log.print("/vehicle/:id", "GET");

    // Find specific vehicle
    Vehicle.findById(req.params.id, (err, vehicle) => {
        if (err) {
            log.print("/vehicle/:id", err);
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
    log.print("/vehicle/create", "POST");

    let newVehicle= null;
    // Create new Vehicle following the model
    try{
        newVehicle = new Vehicle({
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
        log.print("/vehicle/create/", e);
        res.status(500).json({
            err: "Cannot create new Vehicle"
        });
    }

    res.status(200).json(newVehicle);
})

// Update Vehicle of :id
vehicleServices.route("/:id").post((req, res) => {
    log.print("/vehicle/:id", "POST");

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
            log.print("/vehicle/:id", err);
            res.status(500).json({
                err: "Error in finding Vehicle with this ID"
            });
            
        } else {
            res.status(200).json(vehicle);
        }
    });
})

module.exports = vehicleServices;