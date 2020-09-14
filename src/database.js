const mysql = require("mysql"); //requiero el modulo mysql

//configuro la conexion
const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cowboyDatabase",
});

//ejecuto la conexion
mysqlConnection.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("Base de datos conectada");
  }
});

//exporto la conexion
module.exports = mysqlConnection;
