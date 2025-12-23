-- SQL script for miniTALLA project - Complete Backend
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

-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(100) DEFAULT 'TALLA',
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    badge VARCHAR(50),
    image VARCHAR(500),
    description TEXT,
    notes VARCHAR(255),
    top_notes VARCHAR(255),
    middle_notes VARCHAR(255),
    base_notes VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(50) NOT NULL UNIQUE,
    customer_email VARCHAR(100) NOT NULL,
    customer_name VARCHAR(200),
    customer_phone VARCHAR(50),
    shipping_address JSON,
    items JSON NOT NULL,
    subtotal DECIMAL(10, 2) DEFAULT 0,
    shipping_cost DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Custom Scents Table (for Scent Lab creations)
CREATE TABLE IF NOT EXISTS custom_scents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(100) NOT NULL,
    scent_name VARCHAR(100) DEFAULT 'My Custom Scent',
    notes JSON,
    top_notes JSON,
    middle_notes JSON,
    base_notes JSON,
    intensity VARCHAR(50) DEFAULT 'balanced',
    price DECIMAL(10, 2) DEFAULT 225.00,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_email (user_email)
);

-- =====================================================
-- SAMPLE PRODUCTS DATA
-- =====================================================

INSERT INTO products (id, name, brand, price, category, badge, image, description, notes, top_notes, middle_notes, base_notes) VALUES
(1, 'Layaly', 'TALLA', 189.00, 'oriental', 'LUXURY', 
 'https://images.unsplash.com/photo-1719175936556-dbd05e415913?w=400',
 'A captivating oriental blend with notes of oud and amber',
 'Oud, Amber, Sandalwood',
 'Saffron, Rose', 'Oud, Amber', 'Sandalwood, Musk'),

(2, 'Velvet Rose', 'TALLA', 165.00, 'floral', 'BESTSELLER',
 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400',
 'Luxurious Bulgarian rose with a velvety finish',
 'Rose, Peony, Musk',
 'Bergamot, Pink Pepper', 'Bulgarian Rose, Peony', 'White Musk, Cashmere Wood'),

(3, 'Midnight Bloom', 'TALLA', 175.00, 'floral', 'NEW',
 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400',
 'A nocturnal floral journey with jasmine and gardenia',
 'Jasmine, Gardenia, Vetiver',
 'Green Leaves, Peony', 'Jasmine, Gardenia', 'Vetiver, Patchouli'),

(4, 'Solar Bliss', 'TALLA', 145.00, 'fresh', 'TRENDING',
 'https://images.unsplash.com/photo-1709095458514-573bc6277d3d?w=400',
 'Fresh citrus and sea salt for endless summer vibes',
 'Citrus, Sea Salt, White Tea',
 'Lemon, Bergamot', 'Sea Salt, White Tea', 'Driftwood, Ambroxan'),

(5, 'Desert Rose', 'TALLA', 195.00, 'oriental', 'EXCLUSIVE',
 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400',
 'Warm spices meet delicate rose petals',
 'Rose, Cinnamon, Amber',
 'Pink Pepper, Cinnamon', 'Damascus Rose, Geranium', 'Amber, Frankincense')

ON DUPLICATE KEY UPDATE name=name;

-- =====================================================
-- Note: Run this SQL file in phpMyAdmin to set up your database:
-- 1. Open http://localhost/phpmyadmin
-- 2. Click "Import" tab
-- 3. Choose this file and click "Go"
-- =====================================================
