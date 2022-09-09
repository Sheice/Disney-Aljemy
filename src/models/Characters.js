import { sequelize } from "../db/db.js";
import { DataTypes } from "sequelize";

export const Character = sequelize.define("Characters", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  imagePublicId: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
  },
  weight: {
    type: DataTypes.DECIMAL,
  },
  history: {
    type: DataTypes.STRING,
  },
});
