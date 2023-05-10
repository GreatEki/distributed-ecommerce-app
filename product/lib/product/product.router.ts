import { Router } from "express";
import * as controller from "./product.controller";
import { adminGuard } from "../../../shared/middleware/role-check";

const ProductRouter = Router();

ProductRouter.route("/")
  .post(adminGuard, controller.createProduct)
  .get(controller.getProducts);

ProductRouter.route("/:productId").put(controller.updateProduct);

export default ProductRouter;
