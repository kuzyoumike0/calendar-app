const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./db'); // DB接続用モジュール
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// 静的ファイル配信（Reactビルド成果物）
app.use(express.static(path.join(__dirname, 'public')));

// API: 予定一覧取得
app.get('/api/schedules', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM schedules ORDER BY date');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('サーバーエラー');
  }
});

// API: 予定追加
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

// Reactの全ルートに対応（React Router対応）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
