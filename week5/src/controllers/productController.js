import database from "../services/database.js";

const productController = {
  //* GET: http://localhost:3000/products
  getAllProducts: async (req, res) => {
    try {
      const query = 'SELECT * FROM products ORDER BY "pdId"';
      const result = await database.query(query);
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  },
  //* GET: http://localhost:3000/products/:id
  getProductById: async ({ params: { id } }, res) => {
    try {
      const result = await database.query({
        text: 'SELECT * FROM products WHERE "pdId" = $1',
        values: [id],
      });
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  },
  //* POST: http://localhost:3000/products
  postProduct: async ({ body }, res) => {
    try {
      const { pdId, pdName, pdPrice, pdTypeId, brandId } = body;
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
  },
};

export default productController;
