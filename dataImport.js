import express from "express";
import User from "./models/User.Model.js";
import users from "./data/testData/users.js";
import Product from "./models/Products.Model.js";
import products from "./data/testData/products.js";
import asyncHandler from "express-async-handler";

const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.remove({});
    const ImportUser = await User.insertMany(users);
    res.status(201).send({ ImportUser });
  })
);

ImportData.post(
  "/products",
  asyncHandler(async (req, res) => {
    await Product.remove({});
    const ImportProducts = await Product.insertMany(products);
    res.status(201).send({ ImportProducts });
  })
);

export default ImportData;
