import { put, del } from '@vercel/blob';

export async function uploadBlob(filename, body, contentType) {
  const opts = { access: 'public', contentType };
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    opts.token = process.env.BLOB_READ_WRITE_TOKEN;
  }
  const { url } = await put(filename, body, opts);
  return url;
}

export async function deleteBlob(url) {
  if (!url) return;
  try {
    const opts = {};
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      opts.token = process.env.BLOB_READ_WRITE_TOKEN;
    }
    await del(url, opts);
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
