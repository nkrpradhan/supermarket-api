// import express from "express";
// import asyncHandler from "express-async-handler";
// import ShoppingList from "../models/ShoppingList.model.js";

// const shoppingListRouter = express.Router();

// //CREATE SHOPPING LIST
// shoppingListRouter.post(
//   "/",
//   asyncHandler(async (req, res) => {
//     const listItems = req.body;

//     if (listItems && listItems.length === 0) {
//       res.status(400);
//       throw new Error("There are no items in your shopping list");
//     } else {
//       const list = new ShoppingList({
//         user: req.body._id,
//         listItems,
//       });

//       const createList = await list.save();
//       res.status(201).json(createList);
//     }
//   })
// );

// //GET SHOPPING LIST BY ID
// shoppingListRouter.get(
//   "/:id",
//   asyncHandler(async (req, res) => {
//     const list = await ShoppingList.findById(req.params.id).populate("user");
//     if (list) {
//       res.status(200).json(list);
//     } else {
//       res.status(400);
//       throw new Error("No shopping list found");
//     }
//   })
// );

// export default shoppingListRouter;
