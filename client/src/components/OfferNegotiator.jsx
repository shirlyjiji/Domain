import React, { useState } from 'react';
import { MessageSquare, Send, ThumbsUp, DollarSign, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const OfferNegotiator = ({ domain, messages = [], onOfferSuccess }) => {
    const [offerAmount, setOfferAmount] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendOffer = async () => {
        const amount = parseFloat(offerAmount);
        if (isNaN(amount) || amount <= 0) {
            toast.error('Please enter a valid offer amount');
            return;
        }

        setLoading(true);

        try {
            const payload = {
                domainName: domain.name,
                sender: {
                    name: 'GuestBuyer', // Future: get from auth
                    avatar: 'https://i.pravatar.cc/150?u=guest',
                    role: 'Buyer'
                },
                content: `Placed an offer for $${amount}`,
                isOffer: true,
                offerAmount: amount
            };

            await axios.post('http://localhost:5000/api/messages', payload);
            toast.success('Offer sent successfully!');
            setOfferAmount('');
            if (onOfferSuccess) onOfferSuccess();
        } catch (err) {
            toast.error('Error sending offer. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Filter messages to show only offers in the nested chat
    const offerMessages = messages.filter(msg => msg.isOffer);

    return (
        <div className="offer-negotiator-view bg-white border p-4 shadow-sm mb-4">
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <MessageSquare className="text-info" /> Negotiate Offer
            </h5>

            <div className="negotiation-flow mb-4">
                <div className="alert alert-info border-0 rounded-3 d-flex align-items-center gap-3 mb-4">
                    <DollarSign size={24} />
                    <div>
                        <div className="fw-bold">Start Negotiation</div>
                        <div className="small opacity-75">Send your best offer to the seller to start the discussion.</div>
                    </div>
                </div>

                <div className="chat-container bg-light border rounded-3 p-3 mb-4" style={{ minHeight: '150px', maxHeight: '300px', overflowY: 'auto' }}>
                    {offerMessages.length > 0 ? (
                        <div className="d-flex flex-column gap-3">
                            {offerMessages.map((msg, idx) => (
                                <div key={idx} className={`d-flex ${msg.sender.role === 'Admin' ? 'justify-content-start' : 'justify-content-end'}`}>
                                    <div className={`p-2 px-3 rounded-pill shadow-sm small fw-bold ${msg.sender.role === 'Admin' ? 'bg-white text-dark border' : 'bg-primary text-white'}`}>
                                        {msg.sender.role === 'Buyer' ? `Offer: $${msg.offerAmount}` : msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-muted small py-4">No messages yet. Be the first to start!</div>
                    )}
                </div>

                <div className="quick-offer bg-white border rounded-3 p-3 mb-3 shadow-sm">
                    <div className="row g-3 align-items-center">
                        <div className="col-auto">
                            <span className="fw-bold text-muted">Make an Offer:</span>
                        </div>
                        <div className="col">
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Your offer"
                                    value={offerAmount}
                                    onChange={(e) => setOfferAmount(e.target.value)}
                                    disabled={loading}
                                />
                                <button
                                    className="btn btn-primary px-4 fw-bold d-flex align-items-center gap-2"
                                    onClick={handleSendOffer}
                                    disabled={loading || !offerAmount}
                                >
                                    {loading ? <Loader2 size={16} className="animate-spin" /> : <><Send size={16} /> Send Offer</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-4 text-muted small mt-2">
                    <span className="d-flex align-items-center gap-1 cursor-pointer hover-text-primary">
                        <ThumbsUp size={14} /> Similar Sales
                    </span>
                    <span className="text-decoration-underline cursor-pointer">View Appraisals</span>
                </div>
            </div>
        </div>
    );
};

export default OfferNegotiator;
