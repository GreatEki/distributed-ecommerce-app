import { Router } from "express";
import * as controller from "./product.controller";

const ProductRouter = Router();

ProductRouter.route("/")
  .post(controller.createProduct)
  .get(controller.getProducts);

ProductRouter.route("/:productId").put(controller.updateProduct);

export default ProductRouter;
