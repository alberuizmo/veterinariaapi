const express = require("express"); //requiero express
const { isAuthenticated } = require("../auth");
const ProduccionLecheraController = require("../controllers/produccion_lechera");
const router = express.Router(); //utilizo el modulo rutas de express
router.get(
  "/produccion_lechera",
  isAuthenticated,
  ProduccionLecheraController.allProduccionByFinca
); // produccion por finca
router.post(
  "/produccion_lechera/semana",
  isAuthenticated,
  ProduccionLecheraController.allProduccionBySemana
); // produccion por semana
router.post(
  "/produccion_lechera/animal",
  isAuthenticated,
  ProduccionLecheraController.allProduccionByAnimal
); // produccion por animal
router.get(
  "/produccion_lechera/:id",
  isAuthenticated,
  ProduccionLecheraController.produccionById
); // produccion por id
router.post(
  "/produccion_lechera",
  isAuthenticated,
  ProduccionLecheraController.saveProduccion
); // crear produccion

module.exports = router;
