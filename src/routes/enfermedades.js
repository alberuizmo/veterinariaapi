const express = require("express"); //requiero express
const EnfermedadesController = require("../controllers/enfermedades");
const router = express.Router(); //utilizo el modulo rutas de express
router.post("/enfermedades/all", EnfermedadesController.allEnfermedades); // todas las enfermedades
router.get("/enfermedades/:id", EnfermedadesController.getEnfermedadById); // una enfermedad por Id
router.post("/enfermedades", EnfermedadesController.saveEnfermedad); // crear reporte de enfermedad

module.exports = router;
