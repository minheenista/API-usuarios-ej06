// establecer la conexion con un Dialecto = MySQL
const { Sequelize } = require("sequelize");
const db = process.env.MYSQLDATABASE || "tareasdb"; //para render.com
const user = process.env.MYSQLSER || "root";
const password = process.env.MYSQLPASSWORD || "";

const sequelize = new Sequelize("tareasdb", "root", "", {
    host: "localhost",
    dialect: "mysql",
});
try {
    sequelize.authenticate();
    console.log("Conexion a la base de datos exitosa");
} catch (e) {
    console.error("No se pudo conectar a la base de datos");
    console.error(e);
}
//Para poder usar la conexion en los controladores
module.exports = sequelize;
