const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Reactビルド成果物を配信
app.use(express.static(path.join(__dirname, 'public')));

// API: スケジュール一覧取得
app.get('/api/events', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM events ORDER BY date');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('サーバーエラー');
  }
});

// API: スケジュール追加
app.post('/api/events', async (req, res) => {
  const { name, date, time } = req.body;
  if (!name || !date || !time) {
    return res.status(400).json({ error: 'name, date, timeは必須です' });
  }
  try {
    const result = await db.query(
      'INSERT INTO events (name, date, time) VALUES ($1, $2, $3) RETURNING *',
      [name, date, time]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('サーバーエラー');
  }
});

// React Router対応（全てのルートでindex.htmlを返す）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

