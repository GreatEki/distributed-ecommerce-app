import app from "./app";
import dotenv from "dotenv";
import { rabbitMqClient } from "./events/rabbitMQ";

dotenv.config();

const PORT = process.env.PORT || 4000;

const startApplication = async () => {
  await rabbitMqClient.connect();

  app.listen(PORT, () => console.log(`User service started`));
};

startApplication();
