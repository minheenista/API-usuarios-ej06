const { DataTypes } = require("sequelize");
const sequelize = new require("../config/db");

const Usuario = sequelize.define("Usuarios", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

Usuario.sync()
    .then(() => {
        console.log("Tabla Usuarios creada o ya existente");
    })
    .catch((error) => {
        console.log("Error al crear la tabla Usuarios", error);
    });

module.exports = Usuario;
console.log(Usuario === sequelize.models.Usuario);