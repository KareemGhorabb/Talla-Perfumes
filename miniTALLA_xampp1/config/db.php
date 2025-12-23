<?php
// Database connection details for XAMPP default settings
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'miniTALLA_db');

// Attempt to connect to MySQL database
$conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME,3307);

// Check connection
if ($conn->connect_error) {
    // In a real application, you would log this error and show a generic message
    die("ERROR: Could not connect. " . $conn->connect_error);
}

// Set character set to utf8mb4
$conn->set_charset("utf8mb4");
?>
