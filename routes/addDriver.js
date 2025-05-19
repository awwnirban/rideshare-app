// // car, seats, lat, long, city, state, country, fullname, status: active, not active
const express = require('express');
const pinataSDK = require('@pinata/sdk');
const axios = require('axios');
const ethers = require('ethers');
const { abi, address } = require('../smartContractInfo');

const URL = 'HTTP://127.0.0.1:7545';
const customHttpProvider = new ethers.providers.JsonRpcProvider(URL);
let Contract = new ethers.Contract(address, abi, customHttpProvider.getSigner(0));

const pinata = new pinataSDK('e9efd593d412d5582f60', '921775a085c51f2752b811a91c92702d09fa1fc92d4b2533e1ab20f0b2cb2709');

const get = async (cid) => {
    const URL = `https://gateway.pinata.cloud/ipfs/${cid}`;
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.log("Error retrieving data from IPFS:", error);
        return null;
    }
};

const addDriverToMDB = async (address, longitude, latitude, cid, carName, seats, city, state, country, fullname) => {
    let data;

    if (cid === "QmbJWAESqCsf4RFCqEY7jecCashj8usXiyDNfKtZCwwzGb") {
        data = {};
        console.log('Creating new metadata.');
    } else {
        data = await get(cid);
        if (!data) {
            console.log('No data found at CID, initializing empty object.');
            data = {};
        }
    }

    data[address] = {
        longitude,
        latitude,
        carName,
        seats,
        city,
        state,
        country,
        fullname,
        status: "Active"
    };

    try {
        const result = await pinata.pinJSONToIPFS(data, {
            pinataMetadata: {
                name: `Driver_Metadata_${address}`
            }
        });
        return result.IpfsHash;
    } catch (err) {
        console.error("Error uploading to IPFS:", err);
    }
};

const router = express.Router();

router.post('/', async function (req, res) {
    const { address, longitude, latitude, carName, seats, city, state, country, fullname } = req.body;
    const currentCid = await Contract.get();
    console.log(currentCid)

    try {
        const newCid = await addDriverToMDB(address, longitude, latitude, currentCid, carName, seats, city, state, country, fullname);
        await Contract.set(newCid);
        res.send('Driver metadata updated successfully!');
    } catch (error) {
        console.error("Error updating driver metadata:", error);
        res.status(500).send('An error occurred while updating metadata.');
    }
});

module.exports = router;

// const express = require('express');
// const IPFS = require('ipfs-api');
// const axios = require('axios');
// const ethers = require('ethers');
// const { abi, address } = require('../smartContractInfo');

// const URL = 'HTTP://127.0.0.1:7545';
// const customHttpProvider = new ethers.providers.JsonRpcProvider(URL);
// let Contract = new ethers.Contract(address, abi, customHttpProvider.getSigner(0));

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

// const addDriverToMDB = async (address, longitude, latitude, hash, carName, seats, city, state, country, fullname) => {
//     if (hash === "QmbJWAESqCsf4RFCqEY7jecCashj8usXiyDNfKtZCwwzGb") { // empty
//         let obj = {};
//         console.log('empty');

//         obj[address] = {
//             longitude,
//             latitude,
//             carName,
//             seats,
//             city,
//             state,
//             country,
//             fullname,
//             status: "Active"
//         }

//         let buffer = Buffer.from(JSON.stringify(obj));

//         return new Promise((resolve, reject) => {
//             ipfs.files.add(buffer, async (err, res) => {
//                 if (err) {
//                     console.error(err);
//                 } else {
//                     const hash = await res[0].hash;
//                     resolve(hash);
//                 }
//             })
//         })

//     } else {
//         const MDB = await get(hash);

//         MDB[address] = {
//             longitude,
//             latitude,
//             carName,
//             seats,
//             city,
//             state,
//             country,
//             fullname,
//             status: "Active"
//         }

//         let buffer = Buffer.from(JSON.stringify(MDB));

//         return new Promise((resolve, reject) => {
//             ipfs.files.add(buffer, async (err, res) => {
//                 if (err) {
//                     console.error(err);
//                 } else {
//                     const hash = await res[0].hash;
//                     resolve(hash);
//                 }
//             })
//         })

//     }
// }

// router.post('/', async function (req, res, next) {
//     const ADDRESS = req.body.address;
//     const LONGITUDE = req.body.longitude;
//     const LATITUDE = req.body.latitude;
//     // const HASH = req.body.hash;
//     const CAR_NAME = req.body.carName;
//     const SEATS = req.body.seats;
//     const CITY = req.body.city;
//     const STATE = req.body.state;
//     const COUNTRY = req.body.country;
//     const FULL_NAME = req.body.fullname;
//     const HASH = await Contract.get();

//     addDriverToMDB(ADDRESS, LONGITUDE, LATITUDE, HASH, CAR_NAME, SEATS, CITY, STATE, COUNTRY, FULL_NAME).then(result => {
//         Contract.set(result).then(() => {
//             res.send('We chilling!');
//         })
//     })

// })

// module.exports = router;