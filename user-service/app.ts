import express from "express";
import { AppRouter } from "./router";

const app = express();

app.use(express.json());

app.use("/api/user", AppRouter);

export default app;
