import express, { Request, Response, NextFunction } from "express";
import {
  currentUser,
  requireAuth,
  errorHandler,
  NotFoundError,
} from "@greateki-ticket-ms-demo/ecommshared";
import router from "./lib/product/product.router";

const app = express();

app.set("trust proxy", true);
app.use(express.json());

app.use(currentUser);
app.use(requireAuth);
app.use("/api/product", router);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Resource not found"));
});

app.use(errorHandler);

export default app;
