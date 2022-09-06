import { sequelize } from "../db/db.js";
import {DataTypes} from 'sequelize';

export const User = sequelize.define('Users',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
})
