import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { handleFileUpload, deleteBlob } from '@/lib/blob';

export async function GET(request, { params }) {
  const id = await Promise.resolve(params.id);
  const [product] = await query('SELECT * FROM products WHERE id = ?', [id]);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(request, { params }) {
  const id = await Promise.resolve(params.id);

  const [existing] = await query('SELECT * FROM products WHERE id = ?', [id]);
  if (!existing) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  let fields = [];
  let values = [];
  const ct = request.headers.get('content-type') || '';

  if (ct.includes('multipart/form-data')) {
    const formData = await request.formData();
    for (const f of ['name', 'version', 'author', 'description', 'json_data']) {
      const v = formData.get(f);
      if (v !== null) { fields.push(`${f} = ?`); values.push(v); }
    }

    const img = formData.get('image');
    if (img && img.size > 0) {
      const ext = img.name.split('.').pop().toLowerCase();
      if (!['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
        return NextResponse.json({ error: 'Invalid image format' }, { status: 422 });
      }
      try {
        const url = await handleFileUpload(img, 'keymaphub/images');
        fields.push('image_path = ?'); values.push(url);
        if (existing.image_path) deleteBlob(existing.image_path);
      } catch (e) {
        return NextResponse.json({ error: 'Image upload failed: ' + e.message }, { status: 500 });
      }
    }

    const json = formData.get('json_file');
    if (json && json.size > 0) {
      const ext = json.name.split('.').pop().toLowerCase();
      if (ext !== 'json') {
        return NextResponse.json({ error: 'Only .json files allowed' }, { status: 422 });
      }
      try {
        const url = await handleFileUpload(json, 'keymaphub/json');
        fields.push('json_file = ?'); values.push(url);
        if (existing.json_file) deleteBlob(existing.json_file);
      } catch (e) {
        return NextResponse.json({ error: 'JSON upload failed: ' + e.message }, { status: 500 });
      }
    }
  } else {
    const body = await request.json();
    for (const f of ['name', 'version', 'author', 'description', 'json_data']) {
      if (body[f] !== undefined) { fields.push(`${f} = ?`); values.push(body[f]); }
    }
  }

  if (!fields.length) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 422 });
  }

  await query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, [...values, id]);
  const [product] = await query('SELECT * FROM products WHERE id = ?', [id]);
  return NextResponse.json(product);
}
