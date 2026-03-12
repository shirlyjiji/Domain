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

const FilterBar = ({
    activeCategory, setActiveCategory,
    sort, setSort,
    priceRange, setPriceRange,
    extension, setExtension,
    selectedExtensions, setSelectedExtensions,
    onReset
}) => {
    const categories = ['Fixed Price', 'Auctions', 'Make Offer', 'Budget Domains', 'Premium Domains'];
    const extensionOptions = ['.COM', '.NET', '.AI', '.IO', '.CO', '.ORG'];

    const [showFilterIcons, setShowFilterIcons] = React.useState(false);

    const toggleExtension = (ext) => {
        setSelectedExtensions(prev =>
            prev.includes(ext) ? prev.filter(e => e !== ext) : [...prev, ext]
        );
    };

    // Count how many filters are active (not at defaults)
    const activeFilterCount = [
        sort !== 'Latest Listings',
        priceRange !== 'Any Price',
        extension !== 'Any Ext.',
        selectedExtensions.length > 0,
        activeCategory !== 'Fixed Price'
    ].filter(Boolean).length;

    // "Filter Icons" toggles visual active-filter indicators on category buttons
    const handleToggleFilterIcons = () => setShowFilterIcons(prev => !prev);

    return (
        <div className="filter-bar bg-white border-bottom py-3">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
                    <div className="btn-group shadow-sm rounded-pill p-1 bg-light">
                        {categories.map(cat => {
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    className={`btn rounded-pill px-4 position-relative ${isActive ? 'btn-warning-custom shadow-sm text-dark fw-bold' : 'btn-light border-0 text-muted fw-medium'}`}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat} {cat === 'More Categories' && <ChevronDown size={14} />}
                                    {/* Show active-filter dot when filter icons mode is on and this category is active */}
                                    {showFilterIcons && isActive && activeFilterCount > 0 && (
                                        <span
                                            className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-primary"
                                            style={{ width: '16px', height: '16px', fontSize: '9px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        >
                                            {activeFilterCount}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <button
                            className="btn btn-link text-decoration-none d-flex align-items-center gap-1 small fw-medium"
                            style={{ color: activeFilterCount > 0 ? '#ef476f' : '#6c757d' }}
                            onClick={onReset}
                            title="Reset all filters to default"
                        >
                            <RefreshCcw size={14} />
                            Reset Filters
                            {activeFilterCount > 0 && (
                                <span className="badge bg-danger rounded-pill ms-1" style={{ fontSize: '0.6rem' }}>
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                        <button
                            className={`btn d-flex align-items-center gap-2 rounded-pill px-3 py-1 small fw-medium ${showFilterIcons ? 'btn-primary text-white border-0' : 'btn-outline-secondary'}`}
                            onClick={handleToggleFilterIcons}
                            title={showFilterIcons ? 'Hide filter indicators' : 'Show filter indicators on category tabs'}
                        >
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
                            options={['Any Ext.', '.COM', '.NET', '.AI', '.IO', '.CO', '.ORG']}
                            value={extension}
                            onChange={setExtension}
                        />
                    </div>
                </div>

                <div className="mt-4 d-flex flex-wrap align-items-center gap-4">
                    {extensionOptions.map(ext => (
                        <div key={ext} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`ext-${ext}`}
                                checked={selectedExtensions.includes(ext)}
                                onChange={() => toggleExtension(ext)}
                            />
                            <label
                                className={`form-check-label small fw-medium ${selectedExtensions.includes(ext) ? 'text-primary fw-bold' : 'text-muted'}`}
                                htmlFor={`ext-${ext}`}
                            >
                                {ext}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
