import React from 'react';
import { Database, Gavel, DollarSign, TrendingUp } from 'lucide-react';

const AdminStats = ({ stats }) => {
    const statCards = [
        { label: 'Total Domains', value: stats.totalDomains, icon: Database, color: 'bg-primary' },
        { label: 'Active Auctions', value: stats.activeAuctions, icon: Gavel, color: 'bg-info' },
        { label: 'Total Volume', value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-success' },
        { label: 'Growth', value: '+12%', icon: TrendingUp, color: 'bg-warning' },
    ];

    return (
        <div className="row g-4 mb-5">
            {statCards.map((stat, index) => (
                <div className="col-xl-3 col-lg-4 col-md-6" key={index}>
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100">
                        <div className="card-body p-4 d-flex align-items-center">
                            <div className={`${stat.color} text-white p-3 rounded-4 me-3 flex-shrink-0`}>
                                <stat.icon size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <h6 className="text-muted small fw-bold text-uppercase mb-1 text-truncate">{stat.label}</h6>
                                <h4 className="fw-bold mb-0 text-dark-blue text-truncate">{stat.value}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminStats;
