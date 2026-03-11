const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// GET all messages for a specific domain
router.get('/:domainName', async (req, res) => {
    try {
        const messages = await Message.find({ domainName: req.params.domainName }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET all unique domains with messages (for admin dashboard list)
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

// POST a new message (Buyer inquiry or Admin reply)
router.post('/', async (req, res) => {
    const { domainName, sender, content } = req.body;
    const message = new Message({
        domainName,
        sender,
        content
    });

    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PATCH upvote/downvote a message
router.patch('/:id/vote', async (req, res) => {
    const { direction } = req.body; // 'up' or 'down'
    const increment = direction === 'up' ? 1 : -1;
    try {
        const message = await Message.findByIdAndUpdate(req.params.id, { $inc: { votes: increment } }, { new: true });
        res.json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH award a message
router.patch('/:id/award', async (req, res) => {
    const { awardType } = req.body;
    try {
        const message = await Message.findByIdAndUpdate(req.params.id, { $push: { awards: awardType } }, { new: true });
        res.json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// PATCH mark all messages in a thread as read
router.patch('/read/:domainName', async (req, res) => {
    try {
        await Message.updateMany(
            { domainName: req.params.domainName, isRead: false },
            { $set: { isRead: true } }
        );
        res.json({ message: 'Messages marked as read' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
