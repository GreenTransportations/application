const path = require("path");
const PORT = 3000;
const BASE_URL = "http://localhost";

var config = {
    SERVER_PORT: 3000,
    BASE_PATH: "/test",
    BASE_PORT_URL: `${BASE_URL}:${PORT}`,
    DATABASE_URI: "mongodb+srv://GreenTransportationsDatabaseUser:GreenTransportationsDatabaseUser@green-transportations-d.9bbom.mongodb.net/GreenTransportationsDatabase?retryWrites=true&w=majority",
    SALT_ROUNDS: 16,
}


module.exports = config;