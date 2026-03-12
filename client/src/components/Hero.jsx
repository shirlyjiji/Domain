import React from 'react';

const Hero = ({ onSearch }) => {
    return (
        <section className="hero-section text-white py-5 position-relative overflow-hidden" style={{
            backgroundImage: 'linear-gradient(rgba(0, 51, 102, 0.7), rgba(0, 51, 102, 0.9)), url("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '350px'
        }}>
            <div className="container py-5">
                <div className="row justify-content-center text-center">
                    <div className="col-lg-8">
                        <h1 className="fw-bold display-4 mb-3">Buy & Sell Domains</h1>
                        <p className="lead mb-5 text-light-blue">Browse Domains at Fixed Prices, Auctions, or Make Offers.</p>
                        
                        <div className="search-container bg-white p-1 rounded-pill shadow-lg d-flex align-items-center">
                            <input 
                                type="text" 
                                className="form-control border-0 py-3 px-4 shadow-none rounded-pill" 
                                placeholder="Search domains..." 
                                onChange={(e) => onSearch(e.target.value)}
                            />
                            <button className="btn btn-warning-custom px-5 py-3 fw-bold text-dark rounded-pill">Search</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
