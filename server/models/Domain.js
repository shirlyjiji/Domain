const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ['Fixed Price', 'Auctions', 'Make Offer'], default: 'Fixed Price' },
    registrar: { type: String, default: 'GoDaddy' },
    expiryDate: { type: String, default: 'Apr 2025' },
    status: { type: String, default: 'Open' },
    seller: {
        name: { type: String, default: 'DomainPro' },
        avatar: { type: String, default: 'https://i.pravatar.cc/150?u=1' }
    },
    endsIn: { type: String }, // For auctions
    bids: { type: Number, default: 0 },
    bidHistory: [
        {
            user: {
                name: { type: String, required: true },
                avatar: { type: String, default: 'https://i.pravatar.cc/150?u=user' }
            },
            amount: { type: Number, required: true },
            timestamp: { type: Date, default: Date.now }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Domain', domainSchema);
