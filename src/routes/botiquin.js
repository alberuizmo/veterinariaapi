const express = require("express"); //requiero express

const fileUpload = require("express-fileupload"); //requiero el modulo de manejo de archivos

const BotiquinController = require("../controllers/botiquin");

const router = express.Router(); //utilizo el modulo rutas de express

router.use(fileUpload()); //uso el modulo de subir archivos en router

router.post("/botiquin/all", BotiquinController.allMedicinas); // todas las medicinas
router.get("/botiquin/:id", BotiquinController.getMedicinaById); // medicina por id
router.post("/botiquin", BotiquinController.saveMedicina); // crear medicina

module.exports = router;
