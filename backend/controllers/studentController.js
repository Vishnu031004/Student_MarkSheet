import db from "../db.js";
import { Parser } from "json2csv";

// Get all students
export const getStudents = (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Add student
export const addStudent = (req, res) => {
  const { roll_no, name, subject, marks } = req.body;
  db.query(
    "INSERT INTO students (roll_no, name, subject, marks) VALUES (?, ?, ?, ?)",
    [roll_no, name, subject, marks],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Student added successfully" });
    }
  );
};

// Update student
export const updateStudent = (req, res) => {
  const { id } = req.params;
  const { roll_no, name, subject, marks } = req.body;
  db.query(
    "UPDATE students SET roll_no=?, name=?, subject=?, marks=? WHERE id=?",
    [roll_no, name, subject, marks, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Student updated successfully" });
    }
  );
};

// Delete student
export const deleteStudent = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM students WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Student deleted successfully" });
  });
};

// Export CSV
export const exportCSV = (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.status(500).json(err);

    const parser = new Parser({ fields: ["id", "roll_no", "name", "subject", "marks"] });
    const csv = parser.parse(result);

    res.header("Content-Type", "text/csv");
    res.attachment("students.csv");
    return res.send(csv);
  });
};
