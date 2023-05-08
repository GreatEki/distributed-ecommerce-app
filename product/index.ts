import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 4002;

const startApplication = async () => {
  app.listen(PORT, () =>
    console.log(`Product service running on PORT ${PORT}`)
  );
};

startApplication();
