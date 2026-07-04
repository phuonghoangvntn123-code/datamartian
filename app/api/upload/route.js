import { NextResponse } from 'next/server';
import { uploadBlob } from '@/lib/blob';

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get('file');
  const type = formData.get('type') || 'json';

  if (!file || !file.size) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 422 });
  }

  const ext = file.name.split('.').pop().toLowerCase();

  if (type === 'json' && ext !== 'json') {
    return NextResponse.json({ error: 'Only .json files allowed' }, { status: 422 });
  }

  if (type === 'image') {
    if (!['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) {
      return NextResponse.json({ error: 'Invalid image format' }, { status: 422 });
    }
  }

  const prefix = type === 'image' ? 'keymaphub/images' : 'keymaphub/json';
  const filename = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const url = await uploadBlob(filename, buffer, file.type);
    return NextResponse.json({ url, pathname: filename, type, size: file.size }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Upload failed: ' + e.message }, { status: 500 });
  }
}
