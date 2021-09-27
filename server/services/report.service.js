// Services for the Trip Model
const express = require("express");
const mongoose = require("mongoose");
const dayjs = require('dayjs');
const weekOfYear = require('dayjs/plugin/weekOfYear');

dayjs.extend(weekOfYear);
const reportServices = express.Router();
// Configs, Utilities and Enums
const config = require("../configs/server.config");
const { log } = require("../utils/log.util");
const { validateHeader, validateUser } = require("../utils/common.util");
const { USER_TYPE } = require("../enums/user.enum");

// Connect to Database
mongoose.connect(config.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true });
connection = mongoose.connection;

connection.once('open', () => {
    log.print("report.service", "MongoDB database connection established successfully");
})


// Mongoose Model [trip]
let Trip = require("../models/trip.model");

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
reportServices.use(validateHeader, validateUser)
//====================================================================================
/* All reports 
    Display the information of all trips in the Db.
*/
reportServices.route("/:year/weekly").get((req, res) => {
    log.print("/report/:year/weekly", "GET");

    let query = { isLive: false, date: {} };
    let year = Number.parseInt(req.params.year)
    if (req.query && req.query.month) {
        let month = req.query.month;
        
        query["date"]["$gte"] = new Date(year, month, 0);
        query["date"]["$lt"] = new Date(year, month + 1, 0);

    } else {
        query["date"]["$gte"] = new Date(year, 0, 0);
        query["date"]["$lt"] = new Date(year + 1, 0, 0);
    }

    Trip.where(query) 
        .populate("user")
        .sort({ date: 1 })
        .exec((err, trips) => {
            if (err) {
                res.status(500).json({
                    err: "Error in finding trips"
                });
                return;
            } 
            
            let weeks = [];
            const mapWeekToIndex = {};

            if (trips.length > 0) {
                let firstTrip = trips[0];
                mapWeekToIndex[dayjs(firstTrip.date).week()] = 0;

                // Reduce the trips to weekly summary
                weeks = trips.reduce((acc, trip) => {
                    let week = dayjs(trip.date).week();
                    let index = mapWeekToIndex[week];
                    if (index === undefined) {
                        mapWeekToIndex[week] = acc.length;

                        return acc.concat([{ 
                            week: week, 
                            km: trip.km, 
                            totalTime: trip.totalTime, 
                            emission: trip.emission,
                            count: 1
                        }]);

                    } else {
                        acc[index].km += trip.km
                        acc[index].totalTime += trip.totalTime
                        acc[index].emission += trip.emission
                        acc[index].count += 1
                        return acc;
                    }

                }, [{ 
                    week: dayjs(firstTrip.date).week(), 
                    km: 0, 
                    totalTime: 0, 
                    emission: 0,
                    count: 0
                }])
            }

            res.status(200).json(weeks);
        });
})


reportServices.route("/:year/monthly").get((req, res) => {
    log.print("/report/:year/monthly", "GET");

    let year = Number.parseInt(req.params.year)
    let query = { 
        isLive: false, 
        date: {
            $gte: new Date(year, 0, 0),
            $lt: new Date(year + 1, 0, 0)
        }  
    };

    Trip.where(query) 
        .populate("user")
        .sort({ date: 1 })
        .exec((err, trips) => {
            if (err) {
                res.status(500).json({
                    err: "Error in finding trips"
                });
                return;
            } 

            let months = [];
            const mapMonthToIndex = {};

            if (trips.length > 0) {
                let firstTrip = trips[0];
                mapMonthToIndex[firstTrip.date.getMonth() + 1] = 0;

                // Reduce the trips to monhtly summary
                months = trips.reduce((acc, trip) => {
                    let month = trip.date.getMonth() + 1;
                    let index = mapMonthToIndex[month];
                    if (index === undefined) {
                        mapMonthToIndex[month] = acc.length;

                        return acc.concat([{ 
                            month: month, 
                            monthName: MONTH_NAMES[month - 1], 
                            km: trip.km, 
                            totalTime: trip.totalTime, 
                            emission: trip.emission,
                            count: 1
                        }]);

                    } else {
                        acc[index].km += trip.km
                        acc[index].totalTime += trip.totalTime
                        acc[index].emission += trip.emission
                        acc[index].count += 1
                        return acc;
                    }

                }, [{ 
                    month: firstTrip.date.getMonth() + 1, 
                    monthName: MONTH_NAMES[firstTrip.date.getMonth()], 
                    km: 0, 
                    totalTime: 0, 
                    emission: 0,
                    count: 0
                }])
            }

            res.status(200).json(months);
        });
})
 

module.exports = reportServices;