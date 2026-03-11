import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Globe, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer-premium bg-dark text-white pt-5 mt-5 border-top border-secondary">
            <div className="container py-5">
                <div className="row g-4">
                    {/* Brand Section */}
                    <div className="col-lg-4 col-md-6">
                        <div className="d-flex align-items-center gap-2 mb-4">
                            <div className="bg-primary p-2 rounded-3 shadow-sm">
                                <Globe size={24} className="text-white" />
                            </div>
                            <h3 className="fw-bold mb-0 text-white letter-spacing-tight">YallaDomains</h3>
                        </div>
                        <p className="text-light opacity-75 mb-4 pe-lg-5" style={{ lineHeight: '1.8' }}>
                            Discover, negotiate, and acquire premium digital assets. We provide a professional platform for elite domain trading and brokerage services.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="social-icon-link bg-secondary bg-opacity-10 p-2 rounded-circle border border-secondary border-opacity-25 transition-all d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <Facebook size={18} className="text-white opacity-75" />
                            </a>
                            <a href="#" className="social-icon-link bg-secondary bg-opacity-10 p-2 rounded-circle border border-secondary border-opacity-25 transition-all d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <Twitter size={18} className="text-white opacity-75" />
                            </a>
                            <a href="#" className="social-icon-link bg-secondary bg-opacity-10 p-2 rounded-circle border border-secondary border-opacity-25 transition-all d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <Instagram size={18} className="text-white opacity-75" />
                            </a>
                            <a href="#" className="social-icon-link bg-secondary bg-opacity-10 p-2 rounded-circle border border-secondary border-opacity-25 transition-all d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                <Linkedin size={18} className="text-white opacity-75" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="col-lg-2 col-md-6 ms-lg-auto">
                        <h5 className="fw-bold mb-4 text-white">Marketplace</h5>
                        <ul className="list-unstyled d-flex flex-column gap-3">
                            <li><Link to="/" className="text-light opacity-75 text-decoration-none hover-text-primary transition-all d-flex align-items-center gap-2 small"><ArrowRight size={14} /> Browse Domains</Link></li>
                            <li><Link to="/sell" className="text-light opacity-75 text-decoration-none hover-text-primary transition-all d-flex align-items-center gap-2 small"><ArrowRight size={14} /> List Your Domain</Link></li>
                            <li><Link to="/premium" className="text-light opacity-75 text-decoration-none hover-text-primary transition-all d-flex align-items-center gap-2 small"><ArrowRight size={14} /> Premium Inventory</Link></li>
                            <li><Link to="/auctions" className="text-light opacity-75 text-decoration-none hover-text-primary transition-all d-flex align-items-center gap-2 small"><ArrowRight size={14} /> Domain Auctions</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="col-lg-2 col-md-6">
                        <h5 className="fw-bold mb-4 text-white">Resources</h5>
                        <ul className="list-unstyled d-flex flex-column gap-3">
                            <li><Link to="/about" className="text-light opacity-75 text-decoration-none hover-text-primary transition-all d-flex align-items-center gap-2 small"><ArrowRight size={14} /> About Us</Link></li>
                            <li><Link to="/contact" className="text-light opacity-75 text-decoration-none hover-text-primary transition-all d-flex align-items-center gap-2 small"><ArrowRight size={14} /> Help Center</Link></li>
                            <li><Link to="/terms" className="text-light opacity-75 text-decoration-none hover-text-primary transition-all d-flex align-items-center gap-2 small"><ArrowRight size={14} /> Terms of Service</Link></li>
                            <li><Link to="/privacy" className="text-light opacity-75 text-decoration-none hover-text-primary transition-all d-flex align-items-center gap-2 small"><ArrowRight size={14} /> Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Detail */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="fw-bold mb-4 text-white">Get in Touch</h5>
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-primary bg-opacity-10 p-2 rounded text-primary">
                                    <Mail size={18} />
                                </div>
                                <span className="text-light opacity-75 small">support@yalladomains.com</span>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-primary bg-opacity-10 p-2 rounded text-primary">
                                    <Phone size={18} />
                                </div>
                                <span className="text-light opacity-75 small">+1 (555) 234-5678</span>
                            </div>
                            <div className="d-flex align-items-center gap-3">
                                <div className="bg-primary bg-opacity-10 p-2 rounded text-primary">
                                    <MapPin size={18} />
                                </div>
                                <span className="text-light opacity-75 small">Global Financial District, Dubai, UAE</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-5 border-secondary opacity-25" />

                <div className="row align-items-center text-center text-md-start">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <p className="small text-light opacity-50 mb-0">
                            © {new Date().getFullYear()} YallaDomains. Professional Domain Trading platform. All rights reserved.
                        </p>
                    </div>
                    <div className="col-md-6 text-md-end">
                        <div className="d-flex gap-4 justify-content-center justify-content-md-end">
                            <Link to="/terms" className="small text-light opacity-50 text-decoration-none hover-text-white transition-all">Terms</Link>
                            <Link to="/privacy" className="small text-light opacity-50 text-decoration-none hover-text-white transition-all">Privacy</Link>
                            <Link to="/cookies" className="small text-light opacity-50 text-decoration-none hover-text-white transition-all">Cookies</Link>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .footer-premium {
                    background: linear-gradient(180deg, #0f172a 0%, #020617 100%);
                }
                .hover-text-primary:hover {
                    color: var(--bs-primary) !important;
                    opacity: 1 !important;
                    padding-left: 4px;
                }
                .transition-all {
                    transition: all 0.3s ease;
                }
                .social-icon-link:hover {
                    background-color: var(--bs-primary) !important;
                    border-color: var(--bs-primary) !important;
                    transform: translateY(-3px);
                }
                .social-icon-link:hover .text-white {
                    opacity: 1 !important;
                }
                .letter-spacing-tight {
                    letter-spacing: -0.025em;
                }
            ` }} />
        </footer>
    );
};

export default Footer;
