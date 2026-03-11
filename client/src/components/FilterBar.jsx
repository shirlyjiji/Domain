import React from 'react';
import { ChevronDown, RefreshCcw, Filter } from 'lucide-react';

const CustomDropdown = ({ label, options, value, onChange }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <div className="dropdown-trigger d-flex align-items-center gap-2" onClick={() => setIsOpen(!isOpen)}>
                <span className="text-muted small fw-bold">{label}:</span>
                <span className="fw-bold text-dark-blue ms-1">{value}</span>
                <ChevronDown size={14} className={`dropdown-arrow ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            {isOpen && (
                <div className="dropdown-menu-custom shadow-lg show">
                    {options.map((opt) => (
                        <div 
                            key={opt} 
                            className={`dropdown-item-custom ${value === opt ? 'active' : ''}`}
                            onClick={() => {
                                onChange(opt);
                                setIsOpen(false);
                            }}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const FilterBar = ({ activeCategory, setActiveCategory }) => {
    const categories = ['Fixed Price', 'Auctions', 'Make Offer', 'More Categories'];
    const extensions = ['.COM', '.NET', '.AI', '.IO', '.CO', '.ORG'];
    
    const [sort, setSort] = React.useState('Latest Listings');
    const [priceRange, setPriceRange] = React.useState('Any Price');
    const [extension, setExtension] = React.useState('Any Ext.');

    return (
        <div className="filter-bar bg-white border-bottom py-3">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                    <div className="btn-group shadow-sm rounded-pill p-1 bg-light">
                        {categories.map(cat => (
                            <button 
                                key={cat}
                                className={`btn rounded-pill px-4 ${activeCategory === cat ? 'btn-warning-custom shadow-sm text-dark fw-bold' : 'btn-light border-0 text-muted fw-medium'}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat} {cat === 'More Categories' && <ChevronDown size={14} />}
                            </button>
                        ))}
                    </div>
                    
                    <div className="d-flex align-items-center gap-3">
                        <button className="btn btn-link text-muted text-decoration-none d-flex align-items-center gap-1 small fw-medium">
                            <RefreshCcw size={14} /> Reset Filters
                        </button>
                        <button className="btn btn-outline-secondary d-flex align-items-center gap-2 rounded-pill px-3 py-1 small fw-medium">
                            <Filter size={14} /> Filter Icons
                        </button>
                    </div>
                </div>

                <div className="row align-items-center g-3">
                    <div className="col-auto d-flex gap-4">
                        <CustomDropdown 
                            label="Sort By" 
                            options={['Latest Listings', 'Price: Low to High', 'Price: High to Low']} 
                            value={sort} 
                            onChange={setSort} 
                        />
                        <CustomDropdown 
                            label="Price Range" 
                            options={['Any Price', '$0 - $100', '$100 - $500', '$500+']} 
                            value={priceRange} 
                            onChange={setPriceRange} 
                        />
                        <CustomDropdown 
                            label="Extension" 
                            options={['Any Ext.', '.com', '.net', '.ai']} 
                            value={extension} 
                            onChange={setExtension} 
                        />
                    </div>
                </div>

                <div className="mt-4 d-flex flex-wrap align-items-center gap-4">
                    {extensions.map(ext => (
                        <div key={ext} className="form-check">
                            <input className="form-check-input" type="checkbox" id={ext} />
                            <label className="form-check-label small text-muted fw-medium" htmlFor={ext}>
                                {ext}
                            </label>
                        </div>
                    ))}
                    <button className="btn btn-primary-custom btn-sm rounded-pill px-3 ms-auto">Reuse Filters</button>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
