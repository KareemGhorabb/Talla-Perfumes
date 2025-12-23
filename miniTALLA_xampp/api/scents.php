<?php
/**
 * Custom Scents API for miniTALLA
 * POST /api/scents.php - Save a custom scent
 * GET /api/scents.php?email=user@email.com - Get user's saved scents
 * DELETE /api/scents.php?id=1 - Delete a scent
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/db.php';

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Save a new custom scent
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        $response['message'] = 'Invalid JSON input.';
        echo json_encode($response);
        exit;
    }
    
    $user_email = $data['email'] ?? '';
    $scent_name = $data['name'] ?? 'My Custom Scent';
    $notes = $data['notes'] ?? [];
    $top_notes = $data['topNotes'] ?? [];
    $middle_notes = $data['middleNotes'] ?? [];
    $base_notes = $data['baseNotes'] ?? [];
    $intensity = $data['intensity'] ?? 'balanced';
    $price = $data['price'] ?? 225.00;
    
    if (empty($user_email)) {
        $response['message'] = 'User email is required.';
        echo json_encode($response);
        exit;
    }
    
    // Serialize arrays as JSON
    $notes_json = json_encode($notes);
    $top_json = json_encode($top_notes);
    $middle_json = json_encode($middle_notes);
    $base_json = json_encode($base_notes);
    
    $stmt = $conn->prepare("
        INSERT INTO custom_scents (user_email, scent_name, notes, top_notes, middle_notes, base_notes, intensity, price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->bind_param(
        "sssssssd",
        $user_email,
        $scent_name,
        $notes_json,
        $top_json,
        $middle_json,
        $base_json,
        $intensity,
        $price
    );
    
    if ($stmt->execute()) {
        $scent_id = $conn->insert_id;
        $response['success'] = true;
        $response['message'] = 'Scent saved successfully!';
        $response['scentId'] = $scent_id;
    } else {
        $response['message'] = 'Failed to save scent: ' . $stmt->error;
    }
    $stmt->close();
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get user's saved scents
    if (isset($_GET['email'])) {
        $email = $_GET['email'];
        
        $stmt = $conn->prepare("SELECT * FROM custom_scents WHERE user_email = ? ORDER BY created_at DESC");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $scents = [];
        while ($row = $result->fetch_assoc()) {
            // Decode JSON fields
            $row['notes'] = json_decode($row['notes'], true);
            $row['top_notes'] = json_decode($row['top_notes'], true);
            $row['middle_notes'] = json_decode($row['middle_notes'], true);
            $row['base_notes'] = json_decode($row['base_notes'], true);
            $scents[] = $row;
        }
        
        $response['success'] = true;
        $response['scents'] = $scents;
        $response['count'] = count($scents);
        $stmt->close();
    } else {
        $response['message'] = 'Email parameter required.';
    }
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Delete a scent
    $data = json_decode(file_get_contents('php://input'), true);
    $scent_id = $data['id'] ?? $_GET['id'] ?? null;
    $user_email = $data['email'] ?? $_GET['email'] ?? '';
    
    if (!$scent_id || !$user_email) {
        $response['message'] = 'Scent ID and email are required.';
        echo json_encode($response);
        exit;
    }
    
    $stmt = $conn->prepare("DELETE FROM custom_scents WHERE id = ? AND user_email = ?");
    $stmt->bind_param("is", $scent_id, $user_email);
    
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            $response['success'] = true;
            $response['message'] = 'Scent deleted successfully.';
        } else {
            $response['message'] = 'Scent not found or unauthorized.';
        }
    } else {
        $response['message'] = 'Failed to delete scent.';
    }
    $stmt->close();
    
} else {
    $response['message'] = 'Invalid request method.';
}

$conn->close();
echo json_encode($response);
?>
