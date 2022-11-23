const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: String, required: true },
  comment: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "User" },
});

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    siteLink: { type: String, required: true },
    pictureLink: { type: String, required: true },
    category: { type: String, required: true },
    supermarket: { type: String, required: true },
    reviews: [reviewSchema],
    priceHistory: { type: Array, required: true },
  },
  {
    timestamps: false,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
