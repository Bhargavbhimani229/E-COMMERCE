const mongoose = require("mongoose");
require("dotenv").config();

const db = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(" MongoDB connected successfully!");
  } catch (error) {
    console.error(" MongoDB connection error:", error.message);
    process.exit(1); 
  }
};

module.exports = db;
