const express = require("express"); //requiero express
const ProduccionLecheraController = require("../controllers/produccion_lechera");
const router = express.Router(); //utilizo el modulo rutas de express
router.post(
  "/produccion_lechera/finca",
  ProduccionLecheraController.allProduccionByFinca
); // produccion por finca
router.post(
  "/produccion_lechera/semana",
  ProduccionLecheraController.allProduccionBySemana
); // produccion por semana
router.post(
  "/produccion_lechera/animal",
  ProduccionLecheraController.allProduccionByAnimal
); // produccion por animal
router.get(
  "/produccion_lechera/:id",
  ProduccionLecheraController.produccionById
); // produccion por id
router.post("/produccion_lechera", ProduccionLecheraController.saveProduccion); // crear produccion

module.exports = router;
