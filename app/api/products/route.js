import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { handleFileUpload, deleteBlob } from '@/lib/blob';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '12')));
  const offset = (page - 1) * limit;
  const search = searchParams.get('search') || '';
  const author = searchParams.get('author') || '';

  let where = [];
  let params = [];
  if (search) {
    where.push('(name LIKE ? OR description LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }
  if (author) {
    where.push('author = ?');
    params.push(author);
  }
  const whereClause = where.length ? 'WHERE ' + where.join(' AND ') : '';

  const [totalRow] = await query(`SELECT COUNT(*) as cnt FROM products ${whereClause}`, params);
  const total = totalRow.cnt;

  const products = await query(
    `SELECT * FROM products ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  return NextResponse.json({
    data: products,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get('name');
  const version = formData.get('version') || '1.0.0';
  const author = formData.get('author') || '';
  const description = formData.get('description') || '';
  const jsonData = formData.get('json_data') || '';

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 422 });
  }

  let imagePath = null;
  let jsonFilePath = null;

  const imageFile = formData.get('image');
  if (imageFile && imageFile.size > 0) {
    const ext = imageFile.name.split('.').pop().toLowerCase();
    if (!['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
      return NextResponse.json({ error: 'Invalid image format' }, { status: 422 });
    }
    try {
      imagePath = await handleFileUpload(imageFile, 'keymaphub/images');
    } catch (e) {
      return NextResponse.json({ error: 'Image upload failed: ' + e.message }, { status: 500 });
    }
  }

  const jsonFile = formData.get('json_file');
  if (jsonFile && jsonFile.size > 0) {
    const ext = jsonFile.name.split('.').pop().toLowerCase();
    if (ext !== 'json') {
      return NextResponse.json({ error: 'Only .json files allowed' }, { status: 422 });
    }
    try {
      jsonFilePath = await handleFileUpload(jsonFile, 'keymaphub/json');
    } catch (e) {
      return NextResponse.json({ error: 'JSON upload failed: ' + e.message }, { status: 500 });
    }
  }

  const result = await query(
    `INSERT INTO products (name, version, author, description, json_data, json_file, image_path) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, version, author, description, jsonData, jsonFilePath, imagePath]
  );

  const [product] = await query('SELECT * FROM products WHERE id = ?', [result.insertId]);
  return NextResponse.json(product, { status: 201 });
}
