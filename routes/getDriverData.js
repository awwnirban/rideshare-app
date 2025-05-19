// // car, seats, lat, long, city, state, country, fullname, status: active, not active
// Required imports
const express = require('express');
const axios = require('axios');
const pinataSDK = require('@pinata/sdk'); // Pinata SDK

// Initialize Pinata with your API keys
const pinata = new pinataSDK('e9efd593d412d5582f60', '921775a085c51f2752b811a91c92702d09fa1fc92d4b2533e1ab20f0b2cb2709');

const router = express.Router();

// Function to retrieve JSON data from IPFS via Pinata gateway
const get = async (hash) => {
    const URL = `https://gateway.pinata.cloud/ipfs/${hash}`;

    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error("Error retrieving data from IPFS:", error);
        throw error;
    }
};

// Function to retrieve a specific driver's data based on address
const getDriverData = async (address, hash) => {
    try {
        const MDB = await get(hash);
        return MDB[address]; // Return the data for the specific address
    } catch (error) {
        console.error("Error retrieving driver data:", error);
        return null;
    }
};

// Endpoint to get driver data
router.post('/', async function (req, res) {
    const ADDRESS = req.body.address;
    const HASH = req.body.hash;

    try {
        const result = await getDriverData(ADDRESS, HASH);
        if (result) {
            res.send(result);
        } else {
            res.status(404).send("Driver not found");
        }
    } catch (error) {
        res.status(500).send("Error retrieving driver data");
    }
});

module.exports = router;

// const express = require('express');
// const IPFS = require('ipfs-api');
// const axios = require('axios');

// const ipfs = new IPFS ({
//     host: 'ipfs.infura.io',
//     port: 5001,
//     protocol: 'https'
// })

// const router = express.Router();

// const get = async hash => {
//     const URL = "https://gateway.ipfs.io/ipfs/" + hash;

//     try {
//         const response = await axios.get(URL);
//         return response.data;
//     } catch (error) {
//         console.log(error)
//     }
// }

// const getDriverData = async (address, hash) => {
//     const MDB = await get(hash);
//     return MDB[address];
// }

// router.post('/', async function (req, res, next) {
//     const ADDRESS = req.body.address;
//     const HASH = req.body.hash;
    
//     await getDriverData(ADDRESS, HASH).then(result => {
//         console.log(result);
//         // const JSONOBject = JSON.stringify(result);
//         res.send(result);
//     })

// })

// module.exports = router;