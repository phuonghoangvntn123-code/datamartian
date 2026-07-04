import mysql from 'mysql2/promise';

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'sql312.infinityfree.com',
      database: process.env.DB_NAME || 'if0_42331661_datamartian',
      user: process.env.DB_USER || 'if0_42331661',
      password: process.env.DB_PASS || 'gIpEsCdXpCYyU',
      waitForConnections: true,
      connectionLimit: 5,
      charset: 'utf8mb4',
    });
  }
  return pool;
}

export async function query(sql, params = []) {
  const p = getPool();
  const [rows] = await p.execute(sql, params);
  return rows;
}
