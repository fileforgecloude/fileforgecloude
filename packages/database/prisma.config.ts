import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

config({ path: "../../.env.local" });

export default defineConfig({
  schema: "prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL!,
    shadowDatabaseUrl: process.env.DIRECT_URL,
  },
});
