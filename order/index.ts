import app from "./app";
import dotenv from "dotenv";
import { rabbitMQClient } from "./events/rabbitMQ";
import {
  UserCreatedListener,
  ProductCreatedListener,
} from "./events/listerners";

dotenv.config();

const PORT = process.env.PORT || 4003;

const startApplication = async () => {
  await rabbitMQClient.connect();

  new UserCreatedListener(rabbitMQClient.channel).subscribe();

  new ProductCreatedListener(rabbitMQClient.channel).subscribe();

  app.listen(PORT, () => {
    console.log(`Order service running on PORT ${PORT}`);
  });
};

startApplication();
