const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// 静的ファイルをpublicフォルダから配信
app.use(express.static(path.join(__dirname, 'public')));

// Reactルーティング対応（全ての未処理ルートはindex.htmlを返す）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// APIルート例
app.get('/api/schedules', async (req, res) => {
  // ...
});

app.post('/api/schedules', async (req, res) => {
  // ...
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
