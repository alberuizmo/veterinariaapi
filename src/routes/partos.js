const express = require("express"); //requiero express
const { isAuthenticated } = require("../auth");
const PartosController = require("../controllers/partos");
const router = express.Router(); //utilizo el modulo rutas de express
router.get("/partos", isAuthenticated, PartosController.allPartos); // todas los partos
router.get("/partos/:id", isAuthenticated, PartosController.getPartoById); // un parto por Id
router.post("/partos", isAuthenticated, PartosController.saveParto); // crear parto

module.exports = router;
