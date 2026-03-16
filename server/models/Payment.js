const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    domain: { type: String, required: true },
    amount: { type: Number, required: true },
    buyer: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['Completed', 'Pending', 'Failed'], default: 'Completed' },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
