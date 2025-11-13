import { DataTypes } from "sequelize";
import db from "../config/db.js";

const Viaje = db.define('viajes',{
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_ida: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_vuelta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    imagen_horizontal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagen_vertical: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    disponibles: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

export {
    Viaje
}