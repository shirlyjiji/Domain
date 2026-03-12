import React from 'react';
import { DollarSign, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';

const AdminSalesManager = () => {
    const sales = [
        { id: '1', domain: 'CryptoNest.io', amount: 495, date: '2026-03-10', buyer: 'John Doe', status: 'Completed' },
        { id: '2', domain: 'AIMentor.com', amount: 350, date: '2026-03-09', buyer: 'Jane Smith', status: 'Pending' },
        { id: '3', domain: 'DataForge.net', amount: 850, date: '2026-03-08', buyer: 'Alex Wilson', status: 'Completed' },
        { id: '4', domain: 'TechFlow.io', amount: 590, date: '2026-03-07', buyer: 'Sarah Brown', status: 'Completed' },
    ];

    return (
        <div className="sales-manager h-100 pb-5">
            <div className="row g-4 mb-4">
                <div className="col-xl-4 col-md-6">
                    <div className="glass-card p-4 rounded-4 shadow-sm border-0 bg-white h-100">
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="bg-success-soft text-success p-3 rounded-4 flex-shrink-0">
                                <DollarSign size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <h6 className="text-muted mb-1 small uppercase tracking-wider fw-bold text-truncate">Total Sales</h6>
                                <h3 className="fw-bold mb-0 text-dark-blue text-truncate">$24,580</h3>
                            </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 text-success small fw-bold text-truncate">
                            <TrendingUp size={14} className="flex-shrink-0" />
                            <span>+12.5% from last month</span>
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6">
                    <div className="glass-card p-4 rounded-4 shadow-sm border-0 bg-white h-100">
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="bg-primary-soft text-primary p-3 rounded-4 flex-shrink-0">
                                <Calendar size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <h6 className="text-muted mb-1 small uppercase tracking-wider fw-bold text-truncate">Active Auctions</h6>
                                <h3 className="fw-bold mb-0 text-dark-blue text-truncate">14</h3>
                            </div>
                        </div>
                        <div className="d-flex align-items-center gap-2 text-primary small fw-bold text-truncate">
                            <ArrowUpRight size={14} className="flex-shrink-0" />
                            <span>4 closing today</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-card rounded-4 shadow-sm border-0 overflow-hidden bg-white">
                <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                    <h5 className="fw-bold mb-0">Recent Transactions</h5>
                    <button className="btn btn-primary btn-sm rounded-pill px-3">Export CSV</button>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4">Domain</th>
                                <th>Buyer</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th className="text-end pe-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((sale) => (
                                <tr key={sale.id}>
                                    <td className="ps-4">
                                        <div className="fw-bold text-dark-blue">{sale.domain}</div>
                                    </td>
                                    <td>{sale.buyer}</td>
                                    <td className="text-muted small">{sale.date}</td>
                                    <td className="fw-bold text-dark-blue">${sale.amount}</td>
                                    <td>
                                        <span className={`badge rounded-pill px-3 ${sale.status === 'Completed' ? 'bg-success-soft text-success' : 'bg-warning-soft text-dark'
                                            }`}>
                                            {sale.status}
                                        </span>
                                    </td>
                                    <td className="text-end pe-4">
                                        <button className="btn btn-link btn-sm text-primary text-decoration-none fw-bold">Details</button>
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

export default AdminSalesManager;
