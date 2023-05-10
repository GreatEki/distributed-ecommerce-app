import express, { Request, Response, NextFunction } from "express";
import { AppRouter } from "./router";
import {
  NotFoundError,
  errorHandler,
} from "@greateki-ticket-ms-demo/ecommshared";
import { currentUser } from "@greateki-ticket-ms-demo/ecommshared";

const app = express();

app.set("trust proxy", true);
app.use(express.json());

app.use(currentUser);
app.use("/api/user", AppRouter);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Resource not found"));
});

app.use(errorHandler);

export default app;
