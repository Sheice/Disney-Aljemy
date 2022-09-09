import { sequelize } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Gender = sequelize.define("Gender", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  imagePublicId: {
    type: DataTypes.STRING,
  },
});
