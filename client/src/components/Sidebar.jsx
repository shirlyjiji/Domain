import React from 'react';
import { User, ShieldCheck, MessageCircle, ChevronRight } from 'lucide-react';

const Sidebar = () => {
    const sellers = [
        { name: 'DomainPro', rating: '389+', success: '160%' },
        { name: 'DNKing', rating: '84%', success: '93%' },
        { name: 'BrandExpert', rating: '93%', success: '93%' }
    ];

    return (
        <aside className="sidebar">
            <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                    <h5 className="fw-bold mb-4">Top Domain Sellers</h5>
                    {sellers.map((seller, idx) => (
                        <div key={idx} className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom-dashed">
                            <div className="d-flex align-items-center">
                                <img src={`https://i.pravatar.cc/150?u=${idx + 10}`} alt="Seller" className="rounded-circle me-3" style={{width: '45px', height: '45px'}} />
                                <div>
                                    <h6 className="fw-bold mb-0">{seller.name}</h6>
                                    <small className="text-muted">Online for 4 years</small>
                                </div>
                            </div>
                            <div className="text-end">
                                <div className="text-warning small fw-bold">{seller.rating}</div>
                                <div className="badge bg-success-soft text-success small">{seller.success}</div>
                            </div>
                        </div>
                    ))}
                    <button className="btn btn-link text-decoration-none text-muted small p-0 d-flex align-items-center w-100 justify-content-between">
                        View All <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            <div className="card bg-primary-gradient text-white border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4 text-center py-5">
                    <ShieldCheck size={48} className="mb-3 text-warning-custom" />
                    <h5 className="fw-bold mb-2">Safe & Secure Payments</h5>
                    <div className="d-flex justify-content-center gap-2 mb-4 mt-4 flex-wrap">
                        <div className="bg-white p-2 rounded shadow-sm d-flex align-items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" style={{height: '15px'}} alt="PayPal" /></div>
                        <div className="bg-white p-2 rounded shadow-sm d-flex align-items-center"><img src="/assets/images/google-pay.png" style={{height: '15px'}} alt="Google Pay" /></div>
                        <div className="bg-white p-2 rounded shadow-sm d-flex align-items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Bitcoin.svg" style={{height: '15px'}} alt="BTC" /></div>
                    </div>
                    <p className="small opacity-75">We recommend using Escrow.com for more secure transactions.</p>
                </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="bg-dark p-4 text-white">
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <img src="/assets/images/google-search.png" alt="Google" style={{width: '20px', height: '20px', objectFit: 'contain'}} />
                        <h6 className="fw-bold mb-0">Google Indexed Status</h6>
                    </div>
                    <p className="small text-light opacity-75 mb-3">Check if your potential domain is already ranking on Google.</p>
                    <button className="btn btn-primary-custom btn-sm w-100 mb-3">Check Index Now</button>
                    
                    <div className="d-flex align-items-center gap-2 mb-2 pt-2 border-top border-secondary">
                        <MessageCircle size={20} className="text-primary" />
                        <h6 className="fw-bold mb-0">Forum: Investor Discussions</h6>
                    </div>
                    <p className="small text-light opacity-75 mb-3">Join the Conversation with 50,000+ investors.</p>
                    <button className="btn btn-outline-light btn-sm w-100 rounded-pill">Join Now</button>
                </div>
                <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Forum" className="img-fluid" style={{height: '120px', objectFit: 'cover'}} />
            </div>
        </aside>
    );
};

export default Sidebar;
