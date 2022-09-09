import { Sequelize } from "sequelize";
import { config } from "dotenv";
config({path: '.env'})

export const sequelize = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USERNAME || "",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);
