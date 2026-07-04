<?php
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

$path = $_SERVER['REQUEST_URI'];
$basePath = dirname($_SERVER['SCRIPT_NAME']);
$route = str_replace($basePath, '', parse_url($path, PHP_URL_PATH));
$route = ltrim($route, '/');
$_GET['path'] = $route;

$parts = explode('/', $route);

if ($parts[0] === 'products') {
    require __DIR__ . '/products.php';
} elseif ($parts[0] === 'upload') {
    require __DIR__ . '/upload.php';
} elseif ($parts[0] === 'ping') {
    header('Content-Type: application/json');
    echo json_encode(['status' => 'ok', 'time' => date('c'), 'php_version' => phpversion()]);
} elseif ($parts[0] === 'dbcheck') {
    header('Content-Type: application/json');
    try {
        require_once __DIR__ . '/config.php';
        $db = getDB();
        $stmt = $db->query("SELECT COUNT(*) as cnt FROM products");
        $row = $stmt->fetch();
        echo json_encode(['status' => 'ok', 'database' => 'connected', 'product_count' => (int)$row['cnt']]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
} else {
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode([
        'error' => 'Not found',
        'available_endpoints' => [
            'GET /api/products' => 'List all products',
            'GET /api/products/{id}' => 'Get product by ID',
            'POST /api/products' => 'Create a product',
            'PUT /api/products/{id}' => 'Update a product',
            'POST /api/upload' => 'Upload a file (JSON or image) to Vercel Blob',
            'GET /api/ping' => 'Ping test',
            'GET /api/dbcheck' => 'Database connection test',
        ]
    ]);
}
