import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const [row] = await query('SELECT COUNT(*) as cnt FROM products');
    return NextResponse.json({ status: 'ok', database: 'connected', product_count: row.cnt });
  } catch (e) {
    return NextResponse.json({ status: 'error', message: e.message }, { status: 500 });
  }
}
