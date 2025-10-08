const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();

const userRoutes = require('./routes/User');
const adminRoutes = require('./routes/Admin');

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000', // Local frontend
        'https://skyblumestravelhub.vercel.app' // Your Vercel frontend
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Connect DB
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('DB connected');
}).catch(err => console.log('DB connection error:', err));

// Routes
app.use('/', userRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
