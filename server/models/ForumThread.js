const mongoose = require('mongoose');

const forumThreadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        default: 'Domain Investing'
    },
    user: {
        username: {
            type: String,
            default: 'Anonymous'
        }
    },
    replies: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    votes: {
        type: Number,
        default: 1
    },
    likes: {
        type: Number,
        default: 0
    },
    thanks: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ForumThread', forumThreadSchema);
