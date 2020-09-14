"use strict";

const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos

var controller = {
  allInseminaciones: (req, res) => {
    const { finca_id, usuario_id, token } = req.body;
    const query =
      "SELECT inseminaciones.*, animales.nombre as nombre_animal, animales.identificacion as identificacion_animal FROM inseminaciones INNER JOIN animales ON inseminaciones.animal_id = animales.id WHERE inseminaciones.finca_id=?";
    mysqlConnection.query(query, [finca_id], (err, rows, fields) => {
      if (err) {
        return res
          .status(500)
          .send({ mensaje: "Error al obtener las inseminaciones" });
      }
      if (rows.length == 0) {
        return res
          .status(200)
          .send({ mensaje: "No hay inseminaciones para mostrar", data: [] });
      }
      return res.status(200).send({ data: rows });
    });
  },
  getInseminacionById: (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
      "select * from inseminaciones where id=?",
      [id],
      (err, rows, fields) => {
        if (err) {
          return res
            .status(500)
            .send({ mensaje: "Error al obtener la inseminación" });
        }
        if (rows.length == 0) {
          return res
            .status(404)
            .send({ mensaje: "La inseminacion no existe", data: [] });
        }
        return res.status(200).send({ data: rows[0] });
      }
    );
  },
  saveInseminacion: (req, res) => {
    const {
      finca_id,
      usuario_id,
      animal_id,
      animal_donante_id,
      donante_identificacion,
      donante_nombre,
      fecha,
      observaciones,
    } = req.body;
    const query = "INSERT INTO inseminaciones VALUES(NULL,?,?,?,?,?,?,?,?,?)";
    let fechaHoraActual = new Date();
    mysqlConnection.query(
      query,
      [
        animal_id,
        animal_donante_id,
        donante_identificacion,
        donante_nombre,
        fecha,
        observaciones,
        finca_id,
        fechaHoraActual,
        usuario_id,
      ],
      (err, result) => {
        if (!err) {
          res.send({
            mensaje: "Inseminacion creada",
            id_creado: result.insertId,
          });
        } else {
          console.log(err);
          res
            .status(500)
            .send({ mensaje: "Falló en la creación de la inseminación" });
        }
      }
    );
  },
};

module.exports = controller;
