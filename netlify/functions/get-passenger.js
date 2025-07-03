
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

exports.handler = async (event) => {
  const id = event.queryStringParameters.id;
  const { rows } = await pool.query('SELECT * FROM passengers WHERE unique_id=$1', [id]);
  return { statusCode: 200, body: JSON.stringify(rows[0] || {}) };
};
