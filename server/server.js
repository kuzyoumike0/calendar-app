const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// CORS設定（フロントが別ドメインの場合）
const cors = require('cors');
app.use(cors());

// 例: スケジュール一覧API
app.get('/api/schedules', (req, res) => {
  // ここにDBやファイルからスケジュールを取得する処理を書く
  res.json([
    { id: 1, name: '山田', date: '2025-08-10', time: '昼' },
    { id: 2, name: '鈴木', date: '2025-08-11', time: '夜' },
  ]);
});

// 例: スケジュール追加API
app.post('/api/schedules', (req, res) => {
  const { name, date, time } = req.body;
  // ここにDBやファイルへの保存処理を書く
  console.log(`追加: ${name} ${date} ${time}`);
  res.status(201).json({ message: 'スケジュール追加完了' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
