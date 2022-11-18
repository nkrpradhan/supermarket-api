import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDB.js";
import ImportData from "./DataImport.js";
import productRouter from "./routes/Product.Routes.js";
import { errorHandler, notFound } from "./middleware/Error.js";
import userRouter from "./routes/User.Routes.js";
import shoppingListRouter from "./routes/ShoppingList.Routes.js";
import cors from "cors";

dotenv.config();
connectDatabase();
const app = express();
app.use(cors());
app.use(express.json());

//API
app.use("/api/import", ImportData);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/shopping-list/", shoppingListRouter);

//ERROR HANDLERS
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is live...");
});

const PORT = process.env.PORT || 9090;

app.listen(PORT, console.log(`server is running on port ${PORT}...`));
