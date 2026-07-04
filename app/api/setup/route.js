import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const sql = `CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      version VARCHAR(50) DEFAULT '1.0.0',
      author VARCHAR(255) DEFAULT '',
      description TEXT DEFAULT NULL,
      json_data LONGTEXT DEFAULT NULL,
      json_file VARCHAR(500) DEFAULT NULL,
      image_path VARCHAR(500) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`;

    await query(sql);
    return NextResponse.json({ status: 'ok', message: 'Table created successfully' });
  } catch (e) {
    return NextResponse.json({ status: 'error', message: e.message }, { status: 500 });
  }
}
