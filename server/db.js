// db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // RailwayなどのSSL必須環境用
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
