const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// PostgreSQL 接続設定
const pool = new Pool({
  user: 'your_pg_user',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_pg_password',
  port: 5432,
});

// ミドルウェア
app.use(cors());
app.use(bodyParser.json());

// 📌 スケジュール取得 API
app.get('/api/schedules', async (req, res) => {
  const { date } = req.query;

  try {
    const result = await pool.query(
      'SELECT * FROM schedules WHERE date = $1 ORDER BY time_slot, user_name',
      [date]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 📌 スケジュール追加 API
app.post('/api/schedules', async (req, res) => {
  const { user_name, date, time_slot, content } = req.body;

  try {
    await pool.query(
      'INSERT INTO schedules (user_name, date, time_slot, content) VALUES ($1, $2, $3, $4)',
      [user_name, date, time_slot, content]
    );
    res.status(201).json({ message: 'Schedule added' });
  } catch (error) {
    console.error('Error inserting schedule:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// サーバー起動
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
