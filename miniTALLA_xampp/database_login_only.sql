-- SQL script for miniTALLA project - Login Only
-- Database: miniTALLA_db

-- Create the database
CREATE DATABASE IF NOT EXISTS miniTALLA_db;
USE miniTALLA_db;

-- 1. Users Table (for login/registration)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Hashed password
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Note: The sample INSERT statement has been removed to prevent SQL syntax errors during import.
-- Please use the registration form on the login page to create your first user.
