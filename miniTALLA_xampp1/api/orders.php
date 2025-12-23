<?php
/**
 * Orders API for miniTALLA
 * POST /api/orders.php - Create a new order
 * GET /api/orders.php?email=user@email.com - Get orders by email (optional)
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/db.php';

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Create new order
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        $response['message'] = 'Invalid JSON input.';
        echo json_encode($response);
        exit;
    }
    
    // Extract order data
    $customer = $data['customer'] ?? [];
    $shipping = $data['shipping'] ?? [];
    $items = $data['items'] ?? [];
    $subtotal = $data['subtotal'] ?? 0;
    $shipping_cost = $data['shippingCost'] ?? 0;
    $total = $data['total'] ?? 0;
    
    // Validate required fields
    if (empty($customer['email']) || empty($items)) {
        $response['message'] = 'Customer email and items are required.';
        echo json_encode($response);
        exit;
    }
    
    // Generate order ID
    $order_id = 'ORD-' . date('Ymd') . '-' . rand(1000, 9999);
    
    // Serialize items and shipping as JSON for storage
    $items_json = json_encode($items);
    $shipping_json = json_encode($shipping);
    
    // Insert order into database
    $stmt = $conn->prepare("
        INSERT INTO orders (order_id, customer_email, customer_name, customer_phone, shipping_address, items, subtotal, shipping_cost, total) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    
    $customer_name = ($customer['firstName'] ?? '') . ' ' . ($customer['lastName'] ?? '');
    $customer_phone = $customer['phone'] ?? '';
    
    $stmt->bind_param(
        "ssssssddd",
        $order_id,
        $customer['email'],
        $customer_name,
        $customer_phone,
        $shipping_json,
        $items_json,
        $subtotal,
        $shipping_cost,
        $total
    );
    
    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Order placed successfully!';
        $response['orderId'] = $order_id;
    } else {
        $response['message'] = 'Failed to create order: ' . $stmt->error;
    }
    $stmt->close();
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get orders by email (optional feature)
    if (isset($_GET['email'])) {
        $email = $_GET['email'];
        
        $stmt = $conn->prepare("SELECT * FROM orders WHERE customer_email = ? ORDER BY created_at DESC");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $orders = [];
        while ($row = $result->fetch_assoc()) {
            // Decode JSON fields
            $row['items'] = json_decode($row['items'], true);
            $row['shipping_address'] = json_decode($row['shipping_address'], true);
            $orders[] = $row;
        }
        
        $response['success'] = true;
        $response['orders'] = $orders;
        $response['count'] = count($orders);
        $stmt->close();
        
    } else {
        $response['message'] = 'Email parameter required to view orders.';
    }
    
} else {
    $response['message'] = 'Invalid request method. Use GET or POST.';
}

$conn->close();
echo json_encode($response);
?>
