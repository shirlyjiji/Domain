import React from 'react';
import { Gavel, TrendingUp, Users, DollarSign, Clock, Search, ExternalLink, MoreHorizontal, ArrowUpRight, Flame } from 'lucide-react';

const AdminAuctionsManager = () => {
    // Mock data for auction stats and active auctions
    const auctionStats = {
        liveAuctions: 45,
        totalBids: 1250,
        highestBid: '$15,000',
        revenue: '$45,500'
    };

    const activeAuctions = [
        { id: 1, domain: 'CryptoAI.com', startingBid: '$5,000', currentBid: '$12,500', bidders: 24, timeLeft: '02h 45m', status: 'Hot', icon: Flame },
        { id: 2, name: 'EcoFoods.co', startingBid: '$500', currentBid: '$1,200', bidders: 8, timeLeft: '14h 20m', status: 'Live', icon: Clock },
        { id: 3, name: 'CloudHost.net', startingBid: '$1,000', currentBid: '$3,450', bidders: 15, timeLeft: '1d 05h', status: 'Live', icon: Clock },
        { id: 4, name: 'VRGames.io', startingBid: '$2,500', currentBid: '$8,900', bidders: 32, timeLeft: '45m 12s', status: 'Hot', icon: Flame },
        { id: 5, name: 'SmartHome.org', startingBid: '$100', currentBid: '$450', bidders: 5, timeLeft: '3d 12h', status: 'Live', icon: Clock },
    ];

    const topBidders = [
        { id: 1, name: 'Alex M.', bids: 42, spent: '$25,000', avatar: 'https://i.pravatar.cc/150?u=alex' },
        { id: 2, name: 'Priya K.', bids: 35, spent: '$18,500', avatar: 'https://i.pravatar.cc/150?u=priya' },
        { id: 3, name: 'InvestGroup', bids: 28, spent: '$45,000', avatar: 'https://i.pravatar.cc/150?u=invest' },
    ];

    return (
        <div className="admin-auctions-manager">
            {/* Header Stats Zone */}
            <div className="row g-4 mb-4">
                <div className="col-xl-3 col-lg-6 col-md-6">
                    <div className="glass-card stat-card-premium p-4 rounded-4 shadow-sm bg-white overflow-hidden position-relative h-100">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-danger-soft text-danger p-3 rounded-4 shadow-sm flex-shrink-0">
                                <Gavel size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="fw-bold mb-0 text-dark-blue text-truncate">{auctionStats.liveAuctions}</h3>
                                <p className="text-muted small mb-0 fw-medium text-truncate">Live Auctions</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                    <div className="glass-card stat-card-premium p-4 rounded-4 shadow-sm bg-white overflow-hidden position-relative h-100">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-primary-soft text-primary p-3 rounded-4 shadow-sm flex-shrink-0">
                                <Users size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="fw-bold mb-0 text-dark-blue text-truncate">{auctionStats.totalBids}</h3>
                                <p className="text-muted small mb-0 fw-medium text-truncate">Total Bids (24h)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                    <div className="glass-card stat-card-premium p-4 rounded-4 shadow-sm bg-white overflow-hidden position-relative h-100">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-warning-soft text-warning p-3 rounded-4 shadow-sm flex-shrink-0">
                                <TrendingUp size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="fw-bold mb-0 text-dark-blue text-truncate">{auctionStats.highestBid}</h3>
                                <p className="text-muted small mb-0 fw-medium text-truncate">Highest Bid</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                    <div className="glass-card stat-card-premium p-4 rounded-4 shadow-sm bg-success-soft text-success overflow-hidden position-relative h-100">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-white p-3 rounded-4 shadow-sm text-success flex-shrink-0">
                                <DollarSign size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="fw-bold mb-0 text-success text-truncate">{auctionStats.revenue}</h3>
                                <p className="opacity-75 small mb-0 fw-medium text-success text-opacity-75 text-truncate">Auction Revenue</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* Main Content: Live Auctions List */}
                <div className="col-xl-9 col-lg-8">
                    <div className="glass-card rounded-4 shadow-sm bg-white mb-4 border-0">
                        <div className="p-4 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div>
                                <h5 className="fw-bold mb-1">Live Auctions</h5>
                                <p className="text-muted small mb-0">Monitor real-time bidding activity across the marketplace</p>
                            </div>
                            <div className="d-flex gap-2">
                                <div className="position-relative">
                                    <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                                    <input type="text" className="form-control form-control-sm rounded-pill ps-5 bg-light" placeholder="Search domains..." style={{ width: '240px' }} />
                                </div>
                                <button className="btn btn-outline-secondary btn-sm rounded-pill px-3 d-flex align-items-center gap-2 border">
                                    <ExternalLink size={14} /> Export
                                </button>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table hover-table align-middle mb-0">
                                <thead>
                                    <tr className="bg-light-soft">
                                        <th className="ps-4 py-3 small text-muted text-uppercase tracking-wider">Domain</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider">Starting Bid</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider">Current Bid</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider text-center">Bidders</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider">Time Left</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider pe-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeAuctions.map(auction => (
                                        <tr key={auction.id}>
                                            <td className="ps-4">
                                                <div className="fw-bold text-dark-blue small mb-1">{auction.domain || auction.name}</div>
                                            </td>
                                            <td>
                                                <span className="text-muted small">{auction.startingBid}</span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className="fw-bold small text-success">{auction.currentBid}</span>
                                                    {auction.status === 'Hot' && <TrendingUp size={14} className="text-success" />}
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <span className="badge bg-light text-dark border rounded-pill px-3">{auction.bidders}</span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center gap-2 text-muted small fw-medium">
                                                    <Clock size={14} /> {auction.timeLeft}
                                                </div>
                                            </td>
                                            <td className="pe-4">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <span className={`badge rounded-pill fw-medium px-3 d-flex align-items-center gap-1 ${auction.status === 'Hot' ? 'bg-danger-soft text-danger' : 'bg-primary-soft text-primary'
                                                        }`}>
                                                        <auction.icon size={12} /> {auction.status}
                                                    </span>
                                                    <button className="btn btn-link btn-sm text-muted p-0 hover-text-primary"><MoreHorizontal size={18} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Widgets */}
                <div className="col-xl-3 col-lg-4">
                    {/* Top Bidders Widget */}
                    <div className="glass-card rounded-4 shadow-sm bg-white border-0 mb-4">
                        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold mb-0">Top Bidders</h6>
                            <Users size={16} className="text-primary" />
                        </div>
                        <div className="p-4">
                            <div className="d-flex flex-column gap-3">
                                {topBidders.map((bidder, index) => (
                                    <div key={bidder.id} className="d-flex align-items-center justify-content-between p-2 rounded-3 hover-bg-light transition-all cursor-pointer">
                                        <div className="d-flex align-items-center gap-3">
                                            <img src={bidder.avatar} className="rounded-circle shadow-sm" style={{ width: '32px', height: '32px' }} alt="" />
                                            <div className="lh-sm">
                                                <div className="text-dark-blue small fw-bold">{bidder.name}</div>
                                                <div className="text-muted" style={{ fontSize: '0.7rem' }}>{bidder.bids} Active Bids</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Auctions Widget */}
                    <div className="glass-card rounded-4 shadow-sm bg-primary-gradient text-white border-0 p-4 position-relative overflow-hidden">
                        <div className="position-relative z-1">
                            <div className="bg-white-10 p-3 rounded-circle d-inline-flex mb-3 text-white">
                                <Clock size={24} />
                            </div>
                            <h5 className="fw-bold mb-2 text-white">Upcoming Events</h5>
                            <p className="opacity-75 small mb-4 text-white">A premium domain auction event is starting in 48 hours.</p>
                            <button className="btn btn-light w-100 rounded-pill fw-bold py-2 shadow-sm d-flex align-items-center justify-content-center gap-2">
                                Prepare Event <ArrowUpRight size={18} />
                            </button>
                        </div>
                        <div className="position-absolute opacity-10" style={{ right: '-20px', bottom: '-20px' }}>
                            <Gavel size={120} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAuctionsManager;
