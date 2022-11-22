const express = require("express");
const asyncHandler = require("express-async-handler");
const ShoppingList = require("../models/shoppingList.model.js");

const shoppingListRouter = express.Router();

//CREATE SHOPPING LIST
shoppingListRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const listItems = req.body;
    console.log(listItems);

    if (listItems && listItems.length === 0) {
      res.status(400);
      throw new Error("There are no items in your shopping list");
    } else {
      const list = new ShoppingList({
        listItems,
        user: req.body._id,
      });

      const createList = await list.save();
      res.status(201).json(createList);
    }
  })
);

//GET SHOPPING LIST BY ID
shoppingListRouter.get(
  "/:username",
  asyncHandler(async (req, res) => {
    const username = req.params.username;
    const list = await ShoppingList.find({ username }).populate("user");
    if (list) {
      res.status(200).json(list);
    } else {
      res.status(400);
      throw new Error("No shopping list found");
    }
  })
);

module.exports = shoppingListRouter;
