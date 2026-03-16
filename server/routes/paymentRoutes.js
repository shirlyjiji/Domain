const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// GET all payments
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find().sort({ date: -1 });
        res.json(payments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET stats for dashboard
router.get('/stats', async (req, res) => {
    try {
        const totalSales = await Payment.aggregate([
            { $match: { status: 'Completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const totalTransactions = await Payment.countDocuments();
        
        res.json({
            totalSales: totalSales[0]?.total || 0,
            totalTransactions
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed sample data
router.post('/seed', async (req, res) => {
    try {
        await Payment.deleteMany();
        const samplePayments = [
            { domain: 'CryptoNest.io', amount: 495, date: new Date('2026-03-10'), buyer: 'John Doe', status: 'Completed' },
            { domain: 'AIMentor.com', amount: 350, date: new Date('2026-03-09'), buyer: 'Jane Smith', status: 'Pending' },
            { domain: 'DataForge.net', amount: 850, date: new Date('2026-03-08'), buyer: 'Alex Wilson', status: 'Completed' },
            { domain: 'TechFlow.io', amount: 590, date: new Date('2026-03-07'), buyer: 'Sarah Brown', status: 'Completed' },
        ];
        await Payment.insertMany(samplePayments);
        res.json({ message: 'Payment seed data inserted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
