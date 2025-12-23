# miniTALLA Project - Login/Registration Backend Only

This project provides the necessary PHP and MySQL setup to enable the **Login and Registration** functionality on the `login.html` page, while keeping all other frontend files in their original state.

## Prerequisites

To run this project, you need a local server environment that includes:

*   **XAMPP** (or equivalent like MAMP, WAMP)
    *   Apache Web Server
    *   MySQL Database
    *   PHP (version 7.4 or higher is recommended)

## Installation and Setup

Follow these steps to get the login/registration backend working on your local machine:

### 1. Project Placement

1.  Locate your XAMPP installation directory (usually `C:\xampp` on Windows or `/Applications/XAMPP/xamppfiles` on macOS).
2.  Place the entire `miniTALLA_xampp` folder into the `htdocs` directory of your XAMPP installation.

    The final path should look like: `C:\xampp\htdocs\miniTALLA_xampp`

### 2. Database Setup

1.  Start the **Apache** and **MySQL** services from the XAMPP Control Panel.
2.  Open your web browser and navigate to **phpMyAdmin** (usually `http://localhost/phpmyadmin`).
3.  **Create a new database** named `miniTALLA_db`.
4.  Select the newly created `miniTALLA_db` from the left sidebar.
5.  Go to the **Import** tab.
6.  Click **Choose file** and select the **`database_login_only.sql`** file located inside the `miniTALLA_xampp` folder.
7.  Click **Go** to import the database structure (the `users` table).

### 3. Running the Project

1.  Open your web browser.
2.  Navigate to the project URL: `http://localhost/miniTALLA_xampp/login.html`

You can now use the registration form to create a new user, and then use the login form to sign in.

## Backend Structure Overview (Login Only)

| Directory/File | Purpose |
| :--- | :--- |
| `api/auth.php` | PHP API endpoint for handling user registration and login requests. |
| `config/db.php` | PHP file containing the MySQL database connection logic and credentials. |
| `database_login_only.sql` | SQL script to create the `miniTALLA_db` database and the `users` table. |
| `login.html` | **Modified** to send form data to `api/auth.php`. |
| *Other files* | All other files (products, contact, checkout, etc.) are in their **original state** and do not use the database. |

## Database Credentials

The `config/db.php` file is configured with the default XAMPP credentials:

| Setting | Value |
| :--- | :--- |
| **DB_SERVER** | `localhost` |
| **DB_USERNAME** | `root` |
| **DB_PASSWORD** | `(empty string)` |
| **DB_NAME** | `miniTALLA_db` |

If your XAMPP setup uses different credentials, you must update the values in `config/db.php` accordingly.
