"use strict";

const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos

var controller = {
  allEnfermedades: (req, res) => {
    const query =
      "SELECT enfermedades.*, animales.nombre as nombre_animal FROM enfermedades INNER JOIN animales ON enfermedades.animal_id = animales.id WHERE enfermedades.finca_id=?";
    mysqlConnection.query(query, [req.finca_id], (err, rows, fields) => {
      if (err) {
        return res
          .status(500)
          .send({ mensaje: "Error al obtener las enfermedades" });
      }
      if (rows.length == 0) {
        return res
          .status(200)
          .send({ mensaje: "No hay enfermedades para mostrar", data: [] });
      }
      return res.status(200).send({ data: rows });
    });
  },
  getEnfermedadById: (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
      "select * from enfermedades where id=? and finca_id=?",
      [id, req.finca_id],
      (err, rows, fields) => {
        if (err) {
          return res.status(500).send({ mensaje: "La enfermedad no existe" });
        }
        if (rows.length == 0) {
          return res
            .status(200)
            .send({ mensaje: "No hay enfermedades para mostrar", data: [] });
        }
        return res.status(200).send({ data: rows[0] });
      }
    );
  },
  saveEnfermedad: (req, res) => {
    const {
      animal_id,
      enfermedad,
      sintomas,
      observaciones,
      fecha,
      tratamiento,
      come,
      bebe,
      camina,
      de_pie,
      fiebre,
      defeca,
      baja_produccion,
      herida,
      emergencia,
    } = req.body;
    const query =
      "INSERT INTO enfermedades VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    let fechaHoraActual = new Date();
    mysqlConnection.query(
      query,
      [
        animal_id,
        enfermedad,
        sintomas,
        observaciones,
        fecha,
        tratamiento,
        come,
        bebe,
        camina,
        de_pie,
        fiebre,
        defeca,
        baja_produccion,
        herida,
        emergencia,
        req.finca_id,
        fechaHoraActual,
        req.usuario_id,
      ],
      (err, result) => {
        if (!err) {
          res.send({
            mensaje: "Reporte de enfermedad creado",
            id_creado: result.insertId,
          });
        } else {
          res.status(500).send({ mensaje: "Falló en la creación del reporte" });
        }
      }
    );
  },
};

module.exports = controller;
