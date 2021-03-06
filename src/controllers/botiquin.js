"use strict";

const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos

var controller = {
  allMedicinas: (req, res) => {
    //const query = "SELECT botiquin.* FROM botiquin WHERE finca_id=?";
    const query =
      "SELECT botiquin.*, b.cantidad_existente FROM botiquin INNER JOIN (SELECT MAX(updated) as fecha_X, consumible_id,cantidad_existente FROM consumos GROUP BY consumible_id) b ON botiquin.id = b.consumible_id WHERE finca_id=?";
    mysqlConnection.query(query, [req.finca_id], (err, rows, fields) => {
      if (err) {
        return res
          .status(500)
          .send({ mensaje: "Error al obtener las medicinas" });
      }
      if (rows.length == 0) {
        return res
          .status(200)
          .send({ mensaje: "No hay productos para mostrar", data: [] });
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
            .send({ mensaje: "La producto no existe", data: [] });
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
      tipo,
    } = req.body;
    const query = "INSERT INTO botiquin VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?)";
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
        tipo,
        fechaHoraActual,
        req.usuario_id,
      ],
      (err, result) => {
        if (!err) {
          res.send({
            mensaje: "Producto creada",
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
