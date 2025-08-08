// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

// ミドルウェア設定
app.use(cors());
app.use(express.json());

// 仮のデータ格納用（本来はDB）
let schedules = [];

// スケジュール一覧取得API
app.get('/api/schedules', (req, res) => {
  res.json(schedules);
});

// スケジュール追加API
app.post('/api/schedules', (req, res) => {
  const { name, date, time } = req.body;
  if (!name || !date || !time) {
    return res.status(400).json({ error: 'name, date, timeは必須です' });
  }
  const newSchedule = { id: schedules.length + 1, name, date, time };
  schedules.push(newSchedule);
  res.status(201).json(newSchedule);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
