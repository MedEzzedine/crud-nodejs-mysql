const mysql = require("mysql");

let db_con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pwd",
  port: 3306,
});

module.exports = db_con;
