const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

// Constant Config Variable
const config = require("./configs/server.config");
const { log } = require("./utils/log.util");

const app = express();
const PORT = process.env.PORT || config.SERVER_PORT;

// Services
const testServices = require("./services/test.service");
const authServices = require("./services/auth.service");
const userServices = require("./services/user.service");
const vehicleServices = require("./services/vehicle.service");
const tripServices = require("./services/trip.service");


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers path
app.use(config.BASE_PATH + "/test", testServices);
app.use(config.BASE_PATH + "/auth", authServices);
app.use(config.BASE_PATH + "/user", userServices);
app.use(config.BASE_PATH + "/vehicle", vehicleServices);
app.use(config.BASE_PATH + "/trips", tripServices);



app.listen(PORT, () => {
    log.print("Green Transportations Server", "Server is running on port: " + PORT)
});

