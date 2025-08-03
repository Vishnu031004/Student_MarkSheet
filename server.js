const express = require('express');
const path = require('path');
const db = require('./db_config');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Insert new record
app.post('/add', (req, res) => {
  const { name, subject, marks } = req.body;
  db.query('INSERT INTO grades (name, subject, marks) VALUES (?, ?, ?)', [name, subject, marks], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// Fetch all records
app.get('/grades', (req, res) => {
  db.query('SELECT * FROM grades', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Average marks
app.get('/average', (req, res) => {
  db.query('SELECT AVG(marks) AS average FROM grades', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result[0]);
  });
});

// Top performer(s)
app.get('/top', (req, res) => {
  db.query('SELECT * FROM grades WHERE marks = (SELECT MAX(marks) FROM grades)', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// CSV Export (optional basic route)
app.get('/export', (req, res) => {
  db.query('SELECT * FROM grades', (err, results) => {
    if (err) return res.status(500).send(err);
    const header = 'Name,Subject,Marks\n';
    const rows = results.map(r => `${r.name},${r.subject},${r.marks}`).join('\n');
    res.attachment('grades.csv');
    res.send(header + rows);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
