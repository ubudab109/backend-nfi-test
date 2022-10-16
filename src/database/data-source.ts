require('dotenv').config();
import { DataSource } from "typeorm"
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(<string>process.env.POSTGRES_PORT) || 5432,
  username: process.env.POSTGRES_USER || "root",
  password: process.env.POSTGRES_PASSWORD || "root",
  database: process.env.POSTGRES_DB,
  entities: ["build/database/entities/**/*.js"],
  migrations: ["build/database/migration/**/*.js"],
  synchronize: true,
  logging: false,
});
