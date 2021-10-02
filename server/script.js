const config = require("./configs/server.config");
const { log } = require("./utils/log.util");


const { generateTrip } = require("./scripts/trip.script");


// Main Script
const mainScript = async () => {
    generateTrip(100);
}


if (require.main === module) {
    log.print("Green Transportations Server", "Start the script execution")
    try {
        mainScript()

        log.print("Green Transportations Server", "Script executed successfully!");
    } catch (err) {
        console.log(err);
        log.print("Green Transportations Server", "Error executing script");
    }
}