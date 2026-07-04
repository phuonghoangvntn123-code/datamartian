import { NextResponse } from 'next/server';
import { readProducts } from '@/lib/store';

export async function GET() {
  try {
    const products = await readProducts();
    return NextResponse.json({ status: 'ok', store: 'vercel-blob', product_count: products.length });
  } catch (e) {
    return NextResponse.json({ status: 'error', message: e.message }, { status: 500 });
  }
}
