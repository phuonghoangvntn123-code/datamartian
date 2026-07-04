<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Documentation — KeymapHub</title>
  <meta name="description" content="RESTful API documentation for KeymapHub. Manage keymap layouts programmatically.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://keymaphub.com/docs.php">
  <meta property="og:type" content="website">
  <meta property="og:title" content="API Documentation — KeymapHub">
  <meta property="og:description" content="RESTful API documentation for KeymapHub. Manage keymap layouts programmatically.">
  <meta property="og:image" content="/mars_128x.png">
  <meta property="og:url" content="https://keymaphub.com/docs.php">
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
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <a href="/docs.php" class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-violet-400 bg-violet-500/10">
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
        <a href="/docs.php" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-violet-400 bg-violet-500/10">
          <i class="ph-duotone ph-book-open"></i> <span data-i18n="nav.api">API</span>
        </a>
      </div>
    </div>
  </div>
</nav>

<main class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-10 sm:mb-12">
      <div class="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20 mb-4">
        <i class="ph-duotone ph-code text-xl sm:text-2xl text-violet-400"></i>
      </div>
      <h1 class="text-2xl sm:text-3xl font-bold text-white" data-i18n="docs.title">API Documentation</h1>
      <p class="text-gray-500 mt-2 text-sm sm:text-base max-w-lg mx-auto" data-i18n="docs.desc">RESTful API for managing keymap layouts. All responses are JSON.</p>
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900/50 border border-gray-800 text-sm text-gray-400 mt-4">
        <i class="ph-duotone ph-link text-violet-400"></i>
        <span data-i18n="docs.base_url">Base URL</span>: <code class="text-violet-400 font-mono" id="base-url-display">/api</code>
      </div>
    </div>

    <!-- Sidebar + Content -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div class="lg:col-span-1">
        <nav class="lg:sticky lg:top-24 space-y-1 hidden lg:block">
          <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3" data-i18n="docs.endpoints">Endpoints</div>
          <a href="#list" class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
            <span class="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0"></span>
            GET /products
          </a>
          <a href="#get" class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
            GET /products/{id}
          </a>
          <a href="#create" class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>
            POST /products
          </a>
          <a href="#update" class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
            PUT /products/{id}
          </a>
          <a href="#upload" class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all">
            <span class="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0"></span>
            POST /upload
          </a>
        </nav>

        <select onchange="location.hash=this.value" class="lg:hidden w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-xl text-sm text-gray-400 focus:outline-none focus:border-violet-500/50">
          <option value="#list">GET /products</option>
          <option value="#get">GET /products/{id}</option>
          <option value="#create">POST /products</option>
          <option value="#update">PUT /products/{id}</option>
          <option value="#upload">POST /upload</option>
        </select>
      </div>

      <div class="lg:col-span-3 space-y-6">
        <div id="list" class="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-4 sm:p-6 scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-wider">GET</span>
            <code class="text-white font-mono text-base sm:text-lg">/api/products</code>
          </div>
          <p class="text-gray-400 text-sm mb-4">List all keymaps with pagination and search.</p>

          <h4 class="text-sm font-semibold text-white mb-3">Query Parameters</h4>
          <div class="overflow-x-auto -mx-4 sm:mx-0">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-800/50">
                  <th class="text-left py-2 px-4 sm:px-0 sm:pr-4 font-medium">Param</th>
                  <th class="text-left py-2 pr-4 font-medium">Type</th>
                  <th class="text-left py-2 pr-4 font-medium hidden sm:table-cell">Default</th>
                  <th class="text-left py-2 font-medium">Description</th>
                </tr>
              </thead>
              <tbody class="text-gray-400">
                <tr class="border-b border-gray-800/30">
                  <td class="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">page</td>
                  <td class="py-2.5 pr-4">int</td>
                  <td class="py-2.5 pr-4 hidden sm:table-cell">1</td>
                  <td class="py-2.5">Page number</td>
                </tr>
                <tr class="border-b border-gray-800/30">
                  <td class="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">limit</td>
                  <td class="py-2.5 pr-4">int</td>
                  <td class="py-2.5 pr-4 hidden sm:table-cell">12</td>
                  <td class="py-2.5">Items per page</td>
                </tr>
                <tr class="border-b border-gray-800/30">
                  <td class="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">search</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4 hidden sm:table-cell">-</td>
                  <td class="py-2.5">Search by keymap name</td>
                </tr>
                <tr>
                  <td class="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">author</td>
                  <td class="py-2.5 pr-4">string</td>
                  <td class="py-2.5 pr-4 hidden sm:table-cell">-</td>
                  <td class="py-2.5">Filter by author</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 class="text-sm font-semibold text-white mt-5 mb-3">Response</h4>
          <pre class="bg-gray-950 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-400 overflow-x-auto whitespace-pre-wrap break-all">{
  "data": [{ "id": 1, "name": "Two Finger Tap", "version": "1.0.0" }],
  "pagination": { "page": 1, "limit": 12, "total": 50, "pages": 5 }
}</pre>

          <h4 class="text-sm font-semibold text-white mt-5 mb-3">Example</h4>
          <pre class="bg-gray-950 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-400 overflow-x-auto">$ curl <span class="text-violet-400" id="ex-list">/api/products?page=1&limit=10&search=vietnam</span></pre>
        </div>

        <div id="get" class="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-4 sm:p-6 scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">GET</span>
            <code class="text-white font-mono text-base sm:text-lg">/api/products/{id}</code>
          </div>
          <p class="text-gray-400 text-sm mb-4">Get a single keymap by ID.</p>

          <h4 class="text-sm font-semibold text-white mb-3">Response</h4>
          <pre class="bg-gray-950 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-400 overflow-x-auto">{
  "id": 1,
  "name": "Two Finger Tap",
  "version": "1.0.0",
  "author": "Player123",
  "json_data": "{\"version\":1,\"controls\":[...]}"
}</pre>

          <h4 class="text-sm font-semibold text-white mt-5 mb-3">Example</h4>
          <pre class="bg-gray-950 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-400 overflow-x-auto">$ curl <span class="text-violet-400" id="ex-get">/api/products/1</span></pre>
        </div>

        <div id="create" class="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-4 sm:p-6 scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider">POST</span>
            <code class="text-white font-mono text-base sm:text-lg">/api/products</code>
          </div>
          <p class="text-gray-400 text-sm mb-4">Create a new keymap. Supports <code class="text-violet-400">multipart/form-data</code>.</p>

          <h4 class="text-sm font-semibold text-white mb-3">Fields</h4>
          <div class="overflow-x-auto -mx-4 sm:mx-0">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-800/50">
                  <th class="text-left py-2 px-4 sm:px-0 sm:pr-4 font-medium">Field</th>
                  <th class="text-left py-2 pr-4 font-medium hidden sm:table-cell">Type</th>
                  <th class="text-left py-2 font-medium">Required</th>
                </tr>
              </thead>
              <tbody class="text-gray-400">
                <tr class="border-b border-gray-800/30">
                  <td class="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">name</td>
                  <td class="py-2.5 pr-4 hidden sm:table-cell">string</td>
                  <td class="py-2.5"><span class="text-red-400">Yes</span></td>
                </tr>
                <tr class="border-b border-gray-800/30">
                  <td class="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">version</td>
                  <td class="py-2.5 pr-4 hidden sm:table-cell">string</td>
                  <td class="py-2.5">No</td>
                </tr>
                <tr class="border-b border-gray-800/30">
                  <td class="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">json_file</td>
                  <td class="py-2.5 pr-4 hidden sm:table-cell">file</td>
                  <td class="py-2.5">No</td>
                </tr>
                <tr>
                  <td class="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">image</td>
                  <td class="py-2.5 pr-4 hidden sm:table-cell">file</td>
                  <td class="py-2.5">No</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 class="text-sm font-semibold text-white mt-5 mb-3">Example (cURL)</h4>
          <pre class="bg-gray-950 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-400 overflow-x-auto">$ curl -X POST <span class="text-violet-400" id="ex-create">/api/products</span> \
  -F "name=Two Finger Tap" \
  -F "version=1.0.0" \
  -F "image=@screenshot.jpg"</pre>
        </div>

        <div id="update" class="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-4 sm:p-6 scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider">PUT</span>
            <code class="text-white font-mono text-base sm:text-lg">/api/products/{id}</code>
          </div>
          <p class="text-gray-400 text-sm mb-4">Update an existing keymap.</p>
          <h4 class="text-sm font-semibold text-white mb-3">Example</h4>
          <pre class="bg-gray-950 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-400 overflow-x-auto">$ curl -X PUT <span class="text-violet-400" id="ex-update">/api/products/1</span> \
  -F "name=Updated Name"</pre>
        </div>

        <div id="upload" class="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-4 sm:p-6 scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-400 text-xs font-bold uppercase tracking-wider">POST</span>
            <code class="text-white font-mono text-base sm:text-lg">/api/upload</code>
          </div>
          <p class="text-gray-400 text-sm mb-4">Upload a file (JSON keymap or preview image) to Vercel Blob. Returns a public URL.</p>

          <h4 class="text-sm font-semibold text-white mb-3">Fields</h4>
          <div class="overflow-x-auto -mx-4 sm:mx-0">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-gray-500 text-xs uppercase tracking-wider border-b border-gray-800/50">
                  <th class="text-left py-2 px-4 sm:px-0 sm:pr-4 font-medium">Field</th>
                  <th class="text-left py-2 pr-4 font-medium hidden sm:table-cell">Type</th>
                  <th class="text-left py-2 font-medium">Required</th>
                </tr>
              </thead>
              <tbody class="text-gray-400">
                <tr class="border-b border-gray-800/30">
                  <td class="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">file</td>
                  <td class="py-2.5 pr-4 hidden sm:table-cell">file</td>
                  <td class="py-2.5"><span class="text-red-400">Yes</span></td>
                </tr>
                <tr>
                  <td class="py-2.5 px-4 sm:px-0 sm:pr-4 font-mono text-violet-400">type</td>
                  <td class="py-2.5 pr-4 hidden sm:table-cell">string</td>
                  <td class="py-2.5">No (<code class="text-gray-500">json</code> or <code class="text-gray-500">image</code>, default: <code class="text-gray-500">json</code>)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 class="text-sm font-semibold text-white mt-5 mb-3">Response</h4>
          <pre class="bg-gray-950 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-400 overflow-x-auto">{
  "url": "https://xxxx.blob.vercel-storage.com/...",
  "pathname": "keymaphub/json/abc123.json",
  "type": "json",
  "size": 1234
}</pre>

          <h4 class="text-sm font-semibold text-white mt-5 mb-3">Example (cURL)</h4>
          <pre class="bg-gray-950 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-gray-400 overflow-x-auto">$ curl -X POST <span class="text-violet-400" id="ex-upload">/api/upload</span> \
  -F "file=@keymap.json" \
  -F "type=json"

$ curl -X POST <span class="text-violet-400">/api/upload</span> \
  -F "file=@screenshot.png" \
  -F "type=image"</pre>
        </div>

      </div>
    </div>
  </div>
</main>

<footer class="border-t border-gray-800/50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

const baseUrl = window.location.origin + '/api';
document.getElementById('base-url-display').textContent = baseUrl;
document.querySelectorAll('[id^="ex-"]').forEach(el => {
  el.textContent = baseUrl + el.textContent;
});
</script>
</body>
</html>
