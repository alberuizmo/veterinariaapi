const express = require("express"); //requiero express
const { isAuthenticated, hasRoles } = require("../auth");
const UsuariosController = require("../controllers/usuarios");
const router = express.Router(); //utilizo el modulo rutas de express
router.get("/usuarios", isAuthenticated, UsuariosController.allUsuarios); // todas las Usuarios
router.get("/usuarios/:id", isAuthenticated, UsuariosController.getUsuarioById); // un Usuario por Id
router.post(
  "/usuarios",
  isAuthenticated,
  hasRoles([1]),
  UsuariosController.saveUsuario
); // crear usuario
router.post(
  "/usuario-finca",
  isAuthenticated,
  hasRoles([1]),
  UsuariosController.saveUsuarioFinca
); // crear relacion usuario-finca
router.post("/usuario-finca-admin", UsuariosController.saveUsuarioFincaAdmin); // crear relacion usuario-finca de un usuario administrador
router.post(
  "/usuario-rol",
  isAuthenticated,
  hasRoles([1]),
  UsuariosController.saveUsuarioRol
); // crear relacion usuario-rol
router.post("/register", UsuariosController.register); // registro
router.post("/login", UsuariosController.login); // login
module.exports = router;
