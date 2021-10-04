const mongoose = require("mongoose");

// Configs, Utilities and Enums
const config = require("../configs/server.config");
const { log } = require("../utils/log.util");
const { USER_TYPE } = require("../enums/user.enum");

// Connect to Database
mongoose.connect(config.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
connection = mongoose.connection;

connection.once('open', () => {
    log.print("user.script", "MongoDB database connection established successfully");
})


// Mongoose Model [trip]
let Trip = require("../models/trip.model");
let User = require("../models/user.model");

exports.recalculateDriverTotal = async () => {
    const trips = await Trip.find({});
    const drivers = await User.find({ type: USER_TYPE.DRIVER });
    drivers.forEach(driver => {
        let filteredTrip = trips.filter(trip => driver._id.equals(trip.user));
        let total = filteredTrip.reduce((acc, trip ) => {
            acc.mileage += trip.km;
            acc.emission += trip.emission;
            acc.trip += 1;
            return acc;
        }, { mileage: 0, emission: 0, trip: 0 })
        
        driver.total = total;
        driver.save();
    });

}