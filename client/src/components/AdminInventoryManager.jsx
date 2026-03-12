import React from 'react';
import { Package, PieChart, BarChart2, Shield, Search } from 'lucide-react';

const AdminInventoryManager = ({ domains }) => {
    // Group domains by category
    const stats = {
        fixedPrice: domains.filter(d => d.category === 'Fixed Price').length,
        auctions: domains.filter(d => d.category === 'Auctions').length,
        offers: domains.filter(d => d.category === 'Make Offer').length,
    };

    return (
        <div className="inventory-manager h-100 pb-5">
            <div className="row g-4 mb-4">
                <div className="col-xl-4 col-md-6">
                    <div className="glass-card p-4 rounded-4 shadow-sm border-0 bg-white h-100">
                        <div className="d-flex align-items-center gap-3 mb-4">
                            <div className="bg-primary-soft text-primary p-3 rounded-4 flex-shrink-0">
                                <Package size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <h6 className="text-muted mb-0 small uppercase tracking-wider fw-bold text-truncate">Inventory Overview</h6>
                                <h3 className="fw-bold mb-0 text-dark-blue text-truncate">{domains.length} Assets</h3>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light">
                                <span className="small fw-bold">Fixed Price</span>
                                <span className="badge bg-white text-primary border">{stats.fixedPrice}</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light mt-2">
                                <span className="small fw-bold">Auctions</span>
                                <span className="badge bg-white text-primary border">{stats.auctions}</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center p-2 rounded-3 bg-light mt-2">
                                <span className="small fw-bold">Make Offer</span>
                                <span className="badge bg-white text-primary border">{stats.offers}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="glass-card p-4 rounded-4 shadow-sm border-0 bg-white h-100">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h6 className="fw-bold mb-0 flex-grow-1">Market Analysis</h6>
                            <div className="d-flex gap-2">
                                <button className="btn btn-light btn-sm rounded-pill px-3 active">Daily</button>
                                <button className="btn btn-light btn-sm rounded-pill px-3">Weekly</button>
                            </div>
                        </div>
                        <div className="d-flex align-items-end gap-3 h-100 pb-4" style={{ minHeight: '150px' }}>
                            {[40, 65, 45, 90, 75, 55, 80].map((h, i) => (
                                <div key={i} className="flex-grow-1 bg-primary-soft rounded-top position-relative group cursor-pointer" style={{ height: `${h}%` }}>
                                    <div className="bg-primary position-absolute inset-0 rounded-top opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-between text-muted small mt-2">
                            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-card rounded-4 shadow-sm border-0 bg-white overflow-hidden">
                <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                        <Shield size={20} className="text-success" />
                        <h5 className="fw-bold mb-0">Domain Security Audit</h5>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4">Asset</th>
                                <th>Registry Info</th>
                                <th>SSL Status</th>
                                <th>Auth Code</th>
                                <th className="text-end pe-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {domains.slice(0, 5).map((domain) => (
                                <tr key={domain._id}>
                                    <td className="ps-4">
                                        <div className="fw-bold text-dark-blue">{domain.name}</div>
                                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>{domain.registrar}</div>
                                    </td>
                                    <td>
                                        <span className="small text-muted">Expires: {domain.expiryDate}</span>
                                    </td>
                                    <td>
                                        <span className="text-success small d-flex align-items-center gap-1">
                                            <Shield size={12} /> Active
                                        </span>
                                    </td>
                                    <td>
                                        <code className="bg-light p-1 rounded small">********</code>
                                    </td>
                                    <td className="text-end pe-4">
                                        <span className="badge bg-success-soft text-success rounded-pill px-3">Verified</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminInventoryManager;
