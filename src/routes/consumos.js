const express = require("express"); //requiero express
const { isAuthenticated } = require("../auth");
const ConsumosController = require("../controllers/consumos");
const router = express.Router(); //utilizo el modulo rutas de express

router.get("/consumos", isAuthenticated, ConsumosController.allConsumos); // todas los consumos
router.get("/consumos/:id", isAuthenticated, ConsumosController.getConsumoById); // consumo por id
router.post("/consumos", isAuthenticated, ConsumosController.saveConsumo); // crear consumo

module.exports = router;
