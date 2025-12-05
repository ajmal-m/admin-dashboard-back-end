const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();


const MONGO_URL = process.env.MONGO_URL;

module.exports.connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB connected successfully. ")
    } catch (error) {
        console.log(error);
    }
}