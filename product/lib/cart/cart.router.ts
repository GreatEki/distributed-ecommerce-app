import { Router } from "express";
import * as controller from "./cart.controller";

const CartRouter = Router();

CartRouter.route("/add").post(controller.addItemToCart);
CartRouter.route("/user/:userId").get(controller.getUserCart);

export default CartRouter;
