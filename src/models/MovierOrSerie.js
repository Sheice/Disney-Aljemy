import { sequelize } from "../db/db.js";
import { DataTypes } from "sequelize";

export const MovieOrSerie = sequelize.define("MoviesOrSeries", {
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
  title: {
    type: DataTypes.STRING,
  },
  // creation: {
  //     type: DataTypes.DATEONLY
  // },
  calification: {
    type: DataTypes.INTEGER,
  },
});
