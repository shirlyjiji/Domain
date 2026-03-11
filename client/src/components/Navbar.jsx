import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Bell, ChevronDown, Search } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark glass-header sticky-top py-2">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <div className="logo-icon bg-primary rounded-circle p-2 me-2 logo-pulse">
                        <Globe size={24} className="text-white" />
                    </div>
                    <span className="fw-bold fs-4 tracking-tight">Yalla<span className="text-warning-custom">Domains</span></span>
                </Link>

                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
                        <li className="nav-item">
                            <Link className="nav-link nav-link-premium active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-link-premium" href="#">Marketplace</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link nav-link-premium" to="/forum">Discussions</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link nav-link-premium text-warning-custom" href="#">Sell Assets</a>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        <div className="position-relative d-none d-xl-block">
                            <Search size={18} className="search-icon-nav" />
                            <input type="text" className="header-search" placeholder="Search domains..." />
                        </div>

                        <button className="btn btn-link text-white p-2 position-relative hover-bg-light rounded-circle transition-all">
                            <Bell size={22} />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-2 border-dark" style={{ fontSize: '0.65rem', marginTop: '8px', marginLeft: '-8px' }}>2</span>
                        </button>

                        <div className="user-profile d-flex align-items-center bg-dark-lighter p-1 pe-3 rounded-pill cursor-pointer hover-bg-white-10 transition-all border border-white-10">
                            <img src="https://i.pravatar.cc/150?u=krishna" alt="User" className="rounded-circle me-2 border border-2 border-primary" style={{ width: '34px', height: '34px' }} />
                            <div className="d-none d-md-block">
                                <div className="text-white small fw-bold leading-tight">Krishna</div>
                                <div className="text-white-50 small leading-tight" style={{ fontSize: '0.7rem' }}>Pro Member</div>
                            </div>
                            <ChevronDown size={14} className="text-white ms-2 opacity-50" />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
