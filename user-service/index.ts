import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startApplication = async () => {
  app.listen(PORT, () => console.log(`User service started`));
};

startApplication();
