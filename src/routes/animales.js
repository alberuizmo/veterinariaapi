const express = require("express"); //requiero express
const { isAuthenticated } = require("../auth");
const AnimalesController = require("../controllers/animales");
const router = express.Router(); //utilizo el modulo rutas de express
router.get("/animales", isAuthenticated, AnimalesController.allAnimales); // todas los Potreros
router.get("/animales/:id", isAuthenticated, AnimalesController.getAnimalById); // un Rol por Id
router.post("/animales", isAuthenticated, AnimalesController.saveAnimal); // crear rol

module.exports = router;
