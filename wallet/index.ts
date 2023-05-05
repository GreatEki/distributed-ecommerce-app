import app from "./app";
import dotenv from "dotenv";
import { rabbitMQClient } from "./events/rabbitMQ";
import { UserCreatedListener } from "./events/listener/UserCreatedListener";

dotenv.config();

const PORT = process.env.PORT || 4001;

const startApplication = async () => {
  await rabbitMQClient.connect();

  new UserCreatedListener(rabbitMQClient.channel).subscribe();
  app.listen(PORT, () => console.log(`Wallet service running on PORT ${PORT}`));
};

startApplication();
