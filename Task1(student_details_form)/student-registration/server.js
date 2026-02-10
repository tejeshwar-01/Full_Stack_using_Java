require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());

// POST - Register student
app.post("/students", (req, res) => {
  const { name, email, dob, department, phone } = req.body;

  if (!name || !email || !dob || !department || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (new Date(dob) > new Date()) {
    return res.status(400).json({ message: "DOB cannot be in future" });
  }

  const sql = `
    INSERT INTO students (name, email, dob, department, phone)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.execute(sql, [name, email, dob, department, phone], (err) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Email already exists" });
      }
      return res.status(500).json(err);
    }
    res.status(201).json({ message: "Student registered successfully" });
  });
});

// GET - Fetch all students
app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
