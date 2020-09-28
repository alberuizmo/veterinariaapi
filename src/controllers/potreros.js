"use strict";

const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos

var controller = {
  allPotreros: (req, res) => {
    const query =
      "SELECT potreros.*, fincas.nombre as nombre_finca FROM potreros INNER JOIN fincas ON potreros.finca_id = fincas.id WHERE potreros.finca_id=?";
    mysqlConnection.query(query, [req.finca_id], (err, rows, fields) => {
      if (err) {
        return res
          .status(500)
          .send({ mensaje: "Error al obtener los potrero" });
      }
      if (rows.length == 0) {
        return res
          .status(200)
          .send({ mensaje: "No hay porteros para mostrar", data: [] });
      }
      return res.status(200).send({ data: rows });
    });
  },
  getPotreroById: (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
      "select * from potreros where id=? and finca_id=?",
      [id, req.finca_id],
      (err, rows, fields) => {
        if (err) {
          return res
            .status(500)
            .send({ mensaje: "Error al obtener el potrero" });
        }
        if (rows.length == 0) {
          return res
            .status(404)
            .send({ mensaje: "No hay porteros para mostrar", data: [] });
        }
        return res.status(200).send({ data: rows[0] });
      }
    );
  },
  savePotrero: (req, res) => {
    const { identificacion, nombre } = req.body;
    const query = "INSERT INTO potreros VALUES(NULL, ?, ?,?,?,?)";
    let fechaHoraActual = new Date();
    mysqlConnection.query(
      query,
      [req.finca_id, identificacion, nombre, fechaHoraActual, req.usuario_id],
      (err, result) => {
        if (!err) {
          res.send({
            mensaje: "Potrero creado",
            id_creado: result.insertId,
          });
        } else {
          res.status(500).send({ mensaje: "Falló en la creación", error: err });
        }
      }
    );
  },
};

module.exports = controller;
