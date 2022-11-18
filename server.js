const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/MongoDB.js");

const cors = require("cors");

dotenv.config();
connectDatabase();
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is live...");
});

const PORT = process.env.PORT || 9090;

app.listen(PORT, console.log(`server is running on port ${PORT}...`));
