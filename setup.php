<?php
require_once __DIR__ . '/api/config.php';

$error = null;
$success = false;

try {
    $db = getDB();
    $sql = "CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        version VARCHAR(50) DEFAULT '1.0.0',
        author VARCHAR(255) DEFAULT '',
        description TEXT DEFAULT NULL,
        json_data LONGTEXT DEFAULT NULL,
        json_file VARCHAR(500) DEFAULT NULL,
        image_path VARCHAR(500) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    $db->exec($sql);
    $success = true;
} catch (Exception $e) {
    $error = $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Setup — KeymapHub</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" type="image/png" href="/mars_128x.png">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/duotone/style.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body class="bg-gray-950 text-gray-100 antialiased min-h-screen flex items-center justify-center">
  <div class="max-w-lg mx-auto px-4">
    <?php if ($success): ?>
    <div class="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-8 text-center">
      <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
        <i class="ph-duotone ph-check-circle text-3xl text-emerald-400"></i>
      </div>
      <h2 class="text-xl font-bold text-white mb-2">Setup Complete</h2>
      <p class="text-gray-500 text-sm mb-6">
        Table <code class="text-violet-400 bg-violet-500/10 px-1.5 py-0.5 rounded">products</code> has been created successfully.
      </p>
      <a href="/" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 hover:from-violet-400 hover:to-purple-500 transition-all">
        <i class="ph-duotone ph-rocket-launch"></i>
        Go to Home
      </a>
    </div>
    <?php else: ?>
    <div class="bg-gray-900/50 border border-red-800/50 rounded-2xl p-8">
      <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
        <i class="ph-duotone ph-warning text-3xl text-red-400"></i>
      </div>
      <h2 class="text-xl font-bold text-white mb-2 text-center">Setup Failed</h2>
      <p class="text-gray-500 text-sm mb-4 text-center">Database connection error. Check your credentials in <code class="text-violet-400">api/config.php</code>.</p>
      <div class="bg-gray-950 rounded-xl p-4 text-sm text-red-400 font-mono overflow-x-auto mb-6">
        <?= htmlspecialchars($error) ?>
      </div>
      <div class="text-gray-500 text-xs space-y-2">
        <p><span class="text-violet-400">1.</span> Open <code class="text-gray-400">api/config.php</code></p>
        <p><span class="text-violet-400">2.</span> Edit DB_HOST, DB_NAME, DB_USER, DB_PASS</p>
        <p><span class="text-violet-400">3.</span> Make sure the database exists</p>
        <p><span class="text-violet-400">4.</span> Refresh this page</p>
      </div>
    </div>
    <?php endif; ?>
  </div>
</body>
</html>
