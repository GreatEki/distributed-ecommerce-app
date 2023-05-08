import app from "./app";
import dotenv from "dotenv";
import { rabbitMQClient } from "./events/rabbitMQ";

dotenv.config();

const PORT = process.env.PORT || 4002;

const startApplication = async () => {
  await rabbitMQClient.connect();

  app.listen(PORT, () =>
    console.log(`Product service running on PORT ${PORT}`)
  );
};

startApplication();
