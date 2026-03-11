const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    domainName: { type: String, required: true },
    sender: {
        name: { type: String, required: true },
        avatar: { type: String, default: 'https://i.pravatar.cc/150?u=user' },
        role: { type: String, enum: ['Buyer', 'Admin'], default: 'Buyer' }
    },
    content: { type: String, required: true },
    votes: { type: Number, default: 1 },
    awards: [{ type: String }],
    isOffer: { type: Boolean, default: false },
    offerAmount: { type: Number },
    timestamp: { type: Date, default: Date.now },
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
