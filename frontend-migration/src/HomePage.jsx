import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Container } from "react-bootstrap";
import ActiveOrderTracker from "./components/ActiveOrderTracker";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { services, userData } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTracker, setShowTracker] = useState(false);
  
  // Default featured services
  const defaultServices = [
    { id: "dry-clean", name: "Dry Cleaning", icon: "fas fa-tshirt" },
    { id: "laundry", name: "Laundry", icon: "fas fa-soap" },
    { id: "ironing", name: "Ironing", icon: "fas fa-iron" },
    { id: "express-service", name: "Express Service", icon: "fas fa-bolt" }
  ];
  
  // Get featured services (first 4)
  const [featuredServices, setFeaturedServices] = useState(defaultServices);
  
  // Service categories
  const categories = [
    { id: "daily", name: "Daily Wear", icon: "fas fa-tshirt", color: "#FF5A5F" },
    { id: "premium", name: "Premium", icon: "fas fa-crown", color: "#FFB100" },
    { id: "home", name: "Home Care", icon: "fas fa-home", color: "#00C2B8" },
    { id: "quick", name: "Quick Service", icon: "fas fa-bolt", color: "#7662E4" }
  ];
  
  // Premium services
  const premiumServices = [
    { id: "premium-suit", name: "Premium Suit Cleaning", icon: "fas fa-user-tie", description: "Expert care for high-end suits", price: 399, rating: 4.8, time: "3-4 days" },
    { id: "premium-laundry", name: "Premium Laundry", icon: "fas fa-star", description: "Luxury care for your finest garments", price: 199, rating: 4.7, time: "2-3 days" },
    { id: "leather-care", name: "Leather Care", icon: "fas fa-mitten", description: "Specialized cleaning for leather items", price: 299, rating: 4.9, time: "4-5 days" },
    { id: "designer-wear", name: "Designer Wear Care", icon: "fas fa-tshirt", description: "Expert care for luxury designer clothing", price: 499, rating: 4.9, time: "3-4 days" }
  ];
  
  // Sample Offers Data
  const offers = [
    {
      code: "WELCOME50",
      discount: "50% OFF",
      description: "Get 50% off on your first order",
      validUntil: "31 Dec",
      category: "New User"
    },
    {
      code: "PREMIUM25",
      discount: "25% OFF",
      description: "Premium services special discount",
      validUntil: "15 Nov",
      category: "Premium"
    },
    {
      code: "WEEKEND15",
      discount: "15% OFF",
      description: "Weekend special for all services",
      validUntil: "Weekends",
      category: "Weekend"
    },
    {
      code: "CLEAN10",
      discount: "10% OFF",
      description: "Special discount on all cleaning services",
      validUntil: "30 Nov",
      category: "Cleaning"
    }
  ];
  
  // Customer Testimonials
  const testimonials = [
    { name: "Rahul M.", rating: 5, comment: "Outstanding service! Delivery was on time and my clothes have never looked better.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Priya S.", rating: 5, comment: "The premium suit cleaning is worth every penny. Exceptional quality and attention to detail.", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Amit K.", rating: 4, comment: "Fast delivery and professional service. The app made tracking my order super easy.", avatar: "https://randomuser.me/api/portraits/men/68.jpg" }
  ];
  
  useEffect(() => {
    try {
      if (services && services.length > 0) {
        setFeaturedServices(services.slice(0, 4));
      } else {
        setFeaturedServices(defaultServices);
      }
    } catch (error) {
      console.error("Error setting services:", error);
      setFeaturedServices(defaultServices);
    } finally {
      setIsLoading(false);
    }
  }, [services]);
  
  useEffect(() => {
    // Check if we have an active booking in localStorage or if we're returning from pickup confirmation
    const hasActiveBookingInStorage = localStorage.getItem('nezto_active_booking') !== null;
    
    if (location.state && location.state.showTrackingPopup) {
      console.log("HomePage: Detected showTrackingPopup state, expanding tracker");
      setShowTracker(true);
      // Clear the state to prevent showing on refresh
      window.history.replaceState({}, document.title);
    } else if (hasActiveBookingInStorage) {
      console.log("HomePage: Found active booking in localStorage, showing tracker");
      setShowTracker(true);
    }
  }, [location.state]);
  
  // Log when ActiveOrderTracker is rendered
  useEffect(() => {
    if (showTracker) {
      console.log("HomePage: Tracker should be expanded:", showTracker);
    }
  }, [showTracker]);
  
  // Handle service click
  const handleServiceClick = (serviceId) => {
    if (serviceId === "wash-fold") {
      navigate('/service/express-service');
    } else {
      navigate(`/service/${serviceId}`);
    }
  };
  
  // View all services
  const viewAllServices = () => {
    navigate('/services');
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle location click
  const handleLocationClick = () => {
    navigate('/location');
  };

  // Section Title Component
  const SectionTitle = ({ title, subtitle, viewAll, link, onClick }) => (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h2 style={{ 
          fontWeight: "700", 
          color: "#333", 
          fontSize: "1.5rem",
          marginBottom: "0.2rem"
        }}>
          {title}
        </h2>
        {subtitle && <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>{subtitle}</p>}
      </div>
      {viewAll && (
        <button 
          className="btn" 
          style={{ 
            color: "white", 
            fontWeight: "600", 
            fontSize: "0.8rem",
            backgroundColor: "#40BFC1",
            borderRadius: "20px",
            padding: "6px 12px",
            display: "flex",
            alignItems: "center",
            boxShadow: "0 2px 6px rgba(64, 191, 193, 0.2)",
            border: "none",
            transition: "all 0.2s ease"
          }}
          onClick={onClick}
        >
          View All <i className="fas fa-chevron-right ms-1" style={{ fontSize: "0.7rem" }}></i>
        </button>
      )}
    </div>
  );

  // Review Slider Component
  const ReviewSlider = ({ reviews }) => {
    return (
      <div className="mb-4" style={{ overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "none", msOverflowStyle: "none" }}>
        <div style={{ display: "inline-flex", gap: "12px", paddingBottom: "10px" }}>
          {reviews.map((review, index) => (
            <div
              key={index}
              style={{
                minWidth: "260px",
                backgroundColor: "white", 
                borderRadius: "12px",
                padding: "15px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
              }}
            >
              <div className="d-flex align-items-start mb-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "12px",
                    objectFit: "cover"
                  }}
                />
                <div>
                  <h6 style={{ margin: 0, fontWeight: "600" }}>{review.name}</h6>
                  <div className="d-flex align-items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star me-1 ${i < review.rating ? 'text-warning' : 'text-muted'}`}
                        style={{ fontSize: "0.8rem" }}
                      ></i>
                    ))}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "0.85rem", margin: 0, whiteSpace: "normal", color: "#666" }}>
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Offer Card Component
  const OfferCard = ({ code, discount, description, validUntil, category }) => {
  return (
      <div 
        className="position-relative mx-1" 
        style={{
          minWidth: "260px",
          backgroundColor: "white", 
          borderRadius: "12px",
          padding: "15px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
        }}
      >
        {category && (
          <span 
            className="badge rounded-pill position-absolute top-0 end-0 mt-2 me-2" 
            style={{ backgroundColor: "#8854C0" }}
          >
            {category}
          </span>
        )}
        <div className="mb-2">
          <h5 className="mb-1" style={{ color: "#8854C0", fontWeight: "bold" }}>{discount}</h5>
          <p className="mb-1 small text-muted">{description}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div 
            className="code-badge px-2 py-1 rounded d-inline-flex align-items-center" 
            style={{ backgroundColor: "#f0e6ff", cursor: "pointer" }}
            onClick={() => {
              navigator.clipboard.writeText(code);
              alert(`Coupon code ${code} copied to clipboard!`);
            }}
          >
            <span style={{ fontWeight: "500", color: "#8854C0" }}>{code}</span>
            <i className="fas fa-copy ms-2" style={{ color: "#8854C0", fontSize: "0.8rem" }}></i>
          </div>
          {validUntil && (
            <small className="text-muted">Valid till {validUntil}</small>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid p-0" style={{ 
      backgroundColor: "#f8f9fa",
      overflowX: "hidden",
      position: "relative",
      minHeight: "100vh" 
    }}>
      {/* Location Section - Added above Search */}
      <div className="px-3 pt-3 pb-1">
        <div 
          onClick={handleLocationClick}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            cursor: "pointer",
            padding: "5px 0",
            opacity: 0.8,
            transition: "opacity 0.2s ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = "1"}
          onMouseOut={(e) => e.currentTarget.style.opacity = "0.8"}
        >
          <i className="fas fa-map-marker-alt" style={{ color: "#40BFC1", marginRight: "8px", fontSize: "0.9rem" }}></i>
          <span style={{ 
            fontSize: "0.85rem", 
            color: "#666",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "calc(100% - 30px)"
          }}>
            {userData?.location?.address || "Set your location"}
          </span>
          <i className="fas fa-chevron-right" style={{ fontSize: "0.7rem", color: "#999", marginLeft: "5px" }}></i>
        </div>
      </div>
      
      {/* Search Section - Moved above About Us */}
      <div className="px-3 pt-2 pb-3">
        <form onSubmit={handleSearch}>
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
      
      {/* Categories Section - Moved above Banner */}
      <div className="px-3 pt-3">
        <SectionTitle title="Categories" />
        
        <div className="row g-3 mb-4">
          {categories.map((category, index) => (
            <div key={index} className="col-3 text-center">
              <div
                style={{
                  cursor: "pointer",
                  transition: "transform 0.2s"
                }}
                onClick={() => {
                  // Map category IDs to category pages
                  const categoryRoutes = {
                    "daily": "/category/daily-wear",
                    "premium": "/category/premium",
                    "home": "/category/home-care",
                    "quick": "/category/quick",
                    // Fallback for any undefined categories
                    "default": `/services?category=${category.id}`
                  };
                  
                  // Navigate to the specific category page or use fallback
                  navigate(categoryRoutes[category.id] || categoryRoutes.default);
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "12px",
                    backgroundColor: `${category.color}15`, // 15% opacity
                display: "flex",
                alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 8px",
                    color: category.color
                  }}
                >
                  <i className={category.icon} style={{ fontSize: "1.5rem" }}></i>
                </div>
                <p
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    margin: 0,
                    color: "#333"
                  }}
                >
                  {category.name}
                </p>
              </div>
            </div>
          ))}
          </div>
      </div>
      
      {/* Banner Section */}
      <div className="px-3 pt-2">
        <div
          style={{
            background: "linear-gradient(135deg, #40BFC1 0%, #32a8aa 100%)",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            position: "relative",
            height: "240px"
          }}
        >
          <div className="p-4 text-white" style={{ maxWidth: "60%" }}>
            <h2 
              style={{ 
                fontWeight: "800",
                marginBottom: "12px",
                fontSize: "1.8rem",
                lineHeight: "1.2"
              }}
            >
              50% OFF <br />First Order
            </h2>
            <p style={{ fontSize: "0.9rem", marginBottom: "15px" }}>Use code: FIRST50</p>
        <button 
          className="btn" 
          style={{ 
                backgroundColor: "white",
                color: "#32a8aa",
            fontWeight: "600",
                padding: "8px 15px",
                fontSize: "0.9rem",
                borderRadius: "8px"
              }}
              onClick={() => handleServiceClick("wash-fold")}
            >
              Order Now
        </button>
          </div>
          <div
            style={{
              position: "absolute",
              right: "-20px",
              bottom: "-20px",
              fontSize: "10rem",
              opacity: "0.1",
              color: "white"
            }}
          >
            <i className="fas fa-tshirt"></i>
          </div>
        </div>
      </div>
      
      {/* Top Offers */}
      <Container fluid className="px-0 py-3">
        <SectionTitle title="Top Offers" link="/offers" viewAll={true} onClick={() => navigate('/offers')} />
        <div className="offer-cards d-flex flex-nowrap overflow-auto pb-2">
          {offers.map((offer, index) => (
            <OfferCard key={index} {...offer} />
          ))}
        </div>
      </Container>
      
      {/* Recommended Services */}
      <div className="px-3 pt-2">
        <SectionTitle title="Recommended" viewAll={true} onClick={() => navigate('/services')} />
        
        <div className="mb-4" style={{ overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div style={{ display: "inline-flex", gap: "12px", paddingBottom: "10px" }}>
            {featuredServices.map((service, index) => (
              <div
                key={index}
                style={{
                  minWidth: "220px",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                  cursor: "pointer"
                }}
                onClick={() => handleServiceClick(service.id)}
              >
                <div
                  style={{
                    height: "100px",
                    background: "linear-gradient(135deg, #40BFC1 0%, #32a8aa 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative"
                  }}
                >
                  <i className={service.icon} style={{ fontSize: "2.5rem", color: "white" }}></i>
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "rgba(0,0,0,0.2)",
                      color: "white",
                      fontSize: "0.7rem",
                      fontWeight: "600",
                      padding: "3px 8px",
                      borderRadius: "12px"
                    }}
                  >
                    POPULAR
                  </div>
                </div>
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h6 style={{ margin: 0, fontWeight: "700" }}>{service.name}</h6>
                    <div
                      style={{
                        backgroundColor: "#e6f7f7",
                        color: "#40BFC1",
                        fontSize: "0.7rem",
                        fontWeight: "600",
                        padding: "2px 8px",
                        borderRadius: "12px"
                      }}
                    >
                      4.7 <i className="fas fa-star" style={{ fontSize: "0.6rem" }}></i>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "#666" }}>
                    <span style={{ fontWeight: "600", color: "#333" }}>₹{Math.floor(Math.random() * 300) + 100}</span> onwards
                  </p>
                  <div className="d-flex align-items-center mt-2" style={{ fontSize: "0.75rem", color: "#666" }}>
                    <i className="fas fa-clock me-1"></i> 24-48 hrs
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Premium Services */}
      <div className="px-3 pt-2">
        <SectionTitle title="Premium Services" viewAll={true} link="/category/premium" onClick={() => navigate('/category/premium')} />
        
        <div className="mb-4" style={{ overflowX: "auto", whiteSpace: "nowrap", scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <div style={{ display: "inline-flex", gap: "12px", paddingBottom: "10px" }}>
            {premiumServices.map((service, index) => (
              <div
                key={index}
                style={{
                  minWidth: "220px",
                  backgroundColor: "white",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                  cursor: "pointer"
                }}
                onClick={() => handleServiceClick(service.id)}
              >
                <div
                  style={{
                    height: "100px",
                    background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative"
                  }}
                >
                  <i className={service.icon} style={{ fontSize: "2.5rem", color: "white" }}></i>
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "rgba(0,0,0,0.2)",
        color: "white",
                      fontSize: "0.7rem",
                      fontWeight: "600",
                      padding: "3px 8px",
                      borderRadius: "12px"
                    }}
                  >
                    PREMIUM
                  </div>
                </div>
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <h6 style={{ margin: 0, fontWeight: "700" }}>{service.name}</h6>
                    <div
                      style={{
                        backgroundColor: "#fff8e6",
                        color: "#FFA500",
                        fontSize: "0.7rem",
                        fontWeight: "600",
                        padding: "2px 8px",
                        borderRadius: "12px"
                      }}
                    >
                      {service.rating} <i className="fas fa-star" style={{ fontSize: "0.6rem" }}></i>
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "#666" }}>
                    <span style={{ fontWeight: "600", color: "#333" }}>₹{service.price}</span> onwards
                  </p>
                  <div className="d-flex align-items-center mt-2" style={{ fontSize: "0.75rem", color: "#666" }}>
                    <i className="fas fa-clock me-1"></i> {service.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* About Us Section with Sliders - Moved below Premium Services */}
      <div className="px-3 mb-4 pt-2">
        <SectionTitle title="About Us" subtitle="Transforming Your Cleaning Experience" />
        
        <div id="aboutUsCarousel" className="carousel slide" data-bs-ride="carousel" style={{
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
        }}>
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#aboutUsCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#aboutUsCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#aboutUsCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#aboutUsCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div style={{
                height: "240px",
                background: "linear-gradient(135deg, #40BFC1 0%, #2A8D8F 100%)",
                padding: "25px"
              }}>
                <div className="row h-100 align-items-center">
                  <div className="col-8 text-white">
                    <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>Unmatched Quality</h3>
                    <p>Expert care for perfect garments.</p>
                    <button className="btn btn-light btn-sm px-3 mt-2" 
                      style={{ fontWeight: "600", borderRadius: "8px" }}
                      onClick={viewAllServices}>
                      Transform Your Wardrobe
                    </button>
                  </div>
                  <div className="col-4 text-center">
                    <i className="fas fa-award" style={{ fontSize: "4rem", color: "rgba(255,255,255,0.3)" }}></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div style={{
                height: "240px",
                background: "linear-gradient(135deg, #FF5A5F 0%, #C23B40 100%)",
                padding: "25px"
              }}>
                <div className="row h-100 align-items-center">
                  <div className="col-8 text-white">
                    <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>Lightning Delivery</h3>
                    <p>24-hour service with live tracking.</p>
                    <button className="btn btn-light btn-sm px-3 mt-2" 
                      style={{ fontWeight: "600", borderRadius: "8px" }}
                      onClick={viewAllServices}>
                      Save Time Today
                    </button>
                  </div>
                  <div className="col-4 text-center">
                    <i className="fas fa-truck" style={{ fontSize: "4rem", color: "rgba(255,255,255,0.3)" }}></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div style={{
                height: "240px",
                background: "linear-gradient(135deg, #FFB100 0%, #E59B00 100%)",
                padding: "25px"
              }}>
                <div className="row h-100 align-items-center">
                  <div className="col-8 text-white">
                    <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>Risk-Free Guarantee</h3>
                    <p>100% satisfaction or money back.</p>
                    <button className="btn btn-light btn-sm px-3 mt-2" 
                      style={{ fontWeight: "600", borderRadius: "8px" }}
                      onClick={() => navigate('/testimonials')}>
                      See Why People Love Us
                    </button>
                  </div>
                  <div className="col-4 text-center">
                    <i className="fas fa-medal" style={{ fontSize: "4rem", color: "rgba(255,255,255,0.3)" }}></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div style={{
                height: "240px",
                background: "linear-gradient(135deg, #7662E4 0%, #5B4ABC 100%)",
                padding: "25px"
              }}>
                <div className="row h-100 align-items-center">
                  <div className="col-8 text-white">
                    <h3 style={{ fontWeight: "700", marginBottom: "10px" }}>Luxury Care</h3>
                    <p>Premium service for finest fabrics.</p>
                    <button className="btn btn-light btn-sm px-3 mt-2" 
                      style={{ fontWeight: "600", borderRadius: "8px" }}
                      onClick={() => navigate('/service/premium-suit')}>
                      Elevate Your Experience
                    </button>
                  </div>
                  <div className="col-4 text-center">
                    <i className="fas fa-gem" style={{ fontSize: "4rem", color: "rgba(255,255,255,0.3)" }}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#aboutUsCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#aboutUsCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="px-3 pt-3 mb-4">
        <SectionTitle title="How It Works" />
        
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
          }}
        >
          <div className="row g-4">
            {[
              { step: 1, title: "Schedule Pickup", icon: "fas fa-calendar-check", color: "#FF5A5F" },
              { step: 2, title: "We Clean", icon: "fas fa-tshirt", color: "#40BFC1" },
              { step: 3, title: "Get Delivery", icon: "fas fa-truck", color: "#00C2B8" }
            ].map((step, index) => (
              <div key={index} className="col-4 text-center">
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: `${step.color}15`, // 15% opacity
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px",
                    color: step.color,
                    position: "relative"
                  }}
                >
                  <i className={step.icon} style={{ fontSize: "1.2rem" }}></i>
                  <div
                    style={{
            position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: step.color,
                      color: "white",
                      fontSize: "0.7rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "600"
                    }}
                  >
                    {step.step}
                  </div>
                </div>
                <p style={{ fontSize: "0.8rem", fontWeight: "600", margin: 0 }}>{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Customer Reviews */}
      <Container fluid className="review-section mt-4 px-0">
        <SectionTitle title="Customer Reviews" link="/reviews" viewAll={true} onClick={() => navigate('/reviews')} />
        <div className="review-cards">
          <ReviewSlider reviews={testimonials} />
        </div>
      </Container>
      
      {/* App Download Banner - Moved here after Customer Reviews */}
      <div className="px-3 mb-4">
        <div
          style={{
            background: "linear-gradient(135deg, #7662E4 0%, #6356C0 100%)",
              borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            position: "relative",
            padding: "20px"
          }}
        >
          <div className="row align-items-center">
            <div className="col-8">
              <h3
                style={{
                  fontWeight: "700",
                  color: "white",
                  fontSize: "1.3rem",
                  marginBottom: "8px"
                }}
              >
                Download our app
              </h3>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", marginBottom: "15px" }}>
                Get exclusive offers and track your orders
              </p>
              <div className="d-flex">
                <button
                  className="btn me-2"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "0.8rem",
                    padding: "8px 10px"
                  }}
                >
                  <i className="fab fa-apple me-1"></i> App Store
                </button>
                <button
                  className="btn"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "0.8rem",
                    padding: "8px 10px"
                  }}
                >
                  <i className="fab fa-google-play me-1"></i> Google Play
                </button>
              </div>
            </div>
            <div className="col-4 text-end">
              <i className="fas fa-mobile-alt" style={{ fontSize: "3.5rem", color: "rgba(255,255,255,0.3)" }}></i>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Us Section - Final section */}
      <div className="px-3 mb-0 pb-0">
        <SectionTitle title="Contact Us" subtitle="We're here to help" />
        
        <div 
          className="bg-white rounded-3 p-4 shadow-sm"
          style={{
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
            marginBottom: "0"
          }}
        >
          <div className="row g-3">
            <div className="col-12">
              <div className="d-flex align-items-center mb-3">
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(64, 191, 193, 0.1)",
                  color: "#40BFC1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px"
                }}>
                  <i className="fas fa-headset"></i>
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">Customer Support</h6>
                  <p className="mb-0 small text-muted">24/7 dedicated team</p>
                </div>
              </div>
              
              <div className="row g-2 mb-3">
                <div className="col-6">
                  <a 
                    href="tel:+911234567890" 
                    className="d-flex align-items-center p-3 rounded-3"
                    style={{
                      backgroundColor: "rgba(64, 191, 193, 0.05)",
                      color: "#40BFC1",
                      textDecoration: "none",
                      transition: "all 0.2s"
                    }}
                  >
                    <i className="fas fa-phone-alt me-2"></i>
                    <span className="fw-semibold">Call Us</span>
                  </a>
                </div>
                <div className="col-6">
                  <a 
                    href="https://wa.me/911234567890"
                    className="d-flex align-items-center p-3 rounded-3"
                    style={{
                      backgroundColor: "rgba(37, 211, 102, 0.05)",
                      color: "#25D366",
                      textDecoration: "none",
                      transition: "all 0.2s"
                    }}
                  >
                    <i className="fab fa-whatsapp me-2"></i>
                    <span className="fw-semibold">WhatsApp</span>
                  </a>
                </div>
              </div>
              
              <div className="d-flex align-items-center mb-3">
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(64, 191, 193, 0.1)",
                  color: "#40BFC1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px"
                }}>
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">Email Us</h6>
                  <p className="mb-0 small text-muted">support@nezto.com</p>
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(64, 191, 193, 0.1)",
                  color: "#40BFC1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px"
                }}>
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">Visit Us</h6>
                  <p className="mb-0 small text-muted">123 Cleaning St, Laundry District</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Navigation */}
      <div
        style={{
          backgroundColor: "white",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          paddingTop: "10px",
          paddingBottom: "10px",
          height: "60px" // Set explicit height for footer
        }}
      >
        <div className="row g-0 text-center">
          {[
            { name: "Home", icon: "fas fa-home", active: true, path: "/" },
            { name: "Services", icon: "fas fa-list", active: false, path: "/services" },
            { name: "Orders", icon: "fas fa-shopping-bag", active: false, path: "/orders" },
            { name: "Account", icon: "fas fa-user", active: false, path: "/profile" }
          ].map((item, index) => (
            <div key={index} className="col">
              <div
                style={{ cursor: "pointer" }}
                onClick={() => navigate(item.path)}
              >
                <div
                  style={{
                    color: item.active ? "#40BFC1" : "#90a4ae",
                    fontSize: "1.2rem",
                    marginBottom: "4px"
                  }}
                >
                  <i className={item.icon}></i>
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: item.active ? "600" : "400",
                    color: item.active ? "#40BFC1" : "#90a4ae"
                  }}
                >
                  {item.name}
                </div>
            </div>
          </div>
        ))}
        </div>
      </div>
      
      {/* Active order tracking component */}
      <ActiveOrderTracker initiallyExpanded={showTracker} />
    </div>
  );
};

export default HomePage;
