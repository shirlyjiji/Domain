import React, { useState } from 'react';
import { Gavel, Clock, TrendingUp, History, Loader2 } from 'lucide-react';
import axios from 'axios';

const AuctionBidding = ({ domain, onBidSuccess }) => {
    const [bidAmount, setBidAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const minIncrement = 10;
    const currentPrice = domain?.price || 0;
    const minBid = currentPrice + minIncrement;

    const handleBid = async () => {
        const amount = parseFloat(bidAmount);
        if (isNaN(amount) || amount < minBid) {
            setMessage({ type: 'error', text: `Minimum bid is $${minBid}` });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // In a real app, user info would come from auth context
            const user = { name: 'GuestBuyer', avatar: 'https://i.pravatar.cc/150?u=guest' };
            const res = await axios.patch(`http://localhost:5000/api/domains/${domain._id}/bid`, {
                amount,
                user
            });

            setMessage({ type: 'success', text: 'Bid placed successfully!' });
            setBidAmount('');
            if (onBidSuccess) onBidSuccess(res.data);
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Error placing bid' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auction-bidding-view bg-white border p-4 shadow-sm mb-4">
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <Gavel className="text-primary" /> Active Auction
            </h5>

            <div className="row g-4">
                <div className="col-md-6">
                    <div className="bg-light p-4 border rounded-3 text-center mb-4">
                        <div className="text-muted small text-uppercase fw-bold mb-1">Current Bid</div>
                        <div className="fs-1 fw-bold text-primary mb-2">${currentPrice}</div>
                        <div className="badge bg-white text-dark border px-3 py-2 rounded-pill small">
                            <Clock size={14} className="me-1" /> Ends in: {domain?.endsIn || '1d 12h'}
                        </div>
                    </div>

                    <div className="bid-input-group mb-3">
                        <label className="fw-bold small text-muted mb-2">Your Maximum Bid</label>
                        <div className="input-group input-group-lg">
                            <span className="input-group-text bg-white border-end-0">$</span>
                            <input
                                type="number"
                                className="form-control border-start-0"
                                placeholder={`Min. $${minBid}`}
                                value={bidAmount}
                                onChange={(e) => setBidAmount(e.target.value)}
                                disabled={loading}
                            />
                            <button
                                className="btn btn-primary px-4 fw-bold d-flex align-items-center gap-2"
                                onClick={handleBid}
                                disabled={loading || !bidAmount}
                            >
                                {loading ? <Loader2 size={20} className="animate-spin" /> : 'BID NOW'}
                            </button>
                        </div>
                        {message.text && (
                            <p className={`small mt-2 ${message.type === 'error' ? 'text-danger' : 'text-success'}`}>
                                {message.text}
                            </p>
                        )}
                        <p className="small text-muted mt-2">Minimum increment: ${minIncrement}.00</p>
                    </div>
                </div>

                <div className="col-md-6">
                    <h6 className="fw-bold small text-uppercase text-muted mb-3 d-flex align-items-center gap-2">
                        <History size={16} /> Recent Bids
                    </h6>
                    <div className="bid-history border rounded-3 overflow-hidden">
                        {domain?.bidHistory && domain.bidHistory.length > 0 ? (
                            domain.bidHistory.slice(0, 5).map((bid, i) => (
                                <div key={i} className="d-flex justify-content-between p-2 px-3 border-bottom hover-bg-light">
                                    <div className="d-flex align-items-center gap-2">
                                        <img
                                            src={bid.user?.avatar}
                                            alt={bid.user?.name}
                                            className="rounded-circle"
                                            style={{ width: '24px', height: '24px' }}
                                        />
                                        <span className="small fw-medium">{bid.user?.name}</span>
                                    </div>
                                    <span className="small fw-bold">${bid.amount}</span>
                                </div>
                            ))
                        ) : (
                            <div className="p-3 text-center text-muted small">No bids yet</div>
                        )}
                    </div>
                    <button className="btn btn-link btn-sm w-100 text-decoration-none mt-2">View Full History</button>
                </div>
            </div>

            <div className="mt-4 p-3 bg-info-soft border border-info rounded-3 d-flex align-items-center gap-3">
                <TrendingUp className="text-info" />
                <div className="small fw-medium text-info">
                    {domain?.bids || 0} bids placed so far. This auction is heating up!
                </div>
            </div>
        </div>
    );
};

export default AuctionBidding;
