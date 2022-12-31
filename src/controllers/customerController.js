import db_con from "../db.js";

export const renderCustomers = (req, res) => {
  db_con.query("SELECT * FROM customer", (err, rows) => {
    res.render("customers", { customers: rows });
  });
};

export const createCustomers = (req, res) => {
  const newCustomer = req.body;
  db_con.query("INSERT INTO customer set ?", [newCustomer], () => {
    res.redirect("/");
  });
};

export const editCustomer = (req, res) => {
  const { id } = req.params;
  db_con.query("SELECT * FROM customer WHERE id = ?", [id], (err, results) => {
    res.render("customers_edit", { customer: results[0] });
  });
};

export const updateCustomer = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  db_con.query("UPDATE customer set ? WHERE id = ?", [newCustomer, id], () => {
    res.redirect("/");
  });
};

export const deleteCustomer = (req, res) => {
  const { id } = req.params;
  db_con.query("DELETE FROM customer WHERE id = ?", [id], (err, result) => {
    if (result.affectedRows === 1) {
      //res.json({ message: "Customer deleted" });
    }
    res.redirect("/");
  });
};
