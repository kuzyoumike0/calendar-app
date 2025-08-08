// db.js

const { Pool } = require('pg');

// PostgreSQL接続情報（必要に応じて書き換えてください）
const pool = new Pool({
  user: 'PostgreSQL',       // PostgreSQLのユーザー名
  host: 'localhost',          // DBホスト名（例: 'localhost'）
  database: 'mycalendar',   // 使用するデータベース名
  password: 'kanri_MilkSugar_0701', // パスワード
  port: 5432,                 // PostgreSQLのポート（通常は5432）
});

// クエリを実行する関数をエクスポート
module.exports = {
  query: (text, params) => pool.query(text, params),
};

