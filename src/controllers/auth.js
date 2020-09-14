"use strict";

const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos

var controller = {
  login: (req, res) => {
    const { password, username } = req.body;
    const query =
      "SELECT usuarios.*, usuarios_fincas.finca_id FROM `usuarios` INNER JOIN usuarios_fincas ON usuarios.id = usuarios_fincas.usuario_id WHERE username=? and password=?";
    mysqlConnection.query(query, [username, password], (err, rows, fields) => {
      if (err) {
        return res.status(500).send({ mensaje: "Error al obtener el usuario" });
      }
      if (rows.length == 0) {
        return res
          .status(200)
          .send({ mensaje: "El usuario no existe", token: null });
      }
      let dataUsuario = rows[0];
      let idFinca = rows[0].finca_id;
      let queryFinca = "Select * from fincas where id=?";
      mysqlConnection.query(queryFinca, [idFinca], (err, rows, fields) => {
        if (err) {
          return res
            .status(500)
            .send({ mensaje: "Error al obtener el usuario" });
        }
        if (rows.length == 0) {
          return res
            .status(200)
            .send({ mensaje: "El usuario no existe", token: null });
        }
        let dataFinca = rows[0];
        return res
          .status(200)
          .send({ usuario: dataUsuario, finca: dataFinca, token: "xxxxxxx" });
      });
    });
  },
};

module.exports = controller;
