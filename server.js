const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// Store user data in a JSON file
let users = require('./database.json');

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Set up video storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Handle video uploads
app.post('/upload', upload.single('video'), (req, res) => {
    if (req.file) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Return list of videos
app.get('/videos', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if (err) {
            res.json([]);
        } else {
            res.json(files);
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.post('/login', (req, res) => {
    console.log("Données reçues:", req.body); // Voir ce qui est envoyé depuis le frontend
    const { username, password } = req.body;
    
    // Vérifiez que les données utilisateur sont bien trouvées
    const user = users.find(u => u.username === username && u.password === password);
    console.log("Utilisateur trouvé:", user);
    
    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});
