const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Frontend
app.use(express.static(path.join(__dirname, 'ice.huit.edu.vn')));
app.use('/cdnjs.cloudflare.com', express.static(path.join(__dirname, 'cdnjs.cloudflare.com')));

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage: storage });

// Mock Database for Login & Submissions
const users = [
    { id: 1, username: 'admin', password: '123456' }
];
const submissions = [];

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

app.post('/com_ice/user/ajax_registry', upload.none(), (req, res) => {
    res.json({
        successMessage: "Đăng ký thành công",
        errorMessage: ""
    });
});

app.post('/com_ice/conferencearticle/ajax_submission', upload.any(), (req, res) => {
    const newSubmission = {
        title: req.body.submission_title,
        division: req.body.submission_division,
        summaryText: req.body.submission_summaryArticleText,
        joiners: req.body.submission_joinerName,
        files: req.files ? req.files.map(f => f.filename) : [],
        timestamp: new Date()
    };
    submissions.push(newSubmission);
    fs.writeFileSync(path.join(__dirname, 'submissions.json'), JSON.stringify(submissions, null, 2));

    res.json({
        successMessage: "Nộp bài thành công",
        errorMessage: []
    });
});

app.post('/com_user/user/ajax_exist_email', upload.none(), (req, res) => {
    res.send("false"); // meaning email does not exist, so validation passes
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
