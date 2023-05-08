import { Router } from "express";
import * as controller from "./product.controller";

const router = Router();

router.route("/").post(controller.createProduct).get(controller.getProducts);

export default router;
