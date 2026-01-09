import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import { configDotenv } from "dotenv";
import database from "./services/database.js";
import router from "./routes/productRoute.js";
import dotenvConfig from "../config/dotenvConfig.js";

configDotenv(dotenvConfig);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app
  .use(express.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(logger("dev"));

database
  .connect()
  .then(() => {
    app
      .use(router)
      .listen(port, () =>
        console.log(`Server is running on http://localhost:3000`)
      );
  })
  .catch((err) => console.error(err));
