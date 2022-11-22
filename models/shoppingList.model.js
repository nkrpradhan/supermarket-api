const mongoose = require("mongoose");

const shoppingListSchema = mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  pictureLink: { type: String, required: true },
  supermarket: { type: String, required: true },
});

const ShoppingList = mongoose.model("Shopping List", shoppingListSchema);
module.exports = ShoppingList;
