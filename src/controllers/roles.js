"use strict";

const mysqlConnection = require("../database"); //requiero el archivo que hace la conexion de datos

var controller = {
  allRoles: (req, res) => {
    const query = "SELECT roles.* FROM roles WHERE finca_id=?";
    mysqlConnection.query(query, [req.finca_id], (err, rows, fields) => {
      if (err) {
        return res.status(500).send({ mensaje: "Error al obtener los roles" });
      }
      if (rows.length == 0) {
        return res.status(200).send({ mensaje: "No hay roles", data: [] });
      }
      return res.status(200).send({ data: rows });
    });
  },
  getRolById: async (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM roles WHERE id=? and finca_id=?";
    mysqlConnection.query(query, [id, req.finca_id], (err, rows, fields) => {
      if (err) {
        return res.status(500).send({ mensaje: "Error al obtener el rol" });
      }
      if (rows.length == 0) {
        return res.status(200).send({ mensaje: "El rol no existe", data: [] });
      }
      let data = {
        rol: rows[0],
      };
      const query =
        "SELECT permisos.*,permisos_roles.id as permiso_rol_id FROM permisos_roles INNER JOIN permisos ON permisos_roles.permiso_id=permisos.id WHERE permisos_roles.rol_id=?";
      mysqlConnection.query(
        query,
        [rows[0].id, rows[0].id],
        (err, rows, fields) => {
          if (err) {
            return res
              .status(500)
              .send({ mensaje: "Error al obtener el rol-permiso" });
          }
          if (rows.length == 0) {
            data["permisos"] = [];
            return res.status(200).send({ mensaje: "Rol encontrado", data });
          }
          data["permisos"] = rows;
          return res.status(200).send({ mensaje: "Rol encontrado", data });
        }
      );
    });
  },
  saveRol: (req, res) => {
    const { rol } = req.body;
    const query = "INSERT INTO roles VALUES(NULL, ?, ?,?)";
    let fechaHoraActual = new Date();
    mysqlConnection.query(
      query,
      [rol, req.finca_id, fechaHoraActual],
      (err, result) => {
        if (!err) {
          res.send({
            mensaje: "Rol creado",
            id_creado: result.insertId,
          });
        } else {
          res.status(500).send({ mensaje: "Al falló en la consulta" });
        }
      }
    );
  },
  saveRolPermiso: (req, res) => {
    const { rol_id, permisos_ids } = req.body;
    const fechaHoraActual = new Date();
    let values = [];
    for (let index = 0; index < permisos_ids.length; index++) {
      const element = permisos_ids[index];
      values.push([null, rol_id, permisos_ids[index], fechaHoraActual]);
    }
    const query = "INSERT INTO permisos_roles VALUES ?";
    mysqlConnection.query(query, [values], (err, result) => {
      if (!err) {
        res.send({
          mensaje: "Rol-Permiso creado",
          id_creado: result.insertId,
        });
      } else {
        res
          .status(500)
          .send({ mensaje: "Al falló en la creacion rol-permiso" });
      }
    });
  },
  getAllPermisos: (req, res) => {
    const query = "SELECT * FROM permisos";
    mysqlConnection.query(query, [], (err, rows, fields) => {
      if (err) {
        return res
          .status(500)
          .send({ mensaje: "Error al obtener los permisos" });
      }
      if (rows.length == 0) {
        return res.status(200).send({ mensaje: "No hay permisos", data: [] });
      }
      return res.status(200).send({ data: rows });
    });
  },
};

module.exports = controller;
