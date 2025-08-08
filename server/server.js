const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

// データファイル
const DATA_FILE = path.join(__dirname, "data", "calendar.json");

// 静的ファイル配信（Reactビルド成果物）
app.use(express.static(path.join(__dirname, "public")));

// 全員分のスケジュール取得
app.get("/api/shared/:date", (req, res) => {
  const { date } = req.params;
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const filtered = data.filter((d) => d.date === date);
  res.json(filtered);
});

// 個人スケジュール登録
app.post("/api/schedule", (req, res) => {
  const { date, time_slot, description } = req.body;
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

  // 既存のスロット更新 or 追加
  const idx = data.findIndex(
    (d) => d.date === date && d.time_slot === time_slot
  );
  if (idx >= 0) {
    data[idx].participant_count += 1;
  } else {
    data.push({
      date,
      time_slot,
      participant_count: 1,
      description
    });
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.json({ message: "スケジュール登録完了" });
});

// Reactのルーティング対応
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
