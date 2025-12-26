import { Router } from "express";
import productController from "../controllers/productController.js";

const router = Router()
  .get("/products", productController.getAllProducts)
  .get("/products/:id", productController.getProductById)
  .post("/products", productController.postProduct);

export default router;