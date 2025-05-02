const mongoose = require('mongoose');
const MONGO_URL = 'mongodb+srv://ayshaamin680:AYsHa680@cluster0.nxmrvob.mongodb.net/nivaasi';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
