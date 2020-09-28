"use strict";

const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos
const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.sendStatus(403); //no autorizado
  }
  jwt.verify(token, "mi-secreto", (err, decoded) => {
    const { id } = decoded;
    //buscar el usuario con ese id decodificado
    const query =
      "SELECT usuarios.*, usuarios_fincas.finca_id FROM `usuarios` INNER JOIN usuarios_fincas ON usuarios.id = usuarios_fincas.usuario_id WHERE usuarios.id=?";
    mysqlConnection.query(query, [id], (err, rows, fields) => {
      if (err) {
        return res.sendStatus(403); //no autorizado
      }
      if (rows.length == 0) {
        return res.sendStatus(403); //no autorizado
      }
      req.finca_id = rows[0].finca_id;
      req.usuario_id = rows[0].id;
      req.rol = rows[0].admin_finca;
      next();
    });
  });
};

const hasRoles = (roles) => (req, res, next) => {
  if (roles.indexOf(req.rol) > -1) {
    return next();
  }
  return res.sendStatus(403); //no autorizado
};

module.exports = { isAuthenticated, hasRoles };
