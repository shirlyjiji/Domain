const express = require('express');
const router = express.Router();
const Domain = require('../models/Domain');

// GET all domains with basic search/filter and pagination
router.get('/', async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, page = 1, limit = 8 } = req.query;
        let query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        if (category && category !== 'All' && category !== 'More Categories') {
            query.category = category;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const skip = (page - 1) * limit;
        const total = await Domain.countDocuments(query);
        const domains = await Domain.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        res.json({ domains, total });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET stats for dashboard
router.get('/stats', async (req, res) => {
    try {
        const totalDomains = await Domain.countDocuments();
        const activeAuctions = await Domain.countDocuments({ category: 'Auctions' });
        const totalRevenue = await Domain.aggregate([
            { $group: { _id: null, total: { $sum: '$price' } } }
        ]);

        res.json({
            totalDomains,
            activeAuctions,
            totalRevenue: totalRevenue[0]?.total || 0,
            recentSales: 5 // Placeholder
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new domain
router.post('/', async (req, res) => {
    const domain = new Domain(req.body);
    try {
        const newDomain = await domain.save();
        res.status(201).json(newDomain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (update) a domain
router.put('/:id', async (req, res) => {
    try {
        const updatedDomain = await Domain.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedDomain);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a domain
router.delete('/:id', async (req, res) => {
    try {
        await Domain.findByIdAndDelete(req.params.id);
        res.json({ message: 'Domain deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed sample data
router.post('/seed', async (req, res) => {
    try {
        await Domain.deleteMany();
        const sampleDomains = [
            // Fixed Price
            { name: 'CryptoNest.io', price: 495, category: 'Fixed Price', registrar: 'GoDaddy', expiryDate: 'Apr 2025' },
            { name: 'AIMentor.com', price: 350, category: 'Fixed Price', registrar: 'Namecheap', expiryDate: 'Jun 2026' },
            { name: 'AIStartupHub.com', price: 699, category: 'Fixed Price', registrar: 'Namecheap', expiryDate: 'Jul 2027' },
            { name: 'CloudScale.ai', price: 1250, category: 'Fixed Price', registrar: 'GoDaddy', expiryDate: 'Mar 2026' },
            { name: 'DataForge.net', price: 850, category: 'Fixed Price', registrar: 'Namecheap', expiryDate: 'Sep 2025' },
            { name: 'TechFlow.io', price: 590, category: 'Fixed Price', registrar: 'GoDaddy', expiryDate: 'Nov 2026' },
            { name: 'GreenEnergy.com', price: 2100, category: 'Fixed Price', registrar: 'Namecheap', expiryDate: 'Jan 2027' },
            { name: 'NextGen.ai', price: 1800, category: 'Fixed Price', registrar: 'GoDaddy', expiryDate: 'Jul 2026' },
            { name: 'SecureVault.net', price: 420, category: 'Fixed Price', registrar: 'Dynadot', expiryDate: 'Dec 2025' },
            { name: 'BioTechLabs.co', price: 750, category: 'Fixed Price', registrar: 'GoDaddy', expiryDate: 'Aug 2026' },

            // Auctions
            { name: 'FintechWorld.ai', price: 45, category: 'Auctions', registrar: 'GoDaddy', expiryDate: 'Apr 2025', bids: 12, endsIn: '2: 24: 00' },
            { name: 'SecureNetwork.io', price: 120, category: 'Auctions', registrar: 'Dynadot', expiryDate: 'Dec 2024', bids: 5, endsIn: '1: 12: 00' },
            { name: 'GlobalTraveler.com', price: 350, category: 'Auctions', registrar: 'GoDaddy', expiryDate: 'Oct 2025', bids: 8, endsIn: '0: 18: 00' },
            { name: 'HealthSync.io', price: 215, category: 'Auctions', registrar: 'Namecheap', expiryDate: 'Feb 2026', bids: 3, endsIn: '3: 05: 00' },
            { name: 'MetaverseLeasing.com', price: 150, category: 'Auctions', registrar: 'GoDaddy', expiryDate: 'Dec 2025', bids: 15, endsIn: '1: 45: 00' },
            { name: 'CyberSecurity.io', price: 280, category: 'Auctions', registrar: 'Dynadot', expiryDate: 'Nov 2024', bids: 22, endsIn: '0: 30: 00' },
            { name: 'QuantumComputing.ai', price: 850, category: 'Auctions', registrar: 'GoDaddy', expiryDate: 'Sep 2026', bids: 4, endsIn: '5: 12: 00' },
            { name: 'FutureHomes.net', price: 110, category: 'Auctions', registrar: 'Namecheap', expiryDate: 'Jan 2025', bids: 7, endsIn: '2: 05: 00' },
            { name: 'SwiftLogistics.co', price: 195, category: 'Auctions', registrar: 'GoDaddy', expiryDate: 'Oct 2025', bids: 9, endsIn: '0: 55: 00' },

            // Make Offer
            { name: 'EcoSmartHomes.com', price: 210, category: 'Make Offer', registrar: 'GoDaddy', expiryDate: 'Jan 2027' },
            { name: 'SmartWallet.co', price: 150, category: 'Make Offer', registrar: 'GoDaddy', expiryDate: 'Jan 2026' },
            { name: 'PixelPerfect.design', price: 1200, category: 'Make Offer', registrar: 'Namecheap', expiryDate: 'May 2025' },
            { name: 'WebMatrix.ai', price: 890, category: 'Make Offer', registrar: 'Dynadot', expiryDate: 'Aug 2026' },
            { name: 'UrbanGardening.com', price: 650, category: 'Make Offer', registrar: 'GoDaddy', expiryDate: 'Apr 2027' },
            { name: 'RemoteWork.io', price: 4200, category: 'Make Offer', registrar: 'Namecheap', expiryDate: 'Jun 2025' },
            { name: 'DeepLearning.ai', price: 9500, category: 'Make Offer', registrar: 'GoDaddy', expiryDate: 'Jul 2026' },
            { name: 'VirtualReality.net', price: 1100, category: 'Make Offer', registrar: 'Dynadot', expiryDate: 'Dec 2025' },
            { name: 'SolarPower.co', price: 580, category: 'Make Offer', registrar: 'GoDaddy', expiryDate: 'Jan 2026' }
        ];
        await Domain.insertMany(sampleDomains);
        res.json({ message: 'Seed data inserted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH place a bid on a domain
router.patch('/:id/bid', async (req, res) => {
    const { amount, user } = req.body;
    try {
        const domain = await Domain.findById(req.params.id);
        if (!domain) return res.status(404).json({ message: 'Domain not found' });
        if (domain.category !== 'Auctions') return res.status(400).json({ message: 'This domain is not up for auction' });

        const minBid = (domain.price || 0) + 10;
        if (amount < minBid) {
            return res.status(400).json({ message: `Bid must be at least $${minBid}` });
        }

        const newBid = {
            user: user || { name: 'Guest_' + Math.floor(Math.random() * 1000), avatar: 'https://i.pravatar.cc/150?u=' + Math.random() },
            amount: amount,
            timestamp: new Date()
        };

        domain.price = amount;
        domain.bids = (domain.bids || 0) + 1;
        domain.bidHistory.unshift(newBid);

        const updatedDomain = await domain.save();
        res.json(updatedDomain);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
