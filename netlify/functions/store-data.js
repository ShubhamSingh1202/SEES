const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

exports.handler = async (event) => {
  try {
    const p = JSON.parse(event.body);
    await pool.query(
      `INSERT INTO passengers
       (unique_id,name,age,gender,from_station,to_station,coach,seat)
       VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,
       [p.unique_id,p.name,p.age,p.gender,p.from_station,p.to_station,p.coach,p.seat]
    );
    return { statusCode: 200, body: JSON.stringify({ ok:true }) };
  } catch (e) {
    return { statusCode: 500, body: e.toString() };
  }
};
