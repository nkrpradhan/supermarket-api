const mongoose = require("mongoose");

const shoppingListSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
  listItems: [
    {
      name: { type: String, required: true },
      price: { type: String, required: true },
      pictureLink: { type: String, required: true },
      supermarket: { type: String, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "Product",
      },
    },
  ],
});

const ShoppingList = mongoose.model("Shopping List", shoppingListSchema);
module.exports = ShoppingList;
