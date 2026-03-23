const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const ForumThread = require('../models/ForumThread');

// GET all unique domains with messages
router.get('/admin/threads', async (req, res) => {
    try {
        const threads = await Message.aggregate([
            { $sort: { timestamp: -1 } },
            {
                $group: {
                    _id: '$domainName',
                    lastMessage: { $first: '$content' },
                    lastTimestamp: { $first: '$timestamp' },
                    unreadCount: { $sum: { $cond: [{ $eq: ['$isRead', false] }, 1, 0] } }
                }
            },
            { $sort: { lastTimestamp: -1 } }
        ]);
        res.json(threads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all messages for a specific domain
router.get('/:domainName', async (req, res) => {
    try {
        const messages = await Message.find({ domainName: req.params.domainName }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new message (Buyer inquiry or Admin reply)
router.post('/', async (req, res) => {
    const { domainName, sender, content } = req.body;
    
    if (!domainName || !content) {
        return res.status(400).json({ message: 'Domain name and content are required' });
    }

    try {
        const message = new Message({
            domainName,
            sender,
            content
        });

        const newMessage = await message.save();
        
        // Update reply count in ForumThread
        // Upsert if necessary or just attempt update
        await ForumThread.findOneAndUpdate(
            { title: domainName },
            { $inc: { replies: 1 } },
            { new: true }
        );

        res.status(201).json(newMessage);
    } catch (err) {
        console.error('Error saving message:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

// PATCH upvote/downvote
router.patch('/:id/vote', async (req, res) => {
    const { direction } = req.body;
    const increment = direction === 'up' ? 1 : -1;
    try {
        const message = await Message.findByIdAndUpdate(req.params.id, { $inc: { votes: increment } }, { new: true });
        res.json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH like
router.patch('/:id/like', async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
        res.json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH thank
router.patch('/:id/thank', async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(req.params.id, { $inc: { thanks: 1 } }, { new: true });
        res.json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH award
router.patch('/:id/award', async (req, res) => {
    const { awardType } = req.body;
    try {
        const message = await Message.findByIdAndUpdate(req.params.id, { $push: { awards: awardType } }, { new: true });
        res.json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
