const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// 静的ファイル配信
app.use(express.static(path.join(__dirname, 'public')));

// PostgreSQL設定（環境変数を使うのが推奨です）
const pool = new Pool({
  user: 'youruser',
  host: 'localhost',
  database: 'yourdb',
  password: 'yourpassword',
  port: 5432,
});

// 予定一覧取得
app.get('/api/schedules', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM schedules ORDER BY date, time');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'データ取得失敗' });
  }
});

// 予定追加
app.post('/api/schedules', async (req, res) => {
  const { name, date, time } = req.body;
  if (!name || !date || !time) {
    return res.status(400).json({ error: '必須項目不足' });
  }
  try {
    await pool.query('INSERT INTO schedules (name, date, time) VALUES ($1, $2, $3)', [name, date, time]);
    res.status(201).json({ message: '予定追加成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '予定追加失敗' });
  }
});

// ポート指定で起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
