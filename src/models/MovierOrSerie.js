import {sequelize} from '../db/db.js';
import {DataTypes} from 'sequelize';


export const MovieOrSerie = new sequelize.define('MoviesOrSeries', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    image: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
    creation: {
        type: DataTypes.INTEGER
    },
   calification: {
        type: DataTypes.INTEGER
   }
});