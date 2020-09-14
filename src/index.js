"use strict";
//requiero express
const express = require("express");

//ejecuto express
const app = express();

//cargo las rutas
const botiquin_routes = require("./routes/botiquin");
const enfermedades_routes = require("./routes/enfermedades");
const partos_routes = require("./routes/partos");
const calores_routes = require("./routes/calores");
const inseminaciones_routes = require("./routes/inseminaciones");
const fincas_routes = require("./routes/fincas");
const usuarios_routes = require("./routes/usuarios");
const roles_routes = require("./routes/roles");
const potreros_routes = require("./routes/potreros");
const animales_routes = require("./routes/animales");
const produccion_lechera_routes = require("./routes/produccion_lechera");
const auth_routes = require("./routes/auth");

//Configuracion del servidor
app.set("port", process.env.PORT || 3000); //seteo una variable puerto en app, primero busca un puerto asignado y si no consigue asigna el 3000

//middlewares
app.use(express.json()); //permite parsear los json recibidos en las peticiones

//CONFIGURACION DE CABECERAS Y CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//rutas
app.use("/api", botiquin_routes); //solicito el archivo de botiquin
app.use("/api", enfermedades_routes); //solicito el archivo de enfermedades
app.use("/api", partos_routes); //solicito el archivo de partos
app.use("/api", calores_routes); //solicito el archivo de calores
app.use("/api", inseminaciones_routes); //solicito el archivo de insmeinaciones
app.use("/api", produccion_lechera_routes); //solicito el archivo de produccion lechera
app.use("/api", fincas_routes); //solicito el archivo de rutas de fincas
app.use("/api", usuarios_routes); //solicito el archivo de rutas de usuarios
app.use("/api", roles_routes); //solicito el archivo de rutas de roles
app.use("/api", potreros_routes); //solicito el archivo de rutas de potreros
app.use("/api", animales_routes); //solicito el archivo de rutas de animale
app.use("/api", auth_routes); //solicito el archivo de rutas de autenticacion

//Iniciando el servidor, se indica el puerto donde escuchara
app.listen(app.get("port"), () => {
  console.log("Servidor en el puerto", app.get("port"));
});
