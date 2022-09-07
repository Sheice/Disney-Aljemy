import {sequelize} from '../db/db.js';
import {DataTypes} from 'sequelize';

export const Gender = new sequelize.define('Gender', {
    id: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.STRING
    }
});