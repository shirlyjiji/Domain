const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['Pro Member', 'Buyer', 'Seller', 'Admin', 'Investor', 'Premium', 'Business'], default: 'Buyer' },
    joined: { type: Date, default: Date.now },
    status: { type: String, enum: ['Active', 'Inactive', 'Banned', 'Expiring'], default: 'Active' },
    avatar: { type: String, default: 'https://i.pravatar.cc/150?u=newuser' },
    tier: { type: String, enum: ['Investor', 'Premium', 'Business', 'None'], default: 'None' },
    tierPrice: { type: String }, // e.g. '$99'
    domainsCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
