import React from 'react';
import { Users, UserCheck, UserMinus, MoreVertical, Mail } from 'lucide-react';

const AdminUserManager = ({ searchTerm = '' }) => {
    const users = [
        { id: '1', name: 'Krishna', email: 'krishna@example.com', role: 'Pro Member', joined: '2025-10-12', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=krishna' },
        { id: '2', name: 'John Doe', email: 'john@example.com', role: 'Buyer', joined: '2026-01-05', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=john' },
        { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'Seller', joined: '2025-11-20', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?u=jane' },
        { id: '4', name: 'Alex Wilson', email: 'alex@example.com', role: 'Buyer', joined: '2026-02-14', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=alex' },
    ];

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="user-manager h-100 pb-5">
            <div className="row g-4 mb-4">
                <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="glass-card p-4 rounded-4 shadow-sm border-0 bg-white h-100">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-primary-soft text-primary p-3 rounded-4 flex-shrink-0">
                                <Users size={20} />
                            </div>
                            <div className="overflow-hidden">
                                <h6 className="text-muted mb-0 small uppercase tracking-wider fw-bold text-truncate">Total Users</h6>
                                <h4 className="fw-bold mb-0 text-dark-blue text-truncate">1,280</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="glass-card p-4 rounded-4 shadow-sm border-0 bg-white h-100">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-success-soft text-success p-3 rounded-4 flex-shrink-0">
                                <UserCheck size={20} />
                            </div>
                            <div className="overflow-hidden">
                                <h6 className="text-muted mb-0 small uppercase tracking-wider fw-bold text-truncate">Active Now</h6>
                                <h4 className="fw-bold mb-0 text-dark-blue text-truncate">42</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6">
                    <div className="glass-card p-4 rounded-4 shadow-sm border-0 bg-white h-100">
                        <div className="d-flex align-items-center gap-3">
                            <div className="bg-danger-soft text-danger p-3 rounded-4 flex-shrink-0">
                                <UserMinus size={20} />
                            </div>
                            <div className="overflow-hidden">
                                <h6 className="text-muted mb-0 small uppercase tracking-wider fw-bold text-truncate">Banned</h6>
                                <h4 className="fw-bold mb-0 text-dark-blue text-truncate">12</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-card rounded-4 shadow-sm border-0 overflow-hidden bg-white">
                <div className="p-4 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <h5 className="fw-bold mb-0">User Directory</h5>
                    <div className="d-flex gap-2 w-100 w-sm-auto">
                        <button className="btn btn-primary btn-sm rounded-pill px-3 flex-grow-1 flex-sm-grow-0">Add User</button>
                    </div>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4">User</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th>Status</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <img src={user.avatar} alt={user.name} className="rounded-circle border border-2 border-primary-soft" style={{ width: '38px', height: '38px' }} />
                                            <div>
                                                <div className="fw-bold text-dark-blue">{user.name}</div>
                                                <div className="text-muted small d-flex align-items-center gap-1">
                                                    <Mail size={12} /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge rounded-pill px-3 ${user.role === 'Pro Member' ? 'bg-primary-soft text-primary' :
                                                user.role === 'Seller' ? 'bg-info-soft text-info' : 'bg-secondary-soft text-dark'
                                            }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="text-muted small">{user.joined}</td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <div className={`rounded-circle ${user.status === 'Active' ? 'bg-success' : 'bg-danger'}`} style={{ width: '8px', height: '8px' }}></div>
                                            <span className="small">{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="text-end pe-4">
                                        <button className="btn btn-link btn-sm text-muted p-0">
                                            <MoreVertical size={18} />
                                        </button>
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

export default AdminUserManager;
