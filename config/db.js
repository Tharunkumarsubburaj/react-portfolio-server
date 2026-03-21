const mongoose = require('mongoose');
require('dotenv').config();
const mongoUrl = process.env.mongodbUrl;

const connectDb = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed', error);
    }
};

module.exports = connectDb;