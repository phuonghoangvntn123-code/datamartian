<?php

define('BLOB_BASE_URL', 'https://blob.vercel-storage.com');

function getBlobToken(): string {
    $token = getenv('BLOB_READ_WRITE_TOKEN');
    if (!$token) {
        throw new RuntimeException('BLOB_READ_WRITE_TOKEN environment variable is not set');
    }
    return $token;
}

function blobUpload(string $content, string $pathname, string $contentType = 'application/octet-stream'): string {
    $token = getBlobToken();
    $url = BLOB_BASE_URL . '/' . ltrim($pathname, '/');

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_CUSTOMREQUEST => 'PUT',
        CURLOPT_POSTFIELDS => $content,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'x-vercel-blob-token: ' . $token,
            'Content-Type: ' . $contentType,
        ],
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($response === false || $httpCode !== 200) {
        throw new RuntimeException('Blob upload failed: ' . ($error ?: "HTTP $httpCode"));
    }

    $data = json_decode($response, true);
    return $data['url'] ?? $url;
}

function blobUploadFile(string $tmpPath, string $filename, string $contentType = 'application/octet-stream'): string {
    $content = file_get_contents($tmpPath);
    if ($content === false) {
        throw new RuntimeException('Failed to read uploaded file');
    }
    return blobUpload($content, $filename, $contentType);
}

function blobDelete(string $blobUrl): void {
    if (empty($blobUrl)) return;
    try {
        $token = getBlobToken();
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $blobUrl,
            CURLOPT_CUSTOMREQUEST => 'DELETE',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => ['x-vercel-blob-token: ' . $token],
        ]);
        curl_exec($ch);
        curl_close($ch);
    } catch (Exception $e) {
        // Silently fail on delete errors
    }
}

function blobUploadFromForm(string $fieldName, string $prefix): ?string {
    if (empty($_FILES[$fieldName]['name']) || empty($_FILES[$fieldName]['tmp_name'])) {
        return null;
    }

    $ext = strtolower(pathinfo($_FILES[$fieldName]['name'], PATHINFO_EXTENSION));
    $filename = $prefix . '/' . uniqid() . '.' . $ext;
    $tmpPath = $_FILES[$fieldName]['tmp_name'];
    $mime = mime_content_type($tmpPath) ?: 'application/octet-stream';

    return blobUploadFile($tmpPath, $filename, $mime);
}
