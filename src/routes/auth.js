const express = require("express"); //requiero express
const AuthController = require("../controllers/auth");
const router = express.Router(); //utilizo el modulo rutas de express
router.post("/login", AuthController.login); // login
module.exports = router;
