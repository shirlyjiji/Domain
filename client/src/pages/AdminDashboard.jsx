import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../components/AdminSidebar';
import AdminStats from '../components/AdminStats';
import AdminDomainList from '../components/AdminDomainList';
import AdminAddDomain from '../components/AdminAddDomain';
import AdminMessageManager from '../components/AdminMessageManager';
import { Plus, RefreshCcw, Bell, Search, User } from 'lucide-react';

const AdminDashboard = () => {
    const [domains, setDomains] = useState([]);
    const [stats, setStats] = useState({
        totalDomains: 0,
        activeAuctions: 0,
        totalRevenue: 0,
        unreadMessages: 0
    });
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [message, setMessage] = useState({ text: '', type: '' });

    const fetchData = async () => {
        try {
            setLoading(true);
            const [domainsRes, statsRes, threadsRes] = await Promise.all([
                axios.get('http://localhost:5000/api/domains'),
                axios.get('http://localhost:5000/api/domains/stats'),
                axios.get('http://localhost:5000/api/messages/admin/threads')
            ]);
            const unreadCount = threadsRes.data.reduce((sum, t) => sum + (t.unreadCount || 0), 0);
            setDomains(domainsRes.data);
            setStats({ ...statsRes.data, unreadMessages: unreadCount });
        } catch (err) {
            console.error('Error fetching admin data:', err);
            setMessage({ text: 'Failed to fetch data from server.', type: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddDomain = async (newDomain) => {
        try {
            await axios.post('http://localhost:5000/api/domains', newDomain);
            setMessage({ text: 'Domain listing published successfully!', type: 'success' });
            setShowAddForm(false);
            fetchData();
        } catch (err) {
            setMessage({ text: 'Error adding domain.', type: 'danger' });
        }
    };

    const handleDeleteDomain = async (id) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            try {
                await axios.delete(`http://localhost:5000/api/domains/${id}`);
                setMessage({ text: 'Listing deleted.', type: 'info' });
                fetchData();
            } catch (err) {
                setMessage({ text: 'Error deleting domain.', type: 'danger' });
            }
        }
    };

    return (
        <div className="admin-layout">
            <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="admin-main">
                {/* Header Section */}
                <header className="d-flex justify-content-between align-items-center mb-5">
                    <div className="search-bar glass-card px-3 py-2 rounded-pill border d-flex align-items-center gap-2" style={{ width: '300px' }}>
                        <Search size={18} className="text-muted" />
                        <input type="text" className="form-control border-0 bg-transparent shadow-none small" placeholder="Search anything..." />
                    </div>

                    <div className="d-flex align-items-center gap-4">
                        <div className="position-relative cursor-pointer" onClick={() => setActiveTab('messages')}>
                            <Bell size={20} className="text-muted" />
                            {stats.unreadMessages > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-white" style={{ fontSize: '0.5rem', padding: '0.2rem' }}>
                                    {stats.unreadMessages}
                                </span>
                            )}
                        </div>
                        <div className="admin-profile d-flex align-items-center gap-2 cursor-pointer">
                            <div className="bg-primary-soft text-primary p-2 rounded-circle">
                                <User size={20} />
                            </div>
                            <span className="fw-bold small d-none d-md-block">Admin Panel</span>
                        </div>
                    </div>
                </header>

                <div className="content-header d-flex justify-content-between align-items-end mb-4">
                    <div>
                        <h2 className="fw-bold mb-1 text-dark-blue">Marketplace {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                        <p className="text-muted mb-0">Manage and monitor your digital assets</p>
                    </div>
                    <div className="d-flex gap-2">
                        <button className="btn btn-white shadow-sm rounded-pill px-3 d-flex align-items-center gap-2" onClick={fetchData}>
                            <RefreshCcw size={16} /> Sync
                        </button>
                        <button className="btn btn-primary rounded-pill px-4 d-flex align-items-center gap-2" onClick={() => setShowAddForm(true)}>
                            <Plus size={18} /> New Listing
                        </button>
                    </div>
                </div>

                {message.text && (
                    <div className={`alert alert-${message.type} alert-dismissible fade show rounded-4 shadow-sm mb-4`} role="alert">
                        {message.text}
                        <button type="button" className="btn-close" onClick={() => setMessage({ text: '', type: '' })}></button>
                    </div>
                )}

                {activeTab === 'overview' && <AdminStats stats={stats} />}

                {activeTab === 'messages' ? (
                    <AdminMessageManager />
                ) : (
                    <>
                        {showAddForm && (
                            <AdminAddDomain
                                onAdd={handleAddDomain}
                                onCancel={() => setShowAddForm(false)}
                            />
                        )}

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <div className="glass-card rounded-4 shadow-sm overflow-hidden border-0">
                                <AdminDomainList
                                    domains={domains}
                                    onDelete={handleDeleteDomain}
                                    onEdit={(d) => console.log('Edit', d)}
                                />
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
