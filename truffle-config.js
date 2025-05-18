const path = require("path");

module.exports = {
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,            // Ensure this matches your Ganache settings
            network_id: "*",       // Accept any network ID
        },
        ganache: {
            host: "127.0.0.1",     // Ensure this is correct
            port: 7545,            // Default Ganache port
            network_id: "5777",    // Ensure this matches Ganache's network ID
        },
    },
    compilers: {
        solc: {
            version: "0.5.16",     // Ensure you're using a compatible version
        },
    },
};
