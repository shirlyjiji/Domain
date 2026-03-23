const express = require('express');
const router = express.Router();
const ForumThread = require('../models/ForumThread');

// Middleware to log requests to this router
router.use((req, res, next) => {
    console.log(`Forum Router: ${req.method} ${req.url}`);
    next();
});

// @desc    Get all forum threads
// @route   GET /api/forum/threads
router.get('/threads', async (req, res) => {
    try {
        const threads = await ForumThread.find({}).sort({ createdAt: -1 });
        res.json(threads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a new forum thread
// @route   POST /api/forum/threads
router.post('/threads', async (req, res) => {
    try {
        const { title, content, category, username } = req.body;
        if (!title || !content) {
            return res.status(400).json({ success: false, message: 'Title and content required' });
        }
        const thread = new ForumThread({
            title,
            content,
            category: category || 'Domain Investing',
            user: { username: username || 'Anonymous' }
        });
        const createdThread = await thread.save();
        res.status(201).json(createdThread);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get single forum thread
// @route   GET /api/forum/threads/:id
router.get('/threads/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Validate ObjectId format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid thread ID format' });
        }

        const thread = await ForumThread.findById(id);
        if (thread) {
            thread.views = (thread.views || 0) + 1;
            await thread.save();
            res.json(thread);
        } else {
            res.status(404).json({ message: 'Thread not found in database' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Seed initial forum threads
router.post('/seed', async (req, res) => {
    try {
        await ForumThread.deleteMany();
        const sampleThreads = [
            {
                title: '.AI domain market demand',
                content: 'What do you guys think about the current demand for .AI domains?',
                category: 'Domain Trends',
                user: { username: 'DomainPro' },
                replies: 15,
                views: 120,
                votes: 5,
                likes: 12,
                thanks: 3
            },
            {
                title: 'Domain flipping tips for beginners',
                content: 'I am new to domain flipping. Any advice?',
                category: 'Domain Investing',
                user: { username: 'DNKing' },
                replies: 8,
                views: 85,
                votes: 3,
                likes: 7,
                thanks: 2
            },
            {
                title: 'Best marketplaces to sell fast',
                content: 'Where is the best place to sell domains quickly?',
                category: 'Domain Selling Strategies',
                user: { username: 'BrandExpert' },
                replies: 12,
                views: 210,
                votes: 10,
                likes: 25,
                thanks: 8
            }
        ];
        await ForumThread.insertMany(sampleThreads);
        res.json({ message: 'Forum seed data inserted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get similar threads
// @route   GET /api/forum/threads/:id/similar
router.get('/threads/:id/similar', async (req, res) => {
    try {
        const thread = await ForumThread.findById(req.params.id);
        if (!thread) {
            return res.status(404).json({ message: 'Thread not found' });
        }
        
        // Find threads in the same category first, excluding the current one
        let similarThreads = await ForumThread.find({
            category: thread.category,
            _id: { $ne: thread._id }
        }).limit(5);
        
        // If we have fewer than 5 threads, fill up with threads from other categories
        if (similarThreads.length < 5) {
            const extraThreads = await ForumThread.find({
                _id: { $ne: thread._id, $nin: similarThreads.map(t => t._id) }
            }).limit(5 - similarThreads.length);
            
            similarThreads = [...similarThreads, ...extraThreads];
        }
        
        res.json(similarThreads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Patch thread vote
// @route   PATCH /api/forum/threads/:id/vote
router.patch('/threads/:id/vote', async (req, res) => {
    const { direction } = req.body;
    const increment = direction === 'up' ? 1 : -1;
    try {
        const thread = await ForumThread.findByIdAndUpdate(req.params.id, { $inc: { votes: increment } }, { new: true });
        res.json(thread);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Patch thread like
// @route   PATCH /api/forum/threads/:id/like
router.patch('/threads/:id/like', async (req, res) => {
    try {
        const thread = await ForumThread.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
        res.json(thread);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @desc    Patch thread thank
// @route   PATCH /api/forum/threads/:id/thank
router.patch('/threads/:id/thank', async (req, res) => {
    try {
        const thread = await ForumThread.findByIdAndUpdate(req.params.id, { $inc: { thanks: 1 } }, { new: true });
        res.json(thread);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
