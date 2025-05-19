// // car, seats, lat, long, city, state, country, fullname, status: active, not active
// Required imports
const express = require('express');
const axios = require('axios');
const pinataSDK = require('@pinata/sdk'); // Import the Pinata SDK

// Initialize Pinata with your API key and secret
const pinata = new pinataSDK('e9efd593d412d5582f60', '921775a085c51f2752b811a91c92702d09fa1fc92d4b2533e1ab20f0b2cb2709');

const router = express.Router();

// Function to get JSON data from IPFS using Pinata gateway
const get = async (hash) => {
    const URL = `https://gateway.pinata.cloud/ipfs/${hash}`;

    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.log("Error retrieving data from IPFS:", error);
    }
};

// Function to validate user type based on address and hash
const validateUser = async (address, hash) => {
    const MDB = await get(hash);  // Retrieve existing metadata
    if (MDB[address] === undefined) {
        return 'Passenger';
    } else {
        if (MDB[address].status === 'Active') {
            return 'Driver';
        } else if (MDB[address].status === 'Not Active') {
            return 'Passenger';
        }
    }
};

// Route to validate user type
router.post('/', async function (req, res, next) {
    const ADDRESS = req.body.address;
    const HASH = req.body.hash;

    // Validate user and send response
    validateUser(ADDRESS, HASH).then(result => {
        res.send(result);
    }).catch(error => {
        console.error("Error validating user:", error);
        res.status(500).send("Error validating user");
    });
});

module.exports = router;

// const express = require('express');
// const IPFS = require('ipfs-api');
// const axios = require('axios');

// const ipfs = new IPFS ({
//     hostt: 'ipfs.infura.io',
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

// const validateUser = async (address, hash) => {
//     const MDB = await get(hash);
//     // const MDB = JSON.parse(MDBString);
//     if (MDB[address] === undefined) {
//         return 'Passenger';
//     } else {
//         if (MDB[address].status === 'Active') {
//             return 'Driver';
//         } else if (MDB[address].status === 'Not Active') {
//             return 'Passenger';
//         }
//     }
// }

// router.post('/', async function (req, res, next) {
//     const ADDRESS = req.body.address;
//     const HASH = req.body.hash;
//     // console.log(validateUser(ADDRESS, HASH));
//     validateUser(ADDRESS, HASH).then(result => {
//         res.send(result);
//     })
//     // res.send(validateUser(ADDRESS, HASH));

// })

// module.exports = router;