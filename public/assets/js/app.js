const API_BASE = '/api';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const lang = (typeof currentLang !== 'undefined') ? currentLang + '-VN' : 'vi-VN';
  return d.toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' });
}

function truncate(str, len = 100) {
  if (!str) return '';
  return str.length > len ? str.substring(0, len) + '...' : str;
}

function renderProductCard(product) {
  const _t = typeof t !== 'undefined' ? t : (k => k);
  const imgHtml = product.image_path
    ? `<img src="${product.image_path}" class="w-full h-48 object-cover" alt="${escapeHtml(product.name)}" loading="lazy">`
    : `<div class="w-full h-48 bg-gray-800/50 flex items-center justify-center"><i class="ph-duotone ph-package text-5xl text-gray-600"></i></div>`;

  return `
    <div class="col-span-1">
      <a href="/product/${product.id}" class="block group">
        <div class="bg-gray-900/50 border border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-violet-500/30 group-hover:shadow-lg group-hover:shadow-violet-500/5 group-hover:-translate-y-1">
          ${imgHtml}
          <div class="p-4">
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-medium">
                <i class="ph-duotone ph-tag text-xs"></i>
                v${escapeHtml(product.version || '1.0.0')}
              </span>
              <span class="text-gray-500 text-xs">${formatDate(product.created_at)}</span>
            </div>
            <h3 class="font-semibold text-gray-100 mb-1 truncate group-hover:text-violet-400 transition-colors">${escapeHtml(product.name)}</h3>
            <p class="text-gray-500 text-sm leading-relaxed line-clamp-2">${escapeHtml(truncate(product.description, 80))}</p>
            <div class="flex items-center gap-1.5 mt-3 text-gray-500 text-xs">
              <i class="ph-duotone ph-user-circle"></i>
              <span>${escapeHtml(product.author || _t('product.anonymous'))}</span>
            </div>
          </div>
          <div class="px-4 py-3 border-t border-gray-800/50 flex items-center justify-between">
            <span class="text-gray-500 text-xs flex items-center gap-1">
              ${product.json_file ? '<i class="ph-duotone ph-file-js"></i> ' + _t('section.json') : ''}
              ${product.json_data ? '<i class="ph-duotone ph-code"></i> ' + _t('section.data') : ''}
              ${!product.json_file && !product.json_data ? '<i class="ph-duotone ph-eye"></i> ' + _t('section.view') : ''}
            </span>
            <span class="text-violet-400 text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              ${_t('section.view')} <i class="ph-duotone ph-arrow-right text-xs"></i>
            </span>
          </div>
        </div>
      </a>
    </div>`;
}

async function loadProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  try {
    const res = await fetch(`${API_BASE}/products${query ? '?' + query : ''}`);
    return await res.json();
  } catch (err) {
    console.error('Failed to load products:', err);
    return { data: [], pagination: { page: 1, pages: 1, total: 0 } };
  }
}

function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:8px';
    document.body.appendChild(container);
  }
  const colors = {
    success: 'bg-emerald-600',
    danger: 'bg-red-600',
    warning: 'bg-amber-600',
    info: 'bg-violet-600',
  };
  const icons = {
    success: 'ph-check-circle',
    danger: 'ph-x-circle',
    warning: 'ph-warning',
    info: 'ph-info',
  };
  const toast = document.createElement('div');
  toast.className = `flex items-center gap-2.5 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg ${colors[type] || 'bg-violet-600'} animate-slide-in`;
  toast.innerHTML = `<i class="ph-duotone ${icons[type] || 'ph-info'} text-lg"></i> ${message}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes slide-in {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .animate-slide-in { animation: slide-in 0.3s ease; }
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
document.head.appendChild(style);
