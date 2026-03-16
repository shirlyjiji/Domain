const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users with basic search/filter
router.get('/', async (req, res) => {
    try {
        const { search, role, status } = req.query;
        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        if (role) {
            query.role = role;
        }

        if (status) {
            query.status = status;
        }

        const users = await User.find(query).sort({ joined: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET stats for dashboard
router.get('/stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ status: 'Active' });
        const bannedUsers = await User.countDocuments({ status: 'Banned' });

        res.json({
            totalUsers,
            activeUsers,
            bannedUsers
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed sample data
router.post('/seed', async (req, res) => {
    try {
        await User.deleteMany();
        const sampleUsers = [
            { name: 'Krishna', email: 'krishna@example.com', role: 'Pro Member', joined: new Date('2025-10-12'), status: 'Active', avatar: 'https://i.pravatar.cc/150?u=krishna' },
            { name: 'John Doe', email: 'john@example.com', role: 'Buyer', joined: new Date('2026-01-05'), status: 'Active', avatar: 'https://i.pravatar.cc/150?u=john' },
            { name: 'Jane Smith', email: 'jane@example.com', role: 'Seller', joined: new Date('2025-11-20'), status: 'Inactive', avatar: 'https://i.pravatar.cc/150?u=jane' },
            { name: 'Alex Wilson', email: 'alex@example.com', role: 'Buyer', joined: new Date('2026-02-14'), status: 'Active', avatar: 'https://i.pravatar.cc/150?u=alex' },
            
            // Memberships
            { name: 'Michael T.', email: 'michael@workfriendly.com', role: 'Investor', tier: 'Investor', tierPrice: '$99', domainsCount: 201, joined: new Date('2024-04-24'), status: 'Active', avatar: 'https://i.pravatar.cc/150?u=michael' },
            { name: 'Sarah L.', email: 'sarah@ecofoods.co', role: 'Premium', tier: 'Premium', tierPrice: '$49', domainsCount: 15, joined: new Date('2024-05-12'), status: 'Active', avatar: 'https://i.pravatar.cc/150?u=sarah' },
            { name: 'John Doe', email: 'john@fintechpro.com', role: 'Business', tier: 'Business', tierPrice: '$199', domainsCount: 52, joined: new Date('2024-01-05'), status: 'Active', avatar: 'https://i.pravatar.cc/150?u=john2' },
            { name: 'Aisha K.', email: 'aisha@masters.com', role: 'Investor', tier: 'Investor', tierPrice: '$99', domainsCount: 8, joined: new Date('2024-02-15'), status: 'Expiring', avatar: 'https://i.pravatar.cc/150?u=aisha' },

        ];
        await User.insertMany(sampleUsers);
        res.json({ message: 'User seed data inserted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
