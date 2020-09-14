const express = require("express"); //requiero express

const fileUpload = require("express-fileupload"); //requiero el modulo de manejo de archivos

const RolesController = require("../controllers/roles");

const router = express.Router(); //utilizo el modulo rutas de express

router.use(fileUpload()); //uso el modulo de subir archivos en router

router.post("/roles/all", RolesController.allRoles); // todas los roles
router.get("/roles/:id", RolesController.getRolById); // un Rol por Id
router.post("/roles/create", RolesController.saveRol); // crear rol
router.post("/roles/permisos", RolesController.saveRolPermiso); // crear relacion rol-permiso
router.get("/permisos", RolesController.getAllPermisos); // todos los permisos
module.exports = router;
