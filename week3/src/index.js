import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";

const app = express();
const port = 3000;

const students = [
  {
    id: "001",
    name: "สมชาย สายลม",
    age: 20,
  },
];

app
  .use(bodyParser.json())
  .use(logger("dev"))
  .get("/", (req, res) => res.send("Hello World!"))
  .get("/students", (req, res) => {
    // res.json(students);
    const { id, name } = students[0];
    res.type("json").status(200).json({ id, name });
  })
  .post("/students", ({ body }, res) => {
    body.devId = "6630250435";
    res.type("json").status(201).json(body);
  })
  .listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
