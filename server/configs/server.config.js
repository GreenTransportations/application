const path = require("path");

var config = {
    SERVER_PORT: 3000,
    BASE_PATH: "/test",
    DATABASE_URI: "mongodb+srv://GreenTransportationsDatabaseUser:GreenTransportationsDatabaseUser@green-transportations-d.9bbom.mongodb.net/GreenTransportationsDatabase?retryWrites=true&w=majority",
    SALT_ROUNDS: 16,
}


module.exports = config;