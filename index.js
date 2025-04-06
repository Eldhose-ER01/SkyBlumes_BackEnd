const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Create upload directory if it doesn't exist
const uploadDir = path.join(__dirname, 'public/Images');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static files from /public
app.use(express.static(path.join(__dirname, '/public')));

// CORS configuration
const allowedOrigins = [
    'http://localhost:3000',
    'https://sky-blumes-front-end.vercel.app' // 🔁 Replace with actual deployed frontend URL
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true // Set to true if you're using cookies or sessions
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
const userRoutes = require('./routes/User');
const adminRoutes = require('./routes/Admin');
app.use('/', userRoutes);
app.use('/admin', adminRoutes);

// Connect to MongoDB
mongoose.connect(process.env.DATABASE)
    .then(() => {
        console.log('DB connected');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
    });

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
