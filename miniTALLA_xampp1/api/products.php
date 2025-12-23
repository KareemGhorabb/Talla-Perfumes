<?php
/**
 * Products API for miniTALLA
 * GET /api/products.php - Get all products
 * GET /api/products.php?id=1 - Get single product by ID
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once '../config/db.php';

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    // Check if requesting a single product
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);
        
        $stmt = $conn->prepare("SELECT * FROM products WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 1) {
            $product = $result->fetch_assoc();
            $response['success'] = true;
            $response['product'] = $product;
        } else {
            $response['message'] = 'Product not found.';
        }
        $stmt->close();
        
    } else {
        // Get all products
        $result = $conn->query("SELECT * FROM products ORDER BY id ASC");
        
        if ($result) {
            $products = [];
            while ($row = $result->fetch_assoc()) {
                $products[] = $row;
            }
            $response['success'] = true;
            $response['products'] = $products;
            $response['count'] = count($products);
        } else {
            $response['message'] = 'Failed to retrieve products.';
        }
    }
    
} else {
    $response['message'] = 'Invalid request method. Use GET.';
}

$conn->close();
echo json_encode($response);
?>
