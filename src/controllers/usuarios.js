"use strict";

const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos

const signToken = (id) => {
  return jwt.sign({ id }, "mi-secreto", {
    expiresIn: 60 * 60 * 24 * 365,
  });
};

var controller = {
  allUsuarios: (req, res) => {
    const query =
      "SELECT usuarios.* FROM usuarios_fincas INNER JOIN usuarios ON usuarios_fincas.usuario_id=usuarios.id WHERE usuarios_fincas.finca_id=?";
    mysqlConnection.query(query, [req.finca_id], (err, rows, fields) => {
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
            .status(200)
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
    } = req.body;
    crypto.randomBytes(16, (err, salt) => {
      const newSalt = salt.toString("base64");
      crypto.pbkdf2(password, newSalt, 10000, 64, "sha1", (err, key) => {
        const encryptedPassword = key.toString("base64");
        //ver si existe el username
        const query = "select * from usuarios WHERE username=?";
        mysqlConnection.query(
          query,
          [username.toLowerCase()],
          (err, rows, fields) => {
            if (rows.length > 0) {
              return res
                .status(404)
                .send({ mensaje: "El username ya existe", data: [] });
            }
            const queryCreate =
              "INSERT INTO usuarios VALUES(NULL, ?, ?,?,?,?,?,?,?,?,?)";
            let fechaHoraActual = new Date();
            mysqlConnection.query(
              queryCreate,
              [
                identificacion,
                username.toLowerCase(),
                nombre,
                apellidos,
                telefono,
                email,
                encryptedPassword,
                0,
                newSalt,
                fechaHoraActual,
              ],
              (err, result) => {
                if (!err) {
                  res.send({
                    mensaje: "Usuario creado",
                    id_creado: result.insertId,
                  });
                } else {
                  res.status(500).send({ mensaje: "Falló la creación" });
                }
              }
            );
          }
        );
      });
    });
  },
  saveUsuarioFinca: (req, res) => {
    const { usuario_id } = req.body;
    const query = "INSERT INTO usuarios_fincas VALUES(NULL, ?, ?,?)";
    let fechaHoraActual = new Date();
    mysqlConnection.query(
      query,
      [usuario_id, req.finca_id, fechaHoraActual],
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
  saveUsuarioFincaAdmin: (req, res) => {
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
  register: (req, res) => {
    const {
      identificacion,
      username,
      nombre,
      apellidos,
      telefono,
      email,
      password,
    } = req.body;
    crypto.randomBytes(16, (err, salt) => {
      const newSalt = salt.toString("base64");
      crypto.pbkdf2(password, newSalt, 10000, 64, "sha1", (err, key) => {
        const encryptedPassword = key.toString("base64");
        //ver si existe el username
        const query = "select * from usuarios WHERE username=?";
        mysqlConnection.query(
          query,
          [username.toLowerCase()],
          (err, rows, fields) => {
            if (rows.length > 0) {
              return res
                .status(404)
                .send({ mensaje: "El username ya existe", data: [] });
            }
            const queryCreate =
              "INSERT INTO usuarios VALUES(NULL, ?, ?,?,?,?,?,?,?,?,?)";
            let fechaHoraActual = new Date();
            mysqlConnection.query(
              queryCreate,
              [
                identificacion,
                username.toLowerCase(),
                nombre,
                apellidos,
                telefono,
                email,
                encryptedPassword,
                1,
                newSalt,
                fechaHoraActual,
              ],
              (err, result) => {
                if (!err) {
                  res.send({
                    mensaje: "Usuario creado",
                    id_creado: result.insertId,
                  });
                } else {
                  res.status(500).send({ mensaje: "Falló la creación" });
                }
              }
            );
          }
        );
      });
    });
  },
  login: (req, res) => {
    const { password, username } = req.body;
    const query =
      "SELECT usuarios.*, usuarios_fincas.finca_id FROM `usuarios` INNER JOIN usuarios_fincas ON usuarios.id = usuarios_fincas.usuario_id WHERE usuarios.username=?";
    mysqlConnection.query(query, [username], (err, rows, fields) => {
      if (err) {
        return res.status(500).send({ mensaje: "Error al obtener el usuario" });
      }
      if (rows.length == 0) {
        return res.status(200).send({
          mensaje: "Usuario y/o contraseña incorrecto 1",
          token: null,
        });
      }
      let dataUsuario = rows[0];
      crypto.pbkdf2(
        password,
        dataUsuario.salt,
        10000,
        64,
        "sha1",
        (err, key) => {
          const encryptedPassword = key.toString("base64");
          if (dataUsuario.password === encryptedPassword) {
            //generar token
            const token = signToken(dataUsuario.id);
            let idFinca = dataUsuario.finca_id;
            let queryFinca = "Select * from fincas where id=?";
            mysqlConnection.query(
              queryFinca,
              [idFinca],
              (err, rows, fields) => {
                if (err) {
                  return res
                    .status(500)
                    .send({ mensaje: "Error al obtener el usuario" });
                }
                if (rows.length == 0) {
                  return res.status(200).send({
                    mensaje: "Usuario y/o contraseña incorrecto 2",
                    token: null,
                  });
                }
                let dataFinca = rows[0];
                return res.status(200).send({
                  usuario: {
                    identificacion: dataUsuario.identificacion,
                    username: dataUsuario.username,
                    nombre: dataUsuario.nombre,
                    apellidos: dataUsuario.apellidos,
                    telefono: dataUsuario.telefono,
                    email: dataUsuario.email,
                    admin_finca: dataUsuario.admin_finca,
                    finca_id: dataUsuario.finca_id,
                  },
                  finca: {
                    id: dataFinca.id,
                    nombre: dataFinca.nombre,
                    direccion: dataFinca.direccion,
                    cx: dataFinca.cx,
                    cy: dataFinca.cy,
                  },
                  token: token,
                });
              }
            );
          } else {
            return res.status(200).send({
              mensaje: "Usuario y/o contraseña incorrecto 3",
              token: null,
            });
          }
        }
      );
    });
  },
};

module.exports = controller;
