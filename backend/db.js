import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // your mysql username
  password: "Vishnu@178",        // your mysql password
  database: "marksheet"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected...");
});

export default db;
