import { Router } from "express";
import CartController from "../controllers/CartController.js";

const cartController = new CartController();
const cartRoutes = Router();

cartRoutes
  .get("/carts/sumcart/:id", cartController.sumCart)
  .get("/carts/getcart/:id", cartController.getCart)
  .get("/carts/getcartdtl/:id", cartController.getCartDtl)
  .post("/carts/chkcart", cartController.chkCart)
  .post("/carts/addcart", cartController.postCart)
  .post("/carts/addcartdtl", cartController.postCartDtl)
  .post("/carts/getcartbycus", cartController.getCartByCus)
export default cartRoutes;
