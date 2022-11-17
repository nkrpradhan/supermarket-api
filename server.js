import express from "express";
import dotenv from "dotenv";
import products from "./data/testData/products.js";
import connectDatabase from "./config/mongoDB.js";
import ImportData from "./dataImport.js";
import productRoute from "./routes/Product.Routes.js";
import { errorHandler, notFound } from "./middleware/Error.js";

dotenv.config();
connectDatabase();
const app = express();

//API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);

//ERROR HANDLERS
app.use(notFound);
app.use(errorHandler);

// //get all products
// app.get("/api/products", (req, res) => {
//   res.status(200).json({ products });
// });

// //get single item of bread
// app.get("/api/products/:name", (req, res) => {
//   const product = bread.find((b) => b.name === req.params.name);
//   res.status(200).json({ bread });
// });

app.get("/", (req, res) => {
  res.send("API is live...");
});

const PORT = process.env.PORT || 9090;

app.listen(PORT, console.log(`server is running on port ${PORT}...`));
