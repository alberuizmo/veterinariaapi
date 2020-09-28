"use strict";

const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos

var controller = {
  allMedicinas: (req, res) => {
    const query = "SELECT botiquin.* FROM botiquin WHERE finca_id=?";
    mysqlConnection.query(query, [req.finca_id], (err, rows, fields) => {
      if (err) {
        return res
          .status(500)
          .send({ mensaje: "Error al obtener las medicinas" });
      }
      if (rows.length == 0) {
        return res
          .status(200)
          .send({ mensaje: "No hay medicinas para mostrar", data: [] });
      }
      return res.status(200).send({ data: rows });
    });
  },
  getMedicinaById: (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
      "select * from botiquin where id=? and finca_id=?",
      [id, req.finca_id],
      (err, rows, fields) => {
        if (err) {
          return res
            .status(500)
            .send({ mensaje: "Error al obtener la medicina" });
        }
        if (rows.length == 0) {
          return res
            .status(404)
            .send({ mensaje: "La medicina no existe", data: [] });
        }
        return res.status(200).send({ data: rows[0] });
      }
    );
  },
  saveMedicina: (req, res) => {
    const {
      codigo,
      medicina,
      cantidad,
      unidades,
      alerta,
      presentacion,
      marca,
      observaciones,
    } = req.body;
    const query = "INSERT INTO botiquin VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?)";
    let fechaHoraActual = new Date();
    mysqlConnection.query(
      query,
      [
        req.finca_id,
        codigo,
        medicina,
        cantidad,
        unidades,
        alerta,
        presentacion,
        marca,
        observaciones,
        fechaHoraActual,
        req.usuario_id,
      ],
      (err, result) => {
        if (!err) {
          res.send({
            mensaje: "Medicina creada",
            id_creado: result.insertId,
          });
        } else {
          res.status(500).send({ mensaje: "Falló en la creación" });
        }
      }
    );
  },
};

module.exports = controller;
