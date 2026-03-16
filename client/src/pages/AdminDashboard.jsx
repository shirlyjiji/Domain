import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminSidebar from '../components/AdminSidebar';
import AdminOverview from '../components/AdminOverview';
import AdminDomainList from '../components/AdminDomainList';
import AdminDomainForm from '../components/AdminDomainForm';
import AdminMessageManager from '../components/AdminMessageManager';
import AdminSalesManager from '../components/AdminSalesManager';
import AdminUserManager from '../components/AdminUserManager';
import AdminInventoryManager from '../components/AdminInventoryManager';
import AdminMembershipManager from '../components/AdminMembershipManager';
import AdminAdvertisementManager from '../components/AdminAdvertisementManager';
import AdminAuctionsManager from '../components/AdminAuctionsManager';
import AdminReportsManager from '../components/AdminReportsManager';
import AdminSettings from '../components/AdminSettings';
import { Menu, X, Plus, RefreshCcw, Bell, Search, User, MessageSquare, ChevronDown } from 'lucide-react';

const AdminDashboard = () => {
    const [domains, setDomains] = useState([]);
    const [stats, setStats] = useState({
        totalDomains: 0,
        activeAuctions: 0,
        totalRevenue: 0,
        unreadMessages: 0,
        unreadNotifications: 3, // Mock data for presentation
        pendingUsers: 1 // Mock data for presentation
    });
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingDomain, setEditingDomain] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, title: 'New domain listed', time: '10 min ago', color: 'bg-primary' },
        { id: 2, title: 'Sarah L. upgraded to Premium', time: '30 min ago', color: 'bg-info' },
        { id: 3, title: 'Escrow payment received', time: '1h ago', color: 'bg-success' },
    ];

    const fetchData = async (hideLoading = false) => {
        try {
            if (!hideLoading) setLoading(true);
            const [domainsRes, statsRes, threadsRes] = await Promise.all([
                axios.get('http://localhost:5000/api/domains'),
                axios.get('http://localhost:5000/api/domains/stats'),
                axios.get('http://localhost:5000/api/messages/admin/threads')
            ]);
            const unreadCount = threadsRes.data.reduce((sum, t) => sum + (t.unreadCount || 0), 0);
            setDomains(domainsRes.data.domains || domainsRes.data); // Support both paginated and flat response
            setStats(prevStats => ({ ...prevStats, ...statsRes.data, unreadMessages: unreadCount }));
        } catch (err) {
            console.error('Error fetching admin data:', err);
            toast.error('Failed to fetch data from server.');
        } finally {
            if (!hideLoading) setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        // Poll for new messages/stats every 10 seconds
        const pollInterval = setInterval(() => {
            fetchData(true);
        }, 10000);

        return () => clearInterval(pollInterval);
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredDomains = domains.filter(domain => 
        domain.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        domain.registrar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        domain.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddDomain = async (newDomain) => {
        try {
            await axios.post('http://localhost:5000/api/domains', newDomain);
            toast.success('Domain listing published successfully!');
            setShowAddForm(false);
            fetchData();
        } catch (err) {
            toast.error('Error adding domain.');
        }
    };

    const handleUpdateDomain = async (id, updatedData) => {
        try {
            await axios.put(`http://localhost:5000/api/domains/${id}`, updatedData);
            toast.success('Listing updated successfully!');
            setEditingDomain(null);
            fetchData();
        } catch (err) {
            toast.error('Error updating domain.');
        }
    };

    const handleDeleteDomain = async (id) => {
        if (window.confirm('Are you sure you want to delete this listing?')) {
            try {
                await axios.delete(`http://localhost:5000/api/domains/${id}`);
                toast.success('Listing deleted.');
                fetchData();
            } catch (err) {
                toast.error('Error deleting domain.');
            }
        }
    };

    return (
        <div className="admin-layout">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
                    style={{ zIndex: 1040 }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <AdminSidebar
                activeTab={activeTab}
                onTabChange={(tab) => { setActiveTab(tab); setSidebarOpen(false); }}
                sidebarOpen={sidebarOpen}
            />

            <main className="admin-main">
                {/* Header Section */}
                <header className="d-flex justify-content-between align-items-center mb-5 gap-3 flex-wrap">
                    {/* Hamburger and Mobile Search */}
                    <div className="d-flex align-items-center gap-3">
                        <button
                            className="btn btn-light rounded-circle p-2 d-lg-none shadow-sm"
                            onClick={() => setSidebarOpen(o => !o)}
                            aria-label="Toggle sidebar"
                        >
                            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                        
                        <div className="search-bar bg-white px-3 py-2 rounded-pill shadow-sm d-none d-md-flex align-items-center gap-2" style={{ maxWidth: '300px' }}>
                            <Search size={18} className="text-muted" />
                            <input
                                type="text" 
                                className="form-control border-0 bg-transparent shadow-none p-0" 
                                placeholder="Search..." 
                                style={{ fontSize: '0.85rem' }} 
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>

                    <div className="d-flex align-items-center gap-2 gap-md-4 ms-auto">
                        <div className="d-flex align-items-center gap-2 gap-md-4 pe-2 pe-md-4 border-end">
                            <div className="position-relative cursor-pointer text-secondary hover-text-primary transition-all p-1" onClick={() => setActiveTab('messages')}>
                                <MessageSquare size={20} strokeWidth={1.5} />
                                {stats.unreadMessages > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-warning text-white d-flex align-items-center justify-content-center" style={{ width: '14px', height: '14px', fontSize: '9px', padding: 0 }}>{stats.unreadMessages}</span>}
                            </div>
                            <div className="position-relative cursor-pointer text-secondary hover-text-primary transition-all p-1" onClick={() => setShowNotifications(!showNotifications)}>
                                <Bell size={20} strokeWidth={1.5} />
                                {stats.unreadNotifications > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger text-white d-flex align-items-center justify-content-center" style={{ width: '14px', height: '14px', fontSize: '9px', padding: 0 }}>{stats.unreadNotifications}</span>}
                                
                                {showNotifications && (
                                    <div className="position-absolute top-100 end-0 mt-3 bg-white rounded-4 shadow-lg border-0 overflow-hidden" style={{ width: '280px', zIndex: 1050 }}>
                                        <div className="p-3 border-bottom d-flex justify-content-between align-items-center bg-light">
                                            <span className="fw-bold small">Recent Notifications</span>
                                            <span className="badge bg-danger rounded-pill" style={{ fontSize: '0.65rem' }}>{stats.unreadNotifications} New</span>
                                        </div>
                                        <div className="max-vh-50 overflow-auto">
                                            {notifications.map(notif => (
                                                <div key={notif.id} className="p-3 border-bottom hover-bg-light transition-all cursor-pointer">
                                                    <div className="d-flex gap-3">
                                                        <div className={`${notif.color} rounded-circle flex-shrink-0 mt-1`} style={{ width: '8px', height: '8px' }}></div>
                                                        <div>
                                                            <div className="fw-medium small text-dark-blue mb-1" style={{ fontSize: '0.8rem' }}>{notif.title}</div>
                                                            <div className="text-muted" style={{ fontSize: '0.7rem' }}>{notif.time}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-2 text-center bg-light">
                                            <button className="btn btn-link btn-sm text-decoration-none fw-bold small p-0" onClick={() => setShowNotifications(false)}>View All Alerts</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="position-relative cursor-pointer text-secondary hover-text-primary transition-all p-1 d-none d-sm-block" onClick={() => setActiveTab('users')}>
                                <User size={20} strokeWidth={1.5} />
                                {stats.pendingUsers > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-warning text-white d-flex align-items-center justify-content-center" style={{ width: '14px', height: '14px', fontSize: '9px', padding: 0 }}>{stats.pendingUsers}</span>}
                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-2 gap-md-3 cursor-pointer group">
                            <img src="https://i.pravatar.cc/150?u=admin" className="rounded-circle shadow-sm" style={{ width: '36px', height: '36px', objectFit: 'cover' }} alt="Admin" />
                            <div className="d-none d-md-block text-start">
                                <div className="fw-bold text-dark lh-1 mb-1" style={{ fontSize: '0.85rem' }}>Admin</div>
                                <div className="text-secondary d-flex align-items-center gap-1" style={{ fontSize: '0.7rem' }}>Administrator <ChevronDown size={10} /></div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="content-header d-flex justify-content-between align-items-md-center align-items-start mb-4 flex-column flex-md-row gap-3">
                    <div className="text-center text-md-start">
                        <h2 className="fw-bold mb-1 text-dark-blue fs-3 text-nowrap-md">Marketplace {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
                        <p className="text-muted mb-0 small">Manage and monitor your digital assets</p>
                    </div>
                    <div className="d-flex gap-2 w-100 w-md-auto justify-content-md-end flex-column flex-sm-row">
                        <button className="btn btn-light shadow-sm rounded-pill px-3 d-flex align-items-center justify-content-center gap-2 flex-grow-1 flex-md-grow-0 w-100 w-sm-auto" onClick={fetchData} style={{ minHeight: '42px' }}>
                            <RefreshCcw size={16} /> <span>Sync</span>
                        </button>
                        <button className="btn btn-primary rounded-pill px-4 d-flex align-items-center justify-content-center gap-2 flex-grow-1 flex-md-grow-0 w-100 w-sm-auto" onClick={() => { setActiveTab('listings'); setShowAddForm(true); setEditingDomain(null); }} style={{ minHeight: '42px' }}>
                            <Plus size={18} /> <span className="text-nowrap">New Listing</span>
                        </button>
                    </div>
                </div>

                {activeTab === 'overview' && <AdminOverview stats={stats} domains={filteredDomains} />}

                {activeTab === 'messages' && <AdminMessageManager searchTerm={searchTerm} />}

                {activeTab === 'sales' && <AdminSalesManager />}

                {activeTab === 'users' && <AdminUserManager searchTerm={searchTerm} />}

                {activeTab === 'inventory' && <AdminInventoryManager domains={filteredDomains} />}

                {activeTab === 'memberships' && <AdminMembershipManager />}
                {activeTab === 'advertisements' && <AdminAdvertisementManager />}
                {activeTab === 'auctions' && <AdminAuctionsManager />}
                {activeTab === 'reports' && <AdminReportsManager />}
                {activeTab === 'settings' && <AdminSettings />}


                {activeTab === 'listings' && (
                    <>
                        {(showAddForm || editingDomain) && (
                            <AdminDomainForm
                                editData={editingDomain}
                                onAdd={handleAddDomain}
                                onUpdate={handleUpdateDomain}
                                onCancel={() => { setShowAddForm(false); setEditingDomain(null); }}
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
                                    domains={filteredDomains}
                                    onDelete={handleDeleteDomain}
                                    onEdit={(d) => { setEditingDomain(d); setShowAddForm(false); window.scrollTo(0, 0); }}
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
