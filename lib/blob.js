import { put, del } from '@vercel/blob';

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

export async function uploadBlob(filename, body, contentType) {
  const { url } = await put(filename, body, {
    access: 'public',
    contentType,
    token: BLOB_TOKEN,
  });
  return url;
}

export async function deleteBlob(url) {
  if (!url) return;
  try {
    await del(url, { token: BLOB_TOKEN });
  } catch {
  }
}

export async function handleFileUpload(file, prefix) {
  if (!file || !file.size) return null;
  const ext = file.name.split('.').pop().toLowerCase();
  const filename = `${prefix}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  return uploadBlob(filename, buffer, file.type);
}
