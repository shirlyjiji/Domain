import React from 'react';
import { BarChart2, Download, FileText, Filter, Calendar, FileSpreadsheet, HardDrive, RefreshCcw, MoreHorizontal, ChevronDown } from 'lucide-react';

const AdminReportsManager = () => {
    // Mock data for reports stats and history
    const reportStats = {
        totalGenerated: 245,
        dataExported: '18.4 GB',
        activeSources: 12
    };

    const recentReports = [
        { id: 1, name: 'Q3 Financial Summary', type: 'Sales', date: 'Oct 01, 2024', status: 'Completed', size: '2.4 MB', icon: FileSpreadsheet },
        { id: 2, name: 'Monthly User Activity', type: 'Users', date: 'Sep 30, 2024', status: 'Completed', size: '1.8 MB', icon: FileText },
        { id: 3, name: 'Domain Sales Performance', type: 'Domains', date: 'Sep 25, 2024', status: 'Completed', size: '4.1 MB', icon: FileSpreadsheet },
        { id: 4, name: 'Annual Security Audit', type: 'System', date: 'Sep 15, 2024', status: 'Failed', size: '--', icon: FileText },
        { id: 5, name: 'Active Subscriptions List', type: 'Memberships', date: 'Sep 10, 2024', status: 'Completed', size: '850 KB', icon: FileSpreadsheet },
    ];

    return (
        <div className="admin-reports-manager">
            {/* Header Stats Zone */}
            <div className="row g-4 mb-4">
                <div className="col-xl-4 col-md-6">
                    <div className="glass-card stat-card-premium p-4 rounded-4 shadow-sm bg-primary-gradient text-white overflow-hidden position-relative h-100">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="bg-white-10 p-2 rounded-3 text-white flex-shrink-0">
                                <BarChart2 size={24} />
                            </div>
                        </div>
                        <h4 className="fw-bold mb-1 text-white text-truncate">{reportStats.totalGenerated}</h4>
                        <p className="opacity-75 small mb-0 fw-medium text-white text-truncate">Reports Generated This Year</p>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6">
                    <div className="glass-card stat-card-premium p-4 rounded-4 shadow-sm bg-white overflow-hidden position-relative h-100">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="bg-success-soft text-success p-2 rounded-3 flex-shrink-0">
                                <HardDrive size={24} />
                            </div>
                        </div>
                        <h4 className="fw-bold mb-1 text-dark-blue text-truncate">{reportStats.dataExported}</h4>
                        <p className="text-muted small mb-0 fw-medium text-truncate">Total Data Exported</p>
                    </div>
                </div>
                <div className="col-xl-4 col-md-6">
                    <div className="glass-card stat-card-premium p-4 rounded-4 shadow-sm bg-white overflow-hidden position-relative h-100">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="bg-info-soft text-info p-2 rounded-3 flex-shrink-0">
                                <RefreshCcw size={24} />
                            </div>
                        </div>
                        <h4 className="fw-bold mb-1 text-dark-blue text-truncate">{reportStats.activeSources}</h4>
                        <p className="text-muted small mb-0 fw-medium text-truncate">Active Data Sources connected</p>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* Main Content: Recent Reports */}
                <div className="col-xl-8">
                    <div className="glass-card rounded-4 shadow-sm bg-white border-0 h-100">
                        <div className="p-4 border-bottom d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div>
                                <h5 className="fw-bold mb-1">Recent Reports</h5>
                                <p className="text-muted small mb-0">Access and download recently generated system reports.</p>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-secondary btn-sm rounded-pill px-3 d-flex align-items-center gap-2 border">
                                    <Filter size={14} /> Filter
                                </button>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="table hover-table align-middle mb-0">
                                <thead>
                                    <tr className="bg-light-soft">
                                        <th className="ps-4 py-3 small text-muted text-uppercase tracking-wider">Report Name</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider">Type</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider">Date</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider">Status</th>
                                        <th className="py-3 small text-muted text-uppercase tracking-wider pe-4 text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentReports.map(report => (
                                        <tr key={report.id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className={`p-2 rounded-3 ${report.type === 'Sales' ? 'bg-success-soft text-success' : report.type === 'Users' ? 'bg-primary-soft text-primary' : 'bg-info-soft text-info'}`}>
                                                        <report.icon size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="fw-bold text-dark-blue small">{report.name}</div>
                                                        <div className="text-muted" style={{ fontSize: '0.7rem' }}>{report.size}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="text-muted small fw-medium">{report.type}</span>
                                            </td>
                                            <td>
                                                <span className="text-muted small">{report.date}</span>
                                            </td>
                                            <td>
                                                <span className={`badge rounded-pill fw-medium px-3 d-flex align-items-center gap-1 w-fit-content ${report.status === 'Completed' ? 'bg-success-soft text-success' : 'bg-danger-soft text-danger'
                                                    }`}>
                                                    <span className={`d-inline-block rounded-circle ${report.status === 'Completed' ? 'bg-success' : 'bg-danger'}`} style={{ width: '6px', height: '6px' }}></span>
                                                    {report.status}
                                                </span>
                                            </td>
                                            <td className="pe-4 text-end">
                                                <div className="d-flex justify-content-end gap-2">
                                                    <button className="btn btn-sm btn-light rounded-circle text-primary" title="Download" disabled={report.status !== 'Completed'}>
                                                        <Download size={16} />
                                                    </button>
                                                    <button className="btn btn-sm btn-link text-muted p-1">
                                                        <MoreHorizontal size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Generate Custom Report */}
                <div className="col-xl-4">
                    <div className="glass-card rounded-4 shadow-sm bg-white border-0 h-100">
                        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                            <h6 className="fw-bold mb-0">Generate Custom Report</h6>
                        </div>
                        <div className="p-4">
                            <form>
                                <div className="mb-4">
                                    <label className="form-label small fw-bold text-muted text-uppercase tracking-wider">Report Type</label>
                                    <select className="form-select border-0 bg-light rounded-3 text-dark-blue fw-medium shadow-sm">
                                        <option value="sales">Sales & Revenue</option>
                                        <option value="users">User Engagement</option>
                                        <option value="inventory">Asset Inventory</option>
                                        <option value="system">System Performance</option>
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label small fw-bold text-muted text-uppercase tracking-wider">Date Range</label>
                                    <div className="d-flex align-items-center gap-2 bg-light p-2 rounded-3 shadow-sm">
                                        <Calendar size={18} className="text-muted ms-2" />
                                        <select className="form-select border-0 bg-transparent text-dark-blue fw-medium shadow-none outline-none ps-2">
                                            <option value="7d">Last 7 Days</option>
                                            <option value="30d">Last 30 Days</option>
                                            <option value="90d">Last 90 Days</option>
                                            <option value="ytd">Year to Date</option>
                                            <option value="custom">Custom Range...</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label small fw-bold text-muted text-uppercase tracking-wider">Export Format</label>
                                    <div className="d-flex gap-2">
                                        <div className="form-check border rounded-3 p-3 flex-fill text-center cursor-pointer hover-bg-light transition-all">
                                            <input className="form-check-input float-none ms-0 mb-2" type="radio" name="formatRadio" id="formatCsv" defaultChecked />
                                            <label className="form-check-label d-block small fw-bold text-dark-blue cursor-pointer" htmlFor="formatCsv">CSV</label>
                                        </div>
                                        <div className="form-check border rounded-3 p-3 flex-fill text-center cursor-pointer hover-bg-light transition-all">
                                            <input className="form-check-input float-none ms-0 mb-2" type="radio" name="formatRadio" id="formatPdf" />
                                            <label className="form-check-label d-block small fw-bold text-dark-blue cursor-pointer" htmlFor="formatPdf">PDF</label>
                                        </div>
                                    </div>
                                </div>

                                <button type="button" className="btn btn-primary w-100 rounded-pill py-2 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2 mt-2">
                                    <FileText size={18} /> Generate Report
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminReportsManager;
