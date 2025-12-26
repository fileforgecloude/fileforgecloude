import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), "../../.env.local")) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.SERVER_PORT,
};
