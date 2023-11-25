const mysql = require("mysql2");

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tyxnjrvf_martify_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

conn.connect((err) => {
  if (err) {
    return console.log("Failed to connect to database");
  }
  return console.log("Database Connected");
});

module.exports = conn;
