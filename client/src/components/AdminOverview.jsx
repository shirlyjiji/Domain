import React from 'react';
import { Users, UserCheck, DollarSign, Gavel, ArrowUpRight, Clock, MessageSquare, History, ChevronRight, Globe, Shield, CreditCard, Bell, MoreHorizontal, ExternalLink, Settings } from 'lucide-react';

const AdminOverview = ({ stats, domains, searchTerm = '' }) => {
    // Mock data for new sections to match design
    const recentUsers = [
        { id: 1, name: 'Michael T.', email: 'michael@example.com', membership: 'Premium', domains: 7, status: 'Active', avatar: 'https://i.pravatar.cc/150?u=michael' },
        { id: 2, name: 'Aisha K.', email: 'aisha@example.com', membership: 'Investor', domains: 8, status: 'Active', avatar: 'https://i.pravatar.cc/150?u=aisha' },
        { id: 3, name: 'John D.', email: 'john@example.com', membership: 'Company', domains: 5, status: 'Active', avatar: 'https://i.pravatar.cc/150?u=john' },
        { id: 4, name: 'Emily R.', email: 'emily@example.com', membership: 'Advertiser', domains: 3, status: 'Active', avatar: 'https://i.pravatar.cc/150?u=emily' },
        { id: 5, name: 'Alex P.', email: 'alex@example.com', membership: 'Premium', domains: 3, status: 'Active', avatar: 'https://i.pravatar.cc/150?u=alex' },
    ];

    const memberships = [
        { id: 1, name: 'Michael', email: 'workfriendly.com', renewal: '$200', domains: 201, status: 'Active', logo: 'https://i.pravatar.cc/150?u=godaddy' },
        { id: 2, name: 'Sprint', email: 'ecofoods.co', renewal: '$550', domains: 550, status: 'Active', logo: 'https://i.pravatar.cc/150?u=namecheap' },
        { id: 3, name: 'John D.', email: 'fintechpro.com', renewal: '$5,000', domains: '50+', status: 'Active', logo: 'https://i.pravatar.cc/150?u=dynadot' },
    ];

    const filteredUsers = recentUsers.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.membership.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredMemberships = memberships.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const notifications = [
        { id: 1, type: 'domain', title: 'New domain listed', domain: 'AllHub.com', actor: 'DomainKing', time: '10 min', icon: Globe, color: 'text-primary bg-primary-soft' },
        { id: 2, type: 'member', title: 'New premium member', actor: 'Sarah L. upgraded', time: '30 min', icon: Settings, color: 'text-secondary bg-light' },
        { id: 3, type: 'payment', title: 'Escrow payment received', domain: 'SmartLink.com', time: '1h', icon: DollarSign, color: 'text-success bg-success-soft' },
    ];

    return (
        <div className="admin-overview">
            {/* Top Stat Cards */}
            <div className="row g-4 mb-4">
                <div className="col-xl-3 col-lg-6 col-md-6">
                    <div className="glass-card stat-card-premium p-4 rounded-4 shadow-sm bg-white overflow-hidden position-relative h-100">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-primary text-white p-3 rounded-4 shadow-sm flex-shrink-0">
                                <Users size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="fw-bold mb-0 text-dark-blue text-truncate">1,250</h3>
                                <p className="text-muted small mb-0 fw-medium text-truncate">Total Users</p>
                            </div>
                        </div>
                        <div className="spark-line position-absolute bottom-0 start-0 w-100 bg-primary-soft" style={{ height: '3px' }}></div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                    <div className="glass-card stat-card-premium p-4 rounded-4 shadow-sm bg-white overflow-hidden position-relative h-100">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-info text-white p-3 rounded-4 shadow-sm flex-shrink-0">
                                <UserCheck size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="fw-bold mb-0 text-dark-blue text-truncate">480</h3>
                                <p className="text-muted small mb-0 fw-medium text-truncate">Active Memberships</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                    <div className="glass-card stat-card-premium p-4 rounded-4 shadow-sm bg-white overflow-hidden position-relative h-100">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-warning text-white p-3 rounded-4 shadow-sm flex-shrink-0">
                                <DollarSign size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="fw-bold mb-0 text-dark-blue text-truncate">$4,200</h3>
                                <p className="text-muted small mb-0 fw-medium text-truncate">Monthly Revenue</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-6">
                    <div className="glass-card stat-card-premium p-4 rounded-4 shadow-sm bg-white overflow-hidden position-relative h-100">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-danger text-white p-3 rounded-4 shadow-sm flex-shrink-0">
                                <Gavel size={24} />
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="fw-bold mb-0 text-dark-blue text-truncate">120</h3>
                                <p className="text-muted small mb-0 fw-medium text-truncate">Active Auctions</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Daily Highlights Bar */}
            <div className="glass-card py-2 px-4 rounded-4 shadow-sm bg-white border mb-4 d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="d-flex align-items-center gap-2">
                    <Users size={18} className="text-primary" />
                    <span className="fw-bold">25</span>
                    <span className="text-muted small">New Registrations Today</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <DollarSign size={18} className="text-warning" />
                    <span className="fw-bold">15</span>
                    <span className="text-muted small">Domains Sold Today</span>
                </div>
                <div className="text-dark-blue fw-bold fs-5">$500</div>
            </div>

            <div className="row g-4">
                {/* Main Column (Left) */}
                <div className="col-xl-8 col-lg-7">
                    {/* Users Table */}
                    <div className="glass-card rounded-4 shadow-sm bg-white mb-4 border-0">
                        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="fw-bold mb-0">Users</h5>
                            <button className="btn btn-light btn-sm rounded-pill px-3 d-flex align-items-center gap-2 border">
                                <ExternalLink size={14} /> Export
                            </button>
                        </div>
                        <div className="table-responsive">
                            <table className="table hover-table align-middle mb-0">
                                <thead>
                                    <tr className="bg-light">
                                        <th className="ps-4 py-3 small text-muted uppercase tracking-wider">Name</th>
                                        <th className="py-3 small text-muted uppercase tracking-wider">Membership</th>
                                        <th className="py-3 small text-muted uppercase tracking-wider">Domains</th>
                                        <th className="py-3 small text-muted uppercase tracking-wider pe-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map(user => (
                                        <tr key={user.id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center gap-3">
                                                    <img src={user.avatar} className="rounded-circle" style={{ width: '32px', height: '32px' }} alt="" />
                                                    <div className="lh-1">
                                                        <div className="fw-bold text-dark-blue small">{user.name}</div>
                                                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge rounded-pill px-3 py-1 fw-medium ${user.membership === 'Premium' ? 'bg-primary-soft text-primary' :
                                                    user.membership === 'Investor' ? 'bg-success-soft text-success' : 'bg-info-soft text-info'
                                                    }`}>
                                                    {user.membership}
                                                </span>
                                            </td>
                                            <td className="fw-bold small text-dark-blue">{user.domains}</td>
                                            <td className="pe-4">
                                                <span className="text-success small fw-bold">Active</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Memberships Table */}
                    <div className="glass-card rounded-4 shadow-sm bg-white mb-4 border-0">
                        <div className="p-4 border-bottom">
                            <h5 className="fw-bold mb-0">Memberships</h5>
                        </div>
                        <div className="table-responsive">
                            <table className="table align-middle mb-0">
                                <thead>
                                    <tr className="bg-light">
                                        <th className="ps-4 py-3 small text-muted uppercase tracking-wider">Name</th>
                                        <th className="py-3 small text-muted uppercase tracking-wider">Email</th>
                                        <th className="py-3 small text-muted uppercase tracking-wider">Domains</th>
                                        <th className="py-3 small text-muted uppercase tracking-wider pe-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMemberships.map(member => (
                                        <tr key={member.id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center gap-2">
                                                    <img src={member.logo} className="rounded border bg-light p-1" style={{ width: '28px' }} alt="" />
                                                    <span className="fw-bold small text-dark-blue">{member.name}</span>
                                                </div>
                                            </td>
                                            <td className="small text-muted">{member.email}</td>
                                            <td className="fw-bold small text-dark-blue">{member.domains}</td>
                                            <td className="pe-4">
                                                <span className="badge bg-success-soft text-success rounded-pill px-3">Active</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column (Widgets) */}
                <div className="col-xl-4 col-lg-5">
                    {/* Notifications Widget */}
                    <div className="glass-card rounded-4 shadow-sm bg-white mb-4 border-0">
                        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold mb-0">Notifications</h6>
                            <button className="btn btn-link btn-sm text-muted text-decoration-none small p-0">View All</button>
                        </div>
                        <div className="p-4">
                            <div className="d-flex flex-column gap-4">
                                {notifications.map(notif => (
                                    <div key={notif.id} className="d-flex gap-3 position-relative">
                                        <div className={`${notif.color} p-2 rounded-3 d-flex align-items-center justify-content-center h-fit`}>
                                            <notif.icon size={18} />
                                        </div>
                                        <div className="flex-grow-1 lh-sm">
                                            <div className="fw-bold small">{notif.title} <span className="text-muted fw-normal ms-1 fw-bold">{notif.time} ago</span></div>
                                            <div className="text-muted small truncate-1">{notif.domain || notif.actor}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Payments Widget */}
                    <div className="glass-card rounded-4 shadow-sm bg-white border-0 mb-4">
                        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold mb-0">Payments</h6>
                            <button className="btn btn-link btn-sm text-muted text-decoration-none small p-0">View All</button>
                        </div>
                        <div className="p-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <span className="text-muted small">Total Volume</span>
                                <span className="fw-bold text-dark-blue fs-5">$4,200</span>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-warning rounded-pill fw-bold py-2 px-4 shadow-sm d-inline-flex align-items-center justify-content-center gap-2">
                                    View All <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Widget */}
                    <div className="glass-card rounded-4 shadow-sm bg-white border-0">
                        <div className="p-4 border-bottom">
                            <h6 className="fw-bold mb-0">Recent Activity</h6>
                        </div>
                        <div className="p-4">
                            <div className="d-flex flex-column gap-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="d-flex gap-3">
                                        <img src={`https://i.pravatar.cc/150?u=u${i}`} className="rounded-circle shadow-sm" style={{ width: '32px', height: '32px' }} alt="" />
                                        <div className="lh-sm">
                                            <div className="fw-bold small">Aisha K. <span className="text-muted fw-normal">sold</span> ecofoods.co</div>
                                            <div className="text-muted" style={{ fontSize: '0.7rem' }}>for $3,356 • 1 hour ago</div>
                                        </div>
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

export default AdminOverview;
