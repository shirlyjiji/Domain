import React from 'react';
import { Megaphone, ExternalLink, Activity, DollarSign, MousePointerClick, Eye, Plus, Search, MoreHorizontal, ChevronRight, BarChart2 } from 'lucide-react';

const AdminAdvertisementManager = () => {
    // Mock data for advertisement stats and campaigns
    const adStats = {
        activeCampaigns: 12,
        totalImpressions: '2.4M',
        totalClicks: '145K',
        revenue: '$8,450'
    };

    const campaigns = [
        { id: 1, name: 'Summer Domain Sale', advertiser: 'YallaDomains', status: 'Active', impressions: '120,000', ctr: '4.5%', budget: '$500/day', end: 'Aug 31, 2024', logo: 'https://i.pravatar.cc/150?u=yalla' },
        { id: 2, name: 'Premium Hosting Bundle', advertiser: 'HostRight', status: 'Active', impressions: '85,400', ctr: '3.2%', budget: '$250/day', end: 'Dec 31, 2024', logo: 'https://i.pravatar.cc/150?u=host' },
        { id: 3, name: 'SSL Certificate Promo', advertiser: 'SecureNet', status: 'Active', impressions: '45,000', ctr: '2.8%', budget: '$100/day', end: 'Oct 15, 2024', logo: 'https://i.pravatar.cc/150?u=secure' },
        { id: 4, name: 'Tech Startup Package', advertiser: 'LaunchPad', status: 'Paused', impressions: '210,000', ctr: '5.1%', budget: '$1000/day', end: 'Jul 01, 2024', logo: 'https://i.pravatar.cc/150?u=launch' },
        { id: 5, name: 'AI Domain Names', advertiser: 'AITrends', status: 'Active', impressions: '95,000', ctr: '6.5%', budget: '$300/day', end: 'Nov 30, 2024', logo: 'https://i.pravatar.cc/150?u=ai' },
    ];

    const topPerforming = [
        { id: 1, name: 'AI Domain Names', roi: '+125%' },
        { id: 2, name: 'Summer Domain Sale', roi: '+88%' },
        { id: 3, name: 'Premium Hosting Bundle', roi: '+45%' },
    ];

    return (
        <div className="admin-advertisement-manager">
            {/* Header Stats Zone */}
            <div className="row g-4 mb-4">
                <div className="col-xl-3 col-lg-6 col-md-6">
                    <div className="glass-card stat-card-premium p-4 rounded-4 shadow-sm bg-white overflow-hidden position-relative h-100">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-primary-soft text-primary p-3 rounded-4 shadow-sm flex-shrink-0">
                                <Megaphone size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="fw-bold mb-0 text-dark-blue text-truncate">{adStats.activeCampaigns}</h3>
                                <p className="text-muted small mb-0 fw-medium text-truncate">Active Campaigns</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                    <div className="glass-card stat-card-premium p-4 rounded-4 shadow-sm bg-white overflow-hidden position-relative h-100">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-info-soft text-info p-3 rounded-4 shadow-sm flex-shrink-0">
                                <Eye size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="fw-bold mb-0 text-dark-blue text-truncate">{adStats.totalImpressions}</h3>
                                <p className="text-muted small mb-0 fw-medium text-truncate">Total Impressions</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                    <div className="glass-card stat-card-premium p-4 rounded-4 shadow-sm bg-white overflow-hidden position-relative h-100">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-success-soft text-success p-3 rounded-4 shadow-sm flex-shrink-0">
                                <MousePointerClick size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="fw-bold mb-0 text-dark-blue text-truncate">{adStats.totalClicks}</h3>
                                <p className="text-muted small mb-0 fw-medium text-truncate">Total Clicks</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                    <div className="glass-card stat-card-premium p-4 rounded-4 shadow-sm bg-primary-gradient text-white overflow-hidden position-relative h-100">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-white-10 p-3 rounded-4 shadow-sm text-white flex-shrink-0">
                                <DollarSign size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="fw-bold mb-0 text-white text-truncate">{adStats.revenue}</h3>
                                <p className="opacity-75 small mb-0 fw-medium text-white text-truncate">Ad Revenue</p>
                            </div>
                        </div>
                        <div className="position-absolute align-items-center gap-1 d-flex top-0 end-0 p-3 opacity-75 d-none d-sm-flex">
                            <Activity size={14} /> <span className="small">Live</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* Main Content: Campaigns List */}
                <div className="col-xl-9 col-lg-8">
                    <div className="glass-card rounded-4 shadow-sm bg-white mb-4 border-0">
                        <div className="p-4 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div>
                                <h5 className="fw-bold mb-1">Campaign Performance</h5>
                                <p className="text-muted small mb-0">Monitor and manage all active advertising campaigns</p>
                            </div>
                            <div className="d-flex gap-2">
                                <div className="position-relative">
                                    <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                                    <input type="text" className="form-control form-control-sm rounded-pill ps-5 bg-light" placeholder="Search campaigns..." style={{ width: '240px' }} />
                                </div>
                                <button className="btn btn-outline-secondary btn-sm rounded-pill px-3 d-flex align-items-center gap-2 border">
                                    <ExternalLink size={14} /> Export Report
                                </button>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table hover-table align-middle mb-0">
                                <thead>
                                    <tr className="bg-light-soft">
                                        <th className="ps-4 py-3 small text-muted text-uppercase tracking-wider">Campaign</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider">Status</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider">Performance</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider">Budget</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider pe-4">End Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {campaigns.map(campaign => (
                                        <tr key={campaign.id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center gap-3">
                                                    <img src={campaign.logo} className="rounded-2 shadow-sm" style={{ width: '40px', height: '40px' }} alt="" />
                                                    <div className="lh-sm">
                                                        <div className="fw-bold text-dark-blue small mb-1">{campaign.name}</div>
                                                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{campaign.advertiser}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge rounded-pill fw-medium px-3 py-1 ${campaign.status === 'Active' ? 'bg-success-soft text-success' : 'bg-warning-soft text-warning'
                                                    }`}>
                                                    <span className={`d-inline-block rounded-circle me-2 ${campaign.status === 'Active' ? 'bg-success' : 'bg-warning'}`} style={{ width: '6px', height: '6px' }}></span>
                                                    {campaign.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column gap-1">
                                                    <div className="d-flex justify-content-between align-items-center w-100" style={{ maxWidth: '120px' }}>
                                                        <span className="small fw-bold text-dark-blue">{campaign.impressions}</span>
                                                        <span className="text-muted" style={{ fontSize: '0.7rem' }}>Impr.</span>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-center w-100" style={{ maxWidth: '120px' }}>
                                                        <span className="small fw-bold text-primary">{campaign.ctr}</span>
                                                        <span className="text-muted" style={{ fontSize: '0.7rem' }}>CTR</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="fw-bold small">{campaign.budget}</span>
                                            </td>
                                            <td className="pe-4">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <span className="text-muted small">{campaign.end}</span>
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
                    {/* Quick Create Widget */}
                    <div className="glass-card rounded-4 shadow-sm bg-primary-gradient text-white border-0 p-4 mb-4 position-relative overflow-hidden">
                        <div className="position-relative z-1">
                            <div className="bg-white-10 p-3 rounded-circle d-inline-flex mb-3 text-white">
                                <Plus size={24} />
                            </div>
                            <h5 className="fw-bold mb-2 text-white">New Campaign</h5>
                            <p className="opacity-75 small mb-4 text-white">Launch a new targeted advertising campaign across the marketplace.</p>
                            <button className="btn btn-light w-100 rounded-pill fw-bold py-2 shadow-sm d-flex align-items-center justify-content-center gap-2">
                                Create Now
                            </button>
                        </div>
                        <div className="position-absolute opacity-10" style={{ right: '-20px', bottom: '-20px' }}>
                            <Megaphone size={120} />
                        </div>
                    </div>

                    {/* Top Performers Widget */}
                    <div className="glass-card rounded-4 shadow-sm bg-white border-0 mb-4">
                        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold mb-0">Top Performing</h6>
                            <BarChart2 size={16} className="text-primary" />
                        </div>
                        <div className="p-4">
                            <div className="d-flex flex-column gap-3">
                                {topPerforming.map((perf, index) => (
                                    <div key={perf.id} className="d-flex align-items-center justify-content-between p-2 rounded-3 hover-bg-light transition-all cursor-pointer">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="fw-bold text-muted small">#{index + 1}</div>
                                            <div className="text-dark-blue small fw-bold">{perf.name}</div>
                                        </div>
                                        <span className="badge bg-success-soft text-success rounded-pill">{perf.roi}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAdvertisementManager;
