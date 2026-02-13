import { Router } from "express";
import ProductController from "../controllers/ProductController.js";

const productController = new ProductController();
const productRoutes = Router()
  .get("/products", productController.getAllProducts)
  .get("/products/three", productController.getThreeProducts)
  .get("/products/:id", productController.getProductById)
  .get("/products/search/:id", productController.getSearchProduct)
  .post("/products", productController.postProduct)
  .put("/products/:id", productController.putProduct)
  .delete("/products/:id", productController.deleteProduct)
  .get("/products/brands/:id", productController.getProductByBrandId);

export default productRoutes;
