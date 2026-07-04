<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$pathParts = explode('/', trim($_GET['path'] ?? '', '/'));
$id = isset($pathParts[2]) ? (int)$pathParts[2] : null;

function validateProduct(array $data): array {
    $errors = [];
    if (empty($data['name'])) $errors[] = 'Name is required';
    return $errors;
}

function handleImageUpload(): ?string {
    if (empty($_FILES['image']['name'])) return null;
    $ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
    $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    if (!in_array($ext, $allowed)) jsonResponse(['error' => 'Invalid image format'], 422);
    try {
        $pathname = BLOB_PREFIX_IMAGES . '/' . uniqid() . '.' . $ext;
        $mime = mime_content_type($_FILES['image']['tmp_name']) ?: 'image/' . $ext;
        return blobUploadFile($_FILES['image']['tmp_name'], $pathname, $mime);
    } catch (Exception $e) {
        jsonResponse(['error' => 'Image upload failed: ' . $e->getMessage()], 500);
    }
}

function handleJsonUpload(): ?string {
    if (empty($_FILES['json_file']['name'])) return null;
    $ext = strtolower(pathinfo($_FILES['json_file']['name'], PATHINFO_EXTENSION));
    if ($ext !== 'json') jsonResponse(['error' => 'Only .json files allowed'], 422);
    try {
        $pathname = BLOB_PREFIX_JSON . '/' . uniqid() . '.json';
        return blobUploadFile($_FILES['json_file']['tmp_name'], $pathname, 'application/json');
    } catch (Exception $e) {
        jsonResponse(['error' => 'JSON upload failed: ' . $e->getMessage()], 500);
    }
}

switch ($method) {
    case 'GET':
        if ($id) {
            $stmt = getDB()->prepare("SELECT * FROM products WHERE id = ?");
            $stmt->execute([$id]);
            $product = $stmt->fetch();
            if (!$product) jsonResponse(['error' => 'Product not found'], 404);
            jsonResponse($product);
        } else {
            $page = max(1, (int)($_GET['page'] ?? 1));
            $limit = min(50, max(1, (int)($_GET['limit'] ?? 12)));
            $offset = ($page - 1) * $limit;
            $search = $_GET['search'] ?? '';
            $author = $_GET['author'] ?? '';

            $where = [];
            $params = [];
            if ($search) {
                $where[] = "(name LIKE ? OR description LIKE ?)";
                $params[] = "%$search%";
                $params[] = "%$search%";
            }
            if ($author) {
                $where[] = "author = ?";
                $params[] = $author;
            }
            $whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

            $countStmt = getDB()->prepare("SELECT COUNT(*) FROM products $whereClause");
            $countStmt->execute($params);
            $total = (int)$countStmt->fetchColumn();

            $stmt = getDB()->prepare("SELECT * FROM products $whereClause ORDER BY created_at DESC LIMIT ? OFFSET ?");
            $stmt->execute(array_merge($params, [$limit, $offset]));
            $products = $stmt->fetchAll();

            jsonResponse([
                'data' => $products,
                'pagination' => [
                    'page' => $page,
                    'limit' => $limit,
                    'total' => $total,
                    'pages' => ceil($total / $limit),
                ]
            ]);
        }
        break;

    case 'POST':
        $name = $_POST['name'] ?? '';
        $version = $_POST['version'] ?? '1.0.0';
        $author = $_POST['author'] ?? '';
        $description = $_POST['description'] ?? '';
        $jsonData = $_POST['json_data'] ?? '';

        $errors = validateProduct(['name' => $name]);
        if ($errors) jsonResponse(['error' => implode(', ', $errors)], 422);

        $imagePath = handleImageUpload();
        $jsonFilePath = handleJsonUpload();

        $stmt = getDB()->prepare(
            "INSERT INTO products (name, version, author, description, json_data, json_file, image_path)
             VALUES (?, ?, ?, ?, ?, ?, ?)"
        );
        $stmt->execute([$name, $version, $author, $description, $jsonData, $jsonFilePath, $imagePath]);

        $newId = getDB()->lastInsertId();
        $stmt = getDB()->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->execute([$newId]);

        jsonResponse($stmt->fetch(), 201);
        break;

    case 'PUT':
        if (!$id) jsonResponse(['error' => 'ID is required'], 400);

        $existing = null;
        if (!empty($_FILES) && (!empty($_FILES['image']['name']) || !empty($_FILES['json_file']['name']))) {
            $stmt = getDB()->prepare("SELECT * FROM products WHERE id = ?");
            $stmt->execute([$id]);
            $existing = $stmt->fetch();
            if (!$existing) jsonResponse(['error' => 'Product not found'], 404);
        }

        $input = $_POST ?: getJsonInput();

        $fields = [];
        $params = [];
        foreach (['name', 'version', 'author', 'description', 'json_data'] as $field) {
            if (isset($input[$field])) {
                $fields[] = "$field = ?";
                $params[] = $input[$field];
            }
        }

        $imagePath = handleImageUpload();
        if ($imagePath) {
            $fields[] = "image_path = ?";
            $params[] = $imagePath;
            if ($existing && !empty($existing['image_path'])) {
                blobDelete($existing['image_path']);
            }
        }

        $jsonFilePath = handleJsonUpload();
        if ($jsonFilePath) {
            $fields[] = "json_file = ?";
            $params[] = $jsonFilePath;
            if ($existing && !empty($existing['json_file'])) {
                blobDelete($existing['json_file']);
            }
        }

        if (empty($fields)) jsonResponse(['error' => 'No fields to update'], 422);

        $params[] = $id;
        $stmt = getDB()->prepare("UPDATE products SET " . implode(', ', $fields) . " WHERE id = ?");
        $stmt->execute($params);

        $stmt = getDB()->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->execute([$id]);
        $product = $stmt->fetch();

        if (!$product) jsonResponse(['error' => 'Product not found'], 404);
        jsonResponse($product);
        break;

    default:
        jsonResponse(['error' => 'Method not allowed'], 405);
}
