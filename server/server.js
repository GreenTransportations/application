const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

// Constant Config Variable
const config = require("./configs/server.config");

const app = express();
const PORT = process.env.PORT || config.SERVER_PORT;

// Services
const testServices = require("./services/test.service");
const authServices = require("./services/auth.service");
const userServices = require("./services/user.service");


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers path
app.use(config.BASE_PATH + "/test", testServices);
app.use(config.BASE_PATH + "/auth", authServices);
app.use(config.BASE_PATH + "/user", userServices);


app.listen(PORT, () => {
    console.log("Green Transportations Server", "Server is running on port: " + PORT)
});

