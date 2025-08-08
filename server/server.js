const express = require('express');
const cors = require('cors');
const path = require('path');      // 追加
const db = require('./db'); // 先ほどのdb.js
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// スケジュール一覧取得API
app.get('/api/schedules', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM schedules ORDER BY date');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('サーバーエラー');
  }
});

// スケジュール追加API
app.post('/api/schedules', async (req, res) => {
  const { name, date, time } = req.body;
  if (!name || !date || !time) {
    return res.status(400).json({ error: 'name, date, timeは必須です' });
  }
  try {
    const result = await db.query(
      'INSERT INTO schedules (name, date, time) VALUES ($1, $2, $3) RETURNING *',
      [name, date, time]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('サーバーエラー');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


