import React, { useState, useEffect } from 'react';
import { Plus, X, Save } from 'lucide-react';

const AdminDomainForm = ({ onAdd, onUpdate, onCancel, editData }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: 'Fixed Price',
        registrar: 'GoDaddy',
        expiryDate: 'Dec 2025',
    });

    const isEdit = !!editData;

    useEffect(() => {
        if (editData) {
            setFormData({
                name: editData.name || '',
                price: editData.price || '',
                category: editData.category || 'Fixed Price',
                registrar: editData.registrar || 'GoDaddy',
                expiryDate: editData.expiryDate || 'Dec 2025',
            });
        }
    }, [editData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            onUpdate(editData._id, formData);
        } else {
            onAdd(formData);
        }
    };

    return (
        <div className="card border-0 shadow-lg rounded-4 overflow-hidden mb-5">
            <div className={`card-header ${isEdit ? 'bg-primary' : 'bg-dark'} text-white py-3 d-flex justify-content-between align-items-center`}>
                <h5 className="fw-bold mb-0 flex-grow-1">{isEdit ? 'Edit Domain Listing' : 'Add New Domain Listing'}</h5>
                <button className="btn btn-link text-white text-decoration-none" onClick={onCancel}>
                    <X size={20} />
                </button>
            </div>
            <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted">Domain Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="example.com"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-bold text-muted">Price ($)</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="495"
                                required
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small fw-bold text-muted">Category</label>
                            <select
                                className="form-select"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="Fixed Price">Fixed Price</option>
                                <option value="Auctions">Auctions</option>
                                <option value="Make Offer">Make Offer</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small fw-bold text-muted">Registrar</label>
                            <select
                                className="form-select"
                                value={formData.registrar}
                                onChange={(e) => setFormData({ ...formData, registrar: e.target.value })}
                            >
                                <option value="GoDaddy">GoDaddy</option>
                                <option value="Namecheap">Namecheap</option>
                                <option value="Dynadot">Dynadot</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small fw-bold text-muted">Expiry Date</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Dec 2025"
                                value={formData.expiryDate}
                                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                            />
                        </div>
                        <div className="col-12 mt-4 text-end">
                            <button type="button" className="btn btn-light me-2 rounded-pill px-4" onClick={onCancel}>Cancel</button>
                            <button type="submit" className={`btn ${isEdit ? 'btn-primary' : 'btn-dark'} px-4 rounded-pill d-inline-flex align-items-center gap-2`}>
                                {isEdit ? <Save size={18} /> : <Plus size={18} />}
                                {isEdit ? 'Save Changes' : 'Publish Listing'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminDomainForm;
