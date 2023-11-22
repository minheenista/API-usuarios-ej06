const express = require("express");
const router = express.Router(); // Aquí agrega los paréntesis para crear una instancia de router
const usuariosController = require("../controllers/usuarios.controller");

//Definir las rutas
router.get("/", usuariosController.getAllUsers);
router.get("/:id", usuariosController.getUserById);
router.post("/", usuariosController.createUser);
router.put("/:id", usuariosController.updateUser);
router.delete("/:id", usuariosController.deleteUser);

module.exports = router;