"use strict";

const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos

var controller = {
  allUsuarios: (req, res) => {
    const { finca_id, usuario_id, token } = req.body;
    const query =
      "SELECT usuarios.* FROM usuarios_fincas INNER JOIN usuarios ON usuarios_fincas.usuario_id=usuarios.id WHERE usuarios_fincas.finca_id=?";

    mysqlConnection.query(query, [finca_id], (err, rows, fields) => {
      if (err) {
        return res
          .status(500)
          .send({ err, mensaje: "Error al obtener todos los usuarios" });
      }
      if (rows.length == 0) {
        return res
          .status(404)
          .send({ mensaje: "No se encontraron usuarios", data: [] });
      }
      return res.status(200).send({ data: rows });
    });
  },
  getUsuarioById: (req, res) => {
    const id = req.params.id;
    mysqlConnection.query(
      "select usuarios.*, usuarios_roles.rol_id from usuarios INNER JOIN usuarios_roles ON usuarios_roles.usuario_id=usuarios.id WHERE usuarios.id=?",
      [id],
      (err, rows, fields) => {
        if (err) {
          return res
            .status(500)
            .send({ mensaje: "Error al obtener el usuario" });
        }
        if (rows.length == 0) {
          return res
            .status(404)
            .send({ mensaje: "El usuario no existe", data: [] });
        }
        return res.status(200).send({ data: rows[0] });
      }
    );
  },
  saveUsuario: (req, res) => {
    const {
      identificacion,
      username,
      nombre,
      apellidos,
      telefono,
      email,
      password,
      type,
    } = req.body;

    const query = "INSERT INTO usuarios VALUES(NULL, ?, ?,?,?,?,?,?,?,?)";
    let fechaHoraActual = new Date();
    mysqlConnection.query(
      query,
      [
        identificacion,
        username.toLowerCase(),
        nombre,
        apellidos,
        telefono,
        email,
        password,
        type,
        fechaHoraActual,
      ],
      (err, result) => {
        if (!err) {
          res.send({
            mensaje: "Usuario creado",
            id_creado: result.insertId,
          });
        } else {
          res.status(500).send({ mensaje: "Al falló en la consulta" });
        }
      }
    );
  },
  saveUsuarioFinca: (req, res) => {
    const { usuario_id, finca_id } = req.body;
    const query = "INSERT INTO usuarios_fincas VALUES(NULL, ?, ?,?)";
    let fechaHoraActual = new Date();
    mysqlConnection.query(
      query,
      [usuario_id, finca_id, fechaHoraActual],
      (err, rows, fields) => {
        if (!err) {
          res.status(200).send({ mensaje: "Relación Usuario-Finca creada" });
        } else {
          res
            .status(500)
            .send({ mensaje: "Error al crear relación Usuario-Finca" });
        }
      }
    );
  },
  saveUsuarioRol: (req, res) => {
    const { usuario_id, rol_id } = req.body;
    const query = "INSERT INTO usuarios_roles VALUES(NULL, ?, ?,?)";
    let fechaHoraActual = new Date();
    mysqlConnection.query(
      query,
      [usuario_id, rol_id, fechaHoraActual],
      (err, rows, fields) => {
        if (!err) {
          res.status(200).send({ mensaje: "Relación Usuario-Rol creada" });
        } else {
          res
            .status(500)
            .send({ mensaje: "Error al crear relación Usuario-Rol" });
        }
      }
    );
  },
};

module.exports = controller;
