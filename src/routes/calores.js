const express = require("express"); //requiero express
const { isAuthenticated } = require("../auth");
const CaloresController = require("../controllers/calores");
const router = express.Router(); //utilizo el modulo rutas de express
router.get("/calores", isAuthenticated, CaloresController.allCalores); // todas los calores
router.get("/calores/:id", isAuthenticated, CaloresController.getCalorById); // un calor por Id
router.post("/calores", isAuthenticated, CaloresController.saveCalor); // crear calor

module.exports = router;
