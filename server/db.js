const { Pool } = require('pg');

// 環境変数からDATABASE_URLを取得
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },  // RailwayのPostgresはSSL必須の場合が多い
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
