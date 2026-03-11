import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterBar from './components/FilterBar';
import DomainCard from './components/DomainCard';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Pages
import ForumPage from './pages/ForumPage';
import AdminDashboard from './pages/AdminDashboard';

const HomePage = ({ domains, loading, setSearch, activeCategory, setActiveCategory, currentPage, totalPages, onPageChange }) => {
    return (
        <>
            <Hero onSearch={setSearch} />
            <FilterBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

            <main className="container py-5">
                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="fw-bold mb-0 text-dark-blue">{activeCategory} Domains</h2>
                            <div className="d-flex gap-2">
                                <span className="badge bg-light text-dark border p-2 px-3 rounded-pill fw-medium">
                                    {domains.length} Results
                                </span>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <div className="row row-cols-1 row-cols-md-2 g-4">
                                {domains.map((domain, index) => (
                                    <div className="col" key={index}>
                                        <DomainCard domain={domain} />
                                    </div>
                                ))}
                            </div>
                        )}

                        {totalPages > 1 && (
                            <nav className="mt-5">
                                <ul className="pagination justify-content-center gap-2">
                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                        <button className="page-link rounded-3 px-4 border-0 shadow-sm transition-all" onClick={() => onPageChange(currentPage - 1)}>Previous</button>
                                    </li>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                            <button className="page-link rounded-3 px-3 border-0 shadow-sm transition-all" onClick={() => onPageChange(i + 1)}>{i + 1}</button>
                                        </li>
                                    ))}
                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                        <button className="page-link rounded-3 px-4 border-0 shadow-sm transition-all" onClick={() => onPageChange(currentPage + 1)}>Next</button>
                                    </li>
                                </ul>
                            </nav>
                        )}
                    </div>

                    <div className="col-lg-4">
                        <Sidebar />
                    </div>
                </div>
            </main>
        </>
    );
};

function App() {
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('Fixed Price');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalDomains, setTotalDomains] = useState(0);
    const itemsPerPage = 8;

    useEffect(() => {
        // Reset to page 1 when search or category changes
        setCurrentPage(1);
    }, [search, activeCategory]);

    useEffect(() => {
        const fetchDomains = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/domains`, {
                    params: {
                        search,
                        category: activeCategory,
                        page: currentPage,
                        limit: itemsPerPage
                    }
                });

                if (response.data && response.data.domains) {
                    setDomains(response.data.domains);
                    setTotalDomains(response.data.total || 0);
                } else {
                    // Legacy fallback if API returns array directly
                    setDomains(Array.isArray(response.data) ? response.data : []);
                    setTotalDomains(Array.isArray(response.data) ? response.data.length : 0);
                }
            } catch (err) {
                console.error('Error fetching domains:', err);
                const fallback = [
                    { name: 'CryptoNest.io', price: 495, category: 'Fixed Price', registrar: 'GoDaddy', expiryDate: 'Apr 2025' },
                    { name: 'AIMentor.com', price: 350, category: 'Fixed Price', registrar: 'Namecheap', expiryDate: 'Jun 2026' },
                    { name: 'AIStartupHub.com', price: 699, category: 'Fixed Price', registrar: 'Namecheap', expiryDate: 'Jul 2027' },
                    { name: 'TechFlow.io', price: 590, category: 'Fixed Price', registrar: 'GoDaddy', expiryDate: 'Nov 2026' },
                    { name: 'NextGen.ai', price: 1800, category: 'Fixed Price', registrar: 'GoDaddy', expiryDate: 'Jul 2026' },
                    { name: 'FintechWorld.ai', price: 45, category: 'Auctions', registrar: 'GoDaddy', expiryDate: 'Apr 2025', bids: 12, endsIn: '2: 24: 00' },
                    { name: 'SecureNetwork.io', price: 120, category: 'Auctions', registrar: 'Dynadot', expiryDate: 'Dec 2024', bids: 5, endsIn: '1: 12: 00' },
                    { name: 'QuantumComputing.ai', price: 850, category: 'Auctions', registrar: 'GoDaddy', expiryDate: 'Sep 2026', bids: 4, endsIn: '5: 12: 00' },
                    { name: 'SwiftLogistics.co', price: 195, category: 'Auctions', registrar: 'GoDaddy', expiryDate: 'Oct 2025', bids: 9, endsIn: '0: 55: 00' },
                    { name: 'EcoSmartHomes.com', price: 210, category: 'Make Offer', registrar: 'GoDaddy', expiryDate: 'Jan 2027' },
                    { name: 'SmartWallet.co', price: 150, category: 'Make Offer', registrar: 'GoDaddy', expiryDate: 'Jan 2026' },
                    { name: 'DeepLearning.ai', price: 9500, category: 'Make Offer', registrar: 'GoDaddy', expiryDate: 'Jul 2026' },
                    { name: 'SolarPower.co', price: 580, category: 'Make Offer', registrar: 'GoDaddy', expiryDate: 'Jan 2026' },
                ];
                const filtered = fallback.filter(d =>
                    (activeCategory === 'More Categories' || activeCategory === 'All' || d.category === activeCategory) &&
                    d.name.toLowerCase().includes(search.toLowerCase())
                );
                setDomains(filtered);
                setTotalDomains(filtered.length);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchDomains();
        }, 300);

        return () => clearTimeout(timer);
    }, [search, activeCategory, currentPage]);

    const totalPages = Math.ceil(totalDomains / itemsPerPage);

    return (
        <Router>
            <Routes>
                {/* Admin Route - Standalone (No Global Navbar/Footer) */}
                <Route path="/admin" element={<AdminDashboard />} />

                {/* Public Routes with Global Navbar and Footer */}
                <Route path="*" element={
                    <div className="app-container">
                        <Navbar />

                        <Routes>
                            <Route path="/" element={
                                <HomePage
                                    domains={domains}
                                    loading={loading}
                                    setSearch={setSearch}
                                    activeCategory={activeCategory}
                                    setActiveCategory={setActiveCategory}
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            } />
                            <Route path="/buy/:domainName" element={<ForumPage />} />
                        </Routes>

                        <Footer />
                    </div>
                } />
            </Routes>
        </Router>
    );
}

export default App;
