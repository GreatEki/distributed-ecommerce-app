import express from "express";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

export default app;
