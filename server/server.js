const express = require('express');
const bodyParser = require('body-parser');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

(async () => {
  // ローカル用にdataフォルダがなければ作成（永続化のために）
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // DBファイルパス（環境変数優先、なければ ./data/schedules.db）
  const dbFilePath = process.env.DB_PATH || path.join(dataDir, 'schedules.db');

  const db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS schedules (
      shareId TEXT PRIMARY KEY,
      data TEXT,
      version INTEGER,
      updatedAt TEXT
    );
  `);

  const app = express();
  app.use(bodyParser.json());

  // 静的ファイル配信(publicフォルダ)
  app.use(express.static(path.join(__dirname, 'public')));

  // ルートパスでindex.htmlを返す
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // 新規スケジュール作成API
  app.post('/schedules', async (req, res) => {
    try {
      const shareId = uuidv4();
      const data = JSON.stringify(req.body.schedule || {});
      const now = new Date().toISOString();
      await db.run(
        'INSERT INTO schedules (shareId, data, version, updatedAt) VALUES (?, ?, ?, ?)',
        shareId,
        data,
        1,
        now
      );
      res.json({ shareId, createdAt: now });
    } catch (err) {
      console.error('create error', err);
      res.status(500).json({ error: 'could not create' });
    }
  });

  // スケジュール取得API
  app.get('/schedules/:shareId', async (req, res) => {
    try {
      const row = await db.get(
        'SELECT * FROM schedules WHERE shareId = ?',
        req.params.shareId
      );
      if (!row) return res.status(404).json({ error: 'not found' });
      res.json({
        shareId: row.shareId,
        schedule: JSON.parse(row.data),
        version: row.version,
        updatedAt: row.updatedAt
      });
    } catch (err) {
      console.error('get error', err);
      res.status(500).json({ error: 'could not get' });
    }
  });

  // スケジュール更新API（楽観的ロック）
  app.put('/schedules/:shareId', async (req, res) => {
    try {
      const shareId = req.params.shareId;
      const clientVersion = req.body.version || 0;
      const newData = JSON.stringify(req.body.schedule || {});
      const row = await db.get(
        'SELECT version FROM schedules WHERE shareId = ?',
        shareId
      );
      if (!row) return res.status(404).json({ error: 'not found' });

      const serverVersion = row.version;
      if (clientVersion !== serverVersion) {
        return res.status(409).json({ error: 'version_conflict', serverVersion });
      }
      const newVersion = serverVersion + 1;
      const now = new Date().toISOString();
      await db.run(
        'UPDATE schedules SET data = ?, version = ?, updatedAt = ? WHERE shareId = ?',
        newData,
        newVersion,
        now,
        shareId
      );
      res.json({ shareId, version: newVersion, updatedAt: now });
    } catch (err) {
      console.error('update error', err);
      res.status(500).json({ error: 'could not update' });
    }
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log('Server listening on', port));
})();
