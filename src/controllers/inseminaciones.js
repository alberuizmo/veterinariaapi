"use strict";

const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos

var controller = {
  allInseminaciones: (req, res) => {
    const query =
      "SELECT inseminaciones.*, animales.nombre as nombre_animal, animales.identificacion as identificacion_animal FROM inseminaciones INNER JOIN animales ON inseminaciones.animal_id = animales.id WHERE inseminaciones.finca_id=?";
    mysqlConnection.query(query, [req.finca_id], (err, rows, fields) => {
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
      "select * from inseminaciones where id=? and finca_id=?",
      [id, req.finca_id],
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
      animal_id,
      animal_donante_id,
      donante_identificacion,
      donante_nombre,
      fecha,
      observaciones,
      artificial,
      codigo_pajilla,
    } = req.body;
    const query =
      "INSERT INTO inseminaciones VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?)";
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
        artificial,
        codigo_pajilla,
        req.finca_id,
        fechaHoraActual,
        req.usuario_id,
      ],
      (err, result) => {
        if (!err) {
          res.send({
            mensaje: "Inseminación creada",
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
