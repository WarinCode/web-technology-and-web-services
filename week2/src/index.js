import express, { json, urlencoded } from "express";
import logger from "morgan";

const app = express();
const port = 3000;

app
  .use(json())
  .use(urlencoded({ extended: true }))
  .use(logger("dev"));

app
  .get("/", (req, res) => {
    res.send("Hello World!");
  })
  .get("/name/:name", ({ params: { name } }, res) =>
    res.send(`Hello, ${name}!`)
  )
  .get("/ip", ({ ip }, res) => {
    res.send(`
      <h1>LAB02</h1>
      <p>ได้รับข้อความจาก IP: ${ip}</p>
      `);
  })
  .get(
    "/readparam",
    ({ query: { name = "ไม่ระบุชื่อ", id = "ไม่ระบุID" } }, res) => {
      console.log(JSON.stringify({ name, id }));
      res.type("html").send(`
      <h1>Hello ${name} :id ${id}</h1>
      <h3>จาก วรินทร์ สายปัญญา : 6630250435</h3>
      `);
    }
  )
  .post("/data", (req, res) => res.send(req.body))
  .use((req, res) => res.status(404).send("Not Found!"))
  .listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
  );
