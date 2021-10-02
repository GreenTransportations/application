const mongoose = require("mongoose");

// Configs, Utilities and Enums
const config = require("../configs/server.config");
const { log } = require("../utils/log.util");
const { USER_TYPE } = require("../enums/user.enum");

// Connect to Database
mongoose.connect(config.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
connection = mongoose.connection;

connection.once('open', () => {
    log.print("trip.service", "MongoDB database connection established successfully");
})


// Mongoose Model [trip]
let Trip = require("../models/trip.model");
let Vehicle = require("../models/vehicle.model");
let User = require("../models/user.model");


const getRandomValue = (inputArray) => {
    return inputArray[Math.floor(Math.random() * inputArray.length)];
}

const randomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const calculateEmission = (vehicle, distance) => {
    const KMILES = (km) => km / 1.609; // Km to Miles Conversion rate (Division)
    const KPOUNDS = (kg) => kg * 2.205; // Kg to Pounds conversion (Multiplication)
    const truck_ef = 161.8; // grams per short ton-mile. See lookup table of Emissions Factors
    const SHORTTON = 2000; // Pounds

    // Find short-tons for the trip based on GCM (kilograms)
    // total emissions (metric tonnes) = (Distance * Weight * EF)/1,000,000;
    return (( KPOUNDS(vehicle.gcm) / SHORTTON) * KMILES(distance) * truck_ef) / 1000000;
}

const paths = [{
    origin: "Monash Clayton, Clayton VIC, Australia",
    destination:"Footscray VIC, Australia",
    distance: 31,
    duration: 33
}, {
    origin: "Monash Clayton, Clayton VIC, Australia",
    destination: "Greenvale VIC, Australia",
    distance: 49.46,
    duration: 45
}, {
    origin: "Monash Clayton, Clayton VIC, Australia",
    destination: "Woods Point VIC, Australia",
    distance: 174,
    duration: 186
}, {
    origin: "Monash Clayton, Clayton VIC, Australia",
    destination: "Brighton VIC, Australia",
    distance: 14,
    duration: 25
}, 

{
    origin: "Parkville VIC, Australia",
    destination: "Altona VIC, Australia",
    distance: 20.8,
    duration: 22
}, {
    origin: "Parkville VIC, Australia",
    destination: "Geelong VIC, Australia",
    distance: 75.86,
    duration: 62
}, 

{
    origin: "Monash University Peninsula Campus, Moorooduc Highway, Frankston VIC, Australia",
    destination: "Cape Schanck VIC, Australia",
    distance: 49.3,
    duration: 37
}, {
    origin: "Monash University Peninsula Campus, Moorooduc Highway, Frankston VIC, Australia",
    destination: "Summerlands VIC, Australia",
    distance: 106.03,
    duration: 83
}]


exports.generateTrip = async (amount) => {
    const vehicles = await Vehicle.find({});
    const drivers = await User.find({ type: USER_TYPE.DRIVER });

    for (let i = 0; i < amount; i++) {
        let randomVehicle =  getRandomValue(vehicles);
        let randomDriver =  getRandomValue(drivers);
        let randomPath = getRandomValue(paths);

        // Calculate Emission
        let distance = randomPath.distance * (1 + (Math.random() / 10));
        let emission = calculateEmission(randomVehicle, distance) 

        // Generate random time
        let duration = randomPath.duration * (1 + (Math.random() / 10));
        let startTime = randomDate(new Date(2021, 6, 1), new Date());
        let endTime = new Date(
            startTime.getFullYear(), 
            startTime.getMonth(), 
            startTime.getDate(), 
            startTime.getHours(),
            startTime.getMinutes() + duration,
        );
        let totalTime = endTime.getTime() - startTime.getTime()

        let newTrip = new Trip({
            vehicles: [randomVehicle.id],
            user: randomDriver.id,
            emission: emission,
            km: distance,
            origin: randomPath.origin,
            destination: randomPath.destination,
            stops: [],
            date: startTime,
            startTime: startTime,
            endTime: endTime,
            totalTime: totalTime,
            isLive: false
        })

        newTrip.save()
    }
}