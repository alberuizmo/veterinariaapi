const express = require("express"); //requiero express
const AnimalesController = require("../controllers/animales");
const router = express.Router(); //utilizo el modulo rutas de express
router.post("/animales/all", AnimalesController.allAnimales); // todas los Potreros
router.get("/animales/:id", AnimalesController.getAnimalById); // un Rol por Id
router.post("/animales", AnimalesController.saveAnimal); // crear rol

module.exports = router;
