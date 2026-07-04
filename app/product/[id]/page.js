'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ProductPage() {
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [noId, setNoId] = useState(false);
  const [product, setProduct] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setNoId(true);
      setError(true);
      return;
    }
    loadProduct(id);
  }, [id]);

  async function loadProduct(id) {
    try {
      const res = await fetch(`${API_BASE}/products/${id}`);
      if (!res.ok) throw new Error('Not found');
      const data = await res.json();
      renderProduct(data);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }

  function renderProduct(product) {
    setLoading(false);
    setProduct(product);
  }

  function handleCopyEndpoint() {
    if (!product) return;
    const apiUrl = window.location.origin + '/api/products/' + product.id;
    navigator.clipboard.writeText(apiUrl).then(() => {
      if (typeof showToast !== 'undefined') {
        showToast(typeof t !== 'undefined' ? t('product.copied_endpoint') : 'Copied!');
      }
    });
  }

  function handleDownload() {
    if (!product) return;
    if (product.json_file) {
      const a = document.createElement('a');
      a.href = product.json_file;
      a.download = product.name.replace(/[^a-zA-Z0-9_-]/g, '_') + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else if (product.json_data) {
      try {
        const parsed = typeof product.json_data === 'string' ? JSON.parse(product.json_data) : product.json_data;
        const blob = new Blob([JSON.stringify(parsed, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = product.name.replace(/[^a-zA-Z0-9_-]/g, '_') + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch {
        if (typeof showToast !== 'undefined') showToast('Invalid JSON data', 'danger');
      }
    } else {
      if (typeof showToast !== 'undefined') showToast('No JSON data available', 'warning');
    }
  }

  const apiUrl = product ? window.location.origin + '/api/products/' + product.id : '';
  const jsonPreviewText = product?.json_data
    ? (() => {
        try {
          const parsed = typeof product.json_data === 'string' ? JSON.parse(product.json_data) : product.json_data;
          return JSON.stringify(parsed, null, 2);
        } catch {
          return typeof product.json_data === 'string' ? product.json_data : JSON.stringify(product.json_data);
        }
      })()
    : '';

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 nav-blur border-b border-gray-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <img src="/mars_128x.png" alt="KeymapHub" className="w-9 h-9 rounded-xl object-cover shadow-lg shadow-violet-500/20" />
              <span className="text-lg font-bold text-white tracking-tight">KeymapHub</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-grid-four"></i> <span data-i18n="nav.browse">Browse</span>
              </Link>
              <Link href="/upload" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-upload"></i> <span data-i18n="nav.upload">Upload</span>
              </Link>
              <Link href="/docs" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-book-open"></i> <span data-i18n="nav.api">API</span>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => { if (typeof setLang !== 'undefined') setLang('vi'); }} className="lang-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium bg-violet-500/20 text-white hover:bg-violet-500/30 transition-all" data-lang="vi">
                <span>🇻🇳</span>
              </button>
              <button onClick={() => { if (typeof setLang !== 'undefined') setLang('en'); }} className="lang-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-800/50 transition-all" data-lang="en">
                <span>🇺🇸</span>
              </button>

              <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className={`ph-duotone ${mobileOpen ? 'ph-x' : 'ph-list'} text-xl`}></i>
              </button>
            </div>
          </div>

          <div className={`mobile-nav md:hidden ${mobileOpen ? 'open' : ''}`}>
            <div className="py-3 space-y-1 border-t border-gray-800/50">
              <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-grid-four"></i> <span data-i18n="nav.browse">Browse</span>
              </Link>
              <Link href="/upload" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-upload"></i> <span data-i18n="nav.upload">Upload</span>
              </Link>
              <Link href="/docs" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
                <i className="ph-duotone ph-book-open"></i> <span data-i18n="nav.api">API</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto" id="app">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-3 text-gray-500">
                <i className="ph-duotone ph-circle-notch text-2xl animate-spin"></i>
                <span className="text-sm" data-i18n="product.loading">Loading keymap...</span>
              </div>
            </div>
          )}

          {error && !loading && (
            <div>
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <i className="ph-duotone ph-magnifying-glass text-6xl text-gray-700 mb-4"></i>
                <h2 className="text-xl font-bold text-gray-400 mb-1" data-i18n={noId ? 'product.no_id' : 'product.not_found_title'}>
                  {noId
                    ? (typeof t !== 'undefined' ? t('product.no_id') : 'No ID specified')
                    : (typeof t !== 'undefined' ? t('product.not_found_title') : 'Keymap not found')}
                </h2>
                {!noId && (
                  <p className="text-gray-600 text-sm mb-6" data-i18n="product.not_found_desc">
                    {typeof t !== 'undefined' ? t('product.not_found_desc') : "The keymap you're looking for doesn't exist or has been removed."}
                  </p>
                )}
                <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold hover:from-violet-400 hover:to-purple-500 transition-all">
                  <i className="ph-duotone ph-arrow-left"></i>
                  <span data-i18n="product.not_found_btn">Browse Keymaps</span>
                </Link>
              </div>
            </div>
          )}

          {product && !error && (
            <div>
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-6">
                <i className="ph-duotone ph-arrow-left"></i>
                <span data-i18n="back">Back to Browse</span>
              </Link>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <div className="rounded-2xl overflow-hidden bg-gray-900/50 border border-gray-800/50">
                    {product.image_path ? (
                      <img src={product.image_path} className="w-full h-64 lg:h-80 object-cover" alt={product.name} />
                    ) : (
                      <div className="w-full h-64 lg:h-80 flex items-center justify-center bg-gray-800/30 text-gray-700">
                        <i className="ph-duotone ph-package text-6xl"></i>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-4 sm:p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-medium">
                        <i className="ph-duotone ph-tag text-xs"></i> v{product.version || '1.0.0'}
                      </span>
                      <span className="text-gray-600 text-xs">•</span>
                      <span className="text-gray-500 text-xs">{typeof formatDate !== 'undefined' ? formatDate(product.created_at) : product.created_at}</span>
                    </div>

                    <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">{product.name}</h1>
                    <p className="text-gray-500 text-sm mb-4 flex items-center gap-1.5">
                      <i className="ph-duotone ph-user-circle"></i>
                      <span data-i18n="product.by">By</span> <strong>{product.author || (typeof t !== 'undefined' ? t('product.anonymous') : 'Anonymous')}</strong>
                    </p>

                    <p className="text-gray-400 leading-relaxed mb-6 text-sm sm:text-base">{product.description || (typeof t !== 'undefined' ? t('product.no_desc') : 'No description provided.')}</p>

                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <button onClick={handleDownload} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:from-violet-400 hover:to-purple-500 transition-all">
                        <i className="ph-duotone ph-download"></i>
                        <span data-i18n="product.download_json">Download JSON</span>
                      </button>
                    </div>

                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2" data-i18n="product.api_endpoint">API Endpoint</label>
                      <div className="flex gap-2">
                        <input id="api-url-input" type="text" readOnly onClick={(e) => e.target.select()} value={apiUrl} className="flex-1 min-w-0 px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-sm text-gray-400 font-mono focus:outline-none cursor-text" />
                        <button onClick={handleCopyEndpoint} className="shrink-0 px-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 text-sm hover:text-white hover:bg-gray-700 transition-all">
                          <i className="ph-duotone ph-copy-simple"></i>
                        </button>
                      </div>
                    </div>

                    {product.json_data && (
                      <div className="mt-6">
                        <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2" data-i18n="product.json_preview">JSON Preview</label>
                        <div className="json-preview">{jsonPreviewText}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-gray-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm" data-i18n="footer.text">KeymapHub — Community Keymap Sharing for Martian Launcher</p>
        </div>
      </footer>
    </>
  );
}
