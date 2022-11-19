const express = require("express");
const User = require("./models/user.model.js");
const users = require("./data/testData/users.js");
const Product = require("./models/products.model.js");
const products = require("./data/testData/products.js");
const asyncHandler = require("express-async-handler");

const importData = express.Router();

importData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.remove({});
    const importUser = await User.insertMany(users);
    res.status(201).send({ importUser });
  })
);

importData.post(
  "/products",
  asyncHandler(async (req, res) => {
    await Product.remove({});
    const importProducts = await Product.insertMany(products);
    res.status(201).send({ importProducts });
  })
);

module.exports = importData;
