import mongoose from "mongoose";
import dotenv from "dotenv";
const config = require('../../config');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoDb.url as string);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
