import express, { NextFunction, Response, Request } from "express";
import {
  currentUser,
  requireAuth,
  errorHandler,
  NotFoundError,
} from "@greateki-ticket-ms-demo/ecommshared";
import router from "./lib/wallet/wallet.router";

const app = express();

app.set("trust-proxy", true);

app.use(express.json());

app.use(currentUser);
app.use(requireAuth);

app.use("/api/wallet", router);

app.all("*", async (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Resource not found"));
});

app.use(errorHandler);

export default app;
