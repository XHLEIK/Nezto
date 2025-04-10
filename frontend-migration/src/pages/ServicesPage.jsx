import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useUser } from "../UserContext";
import "../styles/ServicesPage.css";

const ServicesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { services } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredServices, setFilteredServices] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Categories with brand colors and icons
  const categories = [
    { id: "all", name: "All Services", icon: "fas fa-th", color: "#40BFC1" },
    { id: "daily", name: "Daily Wear", icon: "fas fa-tshirt", color: "#FF9800" },
    { id: "premium", name: "Premium", icon: "fas fa-crown", color: "#8E44AD" },
    { id: "home", name: "Home Care", icon: "fas fa-home", color: "#4CAF50" },
    { id: "quick", name: "Quick Service", icon: "fas fa-bolt", color: "#F44336" }
  ];

  // All 19 services with detailed information
  const allServices = [
    {
      id: "dry-clean",
      name: "Dry Cleaning",
      description: "Professional eco-friendly cleaning for delicate fabrics",
      price: 15.99,
      category: "premium",
      icon: "fas fa-tshirt",
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Regular", "Express", "Premium"]
    },
    {
      id: "laundry-wash",
      name: "Laundry Wash",
      description: "Wash, dry, and fold service for everyday clothes",
      price: 12.99,
      category: "daily",
      icon: "fas fa-soap",
      rating: 4.7,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Regular", "Express"]
    },
    {
      id: "ironing",
      name: "Ironing",
      description: "Professional ironing service for crisp clothes",
      price: 8.99,
      category: "daily",
      icon: "fas fa-temperature-high",
      rating: 4.6,
      reviews: 87,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Regular", "Express"]
    },
    {
      id: "shoe-cleaning",
      name: "Shoe Cleaning",
      description: "Professional shoe cleaning and care",
      price: 14.99,
      category: "quick",
      icon: "fas fa-shoe-prints",
      rating: 4.9,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Basic", "Premium"]
    },
    {
      id: "carpet-cleaning",
      name: "Carpet Cleaning",
      description: "Deep cleaning for carpets and rugs",
      price: 29.99,
      category: "home",
      icon: "fas fa-broom",
      rating: 4.7,
      reviews: 42,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Standard", "Deep Clean"]
    },
    {
      id: "stain-removal",
      name: "Stain Removal",
      description: "Specialized stain treatment for all fabrics",
      price: 10.99,
      category: "quick",
      icon: "fas fa-eraser",
      rating: 4.8,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Basic", "Advanced"]
    },
    {
      id: "premium-laundry",
      name: "Premium Laundry",
      description: "Premium detergents and fabric care",
      price: 18.99,
      category: "premium",
      icon: "fas fa-gem",
      rating: 4.9,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Premium", "Luxury"]
    },
    {
      id: "curtain-clean",
      name: "Curtain Cleaning",
      description: "Deep cleaning for all types of curtains",
      price: 24.99,
      category: "home",
      icon: "fas fa-wave-square",
      rating: 4.7,
      reviews: 34,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Standard", "Premium"]
    },
    {
      id: "suit-clean",
      name: "Suit Cleaning",
      description: "Professional cleaning for suits and formal wear",
      price: 22.99,
      category: "premium",
      icon: "fas fa-user-tie",
      rating: 4.8,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Standard", "Express"]
    },
    {
      id: "steam-press",
      name: "Steam Press",
      description: "Professional steam pressing for wrinkle-free clothes",
      price: 9.99,
      category: "quick",
      icon: "fas fa-temperature-high",
      rating: 4.6,
      reviews: 78,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Regular", "Express"]
    },
    {
      id: "bedding-clean",
      name: "Bedding Cleaning",
      description: "Deep cleaning for quilts and comforters",
      price: 27.99,
      category: "home",
      icon: "fas fa-bed",
      rating: 4.7,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Standard", "Premium"]
    },
    {
      id: "leather-care",
      name: "Leather Care",
      description: "Specialized cleaning for leather items",
      price: 35.99,
      category: "premium",
      icon: "fas fa-mitten",
      rating: 4.9,
      reviews: 32,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Basic", "Premium"]
    },
    {
      id: "wash-and-fold",
      name: "Wash & Fold",
      description: "Complete wash, dry, and fold service",
      price: 13.99,
      category: "daily",
      icon: "fas fa-tshirt",
      rating: 4.7,
      reviews: 112,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Regular", "Express"]
    },
    {
      id: "premium-suit-clean",
      name: "Premium Suit Cleaning",
      description: "Luxury cleaning for premium suits",
      price: 29.99,
      category: "premium",
      icon: "fas fa-user-tie",
      rating: 4.9,
      reviews: 28,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Premium", "Luxury"]
    },
    {
      id: "curtain-wash-iron",
      name: "Curtain Wash & Iron",
      description: "Complete cleaning and ironing for curtains",
      price: 32.99,
      category: "home",
      icon: "fas fa-wave-square",
      rating: 4.8,
      reviews: 19,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Standard", "Premium"]
    },
    {
      id: "home-cleaning",
      name: "Home Cleaning",
      description: "Complete home cleaning service",
      price: 49.99,
      category: "home",
      icon: "fas fa-home",
      rating: 4.7,
      reviews: 87,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Basic", "Deep Clean"]
    },
    {
      id: "sofa-cleaning",
      name: "Sofa Cleaning",
      description: "Professional cleaning for sofas and upholstery",
      price: 39.99,
      category: "home",
      icon: "fas fa-couch",
      rating: 4.8,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Standard", "Deep Clean"]
    },
    {
      id: "express-service",
      name: "Express Service",
      description: "Same-day delivery for urgent cleaning needs",
      price: 19.99,
      category: "quick",
      icon: "fas fa-bolt",
      rating: 4.6,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["4-hour", "6-hour"]
    },
    {
      id: "seasonal-cleaning",
      name: "Seasonal Cleaning",
      description: "Special cleaning for seasonal items",
      price: 25.99,
      category: "home",
      icon: "fas fa-snowflake",
      rating: 4.7,
      reviews: 23,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      options: ["Winter", "Summer"]
    }
  ];

  // Filter services based on search query and active category
  useEffect(() => {
    let filtered = allServices;
    
    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(service => service.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(query) || 
        service.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredServices(filtered);
  }, [searchQuery, activeCategory]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  // Handle service click
  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  // Get category color
  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : "#40BFC1";
  };

  // Format price
  const formatPrice = (price) => {
    return `₹${price.toFixed(2)}`;
  };

  // Get rating color
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "#4CAF50";
    if (rating >= 4.0) return "#FF9800";
    return "#F44336";
  };

  return (
    <div className="services-page">
      {/* Header */}
      <div className="services-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1>Services</h1>
        </div>
        
        {/* Search Bar - Updated to match HomePage design */}
        <div className="px-3 pt-2 pb-3">
          <form onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim()) {
              navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            }
          }}>
            <div className="input-group" style={{ 
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "10px"
            }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search for laundry, dry cleaning, ironing..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  padding: "15px 20px",
                  border: "none",
                  fontSize: "1rem"
                }}
              />
              <button
                className="btn"
                type="submit"
                style={{ 
                  backgroundColor: "#40BFC1",
                  color: "white",
                  borderColor: "#40BFC1",
                  width: "50px"
                }}
              >
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Categories */}
      <div className="categories-container">
        <div className="categories-scroll">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
              style={{
                '--category-color': category.color,
                borderColor: activeCategory === category.id ? category.color : 'transparent'
              }}
            >
              <div 
                className="category-icon"
                style={{ backgroundColor: `${category.color}15` }}
              >
                <i className={category.icon} style={{ color: category.color }}></i>
              </div>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Services Grid */}
      <div className="services-container">
        {filteredServices.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">
              <i className="fas fa-search"></i>
            </div>
            <h3>No services found</h3>
            <p>Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="services-grid">
            {filteredServices.map((service) => (
              <div 
                key={service.id} 
                className="service-card"
                onClick={() => handleServiceClick(service.id)}
              >
                <div className="service-image">
                  <img 
                    src={service.image || "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"} 
                    alt={service.name} 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
                    }}
                  />
                  <div className="service-category" style={{ backgroundColor: getCategoryColor(service.category) }}>
                    {categories.find(cat => cat.id === service.category)?.name}
                  </div>
                </div>
                <div className="service-content">
                  <div className="service-header">
                    <h3>{service.name}</h3>
                    <div className="service-rating" style={{ color: getRatingColor(service.rating) }}>
                      <i className="fas fa-star"></i>
                      <span>{service.rating}</span>
                      <span className="review-count">({service.reviews})</span>
                    </div>
                  </div>
                  <p className="service-description">{service.description}</p>
                  <div className="service-footer">
                    <div className="service-price">{formatPrice(service.price)}</div>
                    <div className="service-options">
                      {service.options.map((option, index) => (
                        <span key={index} className="service-option">{option}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage; 