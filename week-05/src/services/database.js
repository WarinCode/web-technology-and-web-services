import { Pool } from "pg";
import { configDotenv } from "dotenv";
import dotenvConfig from "../../config/dotenvConfig.js";

configDotenv(dotenvConfig);
const { DBSERVER, DBUSER, DBPWD, DBHOST, DBPORT, DB } = process.env;

export default new Pool({
  connectionString: `${DBSERVER}://${DBUSER}:${encodeURIComponent(
    DBPWD
  )}@${DBHOST}:${DBPORT}/${DB}`,
});
