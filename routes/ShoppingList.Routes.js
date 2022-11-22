const express = require("express");
const asyncHandler = require("express-async-handler");
const ShoppingList = require("../models/shoppingList.model.js");
const User = require("../models/user.model.js");

const shoppingListRouter = express.Router();

//CREATE SHOPPING LIST
shoppingListRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { username, ...listItems } = req.body;
    const user = await User.find({ username });

    if (user) {
      const list = new ShoppingList({
        username,
        ...listItems,
      });
      const createList = await list.save();
      res.status(201).json(createList);
    } else {
      res.status(404);
      throw new Error("User does not exist");
    }
  })
);

//GET SHOPPING LIST BY ID
shoppingListRouter.get(
  "/:username",
  asyncHandler(async (req, res) => {
    const username = req.params.username;
    const list = await ShoppingList.find({ username });
    if (list) {
      res.status(200).json(list);
    } else {
      res.status(400);
      throw new Error("No shopping list found");
    }
  })
);

module.exports = shoppingListRouter;
