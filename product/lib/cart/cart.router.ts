import { Router } from "express";
import * as controller from "./cart.controller";

const CartRouter = Router();

CartRouter.route("/add").post(controller.addItemToCart);

export default CartRouter;
