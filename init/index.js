const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js')
require('dotenv').config({path: '../.env'});
const MONGO_URL = process.env.MONGO_URL;

main()
    .then((res) => {
        console.log('MongoDB Connected')
    }).catch((err) => {
        console.log(err);
    })
async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner: "6817c2b0152e6168200480a4"}));
    await Listing.insertMany(initData.data); 
    console.log('Data Initialized');
}
initDB(); 