import { NextResponse } from 'next/server';
import { getProductById, updateProductById, deleteProductById } from '@/lib/store';
import { handleFileUpload, deleteBlob } from '@/lib/blob';

export async function GET(request, { params }) {
  const id = await Promise.resolve(params.id);
  const product = await getProductById(id);
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(request, { params }) {
  const id = await Promise.resolve(params.id);
  const existing = await getProductById(id);
  if (!existing) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  let updates = {};
  const ct = request.headers.get('content-type') || '';

  if (ct.includes('multipart/form-data')) {
    const formData = await request.formData();
    for (const f of ['name', 'version', 'author', 'description', 'json_data']) {
      const v = formData.get(f);
      if (v !== null) updates[f] = v;
    }

    const img = formData.get('image');
    if (img && img.size > 0) {
      const ext = img.name.split('.').pop().toLowerCase();
      if (!['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
        return NextResponse.json({ error: 'Invalid image format' }, { status: 422 });
      }
      try {
        updates.image_path = await handleFileUpload(img, 'keymaphub/images');
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
        updates.json_file = await handleFileUpload(json, 'keymaphub/json');
        if (existing.json_file) deleteBlob(existing.json_file);
      } catch (e) {
        return NextResponse.json({ error: 'JSON upload failed: ' + e.message }, { status: 500 });
      }
    }
  } else {
    const body = await request.json();
    for (const f of ['name', 'version', 'author', 'description', 'json_data']) {
      if (body[f] !== undefined) updates[f] = body[f];
    }
  }

  if (!Object.keys(updates).length) {
    return NextResponse.json({ error: 'No fields to update' }, { status: 422 });
  }

  const product = await updateProductById(id, updates);
  return NextResponse.json(product);
}
