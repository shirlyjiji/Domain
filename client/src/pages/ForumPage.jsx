import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import ForumPost from '../components/ForumPost';
import ForumSidebar from '../components/ForumSidebar';
import DirectPurchase from '../components/DirectPurchase';
import AuctionBidding from '../components/AuctionBidding';
import OfferNegotiator from '../components/OfferNegotiator';
import { ChevronRight, MessageSquare, ThumbsUp, Send, RefreshCcw } from 'lucide-react';

const ForumPage = () => {
    const { domainName } = useParams();
    const location = useLocation();
    const [domainState, setDomainState] = useState(location.state?.domain || null);

    const [messages, setMessages] = useState([]);
    const [newReply, setNewReply] = useState('');
    const [loading, setLoading] = useState(false);
    const replyRef = React.useRef(null);

    const mainPost = {
        id: 'main',
        domain: domainName || 'CanadaToAI.com',
        price: domainState?.price || '495',
        category: domainState?.category || 'Fixed Price',
        content: `I am offering my premium domain ${domainName || 'CanadaToAI.com'} for sale. This is a highly brandable domain for the AI sector. Perfect for a startup, consulting firm, or tech blog. Price is ${domainState?.category === 'Auctions' ? 'starting at' : 'fixed at'} $${domainState?.price || '495'} via Escrow.com or PayPal. DM me or post below to claim.`,
        user: { name: 'DomainGuru', avatar: 'https://i.pravatar.cc/150?u=dg1', online: true, posts: 1240, role: 'Admin' },
        date: 'Oct 2, 2025, 10:45 AM',
        number: 1,
        votes: 125,
        awards: ['Gold']
    };

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/messages/${domainName}`);
            setMessages(res.data);
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    };

    const fetchDomain = async () => {
        try {
            // We need a specific GET route for one domain or we can filter the list
            // For now, let's assume we can fetch by name or use the list with a param
            const res = await axios.get(`http://localhost:5000/api/domains?search=${domainName}`);
            if (res.data.domains?.length > 0) {
                setDomainState(res.data.domains[0]);
            }
        } catch (err) {
            console.error('Error fetching domain:', err);
        }
    };

    useEffect(() => {
        fetchMessages();
        fetchDomain();
    }, [domainName]);

    const handlePostReply = async () => {
        if (!newReply.trim()) return;
        setLoading(true);
        try {
            const payload = {
                domainName,
                sender: {
                    name: 'GuestBuyer', // Future: get from auth
                    avatar: 'https://i.pravatar.cc/150?u=guest',
                    role: 'Buyer'
                },
                content: newReply
            };
            await axios.post('http://localhost:5000/api/messages', payload);
            setNewReply('');
            fetchMessages();
        } catch (err) {
            console.error('Error posting reply:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async (id, direction) => {
        if (id === 'main') return; // Cannot vote on main post in this demo
        try {
            await axios.patch(`http://localhost:5000/api/messages/${id}/vote`, { direction });
            fetchMessages();
        } catch (err) {
            console.error('Error voting:', err);
        }
    };

    const handleReply = () => {
        replyRef.current?.scrollIntoView({ behavior: 'smooth' });
        replyRef.current?.focus();
    };

    const handleAward = async (id) => {
        if (id === 'main') return;
        try {
            await axios.patch(`http://localhost:5000/api/messages/${id}/award`, { awardType: '🏆' });
            fetchMessages();
        } catch (err) {
            console.error('Error awarding:', err);
        }
    };

    const handleShare = (id) => {
        const url = window.location.href + (id !== 'main' ? `?msg=${id}` : '');
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
    };

    return (
        <div className="forum-page bg-light-soft pt-4 pb-5">
            <div className="container">
                {/* Breadcrumbs */}
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb small text-muted">
                        <li className="breadcrumb-item"><a href="/" className="text-decoration-none text-dark">Home</a></li>
                        <li className="breadcrumb-item text-dark">Marketplace</li>
                        <li className="breadcrumb-item active">{mainPost.category}</li>
                    </ol>
                </nav>

                <div className="row g-4">
                    <div className="col-lg-9">
                        {/* Listing Header */}
                        <div className="listing-header mb-4 d-flex align-items-center gap-3 bg-white p-3 border shadow-sm">
                            <span className={`badge px-3 py-2 rounded-0 fw-bold ${mainPost.category === 'Auctions' ? 'bg-primary' :
                                mainPost.category === 'Make Offer' ? 'bg-info' : 'bg-warning text-dark'
                                }`}>
                                {mainPost.category?.toUpperCase() || 'FIXED'}
                            </span>
                            <h3 className="fw-bold mb-0 text-dark-blue">{mainPost.domain}</h3>
                            <div className="ms-auto d-flex gap-2">
                                <button className="btn btn-outline-secondary btn-sm px-3 rounded-pill" onClick={fetchMessages}>
                                    <RefreshCcw size={14} className="me-1" /> Sync
                                </button>
                                <button className="btn btn-primary-custom btn-sm px-4 rounded-pill">Watch</button>
                            </div>
                        </div>

                        {/* Category Specific View */}
                        {mainPost.category === 'Auctions' && <AuctionBidding domain={domainState} onBidSuccess={setDomainState} />}
                        {mainPost.category === 'Make Offer' && <OfferNegotiator domain={domainState} messages={messages} onOfferSuccess={fetchMessages} />}
                        {mainPost.category === 'Fixed Price' && <DirectPurchase domain={domainState} />}

                        <div className="mt-5 mb-3 d-flex align-items-center gap-2">
                            <MessageSquare size={20} className="text-primary" />
                            <h5 className="fw-bold mb-0">Discussion & Inquiries</h5>
                        </div>

                        {/* Main Post */}
                        <ForumPost
                            post={mainPost}
                            isFirst={true}
                            onReply={handleReply}
                            onShare={handleShare}
                            onAward={() => alert('Cannot award main post in demo')}
                            onVote={() => { }}
                            replyCount={messages.length}
                        />

                        {/* Replies from DB */}
                        <div className="reddit-thread mt-4">
                            {messages.map((msg, idx) => (
                                <ForumPost
                                    key={msg._id}
                                    post={{
                                        id: msg._id,
                                        user: msg.sender,
                                        content: msg.content,
                                        date: new Date(msg.timestamp).toLocaleString(),
                                        number: idx + 2,
                                        votes: msg.votes,
                                        awards: msg.awards
                                    }}
                                    isFirst={false}
                                    isReply={true}
                                    onVote={handleVote}
                                    onReply={handleReply}
                                    onAward={handleAward}
                                    onShare={handleShare}
                                    replyCount={0}
                                />
                            ))}
                        </div>

                        {/* Quick Reply Form */}
                        <div className="quick-reply bg-white border p-4 shadow-sm mt-4">
                            <h6 className="fw-bold mb-3 d-flex align-items-center gap-2 text-dark">
                                <Send size={18} className="text-primary" /> Reply to this listing
                            </h6>
                            <textarea
                                ref={replyRef}
                                className="form-control border-secondary-subtle mb-3 p-3"
                                rows="4"
                                placeholder="Type your inquiry or offer here..."
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                            ></textarea>
                            <div className="d-flex justify-content-end align-items-center">
                                <button
                                    className="btn btn-primary px-5 py-2 rounded-pill d-flex align-items-center gap-2 fw-bold shadow-sm"
                                    onClick={handlePostReply}
                                    disabled={loading}
                                >
                                    {loading ? 'Posting...' : <><Send size={16} /> Post Message</>}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3">
                        <ForumSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForumPage;
