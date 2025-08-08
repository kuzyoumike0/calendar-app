const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },  // RailwayのPostgresはSSL必須
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
