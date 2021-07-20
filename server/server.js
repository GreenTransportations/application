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


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routers path
app.use(config.BASE_PATH + "/test", testServices);
app.use(config.BASE_PATH + "/auth", authServices);


app.listen(PORT, () => {
    console.log("Green Transportations Server", "Server is running on port: " + PORT)
});

