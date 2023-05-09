import app from "./app";
import dotenv from "dotenv";
import { rabbitMQClient } from "./events/rabbitMQ";
import { UserCreatedListener } from "./events/listerners";

dotenv.config();

const PORT = process.env.PORT || 4004;

const startApplication = async () => {
  await rabbitMQClient.connect();

  new UserCreatedListener(rabbitMQClient.channel).subscribe();

  app.listen(PORT, () => {
    console.log(`Transaction service running on PORT ${PORT}`);
  });
};

startApplication();
