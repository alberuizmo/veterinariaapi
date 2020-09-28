"use strict";

const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos

var controller = {
  allAnimales: (req, res) => {
    const query =
      "SELECT animales.*, potreros.nombre as nombre_potrero FROM potreros INNER JOIN animales ON potreros.id = animales.potrero_id WHERE potreros.finca_id=?";
    mysqlConnection.query(query, [req.finca_id], (err, rows, fields) => {
      if (err) {
        return res
          .status(500)
          .send({ mensaje: "Error al obtener los animales" });
      }
      if (rows.length == 0) {
        return res
          .status(200)
          .send({ mensaje: "No hay animales para mostrar", data: [] });
      }
      return res.status(200).send({ data: rows });
    });
  },
  getAnimalById: (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
      "SELECT animales.*, potreros.nombre as nombre_potrero FROM potreros INNER JOIN animales ON potreros.id = animales.potrero_id WHERE potreros.finca_id=? and animales.id=? ",
      [req.finca_id, id],
      (err, rows, fields) => {
        if (err) {
          return res
            .status(500)
            .send({ mensaje: "Error al obtener el animal" });
        }
        if (rows.length == 0) {
          return res
            .status(404)
            .send({ mensaje: "El animal no existe", data: [] });
        }
        return res.status(200).send({ data: rows[0] });
      }
    );
  },
  saveAnimal: (req, res) => {
    const {
      potrero_id,
      identificacion,
      codigo,
      nombre,
      nacimiento,
      comprado,
      madre_id,
      padre_id,
      padre_identificacion,
      padre_nombre,
      madre_identificacion,
      madre_nombre,
      vendedor_identificacion,
      vendedor_nombre,
      vendedor_telefono,
      sexo,
      color,
      raza,
    } = req.body;
    const query =
      "INSERT INTO animales VALUES(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    let fechaHoraActual = new Date();
    mysqlConnection.query(
      query,
      [
        potrero_id,
        identificacion,
        codigo,
        nombre,
        nacimiento,
        comprado,
        madre_id,
        padre_id,
        padre_identificacion,
        padre_nombre,
        madre_identificacion,
        madre_nombre,
        vendedor_identificacion,
        vendedor_nombre,
        vendedor_telefono,
        sexo,
        color,
        raza,
        fechaHoraActual,
        req.usuario_id,
      ],
      (err, result) => {
        if (!err) {
          res.send({
            mensaje: "Animal creado",
            id_creado: result.insertId,
          });
        } else {
          console.log(err);
          res.status(500).send({ mensaje: "Falló en la creación del animal" });
        }
      }
    );
  },
};

module.exports = controller;
