import React from 'react';
import { LayoutDashboard, Globe, MessageSquare, DollarSign, Users, Settings, LogOut, Package, UserCheck, Gavel, Megaphone, BarChart2, ExternalLink, ChevronDown } from 'lucide-react';

const AdminSidebar = ({ activeTab, onTabChange, sidebarOpen }) => {
    const menuItems = [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'memberships', label: 'Memberships', icon: UserCheck },
        { id: 'listings', label: 'Domains', icon: Globe },
        { id: 'auctions', label: 'Auctions', icon: Gavel },
        { id: 'messages', label: 'Forums', icon: MessageSquare },
        { id: 'advertisements', label: 'Advertisements', icon: Megaphone },
        { id: 'sales', label: 'Payments', icon: DollarSign },
        { id: 'reports', label: 'Reports', icon: BarChart2 },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className={`admin-sidebar shadow-sm border-0 ${sidebarOpen ? 'sidebar-mobile-open' : ''}`}>
            <div className="p-4 mb-2">
                <div className="d-flex align-items-center gap-2">
                    <div className="bg-white rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                        <Globe size={24} className="text-primary" />
                    </div>
                    <span className="fw-bold fs-5 text-white tracking-tight">Yalla<span className="text-warning-custom">Domains</span></span>
                </div>
            </div>

            <nav className="flex-grow-1 overflow-y-auto px-2">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => onTabChange(item.id)}
                    >
                        <item.icon size={20} className="nav-icon" />
                        <span>{item.label}</span>
                    </div>
                ))}
            </nav>

            <div className="p-4 border-top border-white-10">
                <div className="admin-nav-item border-0 mb-3 px-3 mx-0" onClick={() => window.open('/', '_blank')}>
                    <ExternalLink size={20} className="nav-icon" />
                    <span>See Website</span>
                    <ChevronDown size={14} className="ms-auto opacity-50" style={{ transform: 'rotate(-90deg)' }} />
                </div>

                <div className="admin-profile-pill d-flex align-items-center gap-3 p-2 px-3 rounded-4 bg-white-10">
                    <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="rounded-circle border border-2 border-white-20" style={{ width: '38px', height: '38px' }} />
                    <div className="overflow-hidden">
                        <div className="fw-bold small text-white text-truncate">System Admin</div>
                        <div className="text-white opacity-50" style={{ fontSize: '0.7rem' }}>Super User</div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
