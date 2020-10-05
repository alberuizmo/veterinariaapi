"use strict";

const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos

var controller = {
  allConsumos: (req, res) => {
    const query =
      "SELECT consumos.*, botiquin.codigo, botiquin.medicina, botiquin.unidades, botiquin.marca FROM consumos INNER JOIN botiquin ON botiquin.id=consumos.consumible_id WHERE consumos.finca_id=?";
    mysqlConnection.query(query, [req.finca_id], (err, rows, fields) => {
      if (err) {
        return res
          .status(500)
          .send({ mensaje: "Error al obtener los consumos" });
      }
      if (rows.length == 0) {
        return res
          .status(200)
          .send({ mensaje: "No hay consumos para mostrar", data: [] });
      }
      return res.status(200).send({ data: rows });
    });
  },
  getConsumoById: (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
      "SELECT consumos.*, botiquin.codigo, botiquin.medicina, botiquin.unidades, botiquin.marca FROM consumos INNER JOIN botiquin ON botiquin.id=consumos.consumible_id where id=? and finca_id=?",
      [id, req.finca_id],
      (err, rows, fields) => {
        if (err) {
          return res
            .status(500)
            .send({ mensaje: "Error al obtener el consumo" });
        }
        if (rows.length == 0) {
          return res
            .status(404)
            .send({ mensaje: "El consumo no existe", data: [] });
        }
        return res.status(200).send({ data: rows[0] });
      }
    );
  },
  saveConsumo: (req, res) => {
    const {
      consumible_id,
      cantidad_consumida,
      cantidad_existente,
      observaciones,
      tipo_movimiento,
    } = req.body;
    const query = "INSERT INTO consumos VALUES(NULL,?,?,?,?,?,?,?,?)";
    let fechaHoraActual = new Date();
    mysqlConnection.query(
      query,
      [
        req.finca_id,
        consumible_id,
        cantidad_consumida,
        cantidad_existente,
        observaciones,
        tipo_movimiento,
        fechaHoraActual,
        req.usuario_id,
      ],
      (err, result) => {
        if (!err) {
          res.send({
            mensaje: "Consumo creada",
            id_creado: result.insertId,
          });
        } else {
          console.log(err);
          res.status(500).send({ mensaje: "Falló en la creación" });
        }
      }
    );
  },
};

module.exports = controller;
