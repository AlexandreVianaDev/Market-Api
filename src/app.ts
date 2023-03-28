import express, { Application, json, Request, Response } from "express";
import { market } from "./database";
import {
  createProducts,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./logics";

const app: Application = express();

app.use(json());

app.post("/products", createProducts);

app.get("/products", getProducts);

app.get("/products/:id", getProductById);

app.patch("/products/:id", updateProduct);

app.delete("/products/:id", deleteProduct);

const PORT: number = 3000;
const runningMsg = `Server is running on http://localhost:${PORT}`;
app.listen(PORT, () => {
  console.log(runningMsg);
});
