<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Keymap Detail — KeymapHub</title>
  <meta name="description" content="View keymap details, download JSON, and copy the API endpoint.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://keymaphub.com/product.php">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Keymap Detail — KeymapHub">
  <meta property="og:description" content="View keymap details, download JSON, and copy the API endpoint.">
  <meta property="og:image" content="/mars_128x.png">
  <meta property="og:url" content="https://keymaphub.com/product.php">
  <meta name="twitter:card" content="summary">
  <link rel="icon" type="image/png" href="/mars_128x.png">
  <link rel="apple-touch-icon" href="/mars_128x.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/duotone/style.css" />
  <link rel="stylesheet" href="/assets/css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
</head>
<body class="bg-gray-950 text-gray-100 antialiased">

<nav class="fixed top-0 inset-x-0 z-50 nav-blur border-b border-gray-800/50">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <a href="/" class="flex items-center gap-2.5 group shrink-0">
        <img src="/mars_128x.png" alt="KeymapHub" class="w-9 h-9 rounded-xl object-cover shadow-lg shadow-violet-500/20">
        <span class="text-lg font-bold text-white tracking-tight">KeymapHub</span>
      </a>

      <div class="hidden md:flex items-center gap-1">
        <a href="/" class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
          <i class="ph-duotone ph-grid-four"></i> <span data-i18n="nav.browse">Browse</span>
        </a>
        <a href="/upload.php" class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
          <i class="ph-duotone ph-upload"></i> <span data-i18n="nav.upload">Upload</span>
        </a>
        <a href="/docs.php" class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
          <i class="ph-duotone ph-book-open"></i> <span data-i18n="nav.api">API</span>
        </a>
      </div>

      <div class="flex items-center gap-2">
        <button onclick="setLang('vi')" class="lang-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium bg-violet-500/20 text-white hover:bg-violet-500/30 transition-all" data-lang="vi">
          <span>🇻🇳</span>
        </button>
        <button onclick="setLang('en')" class="lang-btn flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-800/50 transition-all" data-lang="en">
          <span>🇺🇸</span>
        </button>

        <button onclick="toggleMobile()" class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
          <i class="ph-duotone ph-list text-xl" id="menu-icon"></i>
        </button>
      </div>
    </div>

    <div id="mobile-nav" class="mobile-nav md:hidden">
      <div class="py-3 space-y-1 border-t border-gray-800/50">
        <a href="/" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
          <i class="ph-duotone ph-grid-four"></i> <span data-i18n="nav.browse">Browse</span>
        </a>
        <a href="/upload.php" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
          <i class="ph-duotone ph-upload"></i> <span data-i18n="nav.upload">Upload</span>
        </a>
        <a href="/docs.php" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
          <i class="ph-duotone ph-book-open"></i> <span data-i18n="nav.api">API</span>
        </a>
      </div>
    </div>
  </div>
</nav>

<main class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
  <div class="max-w-5xl mx-auto" id="app">
    <div id="loading-state" class="flex items-center justify-center py-20">
      <div class="flex items-center gap-3 text-gray-500">
        <i class="ph-duotone ph-circle-notch text-2xl animate-spin"></i>
        <span class="text-sm" data-i18n="product.loading">Loading keymap...</span>
      </div>
    </div>

    <div id="error-state" class="hidden">
      <div class="flex flex-col items-center justify-center py-20 text-center">
        <i class="ph-duotone ph-magnifying-glass text-6xl text-gray-700 mb-4"></i>
        <h2 class="text-xl font-bold text-gray-400 mb-1" data-i18n="product.not_found_title">Keymap not found</h2>
        <p class="text-gray-600 text-sm mb-6" data-i18n="product.not_found_desc">The keymap you're looking for doesn't exist or has been removed.</p>
        <a href="/" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold hover:from-violet-400 hover:to-purple-500 transition-all">
          <i class="ph-duotone ph-arrow-left"></i>
          <span data-i18n="product.not_found_btn">Browse Keymaps</span>
        </a>
      </div>
    </div>

    <div id="content" class="hidden">
      <a href="/" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-6">
        <i class="ph-duotone ph-arrow-left"></i>
        <span data-i18n="back">Back to Browse</span>
      </a>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div class="lg:col-span-2">
          <div id="product-image" class="rounded-2xl overflow-hidden bg-gray-900/50 border border-gray-800/50">
            <div class="w-full h-64 lg:h-80 flex items-center justify-center bg-gray-800/30 text-gray-700">
              <i class="ph-duotone ph-package text-6xl"></i>
            </div>
          </div>
        </div>

        <div class="lg:col-span-3">
          <div class="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-4 sm:p-6">
            <div class="flex items-center gap-2 mb-3">
              <span id="product-version" class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-medium">
                <i class="ph-duotone ph-tag text-xs"></i>
              </span>
              <span class="text-gray-600 text-xs">•</span>
              <span id="product-date" class="text-gray-500 text-xs"></span>
            </div>

            <h1 id="product-name" class="text-xl sm:text-2xl font-bold text-white mb-1"></h1>
            <p id="product-author" class="text-gray-500 text-sm mb-4 flex items-center gap-1.5">
              <i class="ph-duotone ph-user-circle"></i>
              <span data-i18n="product.by">By</span> <strong></strong>
            </p>

            <p id="product-description" class="text-gray-400 leading-relaxed mb-6 text-sm sm:text-base"></p>

            <div class="flex flex-wrap items-center gap-2 mb-6">
              <button id="download-json-btn" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:from-violet-400 hover:to-purple-500 transition-all">
                <i class="ph-duotone ph-download"></i>
                <span data-i18n="product.download_json">Download JSON</span>
              </button>
            </div>

            <div class="mb-3">
              <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2" data-i18n="product.api_endpoint">API Endpoint</label>
              <div class="flex gap-2">
                <input id="api-url-input" type="text" readonly onclick="this.select()" class="flex-1 min-w-0 px-3 py-2 bg-gray-950 border border-gray-800 rounded-xl text-sm text-gray-400 font-mono focus:outline-none cursor-text">
                <button id="copy-endpoint-btn" class="shrink-0 px-3 py-2 rounded-xl bg-gray-800 border border-gray-700 text-gray-400 text-sm hover:text-white hover:bg-gray-700 transition-all">
                  <i class="ph-duotone ph-copy-simple"></i>
                </button>
              </div>
            </div>

            <div id="json-preview-section" class="mt-6 hidden">
              <label class="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-2" data-i18n="product.json_preview">JSON Preview</label>
              <div id="json-preview" class="json-preview"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<footer class="border-t border-gray-800/50">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <p class="text-center text-gray-600 text-sm" data-i18n="footer.text">KeymapHub — Community Keymap Sharing for Martian Launcher</p>
  </div>
</footer>

<script src="/assets/js/i18n.js"></script>
<script src="/assets/js/app.js"></script>
<script>
function toggleMobile() {
  const nav = document.getElementById('mobile-nav');
  const icon = document.getElementById('menu-icon');
  nav.classList.toggle('open');
  icon.classList.toggle('ph-list');
  icon.classList.toggle('ph-x');
}

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

if (!id) {
  document.getElementById('loading-state').classList.add('hidden');
  document.getElementById('error-state').classList.remove('hidden');
  document.getElementById('error-state').querySelector('h2').textContent = t('product.no_id');
} else {
  loadProduct(id);
}

async function loadProduct(id) {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error('Not found');
    const product = await res.json();
    renderProduct(product);
  } catch (err) {
    document.getElementById('loading-state').classList.add('hidden');
    document.getElementById('error-state').classList.remove('hidden');
  }
}

function renderProduct(product) {
  document.getElementById('loading-state').classList.add('hidden');
  document.getElementById('content').classList.remove('hidden');

  const imageContainer = document.getElementById('product-image');
  if (product.image_path) {
    imageContainer.innerHTML = `<img src="${product.image_path}" class="w-full h-64 lg:h-80 object-cover" alt="${escapeHtml(product.name)}">`;
  } else {
    imageContainer.innerHTML = `<div class="w-full h-64 lg:h-80 flex items-center justify-center bg-gray-800/30 text-gray-700"><i class="ph-duotone ph-package text-6xl"></i></div>`;
  }

  document.getElementById('product-version').innerHTML = `<i class="ph-duotone ph-tag text-xs"></i> v${escapeHtml(product.version || '1.0.0')}`;
  document.getElementById('product-date').textContent = formatDate(product.created_at);
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-author').querySelector('strong').textContent = escapeHtml(product.author || t('product.anonymous'));
  document.getElementById('product-description').textContent = product.description || t('product.no_desc');

  const apiUrl = window.location.origin + '/api/products/' + product.id;
  document.getElementById('api-url-input').value = apiUrl;

  document.getElementById('copy-endpoint-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(apiUrl).then(() => showToast(t('product.copied_endpoint')));
  });

  document.getElementById('download-json-btn').addEventListener('click', () => {
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
        showToast('Invalid JSON data', 'danger');
      }
    } else {
      showToast('No JSON data available', 'warning');
    }
  });

  if (product.json_data) {
    const section = document.getElementById('json-preview-section');
    const preview = document.getElementById('json-preview');
    section.classList.remove('hidden');
    try {
      const parsed = JSON.parse(product.json_data);
      preview.textContent = JSON.stringify(parsed, null, 2);
    } catch {
      preview.textContent = product.json_data;
    }
  }
}
</script>
</body>
</html>
