import React from 'react';
import { UserCheck, Zap, Crown, Shield, TrendingUp, Users, DollarSign, Calendar, MoreHorizontal, ChevronRight, Plus, Search, ExternalLink, Settings, Globe, ArrowUpRight } from 'lucide-react';

const AdminMembershipManager = () => {
    const membershipTiers = [
        { name: 'Investor', price: '$99/mo', users: 145, color: 'text-success bg-success-soft', icon: Zap },
        { name: 'Premium', price: '$49/mo', users: 280, color: 'text-primary bg-primary-soft', icon: Crown },
        { name: 'Business', price: '$199/mo', users: 55, color: 'text-warning bg-warning-soft', icon: Shield },
    ];

    const currentMembers = [
        { id: 1, name: 'Michael T.', email: 'michael@workfriendly.com', tier: 'Investor', price: '$99', domains: 201, joined: 'Apr 24, 2024', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=michael' },
        { id: 2, name: 'Sarah L.', email: 'sarah@ecofoods.co', tier: 'Premium', price: '$49', domains: 15, joined: 'May 12, 2024', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=sarah' },
        { id: 3, name: 'John Doe', email: 'john@fintechpro.com', tier: 'Business', price: '$199', domains: 52, joined: 'Jan 05, 2024', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=john' },
        { id: 4, name: 'Aisha K.', email: 'aisha@masters.com', tier: 'Investor', price: '$99', domains: 8, joined: 'Feb 15, 2024', status: 'Expiring', avatar: 'https://i.pravatar.cc/150?u=aisha' },
    ];

    return (
        <div className="admin-membership-manager">
            {/* Header with Stats */}
            <div className="row g-4 mb-4">
                <div className="col-xl-4 col-md-6">
                    <div className="glass-card p-4 rounded-4 shadow-sm border-0 bg-primary-gradient text-white h-100">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="bg-white-10 p-2 rounded-3 text-white flex-shrink-0">
                                <UserCheck size={24} />
                            </div>
                            <span className="badge bg-white-10 text-white border-0 text-truncate">+12% this month</span>
                        </div>
                        <h4 className="fw-bold mb-1 text-white text-truncate">480</h4>
                        <p className="opacity-75 small mb-0 fw-medium text-white text-truncate">Active Memberships</p>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6">
                    <div className="glass-card p-4 rounded-4 shadow-sm border-0 bg-white h-100">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="bg-success-soft text-success p-2 rounded-3 flex-shrink-0">
                                <DollarSign size={24} />
                            </div>
                            <TrendingUp size={18} className="text-success flex-shrink-0" />
                        </div>
                        <h4 className="fw-bold mb-1 text-dark-blue text-truncate">$12,450</h4>
                        <p className="text-muted small mb-0 fw-medium text-truncate">Monthly MRR</p>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6">
                    <div className="glass-card p-4 rounded-4 shadow-sm border-0 bg-white h-100">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="bg-warning-soft text-warning p-2 rounded-3 flex-shrink-0">
                                <Calendar size={24} />
                            </div>
                            <span className="badge bg-warning-soft text-warning border-0 text-truncate">Action Required</span>
                        </div>
                        <h4 className="fw-bold mb-1 text-dark-blue text-truncate">15</h4>
                        <p className="text-muted small mb-0 fw-medium text-truncate">Expiring Soon</p>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* Main Content: Members List */}
                <div className="col-xl-8">
                    <div className="glass-card rounded-4 shadow-sm border-0 bg-white">
                        <div className="p-4 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div>
                                <h5 className="fw-bold mb-1">Membership Directory</h5>
                                <p className="text-muted small mb-0">Manage all active and pending user memberships</p>
                            </div>
                            <div className="d-flex gap-2">
                                <div className="position-relative">
                                    <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                                    <input type="text" className="form-control form-control-sm rounded-pill ps-5" placeholder="Search members..." style={{ width: '200px' }} />
                                </div>
                                <button className="btn btn-primary btn-sm rounded-pill px-3 d-flex align-items-center gap-2">
                                    <Plus size={16} /> Add Member
                                </button>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table hover-table align-middle mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="ps-4 py-3 small text-muted text-uppercase tracking-wider">Member</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider">Tier</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider">Domains</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider">Joined</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider pe-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentMembers.map(member => (
                                        <tr key={member.id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center gap-3">
                                                    <img src={member.avatar} className="rounded-circle" style={{ width: '36px', height: '36px' }} alt="" />
                                                    <div className="lh-sm">
                                                        <div className="fw-bold text-dark-blue small">{member.name}</div>
                                                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>{member.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <span className={`badge rounded-pill fw-medium ${member.tier === 'Investor' ? 'bg-success-soft text-success' :
                                                        member.tier === 'Premium' ? 'bg-primary-soft text-primary' : 'bg-warning-soft text-warning'
                                                        }`}>
                                                        {member.tier}
                                                    </span>
                                                    <span className="text-muted small fw-bold">{member.price}</span>
                                                </div>
                                            </td>
                                            <td className="fw-bold small text-dark-blue">{member.domains} <span className="text-muted fw-normal">Assets</span></td>
                                            <td className="text-muted small">{member.joined}</td>
                                            <td className="pe-4">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <span className={`badge rounded-pill ${member.status === 'Active' ? 'bg-success text-white' : 'bg-warning text-dark'}`}>
                                                        {member.status}
                                                    </span>
                                                    <button className="btn btn-link btn-sm text-muted p-0"><MoreHorizontal size={18} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-top text-center">
                            <button className="btn btn-link text-primary text-decoration-none fw-bold small p-0">View All Members <ChevronRight size={16} /></button>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Tier Management */}
                <div className="col-xl-4">
                    <div className="glass-card rounded-4 shadow-sm border-0 bg-white mb-4">
                        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold mb-0">Active Tiers</h6>
                            <button className="btn btn-link btn-sm text-primary text-decoration-none p-0"><Settings size={16} /></button>
                        </div>
                        <div className="p-4">
                            <div className="d-flex flex-column gap-3">
                                {membershipTiers.map((tier, idx) => (
                                    <div key={idx} className="p-3 rounded-4 border d-flex align-items-center justify-content-between hover-bg-light cursor-pointer transition-all">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className={`${tier.color} p-2 rounded-3`}>
                                                <tier.icon size={20} />
                                            </div>
                                            <div>
                                                <div className="fw-bold small text-dark-blue">{tier.name}</div>
                                                <div className="text-muted" style={{ fontSize: '0.7rem' }}>{tier.price}</div>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <div className="fw-bold small">{tier.users}</div>
                                            <div className="text-muted" style={{ fontSize: '0.65rem' }}>Users</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-outline-primary w-100 rounded-pill mt-4 py-2 small fw-bold border-2">
                                <Plus size={16} /> Create New Tier
                            </button>
                        </div>
                    </div>

                    <div className="glass-card rounded-4 shadow-sm border-0 bg-white p-4 text-center">
                        <div className="bg-primary-soft text-primary p-3 rounded-circle d-inline-flex mb-3">
                            <Zap size={24} />
                        </div>
                        <h6 className="fw-bold">Promote Memberships</h6>
                        <p className="text-muted small mb-4">Send a broadcast email to all free users to promote Investor tier features.</p>
                        <button className="btn btn-primary w-100 rounded-pill py-2 shadow-sm d-flex align-items-center justify-content-center gap-2">
                            Send Campaign <ArrowUpRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMembershipManager;
