import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { services } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [categoryResults, setCategoryResults] = useState({});
  const [suggestedQueries, setSuggestedQueries] = useState([]);
  const [allServices, setAllServices] = useState([]);
  
  // Common search terms for autocomplete
  const commonSearchTerms = [
    "dry cleaning", "laundry", "ironing", "suit cleaning", "premium", 
    "express service", "curtain cleaning", "home cleaning", "carpet cleaning",
    "bedding", "stain removal", "leather care", "steam press", "daily wear"
  ];
  
  // Service categories
  const categories = [
    { id: "daily", name: "Daily Wear", icon: "fas fa-tshirt", color: "#FF5A5F" },
    { id: "premium", name: "Premium Services", icon: "fas fa-crown", color: "#FFB100" },
    { id: "home", name: "Home Care", icon: "fas fa-home", color: "#00C2B8" },
    { id: "quick", name: "Quick Services", icon: "fas fa-bolt", color: "#7662E4" }
  ];
  
  // Default services if user context is not available
  const defaultServices = [
    { 
      id: "dry-clean", 
      name: "Dry Cleaning", 
      icon: "fas fa-tshirt", 
      description: "Professional dry cleaning for all your garments", 
      price: 149, 
      category: "daily" 
    },
    { 
      id: "laundry", 
      name: "Laundry", 
      icon: "fas fa-soap", 
      description: "Wash, dry, and fold service for everyday clothes", 
      price: 99,
      category: "daily" 
    },
    { 
      id: "ironing", 
      name: "Ironing", 
      icon: "fas fa-iron", 
      description: "Expert ironing for crisp, wrinkle-free clothes", 
      price: 79,
      category: "daily" 
    },
    { 
      id: "express-service", 
      name: "Express Service", 
      icon: "fas fa-bolt", 
      description: "Quick turn around within 6 hours",
      price: 199,
      category: "quick"
    },
    { 
      id: "premium-suit", 
      name: "Premium Suit Cleaning", 
      icon: "fas fa-user-tie", 
      description: "Expert care for high-end suits",
      price: 399,
      category: "premium"
    },
    { 
      id: "premium-laundry", 
      name: "Premium Laundry", 
      icon: "fas fa-star", 
      description: "Luxury care for your finest garments",
      price: 299,
      category: "premium"
    },
    { 
      id: "leather-care", 
      name: "Leather Care", 
      icon: "fas fa-mitten", 
      description: "Specialized cleaning for leather items",
      price: 349,
      category: "premium" 
    },
    { 
      id: "carpet-cleaning", 
      name: "Carpet Cleaning", 
      icon: "fas fa-broom", 
      description: "Deep cleaning for all types of carpets",
      price: 499,
      category: "home"
    },
    { 
      id: "curtain-clean", 
      name: "Curtain Cleaning", 
      icon: "fas fa-window-maximize", 
      description: "Thorough cleaning for curtains of all sizes",
      price: 349,
      category: "home"
    },
    { 
      id: "bedding-clean", 
      name: "Bedding Cleaning", 
      icon: "fas fa-bed", 
      description: "Fresh and clean bedding, including duvets",
      price: 299,
      category: "home"
    },
    { 
      id: "home-cleaning", 
      name: "Home Cleaning", 
      icon: "fas fa-home", 
      description: "Complete cleaning solution for your home",
      price: 799,
      category: "home"
    },
    { 
      id: "sofa-cleaning", 
      name: "Sofa Cleaning", 
      icon: "fas fa-couch", 
      description: "Professional cleaning for all types of sofas",
      price: 599,
      category: "home"
    },
    { 
      id: "stain-removal", 
      name: "Stain Removal", 
      icon: "fas fa-eye-dropper", 
      description: "Expert stain removal from all fabrics",
      price: 199,
      category: "daily"
    },
    { 
      id: "steam-press", 
      name: "Steam Pressing", 
      icon: "fas fa-temperature-high", 
      description: "Professional steam pressing for perfect finish",
      price: 249,
      category: "premium"
    }
  ];
  
  useEffect(() => {
    // Get query from URL params
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('q') || "";
    setSearchQuery(query);
    
    // Initialize services
    const serviceList = services && services.length > 0 ? services : defaultServices;
    setAllServices(serviceList);
    
    // Perform search when query or services change
    if (query) {
      performSearch(query, serviceList);
    } else {
      setSearchResults([]);
      setCategoryResults({});
      setSuggestedQueries(generateSuggestedQueries("", serviceList));
    }
    
    setIsLoading(false);
  }, [location.search, services]);
  
  // Generate suggested search queries based on the current search term
  const generateSuggestedQueries = (query, serviceList) => {
    // If no query, return popular searches
    if (!query.trim()) {
      return ["dry cleaning", "premium services", "home cleaning", "express service", "daily wear"];
    }
    
    const lowerQuery = query.toLowerCase().trim();
    
    // Find matching service names and categories
    const serviceMatches = serviceList.filter(service => 
      service.name.toLowerCase().includes(lowerQuery) || 
      service.description.toLowerCase().includes(lowerQuery)
    ).map(service => service.name);
    
    // Find matching common search terms
    const termMatches = commonSearchTerms.filter(term => 
      term.toLowerCase().includes(lowerQuery)
    );
    
    // Combine unique matches
    const allSuggestions = [...new Set([...serviceMatches, ...termMatches])];
    
    // Sort by relevance (starting with the query is more relevant)
    allSuggestions.sort((a, b) => {
      const aStarts = a.toLowerCase().startsWith(lowerQuery);
      const bStarts = b.toLowerCase().startsWith(lowerQuery);
      
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.localeCompare(b);
    });
    
    // Return top 5 suggestions
    return allSuggestions.slice(0, 5);
  };
  
  // Perform fuzzy search on services
  const performSearch = (query, serviceList) => {
    const lowerQuery = query.toLowerCase().trim();
    
    // Split query into words for better matching
    const queryWords = lowerQuery.split(/\s+/);
    
    // Calculate relevance score for each service
    const scoredResults = serviceList.map(service => {
      let score = 0;
      const lowerName = service.name.toLowerCase();
      const lowerDescription = service.description.toLowerCase();
      
      // Score based on name match
      if (lowerName === lowerQuery) {
        score += 100; // Exact name match
      } else if (lowerName.startsWith(lowerQuery)) {
        score += 80; // Name starts with query
      } else if (lowerName.includes(lowerQuery)) {
        score += 60; // Name contains query
      }
      
      // Score based on word matches in name and description
      queryWords.forEach(word => {
        if (word.length > 2) { // Only consider words longer than 2 characters
          if (lowerName.includes(word)) {
            score += 15;
          }
          if (lowerDescription.includes(word)) {
            score += 10;
          }
        }
      });
      
      // Score based on category match
      const category = categories.find(cat => cat.id === service.category);
      if (category && category.name.toLowerCase().includes(lowerQuery)) {
        score += 30;
      }
      
      return { ...service, score };
    });
    
    // Filter services with a score > 0 and sort by score
    const filteredResults = scoredResults
      .filter(service => service.score > 0)
      .sort((a, b) => b.score - a.score);
    
    setSearchResults(filteredResults);
    
    // Group results by category
    const resultsByCategory = {};
    filteredResults.forEach(service => {
      if (!resultsByCategory[service.category]) {
        resultsByCategory[service.category] = [];
      }
      resultsByCategory[service.category].push(service);
    });
    
    setCategoryResults(resultsByCategory);
    
    // Generate suggested queries
    setSuggestedQueries(generateSuggestedQueries(query, serviceList));
  };
  
  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      performSearch(searchQuery, allServices);
    }
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    performSearch(suggestion, allServices);
  };
  
  // Handle service click
  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };
  
  // Handle back button
  const handleBack = () => {
    navigate('/');
  };
  
  // Get category details
  const getCategoryDetails = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || 
      { name: "Other Services", icon: "fas fa-tag", color: "#666" };
  };

  return (
    <div className="container-fluid p-0 pb-5" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Header with back button and search */}
      <div className="shadow-sm" style={{ 
        background: "white",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div className="d-flex align-items-center px-3 py-3">
          <button 
            className="btn btn-sm" 
            onClick={handleBack}
            style={{ background: "none", border: "none" }}
          >
            <i className="fas fa-arrow-left" style={{ color: "#333" }}></i>
          </button>
          <div className="flex-grow-1 ms-2">
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ 
                    padding: "10px 15px",
                    borderRadius: "8px 0 0 8px",
                    border: "1px solid #ddd"
                  }}
                  autoFocus
                />
                <button
                  className="btn"
                  type="submit"
                  style={{ 
                    backgroundColor: "#40BFC1",
                    color: "white",
                    borderColor: "#40BFC1",
                    borderRadius: "0 8px 8px 0"
                  }}
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Search suggestions */}
        {suggestedQueries.length > 0 && (
          <div className="px-3 pb-2">
            <div className="d-flex flex-wrap">
              {suggestedQueries.map((suggestion, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-pill py-1 px-3 me-2 mb-2 shadow-sm"
                  style={{ 
                    border: "1px solid #eee", 
                    fontSize: "0.85rem",
                    cursor: "pointer"
                  }}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <i className="fas fa-search me-1" style={{ fontSize: "0.7rem", color: "#999" }}></i>
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Search results */}
      <div className="p-3">
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status" style={{ color: "#40BFC1" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2" style={{ color: "#666" }}>Searching...</p>
          </div>
        ) : (
          <>
            {/* Search stats */}
            <div className="mb-3">
              {searchQuery && (
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  {searchResults.length} results for "{searchQuery}"
                </p>
              )}
            </div>
            
            {/* No results */}
            {searchQuery && searchResults.length === 0 && (
              <div className="text-center py-4">
                <div style={{ 
                  width: "80px", 
                  height: "80px", 
                  borderRadius: "50%", 
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px"
                }}>
                  <i className="fas fa-search" style={{ fontSize: "2rem", color: "#aaa" }}></i>
                </div>
                <h5 className="fw-bold">No results found</h5>
                <p className="text-muted mb-3">We couldn't find any services matching "{searchQuery}"</p>
                <div className="mb-4">
                  <h6 className="fw-bold mb-2">Suggestions:</h6>
                  <ul className="text-start" style={{ maxWidth: "250px", margin: "0 auto" }}>
                    <li>Check the spelling of your search term</li>
                    <li>Try using more general keywords</li>
                    <li>Browse services by category</li>
                  </ul>
                </div>
                <button 
                  className="btn"
                  onClick={() => navigate('/services')}
                  style={{ 
                    backgroundColor: "#40BFC1",
                    color: "white",
                    borderRadius: "30px",
                    padding: "8px 25px",
                    fontWeight: "600"
                  }}
                >
                  Browse All Services
                </button>
              </div>
            )}
            
            {/* Results by category */}
            {Object.keys(categoryResults).map(categoryId => (
              <div key={categoryId} className="mb-4">
                <div className="d-flex align-items-center mb-2">
                  <div style={{ 
                    width: "30px", 
                    height: "30px",
                    backgroundColor: `${getCategoryDetails(categoryId).color}15`,
                    color: getCategoryDetails(categoryId).color,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "10px"
                  }}>
                    <i className={getCategoryDetails(categoryId).icon}></i>
                  </div>
                  <h5 className="fw-bold mb-0 d-flex align-items-center">
                    {getCategoryDetails(categoryId).name}
                    <span className="ms-2 badge rounded-pill bg-light text-dark" style={{ fontSize: "0.7rem" }}>
                      {categoryResults[categoryId].length}
                    </span>
                  </h5>
                </div>
                
                <div className="row g-3">
                  {categoryResults[categoryId].map(service => (
                    <div key={service.id} className="col-12">
                      <div 
                        className="card border-0 shadow-sm" 
                        onClick={() => handleServiceClick(service.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col-3 text-center">
                              <div style={{
                                width: "60px",
                                height: "60px",
                                backgroundColor: `${getCategoryDetails(categoryId).color}15`,
                                color: getCategoryDetails(categoryId).color,
                                borderRadius: "12px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto"
                              }}>
                                <i className={service.icon} style={{ fontSize: "1.5rem" }}></i>
                              </div>
                            </div>
                            <div className="col-6">
                              <h6 className="fw-bold mb-1">{service.name}</h6>
                              <p className="small text-muted mb-0">{service.description}</p>
                              <div className="mt-1">
                                <span className="badge bg-light text-dark me-2">
                                  <i className="fas fa-tag me-1" style={{ color: "#40BFC1" }}></i>
                                  From ₹{service.price}
                                </span>
                              </div>
                            </div>
                            <div className="col-3 text-end">
                              <button 
                                className="btn btn-sm" 
                                style={{ 
                                  backgroundColor: "#40BFC1",
                                  color: "white",
                                  borderRadius: "20px",
                                  padding: "5px 15px"
                                }}
                              >
                                Book
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button 
                  className="btn btn-light btn-sm w-100 mt-2"
                  onClick={() => navigate(`/category/${categoryId}`)}
                  style={{
                    borderRadius: "8px",
                    padding: "8px",
                    border: "1px solid #eee",
                    fontSize: "0.9rem"
                  }}
                >
                  See all {getCategoryDetails(categoryId).name}
                  <i className="fas fa-chevron-right ms-1" style={{ fontSize: "0.7rem" }}></i>
                </button>
              </div>
            ))}
            
            {/* Popular searches if no query */}
            {!searchQuery && (
              <div className="mb-4">
                <h5 className="fw-bold mb-3">Popular Searches</h5>
                <div className="row g-3">
                  {["Dry Cleaning", "Laundry", "Home Cleaning", "Premium Services", "Express Service", "Stain Removal"].map((term, index) => (
                    <div key={index} className="col-6">
                      <div 
                        className="card border-0 shadow-sm" 
                        onClick={() => handleSuggestionClick(term)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="card-body py-3">
                          <div className="d-flex align-items-center">
                            <i className="fas fa-search me-2" style={{ color: "#40BFC1" }}></i>
                            <span>{term}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Browse by category */}
            <div className="mb-4">
              <h5 className="fw-bold mb-3">Browse by Category</h5>
              <div className="row g-3">
                {categories.map((category, index) => (
                  <div key={index} className="col-6">
                    <div 
                      className="card border-0 shadow-sm" 
                      onClick={() => navigate(`/category/${category.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card-body py-3">
                        <div className="d-flex align-items-center">
                          <div style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "12px",
                            backgroundColor: `${category.color}15`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "12px",
                            color: category.color
                          }}>
                            <i className={category.icon} style={{ fontSize: "1.2rem" }}></i>
                          </div>
                          <span className="fw-semibold">{category.name}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Bottom padding for mobile */}
      <div style={{ height: "80px" }}></div>
    </div>
  );
};

export default SearchPage; 