const express = require("express"); //requiero express
const InseminacionesController = require("../controllers/inseminaciones");
const router = express.Router(); //utilizo el modulo rutas de express
router.post("/inseminaciones/all", InseminacionesController.allInseminaciones); // todas las inseminaciones
router.get("/inseminaciones/:id", InseminacionesController.getInseminacionById); // un inseminaciones por Id
router.post("/inseminaciones", InseminacionesController.saveInseminacion); // crear inseminacion

module.exports = router;
