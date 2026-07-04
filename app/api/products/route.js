import { NextResponse } from 'next/server';
import { readProducts, createProduct } from '@/lib/store';
import { handleFileUpload } from '@/lib/blob';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '12')));
  const search = (searchParams.get('search') || '').toLowerCase();
  const author = searchParams.get('author') || '';

  let products = await readProducts();

  if (search) {
    products = products.filter(p =>
      (p.name || '').toLowerCase().includes(search) ||
      (p.description || '').toLowerCase().includes(search)
    );
  }
  if (author) {
    products = products.filter(p => p.author === author);
  }

  products.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const total = products.length;
  const pages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const data = products.slice(offset, offset + limit);

  return NextResponse.json({ data, pagination: { page, limit, total, pages } });
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

  const product = await createProduct({
    name, version, author, description, json_data: jsonData,
    json_file: jsonFilePath, image_path: imagePath,
  });

  return NextResponse.json(product, { status: 201 });
}
