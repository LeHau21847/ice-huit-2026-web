const express = require('express');
const cors = require('cors');
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

// Mock Database for Login
const users = [
    { id: 1, username: 'admin', password: '123456' }
];

// Login API compatible with original frontend
app.post('/com_user/user/ajax_login', upload.none(), (req, res) => {
    const email = req.body.user_email;
    const password = req.body.user_password;
    
    const user = users.find(u => u.username === email && u.password === password);
    
    if (user) {
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

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
