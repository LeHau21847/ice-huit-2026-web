const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const upload = multer();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Frontend
app.use(express.static(path.join(__dirname, 'ice.huit.edu.vn')));

// Initialize SQLite Database
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Create users table and insert admin
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )`, (err) => {
            if (!err) {
                db.run(`INSERT OR IGNORE INTO users (username, password) VALUES ('admin', '123456')`);
                console.log('Admin account created/verified.');
            }
        });
    }
});

// Login API compatible with original frontend
app.post('/com_user/user/ajax_login', upload.none(), (req, res) => {
    const email = req.body.user_email;
    const password = req.body.user_password;
    
    // In the frontend, the field is named "user_email" but they asked for username "admin"
    // So we check if the input matches username
    db.get(`SELECT * FROM users WHERE username = ? AND password = ?`, [email, password], (err, row) => {
        if (err) {
            res.json({ successMessage: "", errorMessage: "Lỗi server", redirectTo: "" });
            return;
        }
        if (row) {
            res.json({ 
                successMessage: "Đăng nhập thành công", 
                errorMessage: "", 
                redirectTo: "../../index.html" 
            });
        } else {
            res.json({ 
                successMessage: "", 
                errorMessage: "Sai tên đăng nhập hoặc mật khẩu", 
                redirectTo: "" 
            });
        }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
