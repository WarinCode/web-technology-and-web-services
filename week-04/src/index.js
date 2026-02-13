import express from "express";
import morgan from "morgan";
import pool from "./pool.js";

const app = express();
const port = 3000;

app
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(morgan("dev"));

pool
  .connect()
  .then(() => {
    app
      .get("/", (req, res) => res.status(200).json({ message: "ok" }))
      .get("/products", async (req, res) => {
        try {
          const query = "SELECT * FROM products";
          const result = await pool.query(query);
          res.status(200).json(result.rows);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      })
      // .get("/students", (req, res) => {
      //   try {
      //     const query = "SELECT * FROM students";
      //     const result = pool.query(query);
      //     console.log(result);
      //     res.status(200).json(result);
      //   } catch (err) {
      //     res.status(500).json({ error: err.message });
      //   }
      // })
      .get("/students", async (req, res) => {
        try {
          const query = "SELECT * FROM students";
          const { rows } = await pool.query(query);
          res.status(200).json(rows);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      })
      .get("/students/:studentId", async ({ params: { studentId } }, res) => {
        try {
          const query = `SELECT * FROM students WHERE "stdId" = '${studentId}'`;
          const { rows } = await pool.query(query);
          res.status(200).json(rows.length === 1 ? rows[0] : {});
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      })
      .listen(port, () =>
        console.log(`Server is running on http://localhost:3000`)
      );
  })
  .catch((err) => console.error(err));
