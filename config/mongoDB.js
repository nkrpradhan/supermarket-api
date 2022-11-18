const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connection = mongoose.connect(
      "mongodb+srv://Admin123:G7bEt9X2913MiQcK@test-database.3hi5ubp.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Mongo Connected");
  } catch (err) {
    console.log(`Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
