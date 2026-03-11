import React from 'react';
import { User, ShieldCheck, TrendingUp, MessageCircle, Info, ChevronRight } from 'lucide-react';

const ForumSidebar = () => {
    return (
        <aside className="forum-sidebar">
            {/* User Stats Card */}
            <div className="card border-0 shadow-sm rounded-0 mb-3 forum-card">
                <div className="card-header bg-white border-bottom-0 py-3">
                    <h6 className="fw-bold mb-0 text-uppercase small text-muted">Acknowledge</h6>
                </div>
                <div className="card-body pt-0">
                    <div className="d-flex align-items-start gap-2 small text-muted">
                        <Info size={16} className="text-primary mt-1 flex-shrink-0" />
                        <p className="mb-0">Selected value for selling domains, simple and easy.</p>
                    </div>
                    <button className="btn btn-primary w-100 btn-sm mt-3 rounded-0">Proceed</button>
                </div>
            </div>

            {/* Ads / Featured Domains */}
            <div className="card border-0 shadow-sm rounded-0 mb-3 forum-card overflow-hidden">
                <div className="bg-primary text-white p-3 text-center">
                    <ShieldCheck size={32} className="mb-2" />
                    <h6 className="fw-bold mb-0">LICENSED & INSURED</h6>
                    <p className="small mb-0 opacity-75">Domain Escrow Services</p>
                </div>
                <div className="bg-light p-2 text-center border-top border-white">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ea/GoDaddy_Logo.svg" alt="GoDaddy" style={{height: '20px'}} />
                </div>
            </div>

            {/* Recent Threads */}
            <div className="card border-0 shadow-sm rounded-0 mb-3 forum-card">
                <div className="card-header bg-white py-3">
                    <h6 className="fw-bold mb-0 text-uppercase small text-muted">Recent Threads</h6>
                </div>
                <div className="card-body p-0">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="px-3 py-2 border-bottom hover-bg-light cursor-pointer">
                            <div className="small fw-bold text-primary text-truncate">Premium .AI domain for sale - AIHub.ai</div>
                            <div className="d-flex justify-content-between text-muted" style={{fontSize: '0.7rem'}}>
                                <span>by DomainKing</span>
                                <span>2 mins ago</span>
                            </div>
                        </div>
                    ))}
                    <div className="p-2 text-center">
                        <button className="btn btn-link btn-sm text-decoration-none text-muted small">View More <ChevronRight size={14} /></button>
                    </div>
                </div>
            </div>

            {/* Sidebar Promo */}
            <div className="promo-banner bg-dark text-white p-3 text-center mb-3">
                <TrendingUp size={24} className="text-warning mb-2" />
                <h6 className="fw-bold mb-1">Domain Deals Online</h6>
                <p className="small mb-0 opacity-75">No Auctions! Direct Buy Only.</p>
            </div>
        </aside>
    );
};

export default ForumSidebar;
