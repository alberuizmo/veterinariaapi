const express = require("express"); //requiero express

const fileUpload = require("express-fileupload"); //requiero el modulo de manejo de archivos

const UsuariosController = require("../controllers/usuarios");

const router = express.Router(); //utilizo el modulo rutas de express

router.use(fileUpload()); //uso el modulo de subir archivos en router

router.post("/usuarios/all", UsuariosController.allUsuarios); // todas las Usuarios
router.get("/usuarios/:id", UsuariosController.getUsuarioById); // un Usuario por Id
router.post("/usuarios", UsuariosController.saveUsuario); // crear usuario
router.post("/usuario-finca", UsuariosController.saveUsuarioFinca); // crear relacion usuario-finca
router.post("/usuario-rol", UsuariosController.saveUsuarioRol); // crear relacion usuario-rol
module.exports = router;
