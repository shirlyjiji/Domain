import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Bell, Users, Globe, Lock, Mail, CreditCard, Save, Smartphone, Key, UserCheck, Plus } from 'lucide-react';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General', icon: Globe },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'roles', label: 'Roles & Permissions', icon: Users },
        { id: 'billing', label: 'Billing & Payments', icon: CreditCard },
    ];

    return (
        <div className="admin-settings">
            <div className="row g-4">
                {/* Settings Sidebar */}
                <div className="col-xl-3 col-lg-4">
                    <div className="glass-card rounded-4 shadow-sm bg-white border-0 py-3 position-sticky" style={{ top: '1rem' }}>
                        <div className="px-4 pb-3 border-bottom mb-3">
                            <h5 className="fw-bold mb-1">Settings</h5>
                            <p className="text-muted small mb-0">Manage your platform preferences</p>
                        </div>
                        <div className="d-flex flex-column px-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`btn text-start px-3 py-2 mb-1 rounded-3 d-flex align-items-center gap-3 transition-all ${activeTab === tab.id
                                        ? 'bg-primary-soft text-primary fw-bold'
                                        : 'text-dark-blue hover-bg-light'
                                        }`}
                                >
                                    <tab.icon size={18} className={activeTab === tab.id ? 'text-primary' : 'text-muted'} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Settings Content Area */}
                <div className="col-xl-9 col-lg-8">
                    {/* General Settings */}
                    {activeTab === 'general' && (
                        <div className="glass-card rounded-4 shadow-sm bg-white border-0 h-100">
                            <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="fw-bold mb-1 d-flex align-items-center gap-2"><Globe size={20} className="text-primary" /> General Configuration</h5>
                                    <p className="text-muted small mb-0">Basic platform details and operational settings.</p>
                                </div>
                                <button className="btn btn-primary btn-sm rounded-pill px-4 d-flex align-items-center gap-2">
                                    <Save size={16} /> Save Changes
                                </button>
                            </div>
                            <div className="p-4 p-md-5">
                                <form className="row g-4 max-w-800">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-dark-blue">Platform Name</label>
                                        <input type="text" className="form-control bg-light border-0 py-2 custom-input" defaultValue="Domain Marketplace" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-dark-blue">Contact Email</label>
                                        <input type="email" className="form-control bg-light border-0 py-2 custom-input" defaultValue="support@domainmarket.com" />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small fw-bold text-dark-blue">Platform Description</label>
                                        <textarea className="form-control bg-light border-0 py-2 custom-input" rows="3" defaultValue="The premium marketplace for buying, selling, and auctioning premium domain names."></textarea>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-dark-blue">Default Currency</label>
                                        <select className="form-select bg-light border-0 py-2 custom-input">
                                            <option value="USD">USD ($)</option>
                                            <option value="EUR">EUR (€)</option>
                                            <option value="GBP">GBP (£)</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-dark-blue">Timezone</label>
                                        <select className="form-select bg-light border-0 py-2 custom-input">
                                            <option value="UTC">UTC (Coordinated Universal Time)</option>
                                            <option value="EST">EST (Eastern Standard Time)</option>
                                            <option value="PST">PST (Pacific Standard Time)</option>
                                        </select>
                                    </div>
                                    <div className="col-12 mt-5">
                                        <h6 className="fw-bold text-danger border-bottom border-danger-subtle pb-2 mb-3">Danger Zone</h6>
                                        <div className="d-flex justify-content-between align-items-center p-3 border border-danger-subtle rounded-3 bg-danger-soft">
                                            <div>
                                                <h6 className="fw-bold text-danger mb-1">Maintenance Mode</h6>
                                                <p className="text-danger opacity-75 small mb-0">Prevent all non-admin users from accessing the platform.</p>
                                            </div>
                                            <div className="form-check form-switch custom-switch-danger mb-0">
                                                <input className="form-check-input flex-shrink-0" type="checkbox" role="switch" style={{ width: '40px', height: '20px' }} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Security Settings */}
                    {activeTab === 'security' && (
                        <div className="glass-card rounded-4 shadow-sm bg-white border-0 h-100">
                            <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="fw-bold mb-1 d-flex align-items-center gap-2"><Shield size={20} className="text-primary" /> Security Policies</h5>
                                    <p className="text-muted small mb-0">Manage authentication and system security parameters.</p>
                                </div>
                                <button className="btn btn-primary btn-sm rounded-pill px-4 d-flex align-items-center gap-2">
                                    <Save size={16} /> Save Changes
                                </button>
                            </div>
                            <div className="p-4 p-md-5">
                                <form className="max-w-800">
                                    <div className="mb-4 pb-4 border-bottom">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="bg-primary-soft text-primary p-2 rounded-3"><Smartphone size={20} /></div>
                                                <div>
                                                    <h6 className="fw-bold mb-1 text-dark-blue">Two-Factor Authentication (2FA)</h6>
                                                    <p className="text-muted small mb-0">Require all administrative users to enable 2FA for account access.</p>
                                                </div>
                                            </div>
                                            <div className="form-check form-switch mb-0">
                                                <input className="form-check-input flex-shrink-0" type="checkbox" role="switch" defaultChecked style={{ width: '40px', height: '20px' }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4 pb-4 border-bottom">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="bg-info-soft text-info p-2 rounded-3"><Key size={20} /></div>
                                                <div>
                                                    <h6 className="fw-bold mb-1 text-dark-blue">Strict Password Policy</h6>
                                                    <p className="text-muted small mb-0">Enforce complex passwords (min 12 chars, symbols, numbers, mixed case) for all users.</p>
                                                </div>
                                            </div>
                                            <div className="form-check form-switch mb-0">
                                                <input className="form-check-input flex-shrink-0" type="checkbox" role="switch" defaultChecked style={{ width: '40px', height: '20px' }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="bg-warning-soft text-warning p-2 rounded-3"><Lock size={20} /></div>
                                                <div>
                                                    <h6 className="fw-bold mb-1 text-dark-blue">Admin Session Timeout</h6>
                                                    <p className="text-muted small mb-0">Automatically log out inactive administrative sessions.</p>
                                                </div>
                                            </div>
                                            <div style={{ width: '150px' }}>
                                                <select className="form-select bg-light border-0 py-2 custom-input form-select-sm">
                                                    <option value="15">15 Minutes</option>
                                                    <option value="30" defaultValue>30 Minutes</option>
                                                    <option value="60">1 Hour</option>
                                                    <option value="240">4 Hours</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Notifications Settings */}
                    {activeTab === 'notifications' && (
                        <div className="glass-card rounded-4 shadow-sm bg-white border-0 h-100">
                            <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="fw-bold mb-1 d-flex align-items-center gap-2"><Bell size={20} className="text-primary" /> Communications</h5>
                                    <p className="text-muted small mb-0">Manage system alerts and user notification preferences.</p>
                                </div>
                                <button className="btn btn-primary btn-sm rounded-pill px-4 d-flex align-items-center gap-2">
                                    <Save size={16} /> Save Changes
                                </button>
                            </div>
                            <div className="p-4 p-md-5">
                                <form className="max-w-800">
                                    <h6 className="fw-bold text-dark-blue border-bottom pb-2 mb-4">Email Notifications (Admin)</h6>

                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div>
                                                <h6 className="fw-bold mb-1 text-dark-blue">Daily Digest</h6>
                                                <p className="text-muted small mb-0">Receive a daily summary of platform activity and key metrics.</p>
                                            </div>
                                            <div className="form-check form-switch mb-0">
                                                <input className="form-check-input flex-shrink-0" type="checkbox" role="switch" defaultChecked style={{ width: '40px', height: '20px' }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div>
                                                <h6 className="fw-bold mb-1 text-dark-blue">New User Registrations</h6>
                                                <p className="text-muted small mb-0">Get alerted immediately when a new user signs up.</p>
                                            </div>
                                            <div className="form-check form-switch mb-0">
                                                <input className="form-check-input flex-shrink-0" type="checkbox" role="switch" style={{ width: '40px', height: '20px' }} />
                                            </div>
                                        </div>
                                    </div>

                                    <h6 className="fw-bold text-dark-blue border-bottom pb-2 mb-4 mt-5">System Alerts</h6>

                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div>
                                                <h6 className="fw-bold mb-1 text-dark-blue">Security Incidents</h6>
                                                <p className="text-muted small mb-0">Urgent notifications for failed logins or suspicious activity.</p>
                                            </div>
                                            <div className="form-check form-switch custom-switch-danger mb-0">
                                                <input className="form-check-input flex-shrink-0" type="checkbox" role="switch" defaultChecked style={{ width: '40px', height: '20px' }} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Roles & Permissions */}
                    {activeTab === 'roles' && (
                        <div className="glass-card rounded-4 shadow-sm bg-white border-0 h-100">
                            <div className="p-4 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div>
                                    <h5 className="fw-bold mb-1 d-flex align-items-center gap-2"><Users size={20} className="text-primary" /> Role Management</h5>
                                    <p className="text-muted small mb-0">Configure administrative access levels and permissions.</p>
                                </div>
                                <button className="btn btn-outline-primary btn-sm rounded-pill px-4 d-flex align-items-center gap-2 border">
                                    <Plus size={16} /> New Role
                                </button>
                            </div>
                            <div className="p-4 p-md-5">
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <div className="border rounded-4 p-4 h-100 position-relative border-primary bg-primary-soft text-primary">
                                            <div className="position-absolute top-0 end-0 p-3 pt-2">
                                                <span className="badge bg-primary rounded-pill">System</span>
                                            </div>
                                            <Shield size={32} className="mb-3" />
                                            <h6 className="fw-bold mb-2">Super Admin</h6>
                                            <p className="small opacity-75 mb-4 text-dark">Unrestricted access to all platform configurations, features, and financial data.</p>
                                            <div className="d-flex align-items-center justify-content-between pt-3 border-top border-primary border-opacity-25 text-dark">
                                                <span className="small fw-bold">2 Users</span>
                                                <button className="btn btn-link btn-sm p-0 fw-bold">Manage</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="border rounded-4 p-4 h-100 position-relative hover-border-primary transition-all">
                                            <UserCheck size={32} className="text-muted mb-3" />
                                            <h6 className="fw-bold text-dark-blue mb-2">Moderator</h6>
                                            <p className="text-muted small mb-4">Can manage users, auctions, and view reports. Cannot modify platform settings.</p>
                                            <div className="d-flex align-items-center justify-content-between pt-3 border-top text-muted">
                                                <span className="small fw-bold">5 Users</span>
                                                <button className="btn btn-link btn-sm text-primary p-0 fw-bold">Manage</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Billing & Payments */}
                    {activeTab === 'billing' && (
                        <div className="glass-card rounded-4 shadow-sm bg-white border-0 h-100">
                            <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="fw-bold mb-1 d-flex align-items-center gap-2"><CreditCard size={20} className="text-primary" /> Billing Details</h5>
                                    <p className="text-muted small mb-0">Manage payment methods and view billing history.</p>
                                </div>
                                <button className="btn btn-primary btn-sm rounded-pill px-4 d-flex align-items-center gap-2">
                                    <Save size={16} /> Save Changes
                                </button>
                            </div>
                            <div className="p-4 p-md-5">
                                <form className="max-w-800">
                                    <h6 className="fw-bold text-dark-blue border-bottom pb-2 mb-4">Payment Methods</h6>

                                    <div className="border rounded-4 p-4 mb-4 bg-light position-relative">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div className="bg-white p-2 rounded-3 shadow-sm text-primary border"><CreditCard size={24} /></div>
                                                <div>
                                                    <h6 className="fw-bold mb-1 text-dark-blue d-flex align-items-center gap-2">Mastercard ending in 4242 <span className="badge bg-success-soft text-success rounded-pill fw-medium" style={{ fontSize: '0.65rem' }}>Default</span></h6>
                                                    <p className="text-muted small mb-0">Expires 12/26</p>
                                                </div>
                                            </div>
                                            <button className="btn btn-link text-muted p-0"><SettingsIcon size={18} /></button>
                                        </div>
                                    </div>

                                    <button className="btn btn-outline-primary btn-sm rounded-pill px-4 d-flex align-items-center gap-2 mb-5 border">
                                        <Plus size={16} /> Add Payment Method
                                    </button>

                                    <h6 className="fw-bold text-dark-blue border-bottom pb-2 mb-4">Billing Information</h6>

                                    <div className="row g-4">
                                        <div className="col-12">
                                            <label className="form-label small fw-bold text-dark-blue">Company Name</label>
                                            <input type="text" className="form-control bg-light border-0 py-2 custom-input" defaultValue="Domain Marketplace Inc." />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small fw-bold text-dark-blue">Billing Address</label>
                                            <input type="text" className="form-control bg-light border-0 py-2 custom-input mb-2" defaultValue="123 Domain St, Suite 400" />
                                            <input type="text" className="form-control bg-light border-0 py-2 custom-input" placeholder="Apartment, studio, or floor" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-dark-blue">City</label>
                                            <input type="text" className="form-control bg-light border-0 py-2 custom-input" defaultValue="San Francisco" />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="form-label small fw-bold text-dark-blue">State/Province</label>
                                            <input type="text" className="form-control bg-light border-0 py-2 custom-input" defaultValue="CA" />
                                        </div>
                                        <div className="col-md-2">
                                            <label className="form-label small fw-bold text-dark-blue">Zip Code</label>
                                            <input type="text" className="form-control bg-light border-0 py-2 custom-input" defaultValue="94105" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
