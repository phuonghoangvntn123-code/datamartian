<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Share Keymap — KeymapHub</title>
  <meta name="description" content="Upload and share your custom keymap layout for Martian Launcher with the Minecraft community.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://keymaphub.com/upload.php">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Share Keymap — KeymapHub">
  <meta property="og:description" content="Upload and share your custom keymap layout for Martian Launcher with the Minecraft community.">
  <meta property="og:image" content="/mars_128x.png">
  <meta property="og:url" content="https://keymaphub.com/upload.php">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Share Keymap — KeymapHub">
  <meta name="twitter:description" content="Upload and share your custom keymap layout for Martian Launcher.">
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
        <a href="/upload.php" class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-violet-400 bg-violet-500/10">
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
        <a href="/upload.php" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-violet-400 bg-violet-500/10">
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
  <div class="max-w-3xl mx-auto">
    <div class="text-center mb-8 sm:mb-10">
      <div class="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20 mb-4">
        <i class="ph-duotone ph-upload text-xl sm:text-2xl text-violet-400"></i>
      </div>
      <h1 class="text-2xl sm:text-3xl font-bold text-white" data-i18n="upload.title">Share Keymap</h1>
      <p class="text-gray-500 mt-2 text-sm sm:text-base" data-i18n="upload.desc">Upload your custom Martian Launcher keymap layout and share it with the community.</p>
    </div>

    <div class="bg-gray-900/50 border border-gray-800/50 rounded-2xl overflow-hidden">
      <div class="px-4 sm:px-6 py-4 border-b border-gray-800/50 flex items-center gap-2.5">
        <i class="ph-duotone ph-database text-violet-400"></i>
        <span class="font-semibold text-white text-sm sm:text-base" data-i18n="upload.section_title">Keymap Information</span>
      </div>

      <div class="p-4 sm:p-6">
        <form id="upload-form" enctype="multipart/form-data">
          <div class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1.5">
                <span data-i18n="upload.name">Name</span> <span class="text-red-400">*</span>
              </label>
              <input type="text" name="name" required data-i18n-placeholder="upload.name_placeholder" placeholder="e.g. Two Finger Tap Controls" class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5" data-i18n="upload.version">Version</label>
                <input type="text" name="version" value="1.0.0" class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5" data-i18n="upload.author">Author</label>
                <input type="text" name="author" data-i18n-placeholder="upload.author_placeholder" placeholder="Your name" class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all">
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1.5">
                <span data-i18n="upload.desc_label">Description</span>
              </label>
              <textarea name="description" rows="3" data-i18n-placeholder="upload.desc_placeholder" placeholder="Describe your keymap layout, what games it works with..." class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all resize-none"></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1.5">
                <span data-i18n="upload.json_paste">JSON Data (paste directly)</span>
              </label>
              <textarea name="json_data" rows="5" data-i18n-placeholder="upload.json_placeholder" placeholder='[{"id": 1, "name": "Example"}]' class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-gray-100 placeholder-gray-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all font-mono resize-none"></textarea>
            </div>

            <div class="border-t border-gray-800/50 pt-5">
              <h3 class="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
                <i class="ph-duotone ph-folder-open text-violet-400"></i>
                <span data-i18n="upload.or_files">Or Upload Files</span>
              </h3>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2" data-i18n="upload.json_file">JSON File</label>
                  <div class="drop-zone px-6 py-8 sm:px-10 sm:py-10" id="json-dropzone">
                    <i class="ph-duotone ph-file-js text-3xl sm:text-4xl text-violet-400 mb-3 block"></i>
                    <div class="font-medium text-gray-300 mb-1 text-sm sm:text-base" data-i18n="upload.json_drop">Drop .json file here</div>
                    <div class="text-xs text-gray-600">or click to browse</div>
                    <input type="file" name="json_file" accept=".json" class="hidden">
                  </div>
                  <div id="json-file-info" class="mt-2 text-xs text-emerald-400 hidden"></div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-400 mb-2" data-i18n="upload.image">Preview Image</label>
                  <div class="drop-zone px-6 py-8 sm:px-10 sm:py-10" id="image-dropzone">
                    <i class="ph-duotone ph-image text-3xl sm:text-4xl text-violet-400 mb-3 block"></i>
                    <div class="font-medium text-gray-300 mb-1 text-sm sm:text-base" data-i18n="upload.image_drop">Drop image here</div>
                    <div class="text-xs text-gray-600" data-i18n="upload.image_hint">PNG, JPG, WebP</div>
                    <input type="file" name="image" accept="image/*" class="hidden">
                  </div>
                  <div id="image-file-info" class="mt-2 text-xs text-emerald-400 hidden"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-8 pt-5 border-t border-gray-800/50">
            <a href="/" class="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all" data-i18n="upload.cancel">Cancel</a>
            <button type="submit" id="submit-btn" class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:from-violet-400 hover:to-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              <span id="submit-text" data-i18n="upload.submit">Upload Keymap</span>
              <span id="submit-spinner" class="hidden"><i class="ph-duotone ph-circle-notch text-base animate-spin"></i></span>
            </button>
          </div>
        </form>
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

['json', 'image'].forEach(type => {
  const dropzone = document.getElementById(`${type}-dropzone`);
  const input = dropzone.querySelector('input');
  const info = document.getElementById(`${type}-file-info`);

  dropzone.addEventListener('click', () => input.click());

  dropzone.addEventListener('dragover', e => {
    e.preventDefault();
    dropzone.classList.add('active');
  });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('active'));
  dropzone.addEventListener('drop', e => {
    e.preventDefault();
    dropzone.classList.remove('active');
    if (e.dataTransfer.files.length) {
      input.files = e.dataTransfer.files;
      input.dispatchEvent(new Event('change'));
    }
  });

  input.addEventListener('change', () => {
    if (input.files.length) {
      const f = input.files[0];
      info.innerHTML = `<i class="ph-duotone ph-check-circle"></i> ${f.name} (${(f.size / 1024).toFixed(1)} KB)`;
      info.classList.remove('hidden');
    } else {
      info.classList.add('hidden');
    }
  });
});

document.getElementById('upload-form').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const text = document.getElementById('submit-text');
  const spinner = document.getElementById('submit-spinner');
  btn.disabled = true;
  text.textContent = t('upload.submitting');
  spinner.classList.remove('hidden');

  const formData = new FormData(e.target);

  try {
    const res = await fetch('/api/products', { method: 'POST', body: formData });
    const data = await res.json();

    if (res.ok) {
      showToast(t('upload.success'));
      setTimeout(() => { window.location.href = `/product.php?id=${data.id}`; }, 1000);
    } else {
      showToast((data.error || t('upload.error_upload')), 'danger');
      btn.disabled = false;
      text.textContent = t('upload.submit');
      spinner.classList.add('hidden');
    }
  } catch (err) {
    showToast(t('upload.error_network'), 'danger');
    btn.disabled = false;
    text.textContent = t('upload.submit');
    spinner.classList.add('hidden');
  }
});
</script>
</body>
</html>
