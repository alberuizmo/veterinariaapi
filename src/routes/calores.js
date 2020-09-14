const express = require("express"); //requiero express
const CaloresController = require("../controllers/calores");
const router = express.Router(); //utilizo el modulo rutas de express
router.post("/calores/all", CaloresController.allCalores); // todas los calores
router.get("/calores/:id", CaloresController.getCalorById); // un calor por Id
router.post("/calores", CaloresController.saveCalor); // crear calor

module.exports = router;
