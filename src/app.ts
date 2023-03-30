import express, { Application, json, Request, Response } from "express";
import { market } from "./database";
import {
  createProducts,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./logic";
import {
  verifyIfNameExistsPost,
  verifyIfNameExistsPatch,
  verifyIfIdExists,
} from "./middlewares";

const app: Application = express();

app.use(json());

app.post("/products", verifyIfNameExistsPost, createProducts);

app.get("/products", getProducts);

app.get("/products/:id", verifyIfIdExists, getProductById);

app.patch(
  "/products/:id",
  verifyIfIdExists,
  verifyIfNameExistsPatch,
  updateProduct
);

app.delete("/products/:id", verifyIfIdExists, deleteProduct);

const PORT: number = 3000;
const runningMsg = `Server is running on http://localhost:${PORT}`;
app.listen(PORT, () => {
  console.log(runningMsg);
});
