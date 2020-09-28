const express = require("express"); //requiero express
const { isAuthenticated } = require("../auth");
const PotrerosController = require("../controllers/potreros");
const router = express.Router(); //utilizo el modulo rutas de express
router.get("/potreros", isAuthenticated, PotrerosController.allPotreros); // todas los Potreros
router.get("/potreros/:id", isAuthenticated, PotrerosController.getPotreroById); // un Rol por Id
router.post("/potreros", isAuthenticated, PotrerosController.savePotrero); // crear potrero

module.exports = router;
