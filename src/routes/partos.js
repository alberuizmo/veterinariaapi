const express = require("express"); //requiero express
const PartosController = require("../controllers/partos");
const router = express.Router(); //utilizo el modulo rutas de express
router.post("/partos/all", PartosController.allPartos); // todas los partos
router.get("/partos/:id", PartosController.getPartoById); // un parto por Id
router.post("/partos", PartosController.saveParto); // crear parto

module.exports = router;
