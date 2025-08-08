const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// メモリ内データ保持（SQLなし）
let schedules = [];

// 静的ファイル（React）配信
app.use(express.static(path.join(__dirname, 'public')));

// API: 予定一覧取得
app.get('/api/schedules', (req, res) => {
  res.json(schedules);
});

// API: 予定追加
app.post('/api/schedules', (req, res) => {
  const { name, date, time } = req.body;
  if (!name || !date || !time) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const newSchedule = { name, date, time };
  schedules.push(newSchedule);
  res.status(201).json(newSchedule);
});

// その他は React の index.html を返す（SPA対応）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
