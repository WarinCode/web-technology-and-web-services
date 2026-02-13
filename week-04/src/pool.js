import { Pool } from "../node_modules/@types/pg";

const pool = new Pool({
  connectionString: `postgres://dev:${encodeURIComponent("1234")}@localhost:5432/kushop`,
});

export default pool;