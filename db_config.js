const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vishnu@178',       // your MySQL password (keep it blank if none)
  database: 'gradebook'
});

db.connect((err) => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    console.log('✅ MySQL connected');
  }
});

module.exports = db;
