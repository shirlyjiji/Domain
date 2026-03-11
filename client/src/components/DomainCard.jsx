import React from 'react';
import { CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const DomainCard = ({ domain }) => {
    const isAuction = domain.category === 'Auction';
    const isMakeOffer = domain.category === 'Make Offer';
    
    // Dynamic registrar logo
    const getRegistrarLogo = (registrar) => {
        const reg = registrar?.toLowerCase() || 'godaddy';
        if (reg.includes('godaddy')) return '/assets/images/godaddy.png';
        if (reg.includes('namecheap')) return '/assets/images/namecheap.png';
        return '/assets/images/godaddy.png';
    };

    return (
        <div className="card domain-card border-0 shadow-sm rounded-4 mb-4 overflow-hidden h-100">
            {isAuction && (
                <div className="bg-primary text-white p-2 small fw-bold text-center">AUCTION</div>
            )}
            {isMakeOffer && (
                <div className="bg-info text-white p-2 small fw-bold text-center">MAKE OFFER</div>
            )}
            
            <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center bg-light p-2 rounded-3 me-3">
                        <img src={getRegistrarLogo(domain.registrar)} alt={domain.registrar} style={{height: '24px', maxWidth: '100px', objectFit: 'contain'}} />
                    </div>
                    <div className="text-end">
                        <h4 className="fw-bold mb-0">${domain.price}</h4>
                    </div>
                </div>
                
                <h3 className="card-title fw-bold mb-2 text-dark-blue fs-4 d-flex align-items-center justify-content-between">
                    {domain.name}
                    <a href={`https://www.google.com/search?q=${domain.name}`} target="_blank" rel="noreferrer" className="ms-2">
                        <img src="/assets/images/google-search.png" alt="Search on Google" style={{width: '18px', height: '18px', opacity: 0.7}} />
                    </a>
                </h3>
                
                <div className="d-flex align-items-center text-muted small mb-4">
                    <CheckCircle size={16} className="text-success me-1" />
                    <span className="me-3">Open</span>
                    <img src="/assets/images/google-search.png" alt="Indexed" style={{width: '12px', height: '12px', marginRight: '4px'}} />
                    <span className="text-muted fw-medium me-3">Google Indexed</span>
                    <span className="text-muted fw-medium">Expires: {domain.expiryDate}</span>
                </div>

                <div className="d-grid gap-2">
                    {isAuction ? (
                        <Link to={`/buy/${domain.name}`} state={{ domain }} className="btn btn-primary-custom py-2 fw-bold text-center text-decoration-none">Place Bid</Link>
                    ) : isMakeOffer ? (
                        <Link to={`/buy/${domain.name}`} state={{ domain }} className="btn btn-primary-custom py-2 fw-bold text-center text-decoration-none">Make Offer</Link>
                    ) : (
                        <Link to={`/buy/${domain.name}`} state={{ domain }} className="btn btn-warning-custom py-2 fw-bold text-dark text-center text-decoration-none">Buy Now</Link>
                    )}
                </div>
            </div>
            
            <div className="card-footer bg-light border-0 p-3 small">
                <div className="d-flex justify-content-between text-muted fw-medium">
                    <span className="d-flex align-items-center gap-1">
                        <Clock size={14} /> {isAuction ? `Ends in: ${domain.endsIn}` : `Expires: ${domain.expiryDate}`}
                    </span>
                    <span className="d-flex align-items-center gap-1">
                        GoDaddy <ExternalLink size={14} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DomainCard;
