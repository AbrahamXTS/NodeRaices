import bcrypt from "bcrypt"
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
}, {
    hooks: {
        // Antes de crear la instancia
        beforeCreate: async (user) => {
            /* 
                Realiza 10 rondas de hasheo. 
                No es recomendado poner un mayor número debido a que es un proceso costoso. 
            */
            user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
        }
    }
});

User.prototype.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
}