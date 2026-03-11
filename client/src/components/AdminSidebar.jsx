import React from 'react';
import { LayoutDashboard, Globe, MessageSquare, DollarSign, Users, Settings, LogOut, Package } from 'lucide-react';

const AdminSidebar = ({ activeTab, onTabChange }) => {
    const menuItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'listings', label: 'Listings', icon: Globe },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'sales', label: 'Sales', icon: DollarSign },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'inventory', label: 'Inventory', icon: Package },
    ];

    return (
        <aside className="admin-sidebar shadow-sm">
            <div className="p-4 border-bottom mb-4">
                <div className="d-flex align-items-center gap-2">
                    <div className="bg-primary-gradient p-2 rounded-3 text-white">
                        <Globe size={24} />
                    </div>
                    <span className="fw-bold fs-5 text-dark-blue">Admin Hub</span>
                </div>
            </div>

            <nav className="flex-grow-1">
                {menuItems.map((item) => (
                    <div 
                        key={item.id}
                        className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => onTabChange(item.id)}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </div>
                ))}
            </nav>

            <div className="p-4 border-top">
                <div className="admin-nav-item text-danger border-0 m-0 p-0">
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </div>
                <div className="mt-3 p-3 bg-light rounded-3">
                    <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="rounded-circle bg-white p-1 shadow-sm">
                            <img src="https://i.pravatar.cc/100?u=admin" alt="Admin" className="rounded-circle" style={{width: '32px'}} />
                        </div>
                        <div className="overflow-hidden">
                            <div className="fw-bold small text-truncate">System Admin</div>
                            <div className="text-muted" style={{fontSize: '0.7rem'}}>Super User</div>
                        </div>
                    </div>
                    <Settings size={14} className="text-muted ms-auto cursor-pointer" />
                </div>
            </div>
        </aside>
    );
};

export default AdminSidebar;
