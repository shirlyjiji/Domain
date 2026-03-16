import React from 'react';
import { Edit, Trash2, ExternalLink } from 'lucide-react';

const AdminDomainList = ({ domains, onEdit, onDelete }) => {
    return (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">Manage Domain Listings</h5>
                <span className="badge bg-light text-dark rounded-pill px-3">{domains.length} Total</span>
            </div>
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0 responsive-table-compact">
                    <thead className="bg-light">
                        <tr>
                            <th className="ps-4 text-nowrap">Domain Name</th>
                            <th className="text-nowrap">Category</th>
                            <th className="text-nowrap">Price</th>
                            <th className="text-nowrap d-none d-md-table-cell">Registrar</th>
                            <th className="text-end pe-4 text-nowrap">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {domains.map((domain) => (
                            <tr key={domain._id}>
                                <td className="ps-4">
                                    <div className="fw-bold text-dark-blue d-flex align-items-center gap-2 text-nowrap">
                                        {domain.name}
                                        <a href={`https://www.google.com/search?q=${domain.name}`} target="_blank" rel="noreferrer" className="d-none d-sm-inline">
                                            <ExternalLink size={12} className="text-muted" />
                                        </a>
                                    </div>
                                    <div className="small text-muted text-nowrap">{domain.expiryDate}</div>
                                </td>
                                <td>
                                    <span className={`badge rounded-pill px-2 px-md-3 ${
                                        domain.category === 'Auctions' ? 'bg-primary-soft text-primary' : 
                                        domain.category === 'Make Offer' ? 'bg-info-soft text-info' : 'bg-warning-soft text-dark'
                                    }`} style={{ fontSize: '0.7rem' }}>
                                        {domain.category}
                                    </span>
                                </td>
                                <td>
                                    <span className="fw-bold text-nowrap">${domain.price}</span>
                                </td>
                                <td className="d-none d-md-table-cell">
                                    <span className="small text-muted">{domain.registrar}</span>
                                </td>
                                <td className="text-end pe-4">
                                    <div className="d-flex justify-content-end gap-1 gap-md-2">
                                        <button 
                                            className="btn btn-outline-primary btn-sm rounded-3 p-1 p-md-2" 
                                            onClick={() => onEdit(domain)}
                                            title="Edit Domain"
                                        >
                                            <Edit size={14} />
                                        </button>
                                        <button 
                                            className="btn btn-outline-danger btn-sm rounded-3 p-1 p-md-2" 
                                            onClick={() => onDelete(domain._id)}
                                            title="Delete Domain"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDomainList;
