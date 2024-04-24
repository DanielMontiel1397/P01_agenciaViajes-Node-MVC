import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Testimoniales = db.define('testimoniales',{
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mensaje: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

export {
    Testimoniales
}