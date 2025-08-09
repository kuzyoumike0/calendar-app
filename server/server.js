// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const { v4: uuidv4 } = require('uuid');

(async () => {
  // SQLiteをRailwayの永続ボリュームに保存
  // Railwayでは /var/lib/containers/railwayapp/bind-mounts/ が永続化される
  const dbPath = process.env.DB_PATH || path.join(__dirname, 'schedules.db');

  const db = await open({ filename: dbPath, driver: sqlite3.Database });
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

  // 静的ファイル配信（publicフォルダ）
  app.use(express.static(path.join(__dirname, 'public')));

  // ルートアクセスでindex.htmlを返す
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  // Create new schedule
  app.post('/schedules', async (req, res) => {
    try {
      const shareId = uuidv4();
      const data = JSON.stringify(req.body.schedule || {});
      const now = new Date().toISOString();
      await db.run(
        'INSERT INTO schedule
