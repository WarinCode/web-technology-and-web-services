import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import { configDotenv } from "dotenv";
import cors from "cors";
import database from "./services/database.js";
import productRoutes from "./routes/productRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import dotenvConfig from "../config/dotenvConfig.js";

configDotenv(dotenvConfig);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app
  .use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }))
  .use(express.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use("/img_pd", express.static("img_pd"))
  .use(logger("dev"));

database
  .connect()
  .then(() => {
    app
      .use(productRoutes)
      .use(memberRoutes)
      .listen(port, () =>
        console.log(`Server is running on http://localhost:3000`),
      );
  })
  .catch((err) => console.error(err));
