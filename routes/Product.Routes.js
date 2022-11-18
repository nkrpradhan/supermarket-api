import express from "express";
import asyncHandler from "express-async-handler";
import Product from "../models/Products.Model.js";

const productRouter = express.Router();

//GET ALL PRODUCTS
productRouter.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
  })
);

//GET A PRODUCT
productRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export default productRouter;
