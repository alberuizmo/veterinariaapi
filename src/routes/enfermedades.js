const express = require("express"); //requiero express
const { isAuthenticated } = require("../auth");
const EnfermedadesController = require("../controllers/enfermedades");
const router = express.Router(); //utilizo el modulo rutas de express
router.get(
  "/enfermedades",
  isAuthenticated,
  EnfermedadesController.allEnfermedades
); // todas las enfermedades
router.get(
  "/enfermedades/:id",
  isAuthenticated,
  EnfermedadesController.getEnfermedadById
); // una enfermedad por Id
router.post(
  "/enfermedades",
  isAuthenticated,
  EnfermedadesController.saveEnfermedad
); // crear reporte de enfermedad

module.exports = router;
