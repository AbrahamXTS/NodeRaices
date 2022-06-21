import { DataTypes } from "sequelize";
import { db } from "../config/index.js";

export const User = db.define("users", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
    },
    confirmed: {
        type: DataTypes.BOOLEAN
    }
});