<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KeymapHub — Keymap Sharing for Martian Launcher</title>
  <meta name="description" content="Share and discover custom keymap layouts for Martian Launcher. Browse community-created touch control layouts for Minecraft: Java Edition on Android.">
  <meta name="keywords" content="Martian Launcher, keymap, Minecraft, Android, touch controls, keymap sharing, Minecraft launcher">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://keymaphub.com/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="KeymapHub — Keymap Sharing for Martian Launcher">
  <meta property="og:description" content="Share and discover custom keymap layouts for Martian Launcher. Browse community-created touch control layouts for Minecraft: Java Edition on Android.">
  <meta property="og:image" content="/mars_128x.png">
  <meta property="og:url" content="https://keymaphub.com/">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="KeymapHub — Keymap Sharing for Martian Launcher">
  <meta name="twitter:description" content="Share and discover custom keymap layouts for Martian Launcher.">
  <meta name="twitter:image" content="/mars_128x.png">
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
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <a href="/" class="flex items-center gap-2.5 group shrink-0">
        <img src="/mars_128x.png" alt="KeymapHub" class="w-9 h-9 rounded-xl object-cover shadow-lg shadow-violet-500/20">
        <span class="text-lg font-bold text-white tracking-tight">KeymapHub</span>
      </a>

      <div class="hidden md:flex items-center gap-1">
        <a href="/" class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-violet-400 bg-violet-500/10">
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

        <a href="/upload.php" class="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:from-violet-400 hover:to-purple-500 transition-all duration-200">
          <i class="ph-duotone ph-plus-circle"></i>
          <span data-i18n="nav.upload">Upload</span>
        </a>

        <button onclick="toggleMobile()" class="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
          <i class="ph-duotone ph-list text-xl" id="menu-icon"></i>
        </button>
      </div>
    </div>

    <div id="mobile-nav" class="mobile-nav md:hidden">
      <div class="py-3 space-y-1 border-t border-gray-800/50">
        <a href="/" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-violet-400 bg-violet-500/10">
          <i class="ph-duotone ph-grid-four"></i> <span data-i18n="nav.browse">Browse</span>
        </a>
        <a href="/upload.php" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
          <i class="ph-duotone ph-upload"></i> <span data-i18n="nav.upload">Upload</span>
        </a>
        <a href="/docs.php" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
          <i class="ph-duotone ph-book-open"></i> <span data-i18n="nav.api">API</span>
        </a>
        <a href="/upload.php" class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold sm:hidden">
          <i class="ph-duotone ph-plus-circle"></i> <span data-i18n="nav.upload">Upload</span>
        </a>
      </div>
    </div>
  </div>
</nav>

<section class="relative min-h-[420px] sm:min-h-[500px] flex items-center pt-16 overflow-hidden">
  <div class="absolute inset-0 hero-glow"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
    <div class="max-w-2xl">
      <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium mb-6">
        <i class="ph-duotone ph-database"></i>
        <span data-i18n="hero.badge">Keymap Sharing for Martian Launcher</span>
      </div>
      <h1 class="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-4">
        <span data-i18n="hero.title1">Discover & Share</span><br>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400" data-i18n="hero.title2">Keymap Layouts</span>
      </h1>
      <p class="text-base sm:text-lg text-gray-400 leading-relaxed mb-8 max-w-xl" data-i18n="hero.desc">
        Share your custom touch control layouts for Martian Launcher. Browse community-created keymaps for Minecraft: Java Edition on Android.
      </p>
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <a href="/upload.php" class="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:from-violet-400 hover:to-purple-500 transition-all duration-200 w-full sm:w-auto justify-center">
          <i class="ph-duotone ph-upload text-lg"></i>
          <span data-i18n="hero.btn_upload">Share Your Keymap</span>
        </a>
        <a href="/docs.php" class="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-300 font-medium hover:bg-gray-800 hover:border-gray-600 transition-all w-full sm:w-auto justify-center">
          <i class="ph-duotone ph-code text-lg"></i>
          <span data-i18n="hero.btn_docs">API Docs</span>
        </a>
      </div>
    </div>
  </div>
</section>

<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
    <div>
      <h2 class="text-xl font-bold text-white" data-i18n="section.title">Explore Keymaps</h2>
      <p class="text-gray-500 text-sm mt-1" id="result-count">Loading...</p>
    </div>
    <div class="flex items-center gap-2">
      <div class="relative flex-1 sm:flex-none">
        <i class="ph-duotone ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm"></i>
        <input type="text" id="search-input" data-i18n-placeholder="section.search" placeholder="Search keymaps..." class="w-full sm:w-56 pl-9 pr-3 py-2 bg-gray-900/50 border border-gray-800 rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all">
      </div>
      <select id="limit-select" class="px-3 py-2 bg-gray-900/50 border border-gray-800 rounded-xl text-sm text-gray-400 focus:outline-none focus:border-violet-500/50 cursor-pointer shrink-0">
        <option value="12">12</option>
        <option value="24">24</option>
        <option value="48">48</option>
      </select>
    </div>
  </div>

  <div id="products-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
    <div class="col-span-full flex items-center justify-center py-20">
      <div class="flex items-center gap-3 text-gray-500">
        <i class="ph-duotone ph-circle-notch text-2xl animate-spin"></i>
        <span class="text-sm" data-i18n="section.loading">Loading keymaps...</span>
      </div>
    </div>
  </div>

  <nav id="pagination-nav" class="mt-10 hidden">
    <ul class="flex items-center justify-center gap-1.5"></ul>
  </nav>
</main>

<footer class="border-t border-gray-800/50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <p class="text-gray-600 text-sm" data-i18n="footer.text">KeymapHub — Community Keymap Sharing for Martian Launcher</p>
      <div class="flex items-center gap-4">
        <a href="/docs.php" class="text-gray-500 hover:text-gray-300 text-sm transition-colors" data-i18n="nav.api">API</a>
        <a href="/upload.php" class="text-gray-500 hover:text-gray-300 text-sm transition-colors" data-i18n="nav.upload">Upload</a>
      </div>
    </div>
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

let currentPage = 1;
let totalPages = 1;

async function fetchProducts() {
  const search = document.getElementById('search-input').value;
  const limit = document.getElementById('limit-select').value;
  const params = { page: currentPage, limit };
  if (search) params.search = search;

  const grid = document.getElementById('products-grid');
  const paginationNav = document.getElementById('pagination-nav');
  const resultCount = document.getElementById('result-count');

  try {
    const res = await fetch(`/api/products?${new URLSearchParams(params)}`);
    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full">
          <div class="flex flex-col items-center justify-center py-20 text-center">
            <i class="ph-duotone ph-box text-6xl text-gray-700 mb-4"></i>
            <h3 class="text-lg font-semibold text-gray-400 mb-1" data-i18n="section.empty_title">No keymaps found</h3>
            <p class="text-gray-600 text-sm mb-6" data-i18n="section.empty_desc">Be the first to share a keymap!</p>
            <a href="/upload.php" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold hover:from-violet-400 hover:to-purple-500 transition-all">
              <i class="ph-duotone ph-plus-circle"></i>
              <span data-i18n="section.empty_btn">Upload Now</span>
            </a>
          </div>
        </div>`;
      paginationNav.classList.add('hidden');
      resultCount.textContent = '0 ' + t('section.results');
      return;
    }

    grid.innerHTML = data.data.map(renderProductCard).join('');
    const r = data.pagination.total;
    resultCount.textContent = `${r} ${r !== 1 ? t('section.results') : t('section.result')}`;
    totalPages = data.pagination.pages || 1;
    renderPagination();
    translatePage();
  } catch (err) {
    grid.innerHTML = `<div class="col-span-full"><div class="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"><i class="ph-duotone ph-warning text-lg"></i> ${t('section.error')}</div></div>`;
  }
}

function renderPagination() {
  const nav = document.getElementById('pagination-nav');
  const ul = nav.querySelector('ul');
  if (totalPages <= 1) { nav.classList.add('hidden'); return; }
  nav.classList.remove('hidden');

  let html = '';
  const btnClass = 'flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-all';
  const activeClass = 'bg-violet-500/20 text-violet-400';
  const inactiveClass = 'text-gray-500 hover:text-white hover:bg-gray-800/50';

  html += `<li><button data-page="${currentPage - 1}" class="${btnClass} ${inactiveClass} ${currentPage <= 1 ? 'opacity-30 cursor-not-allowed' : ''}" ${currentPage <= 1 ? 'disabled' : ''}><i class="ph-duotone ph-caret-left"></i></button></li>`;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      html += `<li><button data-page="${i}" class="${btnClass} ${i === currentPage ? activeClass : inactiveClass}">${i}</button></li>`;
    } else if (i === currentPage - 3 || i === currentPage + 3) {
      html += `<li><span class="flex items-center justify-center w-9 h-9 text-gray-600 text-sm">...</span></li>`;
    }
  }

  html += `<li><button data-page="${currentPage + 1}" class="${btnClass} ${inactiveClass} ${currentPage >= totalPages ? 'opacity-30 cursor-not-allowed' : ''}" ${currentPage >= totalPages ? 'disabled' : ''}><i class="ph-duotone ph-caret-right"></i></button></li>`;

  ul.innerHTML = html;

  ul.querySelectorAll('button[data-page]').forEach(btn => {
    btn.addEventListener('click', () => {
      const page = parseInt(btn.dataset.page);
      if (page && page !== currentPage && !btn.disabled) {
        currentPage = page;
        fetchProducts();
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    });
  });
}

let searchTimeout;
document.getElementById('search-input').addEventListener('input', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentPage = 1;
    fetchProducts();
  }, 300);
});
document.getElementById('limit-select').addEventListener('change', () => {
  currentPage = 1;
  fetchProducts();
});

document.addEventListener('langchange', () => {
  fetchProducts();
});
fetchProducts();
</script>
</body>
</html>
