import database from "../services/database.js";

export default class CartController {
  //* GET: http://localhost:3000/sumcart/:id
  async sumCart({ params: { id } }, res) {
    const { rows } = await database.query({
      text: `SELECT SUM(qty) AS qty, SUM(qty * price) AS money FROM "cartDtl" ctd WHERE ctd."cartId" = $1`,
      values: [id],
    });
    res.json({ id, qty: rows[0].qty, money: rows[0].money });
  }

  //* GET: http://localhost:3000/carts/getcart/:id
  async getCart({ params: { id } }, res) {
    try {
      const { rows } = await database.query({
        text: `SELECT ct.*, SUM(ctd.qty) AS sqty, SUM(ctd.price * ctd.qty) AS sprice
        FROM carts ct LEFT JOIN "cartDtl" ctd ON ct."cartId" = ctd."cartId"
        WHERE ct."cartId" = $1
        GROUP BY ct."cartId"`,
        values: [id],
      });
      res.json(rows);
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  //* GET: http://localhost:3000/carts/getcartdtl/:id
  async getCartDtl({ params: { id } }, res) {
    try {
      const { rows } = await database.query({
        text: `SELECT ROW_NUMBER() OVER (ORDER BY ctd."pdId") AS row_number,
                    ctd."pdId", pd."pdName", ctd.qty, ctd.price
                FROM "cartDtl" ctd LEFT JOIN "products" pd ON ctd."pdId" = pd."pdId"
                WHERE ctd."cartId" = $1
                ORDER BY ctd."pdId"`,
        values: [id],
      });
      res.json(rows);
    } catch (err) {
      res.json({ error: err.message });
    }
  }

  //* POST: http://localhost:3000/carts/chkcart
  async chkCart({ body: { memEmail } }, res) {
    if (memEmail === null || !memEmail) {
      res.json({ error: true, errormessage: "member Email is required" });
      return;
    }

    const result = await database.query({
      text: `SELECT * FROM carts WHERE "cusId" = $1 AND "cartCf" != true`,
      values: [memEmail],
    });

    if (result.rows[0] !== null) {
      res.json({ cartExist: true, cartId: result.rows[0].cartId });
    } else {
      res.json({ cartExist: false });
    }
  }

  //* POST: http://localhost:3000/carts/addcart
  async postCart({ body: { cusId } }, res) {
    try {
      if (cusId === null || !cusId) {
        res.json({ cartOK: false, messageAddCart: "Customer Id is required" });
        return;
      }

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const currentDate = `${year}${month}${day}`;

      let i = 0;
      let theId = "";
      let existsResult = [];

      do {
        i++;
        theId = `${currentDate}${String(i).padStart(4, "0")}`;
        existsResult = await database.query({
          text: `SELECT EXISTS (SELECT * FROM carts WHERE "cartId" = $1)`,
          values: [theId],
        });
      } while (existsResult.rows[0].exists);

      await database.query({
        text: `INSERT INTO carts("cartId", "cusId", "cartDate") VALUES($1, $2, $3)`,
        values: [theId, cusId, now],
      });

      res.status(201).json({ cartOK: true, messageAddCart: theId });
    } catch (err) {
      res.json({ cartOK: false, messageAddCart: err.message });
    }
  }

  //* POST: http://localhost:3000/carts/addcartdtl
  async postCartDtl({ body: { cartId, pdId, pdPrice } }, res) {
    try {
      if (
        cartId === null ||
        pdId === null ||
        pdPrice === null ||
        !cartId ||
        !pdId ||
        !pdPrice
      ) {
        res.json({
          cartDtlOK: false,
          messageAddCartDtl: "CartId && ProductID && Price is required",
        });
        return;
      }

      const { rows, rowCount } = await database.query({
        text: `SELECT * FROM "cartDtl" ctd WHERE ctd."cartId" = $1 AND ctd."pdId" = $2`,
        values: [cartId, pdId],
      });

      if (rowCount === 0) {
        try {
          await database.query({
            text: `INSERT INTO "cartDtl" ("cartId", "pdId", "qty", "price") VALUES($1, $2, $3, $4)`,
            values: [cartId, pdId, 1, pdPrice],
          });
          res.status(201).json({ cartDtlOK: true, messageAddCart: cartId });
          return;
        } catch (err) {
          res.json({
            cartDtlOK: false,
            messageAddCartDtl: "INSERT DETAIL ERROR",
          });
          return;
        }
      } else {
        try {
          await database.query({
            text: `UPDATE "cartDtl" SET "qty" = $1 WHERE "cartId" = $2 AND "pdId" = $3`,
            values: [rows[0].qty + 1, cartId, pdId],
          });
          res.json({ cartDtlOK: true, messageAddCart: cartId });
          return;
        } catch (err) {
          res.json({
            cartDtlOK: false,
            messageAddCartDtl: "INSERT DETAIL ERROR",
          });
          return;
        }
      }
    } catch (err) {
      res.json({ cartDtlOK: false, messageAddCart: "INSERT DETAIL ERROR" });
    }
  }

  //* POST: http"//localhost:3000/carts/getcartbycus
  async getCartByCus({ body: { id } }, res) {
    try {
      const { rows } = await database.query({
        text: `SELECT ROW_NUMBER() OVER (ORDER BY ct."cartId" DESC) AS row_number,
                      ct.*, SUM(ctd.qty) AS sqty, SUM(ctd.price * ctd.qty) AS sprice
              FROM carts ct LEFT JOIN "cartDtl" ctd ON ct."cartId" = ctd."cartId"
              WHERE ct."cusId" = $1
              GROUP BY ct."cartId"
              ORDER BY ct."cartId" DESC`,
        values: [id],
      });
      res.json(rows);
    } catch (err) {
      res.json({ error: err.message });
    }
  }
}
