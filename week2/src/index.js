import express, { json, urlencoded } from "express";
import logger from "morgan";

const app = express();
const port = 3000;

app
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(logger("dev"));

app
  .get("/", (req, res) => res.send("Hello World!"))
  .get("/name/:name", ({ params: { name } }, res) =>
    res.send(`Hello, ${name}!`)
  )
  .post("/data", (req, res) => res.send(req.body))
  .listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
  );
