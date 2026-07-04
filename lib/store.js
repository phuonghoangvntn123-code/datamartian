import { put, list } from '@vercel/blob';

const DATA_PATH = 'keymaphub/data/products.json';
const TOKEN = process.env.BLOB_READ_WRITE_TOKEN;

let _urlCache = null;

async function getUrl() {
  if (_urlCache) return _urlCache;
  try {
    const { blobs } = await list({ prefix: DATA_PATH, token: TOKEN });
    _urlCache = blobs[0]?.url || null;
  } catch { _urlCache = null }
  return _urlCache;
}

export async function readProducts() {
  const url = await getUrl();
  if (!url) return [];
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    return await res.json();
  } catch { return [] }
}

async function writeProducts(products) {
  const { url } = await put(DATA_PATH, JSON.stringify(products, null, 2), {
    access: 'public',
    contentType: 'application/json',
    addRandomSuffix: false,
    token: TOKEN,
  });
  _urlCache = url;
}

export async function getProductById(id) {
  const products = await readProducts();
  return products.find(p => p.id === Number(id)) || null;
}

export async function createProduct(data) {
  const products = await readProducts();
  const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
  const now = new Date().toISOString();
  const product = { id: maxId + 1, ...data, created_at: now, updated_at: now };
  products.push(product);
  await writeProducts(products);
  return product;
}

export async function updateProductById(id, updates) {
  let products = await readProducts();
  const index = products.findIndex(p => p.id === Number(id));
  if (index === -1) return null;
  products[index] = { ...products[index], ...updates, id: products[index].id, created_at: products[index].created_at, updated_at: new Date().toISOString() };
  await writeProducts(products);
  return products[index];
}

export async function deleteProductById(id) {
  let products = await readProducts();
  const index = products.findIndex(p => p.id === Number(id));
  if (index === -1) return false;
  const removed = products.splice(index, 1)[0];
  await writeProducts(products);
  return true;
}
