"use strict";

const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos

var controller = {
  allPartos: (req, res) => {
    const query =
      "SELECT partos.*, animales.nombre as nombre_animal, animales.identificacion as identificacion_animal FROM partos INNER JOIN animales ON partos.animal_id = animales.id WHERE partos.finca_id=?";
    mysqlConnection.query(query, [req.finca_id], (err, rows, fields) => {
      if (err) {
        return res.status(500).send({ mensaje: "Error al obtener los partos" });
      }
      if (rows.length == 0) {
        return res
          .status(200)
          .send({ mensaje: "No hay partos para mostrar", data: [] });
      }
      return res.status(200).send({ data: rows });
    });
  },
  getPartoById: (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
      "select * from partos where id=? and finca_id=?",
      [id, req.finca_id],
      (err, rows, fields) => {
        if (err) {
          return res.status(500).send({ mensaje: "Error al obtener el parto" });
        }
        if (rows.length == 0) {
          return res
            .status(404)
            .send({ mensaje: "El parto no existe", data: [] });
        }
        return res.status(200).send({ data: rows[0] });
      }
    );
  },
  saveParto: (req, res) => {
    const { animal_id, fecha, hijos, observaciones } = req.body;
    const query = "INSERT INTO partos VALUES(NULL,?,?,?,?,?,?,?)";
    let fechaHoraActual = new Date();
    mysqlConnection.query(
      query,
      [
        animal_id,
        fecha,
        hijos,
        observaciones,
        req.finca_id,
        fechaHoraActual,
        req.usuario_id,
      ],
      (err, result) => {
        if (!err) {
          res.send({
            mensaje: "Parto creado",
            id_creado: result.insertId,
          });
        } else {
          console.log(err);
          res.status(500).send({ mensaje: "Falló en la creación del parto" });
        }
      }
    );
  },
};

module.exports = controller;
