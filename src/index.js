require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(cors());
app.use(express.json());

app.get("/schedules", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM schedules ORDER BY schedule_date, time_slot"
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching schedules:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/schedules", async (req, res) => {
  const { name, schedule_date, time_slot } = req.body;

  if (!name || !schedule_date || !time_slot) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const insertQuery = `
      INSERT INTO schedules (name, schedule_date, time_slot)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, schedule_date, time_slot];

    const { rows } = await pool.query(insertQuery, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error inserting schedule:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
