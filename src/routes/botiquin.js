const express = require("express"); //requiero express
const { isAuthenticated } = require("../auth");
const BotiquinController = require("../controllers/botiquin");
const router = express.Router(); //utilizo el modulo rutas de express
router.get("/botiquin", isAuthenticated, BotiquinController.allMedicinas); // todas las medicinas
router.get(
  "/botiquin/:id",
  isAuthenticated,
  BotiquinController.getMedicinaById
); // medicina por id
router.post("/botiquin", isAuthenticated, BotiquinController.saveMedicina); // crear medicina

module.exports = router;
