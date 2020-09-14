const express = require("express"); //requiero express

const fileUpload = require("express-fileupload"); //requiero el modulo de manejo de archivos

const PotrerosController = require("../controllers/potreros");

const router = express.Router(); //utilizo el modulo rutas de express

router.use(fileUpload()); //uso el modulo de subir archivos en router

router.post("/potreros/all", PotrerosController.allPotreros); // todas los Potreros
router.get("/potreros/:id", PotrerosController.getPotreroById); // un Rol por Id
router.post("/potreros", PotrerosController.savePotrero); // crear rol

module.exports = router;
