import { Router } from "express";
import ProductController from "../controllers/productController.js";

const productController = new ProductController();
const router = Router()
  .get("/products", productController.getAllProducts)
  .get("/products/:id", productController.getProductById)
  .post("/products", productController.postProduct)
  .put("/products/:id", productController.putProduct)
  .delete("/products/:id", productController.deleteProduct)
  .get("/products/brands/:id", productController.getProductByBrandId);

export default router;
