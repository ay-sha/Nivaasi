const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../../models/listing.js')
const MONGO_URL = 'mongodb+srv://ayshaamin680:AYsHa680@cluster0.nxmrvob.mongodb.net/nivaasi';

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
    await Listing.insertMany(initData.data); 
    console.log('Data Initialized');
}
initDB(); 