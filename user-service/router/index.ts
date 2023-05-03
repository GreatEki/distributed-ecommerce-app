import { Router } from "express";
import UserRouter from "../lib/user/user.router";

const router = Router();

router.use("/auth", UserRouter);

export { router as AppRouter };
