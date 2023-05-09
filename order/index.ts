import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4004;

const startApplication = async () => {
  app.listen(PORT, () => {
    console.log(`Transaction service running on PORT ${PORT}`);
  });
};

startApplication();
