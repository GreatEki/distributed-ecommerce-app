import { Router } from "express";
import * as controller from "./cart.controller";

const CartRouter = Router();

CartRouter.route("/add").post(controller.addItemToCart);
CartRouter.route("/user").get(controller.getUserCart);
CartRouter.route("/remove/product/:productId").delete(
  controller.removeFromCart
);

export default CartRouter;
