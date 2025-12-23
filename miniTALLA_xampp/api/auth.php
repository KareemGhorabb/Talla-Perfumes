<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');
require_once '../config/db.php';

$response = ['success' => false, 'message' => ''];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_GET['action'] ?? '';
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) {
        $response['message'] = 'Invalid JSON input.';
        echo json_encode($response);
        exit;
    }

    if ($action === 'register') {
        $first_name = $data['firstName'] ?? '';
        $last_name = $data['lastName'] ?? '';
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        if (empty($first_name) || empty($last_name) || empty($email) || empty($password)) {
            $response['message'] = 'All fields are required for registration.';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response['message'] = 'Invalid email format.';
        } else {
            // Check if user already exists
            $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->store_result();

            if ($stmt->num_rows > 0) {
                $response['message'] = 'User with this email already exists.';
            } else {
                // Hash the password
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);

                // Insert new user
                $stmt->close();
                $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)");
                $stmt->bind_param("ssss", $first_name, $last_name, $email, $hashed_password);

                if ($stmt->execute()) {
                    $response['success'] = true;
                    $response['message'] = 'Registration successful. You can now log in.';
                } else {
                    $response['message'] = 'Registration failed: ' . $stmt->error;
                }
            }
            $stmt->close();
        }

    } elseif ($action === 'login') {
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        if (empty($email) || empty($password)) {
            $response['message'] = 'Email and password are required for login.';
        } else {
            $stmt = $conn->prepare("SELECT id, password, first_name, last_name FROM users WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows === 1) {
                $user = $result->fetch_assoc();
                // Verify password
                if (password_verify($password, $user['password'])) {
                    // Build full name
                    $fullName = trim($user['first_name'] . ' ' . $user['last_name']);
                    if (empty($fullName)) $fullName = $user['first_name'];
                    
                    // Start a session and store user info (basic session management for XAMPP)
                    session_start();
                    $_SESSION['user_id'] = $user['id'];
                    $_SESSION['user_name'] = $fullName;

                    $response['success'] = true;
                    $response['message'] = 'Login successful.';
                    $response['user'] = ['id' => $user['id'], 'name' => $fullName];
                } else {
                    $response['message'] = 'Invalid email or password.';
                }
            } else {
                $response['message'] = 'Invalid email or password.';
            }
            $stmt->close();
        }
    } else {
        $response['message'] = 'Invalid authentication action.';
    }
} else {
    $response['message'] = 'Invalid request method.';
}

$conn->close();
echo json_encode($response);
?>
