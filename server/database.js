require("dotenv").config();
const mongoose = require("mongoose");

// const mongoURI = process.env.MONGOURI;

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.error("Connection error:", error);
  }
};

module.exports = connectToDB;
