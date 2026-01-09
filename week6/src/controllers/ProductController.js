import database from "../services/database.js";

export default class ProductController {
  //* GET: http://localhost:3000/products
  async getAllProducts(req, res) {
    try {
      const query = `
      SELECT p.*,
        (
        SELECT row_to_json(brand_obj)
        FROM (
            SELECT * FROM brands
            WHERE "brandId"=p."brandId"
        ) brand_obj
        ) AS brad,
            (
        SELECT row_to_json(pdt_object)
        FROM (
            SELECT * FROM "pdTypes"
            WHERE "pdTypeId"=p."pdTypeId"
        ) pdt_object
        ) AS pdt
      FROM products p
          `;
      const result = await database.query(query);
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  }
  //* GET: http://localhost:3000/products/:id
  async getProductById({ params: { id } }, res) {
    try {
      const { rows } = await database.query({
        text: `
        SELECT p.*,
          (
          SELECT row_to_json(brand_obj)
          FROM (
              SELECT * FROM brands
              WHERE "brandId"=p."brandId"
          ) brand_obj
          ) AS brad,
              (
          SELECT row_to_json(pdt_object)
          FROM (
              SELECT * FROM "pdTypes"
              WHERE "pdTypeId"=p."pdTypeId"
          ) pdt_object
          ) AS pdt
        FROM products p
        WHERE p."pdId" = $1`,
        values: [id],
      });
      res.status(200).json(rows[0] ? rows[0] : {});
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  }
  //* POST: http://localhost:3000/products
  async postProduct({ body }, res) {
    try {
      const { pdId, pdName, pdPrice, pdTypeId, brandId } = body;
      if (!pdId || !pdName) {
        res.status(422).json({ error: "Error pdId and pdName is required" });
        return;
      }
      const chkRow = await database.query({
        text: 'SELECT * FROM products WHERE "pdId" = $1',
        values: [pdId],
      });
      if (chkRow.rowCount >= 1) {
        res.status(409).json({ error: `Error pdId ${pdId} is exists` });
        return;
      }

      const result = await database.query({
        text: 'INSERT INTO products ("pdId", "pdName", "pdPrice", "pdTypeId", "brandId") VALUES ($1, $2, $3, $4, $5)',
        values: [pdId, pdName, pdPrice, pdTypeId, brandId],
      });
      const bodyData = {
        pdId,
        pdName,
        pdPrice,
        pdTypeId,
        brandId,
        createDate: new Date(),
        message: "ok",
      };
      res.status(201).json(bodyData);
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  }
  //* PUT: http://localhost:3000/products
  async putProduct(
    { body: { pdName, pdPrice, pdRemark, pdTypeId, brandId }, params: { id } },
    res
  ) {
    try {
      const { rowCount } = await database.query({
        text: `
          UPDATE products SET
            "pdName" = $1,
            "pdPrice" = $2,
            "pdRemark" = $3,
            "pdTypeId" = $4,
            "brandId" = $5
          WHERE "pdId" = $6
        `,
        values: [pdName, pdPrice, pdRemark, pdTypeId, brandId, id],
      });

      if (rowCount === 0) {
        res.status(404).json({ message: `ERROR id ${id} not found` });
        return;
      }
      res.status(201).json({
        pdName,
        pdPrice,
        pdRemark,
        pdTypeId,
        brandId,
        datetime: new Date(),
        message: "ok",
      });
    } catch (err) {
      res.status(500).json({ message: err?.message });
    }
  }
  //* DELETE http://localhost:3000/products
  async deleteProduct({ params: { id } }, res) {
    try {
      const { rowCount } = await database.query({
        text: `DELETE FROM products WHERE "pdId" = $1`,
        values: [id],
      });

      if (rowCount === 0) {
        res.status(404).json({ message: `ERROR id ${id} not found` });
        return;
      }
      res.status(204).end();
    } catch (err) {
      res.status(500).json({ message: err?.message });
    }
  }
  //* GET: http://localhost:3000/brands/:id
  async getProductByBrandId({ params: { id } }, res) {
    try {
      const { rows } = await database.query({
        text: `
        SELECT p.*,
          (
          SELECT row_to_json(pdt_object)
          FROM (
              SELECT * FROM "pdTypes"
              WHERE "pdTypeId"=p."pdTypeId"
          ) pdt_object
          ) AS pdt
        FROM products p
        WHERE p."brandId" ILIKE $1`,
        values: [id],
      });
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ message: err?.message });
    }
  }
}
