const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME,
    });
    console.log("Mongo Connected");
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDatabase;
