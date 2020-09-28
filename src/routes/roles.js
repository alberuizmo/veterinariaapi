const express = require("express"); //requiero express
const { isAuthenticated, hasRoles } = require("../auth");
const RolesController = require("../controllers/roles");
const router = express.Router(); //utilizo el modulo rutas de express
router.get("/roles", isAuthenticated, RolesController.allRoles); // todas los roles
router.get("/roles/:id", isAuthenticated, RolesController.getRolById); // un Rol por Id
router.post(
  "/roles/create",
  isAuthenticated,
  hasRoles([1]),
  RolesController.saveRol
); // crear rol
router.post(
  "/roles/permisos",
  isAuthenticated,
  hasRoles([1]),
  RolesController.saveRolPermiso
); // crear relacion rol-permiso
router.get("/permisos", RolesController.getAllPermisos); // todos los permisos
module.exports = router;
