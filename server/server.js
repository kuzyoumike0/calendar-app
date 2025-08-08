const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const DATA_PATH = path.join(__dirname, 'data', 'calendar.json');

// 初期化：ファイルがない場合は作成
if (!fs.existsSync(DATA_PATH)) {
  fs.writeFileSync(DATA_PATH, JSON.stringify({}), 'utf8');
}

// 予定を取得
app.get('/api/schedule', (req, res) => {
  const data = fs.readFileSync(DATA_PATH, 'utf8');
  res.json(JSON.parse(data));
});

// 予定を追加・上書き
app.post('/api/schedule', (req, res) => {
  const { date, user, slot, note } = req.body; // 例：2025-08-08, "user1", "morning", "出勤"
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const json = JSON.parse(raw);

  if (!json[date]) {
    json[date] = {};
  }
  if (!json[date][user]) {
    json[date][user] = {};
  }

  json[date][user][slot] = note;

  fs.writeFileSync(DATA_PATH, JSON.stringify(json, null, 2), 'utf8');
  res.json({ status: 'ok', saved: { date, user, slot, note } });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
