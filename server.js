const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/mongoDB");
const importData = require("./dataImport");
const productRouter = require("./routes/Product.Routes");
const { errorHandler, notFound } = require("./middleware/Error");
const userRouter = require("./routes/User.Routes");
const shoppingListRouter = require("./routes/ShoppingList.Routes");
const cors = require("cors");

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());
app.use(cors());

// //API
app.use("/api/import", importData);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/shopping-list/", shoppingListRouter);

// //ERROR HANDLERS
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is live...");
});

module.exports = app;
