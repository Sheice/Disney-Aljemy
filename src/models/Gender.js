import {sequelize} from '../db/db.js';
import {DataTypes} from 'sequelize';

export const Gender = sequelize.define('Gender', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    }
});