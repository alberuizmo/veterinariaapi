"use strict";

const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos

var controller = {
  allCalores: (req, res) => {
    const { finca_id, usuario_id, token } = req.body;
    const query =
      "SELECT calores.*, animales.nombre as nombre_animal, animales.identificacion as identificacion_animal FROM calores INNER JOIN animales ON calores.animal_id = animales.id WHERE calores.finca_id=?";
    mysqlConnection.query(query, [finca_id], (err, rows, fields) => {
      if (err) {
        return res
          .status(500)
          .send({ mensaje: "Error al obtener los calores" });
      }
      if (rows.length == 0) {
        return res
          .status(200)
          .send({ mensaje: "No hay calores para mostrar", data: [] });
      }
      return res.status(200).send({ data: rows });
    });
  },
  getCalorById: (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
      "select * from calores where id=?",
      [id],
      (err, rows, fields) => {
        if (err) {
          return res.status(500).send({ mensaje: "Error al obtener el calor" });
        }
        if (rows.length == 0) {
          return res
            .status(404)
            .send({ mensaje: "El calor no existe", data: [] });
        }
        return res.status(200).send({ data: rows[0] });
      }
    );
  },
  saveCalor: (req, res) => {
    const {
      animal_id,
      fecha,
      observaciones,
      en_calor,
      post_inseminacion,
      finca_id,
      usuario_id,
    } = req.body;
    const query = "INSERT INTO calores VALUES(NULL,?,?,?,?,?,?,?,?)";
    let fechaHoraActual = new Date();
    mysqlConnection.query(
      query,
      [
        animal_id,
        fecha,
        observaciones,
        en_calor,
        post_inseminacion,
        finca_id,
        fechaHoraActual,
        usuario_id,
      ],
      (err, result) => {
        if (!err) {
          res.send({
            mensaje: "Calor creado",
            id_creado: result.insertId,
          });
        } else {
          console.log(err);
          res.status(500).send({ mensaje: "Falló en la creación del calor" });
        }
      }
    );
  },
};

module.exports = controller;
