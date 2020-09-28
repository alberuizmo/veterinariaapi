"use strict";

const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos

var controller = {
  allProduccionByFinca: (req, res) => {
    let query =
      "SELECT produccion_lechera.*, animales.nombre, animales.identificacion FROM produccion_lechera INNER JOIN animales ON produccion_lechera.animal_id = animales.id WHERE produccion_lechera.finca_id=?";
    mysqlConnection.query(query, [req.finca_id], (err, rows, fields) => {
      if (err) {
        return res.status(500).send({ mensaje: "Error al obtener producción" });
      }
      if (rows.length == 0) {
        return res
          .status(200)
          .send({ mensaje: "No hay produccion para mostrar", data: [] });
      }
      return res.status(200).send({ data: rows });
    });
  },
  allProduccionBySemana: (req, res) => {
    const { semana_del_year } = req.body;
    let query =
      "SELECT produccion_lechera.*, animales.nombre, animales.identificacion FROM produccion_lechera INNER JOIN animales ON produccion_lechera.animal_id = animales.id WHERE produccion_lechera.finca_id=? and produccion_lechera.semana_del_year=?";
    mysqlConnection.query(
      query,
      [req.finca_id, semana_del_year],
      (err, rows, fields) => {
        if (err) {
          console.log(err);
          return res
            .status(500)
            .send({ mensaje: "Error al obtener producción" });
        }
        if (rows.length == 0) {
          return res
            .status(200)
            .send({ mensaje: "No hay producción para mostrar", data: [] });
        }
        return res.status(200).send({ data: rows });
      }
    );
  },
  allProduccionByAnimal: (req, res) => {
    const { animal_id } = req.body;
    let query =
      "SELECT produccion_lechera.*, animales.nombre, animales.identificacion FROM produccion_lechera INNER JOIN animales ON produccion_lechera.animal_id = animales.id WHERE produccion_lechera.finca_id=? and produccion_lechera.animal_id=?";
    mysqlConnection.query(
      query,
      [req.finca_id, animal_id],
      (err, rows, fields) => {
        if (err) {
          return res
            .status(500)
            .send({ mensaje: "Error al obtener producción" });
        }
        if (rows.length == 0) {
          return res
            .status(200)
            .send({ mensaje: "No hay producción para mostrar", data: [] });
        }
        return res.status(200).send({ data: rows });
      }
    );
  },
  produccionById: (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
      "SELECT produccion_lechera.*, animales.nombre, animales.identificacion FROM produccion_lechera INNER JOIN animales ON produccion_lechera.animal_id = animales.id WHERE produccion_lechera.id=? and finca_id=?",
      [id, req.finca_id],
      (err, rows, fields) => {
        if (err) {
          return res
            .status(500)
            .send({ mensaje: "Error al obtener la producción" });
        }
        if (rows.length == 0) {
          return res
            .status(404)
            .send({ mensaje: "La produccion no existe", data: [] });
        }
        return res.status(200).send({ data: rows[0] });
      }
    );
  },
  saveProduccion: (req, res) => {
    const {
      animal_id,
      fecha,
      hora,
      cantidad,
      semana_del_year,
      dia_de_la_semana,
      momento_del_dia,
      registro_manual,
      observaciones,
    } = req.body;

    const queryDelete =
      "DELETE FROM produccion_lechera WHERE animal_id=? and fecha=? and momento_del_dia=?";
    mysqlConnection.query(queryDelete, [animal_id, fecha, momento_del_dia]);
    const query =
      "INSERT INTO produccion_lechera VALUES(NULL, ?,?,?,?,?,?,?,?,?,?,?,?)";
    let fechaHoraActual = new Date();
    mysqlConnection.query(
      query,
      [
        animal_id,
        fecha,
        cantidad,
        hora,
        semana_del_year,
        dia_de_la_semana,
        momento_del_dia,
        registro_manual,
        observaciones,
        fechaHoraActual,
        req.usuario_id,
        req.finca_id,
      ],
      (err, result) => {
        if (!err) {
          res.send({
            mensaje: "Produccion creada",
            id_creado: result.insertId,
          });
        } else {
          console.log(err);
          res
            .status(500)
            .send({ mensaje: "Falló en la creación de la producción" });
        }
      }
    );
  },
};

module.exports = controller;
