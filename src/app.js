import express from "express";
import path from "path";
import morgan from "morgan";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const db_con = require("./db.cjs");
var databaseExists = false;

import customerRoutes from "./routes/customer.routes.js";
import { fileURLToPath } from "url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// routes
app.use(customerRoutes);

// static files
app.use(express.static(path.join(__dirname, "public")));

db_con.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    databaseExists = true;
    console.log("connected to Database");
  }

  const databaseName = "customersdb";
  const createQuery = `CREATE DATABASE ${databaseName};`;
  const useQuery = `use ${databaseName};`;
  const createTableQuery =
    "CREATE TABLE customer (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50) NOT NULL, address VARCHAR(100) NOT NULL, phone VARCHAR(15));";

  if (!databaseExists) {
    try {
      db_con.query(createQuery, (err) => {
        if (err) throw err;

        console.log("Database created successfully!");
        db_con.query(useQuery, (err1) => {
          if (err1) throw err1;
          console.log("Used database successfully!");
          db_con.query(createTableQuery, (err2) => {
            if (err2) throw err2;
            console.log("Created table successfully!");
          });
        });
      });
    } catch (error) {
      console.log(`Database ${databaseName} already exists`);
    }
  }
});

// starting the server
export default app;
