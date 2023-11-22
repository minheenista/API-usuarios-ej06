const Usuarios = require("../models/usuarios.model");

// Crear un usuario: Debe permitir la creación de un nuevo usuario y asignarle un ID único. Utiliza una ruta POST para esto.
exports.createUser = async (req, res) => {
    const { nombre, usuario, email, clave } = req.body;
    try {
        if (!nombre || !usuario || !email || !clave) {
            res.status(400).json({
                estado: 0,
                mensaje: "Ingresa todos los datos del usuario",
            });
        } else {
            sameUser = await Usuarios.findOne({
                where: {
                    usuario: usuario
                }
            });
            sameEmail = await Usuarios.findOne({
                where: {
                    email: email
                }
            });
            if (sameUser !== null) {
                res.status(400).json({
                    estado: 0,
                    mensaje: "El usuario ya existe, elige otro nombre de usuario",
                });
            } else if (sameEmail !== null) {
                res.status(400).json({
                    estado: 0,
                    mensaje: "El email ya existe, elige otro email",
                });
            } else {
                const nuevousuario = await Usuarios.create({ nombre: nombre, usuario: usuario, email: email, clave: clave });
                res.status(200).json({
                    estado: 1,
                    mensaje: "Usuario creado exitosamente",
                    usuario: nuevousuario
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrio un error desconocido",
            error: error,
        });
    }
}


// Obtener todos los usuarios: Debe devolver una lista de todos los usuarios. Utiliza una ruta GET.
exports.getAllUsers = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll();
        res.status(200).json({
            estado: 1,
            mensaje: "Usuarios encontrados",
            usuarios: usuarios
        })
    } catch (error) {
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrio un error desconocido",
        });
    }
}
// Obtener un usuario por ID: Debe permitir la obtención de un usuario por su ID. Utiliza una ruta GET con un parámetro de ruta.
exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await Usuarios.findOne({
            where: {
                id: id
            }
        });
        if (usuario === null) {
            res.status(404).json({
                estado: 0,
                mensaje: "Usuario no encontrado",
            })
        } else {
            res.status(200).json({
                estado: 1,
                mensaje: "Usuario encontrado",
                usuario: usuario
            })
        }
    } catch (error) {
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrio un error desconocido",
        });
    }
}

// Actualizar un usuario: Debe permitir la actualización de la información de un usuario existente. Utiliza una ruta PUT con un parámetro de ruta.
exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const { nombre, usuario, email, clave } = req.body;
    try {
        const updateUsuario = await Usuarios.findOne({
            where: {
                id: id
            }
        });
        if (updateUsuario === null) {
            res.status(404).json({
                estado: 0,
                mensaje: "Usuario no encontrado",
            })
        } else {

            if (!nombre || !usuario || !email || !clave) {
                res.status(400).json({
                    estado: 0,
                    mensaje: "NO puedes dejar campos vacios",
                })
            } else {
                sameUser = await Usuarios.findOne({
                    where: {
                        usuario: usuario
                    }
                });
                sameEmail = await Usuarios.findOne({
                    where: {
                        email: email
                    }
                });
                if (sameUser !== null) {
                    res.status(400).json({
                        estado: 0,
                        mensaje: "El usuario ya existe, elige otro nombre de usuario",
                    });
                } else if (sameEmail !== null) {
                    res.status(400).json({
                        estado: 0,
                        mensaje: "El email ya existe, elige otro email",
                    });
                } else {
                    const usuarioupdate = await Usuarios.update({
                        nombre: nombre,
                        usuario: usuario,
                        email: email,
                        clave: clave
                    }, {
                        where: {
                            id: id
                        }
                    });
                    res.status(201).json({
                        estado: 1,
                        mensaje: "Usuario actualizado exitosamente",
                        usuario: usuarioupdate
                    })
                }
            }
        }
    } catch (error) {
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrio un error desconocido",
        });
    }

}

// Eliminar un usuario: Debe permitir la eliminación de un usuario por su ID. Utiliza una ruta DELETE con un parámetro de ruta.
exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await Usuarios.destroy({
            where: {
                id: id
            }
        });
        if (usuario === 0) {
            res.status(404).json({
                estado: 0,
                mensaje: "Usuario no encontrado",
            })
        } else {
            res.status(200).json({
                estado: 1,
                mensaje: "Usuario eliminado exitosamente",
                usuario: usuario
            })
        }
    } catch (error) {
        res.status(500).json({
            estado: 0,
            mensaje: "Ocurrio un error desconocido",
        });
    }
}