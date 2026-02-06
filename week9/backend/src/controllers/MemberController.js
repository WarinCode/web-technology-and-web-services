import database from "../services/database.js";
import bcrypt from "bcrypt";

export default class MemberController {
  //* POST: http://localhost:3000/members
  async postMember({ body: { memEmail, memName, password } }, res) {
    try {
      if (!memEmail || !memName) {
        res.json({
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
        res.json({
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
      res.json({
        memName,
        memEmail,
        pwdHash,
        createdDate: new Date(),
        message: "Regist Success",
        regist: true,
      });
    } catch (err) {
      res.json({ message: err?.message, regist: false });
    }
  }

  //* POST: http://localhost:3000/members/login
  async loginMember({ body: { loginName, password } }, res) {
    try {
      if (!loginName || !password) {
        res.json({ message: "ERROR loginName and password is required." });
        return;
      }

      const { rows, rowCount } = await database.query({
        text: `SELECT * FROM members WHERE "memEmail" = $1`,
        values: [loginName],
      });
      if (rowCount === 0) {
        res.json({ message: `Login Fail`, login: false });
        return;
      }

      const loginOK = await bcrypt.compare(password, rows[0].memHash);
      if (loginOK) {
        res.json({ message: `Login Success`, login: true });
      } else {
        res.json({ message: `Login Fail`, login: false });
      }
    } catch (err) {
      res.json({ message: err?.message });
    }
  }
}
