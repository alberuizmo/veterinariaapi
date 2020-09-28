const express = require("express"); //requiero express
const { isAuthenticated } = require("../auth");
const InseminacionesController = require("../controllers/inseminaciones");
const router = express.Router(); //utilizo el modulo rutas de express
router.get(
  "/inseminaciones",
  isAuthenticated,
  InseminacionesController.allInseminaciones
); // todas las inseminaciones
router.get(
  "/inseminaciones/:id",
  isAuthenticated,
  InseminacionesController.getInseminacionById
); // un inseminaciones por Id
router.post(
  "/inseminaciones",
  isAuthenticated,
  InseminacionesController.saveInseminacion
); // crear inseminacion

module.exports = router;
