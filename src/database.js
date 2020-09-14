const mysql = require("mysql"); //requiero el modulo mysql

//configuro la conexion
const mysqlConnection = mysql.createConnection({
  host: "sh4ob67ph9l80v61.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "dp28m724qhg8yr2u",
  password: "zgkjpgg6p5aq7kas",
  database: "svcn94uv5t83qq99v",
});

//ejecuto la conexion
mysqlConnection.connect(function (err) {
  if (err) throw err;
  console.log("Base de datos conectada");
});

//exporto la conexion
module.exports = mysqlConnection;
