import React, { useState } from 'react';
import { Users, UserCheck, UserMinus, MoreVertical, Mail, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminUserManager = ({ searchTerm = '' }) => {
    const [users, setUsers] = useState([
        { id: '1', name: 'Krishna', email: 'krishna@example.com', role: 'Pro Member', joined: '2025-10-12', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=krishna' },
        { id: '2', name: 'John Doe', email: 'john@example.com', role: 'Buyer', joined: '2026-01-05', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=john' },
        { id: '3', name: 'Jane Smith', email: 'jane@example.com', role: 'Seller', joined: '2025-11-20', status: 'Inactive', avatar: 'https://i.pravatar.cc/150?u=jane' },
        { id: '4', name: 'Alex Wilson', email: 'alex@example.com', role: 'Buyer', joined: '2026-02-14', status: 'Active', avatar: 'https://i.pravatar.cc/150?u=alex' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Buyer' });

    const handleAddUser = (e) => {
        e.preventDefault();
        if (!newUser.name || !newUser.email) {
            toast.error('Please fill in all fields');
            return;
        }
        
        const userToAdd = {
            id: Date.now().toString(),
            ...newUser,
            joined: new Date().toISOString().split('T')[0],
            status: 'Active',
            avatar: `https://i.pravatar.cc/150?u=${newUser.name}`
        };

        setUsers([userToAdd, ...users]);
        setShowModal(false);
        setNewUser({ name: '', email: '', role: 'Buyer' });
        toast.success('User added successfully!');
    };

    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="user-manager h-100 pb-5">
            <div className="row g-3 mb-4">
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="glass-card p-3 p-md-4 rounded-4 shadow-sm border-0 bg-white h-100">
                        <div className="d-flex align-items-center gap-2 gap-md-3">
                            <div className="bg-primary-soft text-primary p-2 p-md-3 rounded-4 flex-shrink-0">
                                <Users size={18} />
                            </div>
                            <div className="overflow-hidden">
                                <h6 className="text-muted mb-0 small uppercase tracking-wider fw-bold text-truncate" style={{ fontSize: '0.65rem' }}>Total Users</h6>
                                <h4 className="fw-bold mb-0 text-dark-blue text-truncate" style={{ fontSize: '1.1rem' }}>1,280</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="glass-card p-3 p-md-4 rounded-4 shadow-sm border-0 bg-white h-100">
                        <div className="d-flex align-items-center gap-2 gap-md-3">
                            <div className="bg-success-soft text-success p-2 p-md-3 rounded-4 flex-shrink-0">
                                <UserCheck size={18} />
                            </div>
                            <div className="overflow-hidden">
                                <h6 className="text-muted mb-0 small uppercase tracking-wider fw-bold text-truncate" style={{ fontSize: '0.65rem' }}>Active Now</h6>
                                <h4 className="fw-bold mb-0 text-dark-blue text-truncate" style={{ fontSize: '1.1rem' }}>42</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                    <div className="glass-card p-3 p-md-4 rounded-4 shadow-sm border-0 bg-white h-100">
                        <div className="d-flex align-items-center gap-2 gap-md-3">
                            <div className="bg-danger-soft text-danger p-2 p-md-3 rounded-4 flex-shrink-0">
                                <UserMinus size={18} />
                            </div>
                            <div className="overflow-hidden">
                                <h6 className="text-muted mb-0 small uppercase tracking-wider fw-bold text-truncate" style={{ fontSize: '0.65rem' }}>Banned</h6>
                                <h4 className="fw-bold mb-0 text-dark-blue text-truncate" style={{ fontSize: '1.1rem' }}>12</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-card rounded-4 shadow-sm border-0 overflow-hidden bg-white">
                <div className="p-4 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <h5 className="fw-bold mb-0">User Directory</h5>
                    <div className="d-flex gap-2 w-100 w-sm-auto">
                        <button 
                            className="btn btn-primary btn-sm rounded-pill px-3 flex-grow-1 flex-sm-grow-0 d-flex align-items-center justify-content-center gap-2 w-100 w-sm-auto"
                            onClick={() => setShowModal(true)}
                            style={{ minHeight: '38px' }}
                        >
                            <Plus size={16} /> Add User
                        </button>
                    </div>
                </div>

                {/* Add User Modal */}
                {showModal && (
                    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 2000 }}>
                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50" onClick={() => setShowModal(false)}></div>
                        <div className="glass-card bg-white rounded-4 shadow-lg p-4 position-relative overflow-hidden mx-3" style={{ width: '450px', maxWidth: '100%', zIndex: 2001 }}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold mb-0">Add New User</h5>
                                <button className="btn btn-link text-muted p-0" onClick={() => setShowModal(false)}><X size={20} /></button>
                            </div>

                            <form onSubmit={handleAddUser}>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold text-muted text-uppercase tracking-wider">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control rounded-3 border-light bg-light p-2" 
                                        placeholder="Enter name"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                                        autoFocus
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold text-muted text-uppercase tracking-wider">Email Address</label>
                                    <input 
                                        type="email" 
                                        className="form-control rounded-3 border-light bg-light p-2" 
                                        placeholder="Enter email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label small fw-bold text-muted text-uppercase tracking-wider">Role</label>
                                    <select 
                                        className="form-select rounded-3 border-light bg-light p-2"
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                                    >
                                        <option value="Buyer">Buyer</option>
                                        <option value="Seller">Seller</option>
                                        <option value="Pro Member">Pro Member</option>
                                    </select>
                                </div>

                                <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-light rounded-pill px-4 flex-grow-1" onClick={() => setShowModal(false)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary rounded-pill px-4 flex-grow-1">Create User</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0 responsive-table-compact">
                        <thead className="bg-light">
                            <tr>
                                <th className="ps-4 text-nowrap">User</th>
                                <th className="d-none d-md-table-cell">Role</th>
                                <th className="d-none d-lg-table-cell">Joined</th>
                                <th>Status</th>
                                <th className="text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center gap-2 gap-md-3">
                                            <img src={user.avatar} alt={user.name} className="rounded-circle border border-2 border-primary-soft flex-shrink-0" style={{ width: '32px', height: '32px' }} />
                                            <div className="overflow-hidden">
                                                <div className="fw-bold text-dark-blue text-truncate" style={{ maxWidth: '120px', fontSize: '0.85rem' }}>{user.name}</div>
                                                <div className="text-muted small d-flex align-items-center gap-1 text-truncate d-none d-sm-flex" style={{ fontSize: '0.7rem' }}>
                                                    <Mail size={10} /> {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="d-none d-md-table-cell">
                                        <span className={`badge rounded-pill px-3 ${user.role === 'Pro Member' ? 'bg-primary-soft text-primary' :
                                                user.role === 'Seller' ? 'bg-info-soft text-info' : 'bg-secondary-soft text-dark'
                                            }`} style={{ fontSize: '0.65rem' }}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="text-muted small d-none d-lg-table-cell" style={{ fontSize: '0.75rem' }}>{user.joined}</td>
                                    <td>
                                        <div className="d-flex align-items-center gap-1">
                                            <div className={`rounded-circle ${user.status === 'Active' ? 'bg-success' : 'bg-danger'}`} style={{ width: '6px', height: '6px' }}></div>
                                            <span style={{ fontSize: '0.75rem' }}>{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="text-end pe-4 text-nowrap">
                                        <button className="btn btn-link btn-sm text-muted p-0">
                                            <MoreVertical size={16} />
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
