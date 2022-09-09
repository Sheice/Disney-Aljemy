import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "Disney world" || "",
  "postgres" || "",
  "ahycadagenteboluda" || "",
  {
    host: "localhost",
    dialect: "postgres",
  }
);
