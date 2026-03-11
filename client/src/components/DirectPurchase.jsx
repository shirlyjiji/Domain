import React from 'react';
import { CreditCard, ShieldCheck, Mail, Lock } from 'lucide-react';

const DirectPurchase = ({ domain }) => {
    return (
        <div className="direct-purchase-view bg-white border p-4 shadow-sm mb-4">
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                <CreditCard className="text-warning" /> Complete Your Purchase
            </h5>
            
            <div className="row g-4">
                <div className="col-md-7">
                    <div className="bg-light p-3 border rounded-3 mb-4">
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Domain Price:</span>
                            <span className="fw-bold fs-5">${domain?.price || '495'}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Escrow Fee:</span>
                            <span className="text-success fw-bold">FREE</span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between">
                            <span className="fw-bold">Total Amount:</span>
                            <span className="fw-bold fs-4 text-primary">${domain?.price || '495'}</span>
                        </div>
                    </div>
                    
                    <div className="payment-options mb-4">
                        <h6 className="fw-bold small text-uppercase text-muted mb-3">Select Payment Method</h6>
                        <div className="d-flex gap-2">
                            <button className="btn btn-outline-primary active p-3 flex-grow-1 d-flex flex-column align-items-center gap-2">
                                <CreditCard size={24} />
                                <span className="small fw-bold">Credit Card</span>
                            </button>
                            <button className="btn btn-outline-primary p-3 flex-grow-1 d-flex flex-column align-items-center gap-2">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" style={{height: '24px'}} />
                                <span className="small fw-bold">PayPal</span>
                            </button>
                        </div>
                    </div>
                    
                    <button className="btn btn-warning-custom w-100 py-3 fw-bold fs-5 shadow-sm">
                        SECURE CHECKOUT
                    </button>
                    <p className="text-center text-muted small mt-3">
                        <Lock size={14} className="me-1" /> All transactions are secured and encrypted.
                    </p>
                </div>
                
                <div className="col-md-5">
                    <div className="border rounded-3 p-3 bg-success-soft">
                        <div className="d-flex align-items-center gap-2 text-success-dark mb-2">
                            <ShieldCheck size={20} />
                            <span className="fw-bold">Buyer Protection</span>
                        </div>
                        <ul className="small text-muted ps-3 mb-0">
                            <li>Secure domain transfer via Escrow</li>
                            <li>100% money back guarantee</li>
                            <li>Instant ownership verification</li>
                        </ul>
                    </div>
                    
                    <div className="mt-4 p-3 border rounded-3">
                        <h6 className="fw-bold small text-muted mb-2">Questions?</h6>
                        <button className="btn btn-outline-secondary w-100 btn-sm d-flex align-items-center justify-content-center gap-2">
                            <Mail size={16} /> Contact Seller
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DirectPurchase;
