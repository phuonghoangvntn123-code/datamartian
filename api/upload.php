<?php
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    jsonResponse(['error' => 'Method not allowed'], 405);
}

if (empty($_FILES['file']['name'])) {
    jsonResponse(['error' => 'No file uploaded'], 422);
}

$field = $_POST['type'] ?? 'json';
$file = $_FILES['file'];
$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

if ($field === 'json') {
    if ($ext !== 'json') {
        jsonResponse(['error' => 'Only .json files allowed'], 422);
    }
    $prefix = BLOB_PREFIX_JSON;
    $mime = 'application/json';
} elseif ($field === 'image') {
    $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    if (!in_array($ext, $allowed)) {
        jsonResponse(['error' => 'Invalid image format. Allowed: ' . implode(', ', $allowed)], 422);
    }
    $prefix = BLOB_PREFIX_IMAGES;
    $mime = mime_content_type($file['tmp_name']) ?: 'application/octet-stream';
} else {
    jsonResponse(['error' => 'Invalid type. Use "json" or "image"'], 422);
}

try {
    $pathname = $prefix . '/' . uniqid() . '.' . $ext;
    $url = blobUploadFile($file['tmp_name'], $pathname, $mime);
    jsonResponse([
        'url' => $url,
        'pathname' => $pathname,
        'type' => $field,
        'size' => $file['size'],
    ], 201);
} catch (Exception $e) {
    jsonResponse(['error' => 'Upload failed: ' . $e->getMessage()], 500);
}
