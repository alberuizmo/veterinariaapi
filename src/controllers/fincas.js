"use strict";

const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos

var controller = {
  allFincas: (req, res) => {
    mysqlConnection.query("select * from fincas", (err, rows, fields) => {
      console.log(err);
      if (err) {
        return res
          .status(500)
          .send({ err, message: "Error al obtener las fincas" });
      }
      if (rows.length == 0) {
        return res
          .status(200)
          .send({ message: "No se encontraron fincas", data: [] });
      }
      return res.status(200).send({ data: rows });
    });
  },
  getFincaById: (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
      "select * from fincas where id=?",
      [id],
      (err, rows, fields) => {
        if (err) {
          return res.status(500).send({ message: "Error al obtener la finca" });
        }
        if (rows.length == 0) {
          return res
            .status(200)
            .send({ message: "La finca no existe", data: [] });
        }
        return res.status(200).send({ data: rows[0] });
      }
    );
  },
  saveFinca: (req, res) => {
    const { nombre, direccion } = req.body;
    const query = "INSERT INTO `fincas` VALUES(NULL, ?, ?,?)";
    let fechaHoraActual = new Date();
    mysqlConnection.query(
      query,
      [nombre, direccion, fechaHoraActual],
      (err, result) => {
        if (!err) {
          res.send({
            mensaje: "Finca guardado",
            id_creado: result.insertId,
          });
        } else {
          return res.status(500).send({ message: "Error al guardar la finca" });
        }
      }
    );
  },
};

module.exports = controller;
