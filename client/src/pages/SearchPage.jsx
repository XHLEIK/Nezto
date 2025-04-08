import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '../UserContext';
import '../styles/SearchPage.css';

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { services } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Get the search query from URL params
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    if (query) {
      performSearch(query);
    }
  }, [searchParams]);

  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    console.log('Searching for:', query);
    console.log('Available services:', services);

    const results = services.filter(service => 
      service.name.toLowerCase().includes(query.toLowerCase()) ||
      service.description.toLowerCase().includes(query.toLowerCase()) ||
      (service.type && service.type.toLowerCase().includes(query.toLowerCase()))
    );
    
    console.log('Search results:', results);
    setSearchResults(results);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    performSearch(value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    navigate('/services');
  };

  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  // Get category color
  const getCategoryColor = (categoryId) => {
    const categories = [
      { id: "all", color: "#40BFC1" },
      { id: "daily", color: "#FF9800" },
      { id: "premium", color: "#8E44AD" },
      { id: "home", color: "#4CAF50" },
      { id: "quick", color: "#F44336" },
      { id: "cleaning", color: "#40BFC1" },
      { id: "addon", color: "#FF9800" }
    ];
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : "#40BFC1";
  };

  // Get rating color
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "#4CAF50";
    if (rating >= 4.0) return "#FF9800";
    return "#F44336";
  };

  // Fallback image for services without images
  const getFallbackImage = () => {
    return 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
  };

  return (
    <div className="search-page">
      <div className="search-header">
        <div className="header-content">
          <button 
            className="back-button"
            onClick={() => navigate('/services')}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="search-input-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              className="search-input"
              placeholder="Search services..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              autoComplete="off"
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={handleClearSearch}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="search-results">
        {searchResults.length > 0 ? (
          <div className="results-grid">
            {searchResults.map((service) => (
              <div 
                key={service.id}
                className="service-card"
                onClick={() => handleServiceClick(service.id)}
              >
                <div className="service-image">
                  <i className={`fas ${service.icon || 'fa-star'} service-icon`}></i>
                  <div className="service-category" style={{ backgroundColor: getCategoryColor(service.type || 'all') }}>
                    {service.type ? service.type.charAt(0).toUpperCase() + service.type.slice(1) : 'All'}
                  </div>
                </div>
                <div className="service-info">
                  <h3>{service.name}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-meta">
                    <span className="service-price">₹{service.price}</span>
                    <div className="service-rating" style={{ color: getRatingColor(service.rating || 4.0) }}>
                      <i className="fas fa-star"></i>
                      <span>{service.rating || 4.0}</span>
                      <span className="review-count">({service.reviews || 0})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="no-results">
            <i className="fas fa-search"></i>
            <p>No services found for "{searchQuery}"</p>
          </div>
        ) : (
          <div className="empty-state">
            <i className="fas fa-search"></i>
            <p>Search for services</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage; 