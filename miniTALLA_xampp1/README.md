# miniTALLA Project - PHP Backend

This project provides PHP and MySQL backend for the miniTALLA e-commerce perfume website. It includes user authentication, product catalog, and order management.

## Features

| Feature | Endpoint | Description |
|---------|----------|-------------|
| **User Login** | `POST api/auth.php?action=login` | Authenticate existing users |
| **User Register** | `POST api/auth.php?action=register` | Create new user accounts |
| **Products List** | `GET api/products.php` | Get all products |
| **Single Product** | `GET api/products.php?id=1` | Get product by ID |
| **Create Order** | `POST api/orders.php` | Submit a new order |
| **View Orders** | `GET api/orders.php?email=...` | Get order history by email |

## Prerequisites

* **XAMPP** (or MAMP, WAMP)
  * Apache Web Server
  * MySQL Database
  * PHP (version 7.4 or higher)

## Installation and Setup

### 1. Project Placement

1. Locate your XAMPP installation directory (`C:\xampp` on Windows)
2. Place the entire `miniTALLA_xampp` folder into the `htdocs` directory

   Final path: `C:\xampp\htdocs\miniTALLA_xampp`

### 2. Database Setup

1. Start **Apache** and **MySQL** from the XAMPP Control Panel
2. Open **phpMyAdmin**: `http://localhost/phpmyadmin`
3. Click the **Import** tab
4. Choose the **`database.sql`** file from the project folder
5. Click **Go** to import

   This creates:
   - `miniTALLA_db` database
   - `users` table (for login/register)
   - `products` table (with 5 sample perfumes)
   - `orders` table (for order storage)

### 3. Running the Project

1. Open your browser
2. Navigate to: `http://localhost/miniTALLA_xampp/`

## Backend Structure

```
miniTALLA_xampp/
├── api/
│   ├── auth.php        # Login & Register endpoints
│   ├── products.php    # Products catalog API
│   └── orders.php      # Orders management API
├── config/
│   └── db.php          # MySQL connection settings
├── database.sql        # Complete database schema + sample data
└── ... (frontend files)
```

## API Usage Examples

### Get All Products
```bash
curl http://localhost/miniTALLA_xampp/api/products.php
```

### Create an Order
```bash
curl -X POST http://localhost/miniTALLA_xampp/api/orders.php \
  -H "Content-Type: application/json" \
  -d '{"customer":{"email":"test@test.com","firstName":"John","lastName":"Doe"},"items":[{"name":"Layaly","price":189,"quantity":1}],"total":189}'
```

### Login
```bash
curl -X POST "http://localhost/miniTALLA_xampp/api/auth.php?action=login" \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@talla.com","password":"demo123"}'
```

## Database Credentials

Default XAMPP settings in `config/db.php`:

| Setting | Value |
|---------|-------|
| **DB_SERVER** | `localhost` |
| **DB_USERNAME** | `root` |
| **DB_PASSWORD** | *(empty)* |
| **DB_NAME** | `miniTALLA_db` |
| **Port** | `3307` (adjust if yours is 3306) |

## Files Modified/Created

| Type | Files |
|------|-------|
| **Created** | `api/products.php`, `api/orders.php`, `database.sql` |
| **Modified** | `scripts/checkout-page.js` (now submits to backend) |
| **Existing** | `api/auth.php`, `config/db.php`, `login.html` |
