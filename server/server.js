const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// 予定取得API
app.get('/api/schedules', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM schedules ORDER BY date');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// 予定追加API
app.post('/api/schedules', async (req, res) => {
  const { name, date, time } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO schedules (name, date, time) VALUES ($1, $2, $3) RETURNING *',
      [name, date, time]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
