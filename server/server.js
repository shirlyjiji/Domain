const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const forumRoutes = require('./routes/forumRoutes');
const domainRoutes = require('./routes/domainRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use('/api/forum', forumRoutes);
app.use('/api/domains', domainRoutes);
app.use('/api/messages', messageRoutes);

// Test Route
app.get('/api/test', (req, res) => res.json({ message: 'Backend is connected!' }));

// 404 Handler for undefined routes
app.use((req, res) => {
    console.log(`404 - Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ message: `Route ${req.method} ${req.originalUrl} not found` });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
