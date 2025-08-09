const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// === PostgreSQL 接続設定 ===
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// 起動時にテーブル作成
(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schedules (
      shareId TEXT PRIMARY KEY,
      data TEXT,
      version INTEGER,
      updatedAt TEXT
    );
  `);
})().catch(err => {
  console.error('Failed to initialize DB', err);
  process.exit(1);
});

const app = express();
app.use(bodyParser.json());

// 静的ファイル配信（publicフォルダ）
app.use(express.static(path.join(__dirname, 'public')));

// ルートアクセス時に index.html を返す
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// === 新規スケジュール作成 API ===
app.post('/schedules', async (req, res) => {
  try {
    const shareId = uuidv4();
    const data = JSON.stringify(req.body.schedule || {});
    const now = new Date().toISOString();
    await pool.query(
      'INSERT INTO schedules (shareId, data, version, updatedAt) VALUES ($1, $2, $3, $4)',
      [shareId, data, 1, now]
    );
    res.json({ shareId, createdAt: now });
  } catch (err) {
    console.error('create error', err);
    res.status(500).json({ error: 'could not create' });
  }
});

// === スケジュール取得 API ===
app.get('/schedules/:shareId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM schedules WHERE shareId = $1',
      [req.params.shareId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'not found' });
    }
    const row = result.rows[0];
    res.json({
      shareId: row.shareid,
      schedule: JSON.parse(row.data),
      version: row.version,
      updatedAt: row.updatedat,
    });
  } catch (err) {
    console.error('get error', err);
    res.status(500).json({ error: 'could not get' });
  }
});

// === スケジュール更新 API（楽観的ロック） ===
app.put('/schedules/:shareId', async (req, res) => {
  try {
    const shareId = req.params.shareId;
    const clientVersion = req.body.version || 0;
    const newData = JSON.stringify(req.body.schedule || {});

    const result = await pool.query(
      'SELECT version FROM schedules WHERE shareId = $1',
      [shareId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'not found' });
    }

    const serverVersion = result.rows[0].version;
    if (clientVersion !== serverVersion) {
      return res.status(409).json({ error: 'version_conflict', serverVersion });
    }

    const newVersion = serverVersion + 1;
    const now = new Date().toISOString();

    await pool.query(
      'UPDATE schedules SET data = $1, version = $2, updatedAt = $3 WHERE shareId = $4',
      [newData, newVersion, now, shareId]
    );

    res.json({ shareId, version: newVersion, updatedAt: now });
  } catch (err) {
    console.error('update error', err);
    res.status(500).json({ error: 'could not update' });
  }
});

// === サーバ起動 ===
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server listening on port', port);
});
