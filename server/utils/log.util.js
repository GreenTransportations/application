const config = require("../configs/server.config");

exports.log = {
    print: (flag, description) => {
        console.log(`[${new Date().toLocaleString()}] [${flag}]`, description)
    }
}