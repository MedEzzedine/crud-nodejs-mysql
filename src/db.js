import mysql from "mysql2";

let db_con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "TrueDamage",
  port: 3306,
  database: "customersdb",
});

export default db_con;
