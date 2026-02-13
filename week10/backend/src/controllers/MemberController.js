import database from "../services/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class MemberController {
  //* GET http://localhost:3000/members
  async getAllMembers(req, res) {
    try {
      const { rows } = await database.query("SELECT * FROM members");
      res.status(200).json(rows);
    } catch(err){
      res.status(500).json({ error: err.message });
    }
  }

  //* GET: http://localhost:3000/members/detail
  async getMember({ cookies: { token } }, res) {
    if (!token) {
      res.json({ message: "No member", login: false });
    }

    const secretKey = process.env.SECRET_KEY;
    try {
      const member = jwt.verify(token, secretKey);
      console.log(member);

      res.json({
        memEmail: member.memEmail,
        memName: member.memName,
        dutyId: member.dutyId,
        login: true,
      });
    } catch (err) {
      console.error(err);
      res.json({ message: "The information was falsified", login: false });
    }
  }

  //* GET: http://localhost:3000/members/logout
  async logoutMember(req, res) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.json({ message: "Login Fail", login: false });
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  //* POST: http://localhost:3000/members
  async postMember({ body: { memEmail, memName, password } }, res) {
    try {
      if (!memEmail || !memName) {
        re.status(422).json({
          message: "ERROR memEmail and memName is required.",
          regist: false,
        });
        return;
      }

      const { rowCount } = await database.query({
        text: `SELECT * FROM members WHERE "memEmail" = $1`,
        values: [memEmail],
      });
      if (rowCount !== 0) {
        res.status(409).json({
          message: `ERROR memEmail ${memEmail} is exists.`,
          regist: false,
        });
        return;
      }

      const saltround = 11;
      const pwdHash = await bcrypt.hash(password, saltround);

      await database.query({
        text: `INSERT INTO "members"("memEmail", "memName", "memHash") VALUES($1, $2, $3)`,
        values: [memEmail, memName, pwdHash],
      });
      res.status(201).json({
        memName,
        memEmail,
        pwdHash,
        createdDate: new Date(),
        message: "Regist Success",
        regist: true,
      });
    } catch (err) {
      res.status(500).json({ message: err?.message, regist: false });
    }
  }

  //* POST: http://localhost:3000/members/login
  async loginMember({ body: { loginName, password } }, res) {
    try {
      if (!loginName || !password) {
        res
          .status(422)
          .json({ message: "ERROR loginName and password is required." });
        return;
      }

      const { rows, rowCount } = await database.query({
        text: `SELECT * FROM members WHERE "memEmail" = $1`,
        values: [loginName],
      });
      if (rowCount === 0) {
        res.status(409).json({ message: `Login Fail`, login: false });
        return;
      }

      const loginOK = await bcrypt.compare(password, rows[0].memHash);
      if (loginOK) {
        const user = {
          memEmail: rows[0].memEmail,
          memName: rows[0].memName,
          dutyId: rows[0].dutyId,
        };

        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign(user, secretKey, { expiresIn: "1h" });

        res.cookie("token", token, {
          maxAge: "3600000",
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });
        res.status(200).json({ message: `Login Success`, login: true });
      } else {
        res.clearCookie("token", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        });

        res.json({ message: `Login Fail`, login: false });
      }
    } catch (err) {
      res.status(500).json({ message: err?.message });
    }
  }
}
