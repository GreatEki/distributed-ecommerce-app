import { Router } from "express";
import ProductRouter from "../lib/product/product.router";
import CartRouter from "../lib/cart/cart.router";

const router = Router();

router.use("/products", ProductRouter);
router.use("/cart", CartRouter);

export { router as AppRouter };
