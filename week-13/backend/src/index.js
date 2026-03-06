import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import { configDotenv } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import database from "./services/database.js";
import productRoutes from "./routes/productRoutes.js";
import memberRoutes from "./routes/memberRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import dotenvConfig from "../config/dotenvConfig.js";

configDotenv(dotenvConfig);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app
  .use(
    cors({
      origin: [
        "http://localhost",
        "http://127.0.0.1",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
      ],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    }),
  )
  .use(express.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cookieParser())
  .use("/img_pd", express.static("img_pd"))
  .use("/img_mem", express.static("img_mem"))
  .use(logger("dev"));

database
  .connect()
  .then(() => {
    app
      .use(productRoutes)
      .use(memberRoutes)
      .use(cartRoutes)
      .listen(port, () =>
        console.log(`Server is running on http://localhost:3000`),
      );
  })
  .catch((err) => console.error(err));
