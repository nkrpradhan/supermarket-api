import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/mongoDB.js";
import ImportData from "./dataImport.js";
import productRoute from "./routes/Product.Routes.js";
import { errorHandler, notFound } from "./middleware/Error.js";
import userRoute from "./routes/User.Routes.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

//API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

//ERROR HANDLERS
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is live...");
});

const PORT = process.env.PORT || 9090;

app.listen(PORT, console.log(`server is running on port ${PORT}...`));
