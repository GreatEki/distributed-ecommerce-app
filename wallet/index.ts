import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4001;

const startApplication = async () => {
  app.listen(PORT, () => console.log(`Wallet service running on PORT ${PORT}`));
};

startApplication();
