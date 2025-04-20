import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

const PremiumCategory = () => {
  const navigate = useNavigate();
  const { services } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryServices, setCategoryServices] = useState([]);
  
  // Category details
  const categoryDetails = {
    id: "premium",
    name: "Premium Services",
    icon: "fas fa-crown",
    color: "#FFB100",
    description: "Exceptional care for your luxury and designer items.",
    longDescription: "Our Premium Services provide specialized care for your most valuable garments. Using state-of-the-art techniques and premium cleaning agents, we ensure your luxury items maintain their quality, texture, and appearance for years to come.",
    features: [
      "Specialized cleaning for designer wear",
      "Hand-finishing techniques",
      "Advanced stain treatment",
      "Garment preservation services",
      "Premium packaging & delivery"
    ]
  };
  
  // Premium services
  const premiumServiceIds = [
    'premium-suit',
    'premium-laundry',
    'leather-care',
    'curtain-clean',
    'steam-press'
  ];
  
  useEffect(() => {
    setIsLoading(true);
    try {
      if (services && services.length > 0) {
        // Filter services related to premium category
        const filtered = services.filter(service => premiumServiceIds.includes(service.id));
        setCategoryServices(filtered);
      }
    } catch (error) {
      console.error("Error filtering services:", error);
    } finally {
      setIsLoading(false);
    }
  }, [services]);
  
  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };
  
  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container-fluid p-0 pb-5" style={{ backgroundColor: "#fdfaf3" }}>
      {/* Header with back button - premium style */}
      <div className="d-flex align-items-center mb-0 px-3 py-3 shadow-sm" style={{ 
        background: "white",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <button 
          className="btn btn-sm" 
          onClick={handleBack}
          style={{ background: "none", border: "none" }}
        >
          <i className="fas fa-arrow-left" style={{ color: "#333" }}></i>
        </button>
        <h5 className="mb-0 ms-2 fw-bold" style={{ color: "#333" }}>{categoryDetails.name}</h5>
      </div>
      
      {/* Premium Category Banner */}
      <div className="position-relative pb-5">
        <div className="px-3 py-4 position-relative" style={{ 
          background: `linear-gradient(135deg, ${categoryDetails.color} 0%, ${adjustColor(categoryDetails.color, -30)} 100%)`,
          color: "white",
          borderRadius: "0 0 30% 30%/30px"
        }}>
          <div className="row align-items-center">
            <div className="col-8">
              <h1 className="fw-bold mb-2" style={{ fontSize: "1.8rem" }}>{categoryDetails.name}</h1>
              <p className="mb-3">{categoryDetails.description}</p>
              <div style={{
                display: "inline-block",
                background: "rgba(255, 255, 255, 0.2)",
                padding: "5px 15px",
                borderRadius: "20px",
                fontSize: "0.8rem"
              }}>
                <i className="fas fa-star me-1"></i>
                Highest quality guaranteed
              </div>
            </div>
            <div className="col-4 text-center">
              <div style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontSize: "2.5rem",
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
              }}>
                <i className={categoryDetails.icon}></i>
              </div>
            </div>
          </div>
        </div>
        
        {/* Premium Badge */}
        <div style={{
          position: "absolute",
          bottom: "-15px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "white",
          color: categoryDetails.color,
          borderRadius: "25px",
          padding: "8px 25px",
          fontWeight: "bold",
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          fontSize: "0.9rem",
          zIndex: 2,
          border: `2px solid ${categoryDetails.color}15`
        }}>
          <i className="fas fa-gem me-2"></i>
          PREMIUM QUALITY
        </div>
      </div>
      
      {/* Premium Experience */}
      <div className="px-3 py-4">
        <h5 className="fw-bold mb-3" style={{ color: "#333" }}>The Premium Experience</h5>
        <div className="bg-white rounded-3 shadow-sm p-3 mb-4">
          <p className="mb-3" style={{ color: "#555" }}>{categoryDetails.longDescription}</p>
          <div>
            {categoryDetails.features.map((feature, index) => (
              <div key={index} className="d-flex align-items-center mb-3">
                <div style={{ 
                  minWidth: "30px", 
                  height: "30px", 
                  backgroundColor: `${categoryDetails.color}15`,
                  color: categoryDetails.color,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "15px",
                  boxShadow: `0 3px 10px ${categoryDetails.color}20`
                }}>
                  <i className="fas fa-check" style={{ fontSize: "0.8rem" }}></i>
                </div>
                <span style={{ fontSize: "0.95rem", color: "#444" }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Premium Services */}
      <div className="px-3 pb-4">
        <h5 className="fw-bold mb-3" style={{ color: "#333" }}>Our Premium Services</h5>
        
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status" style={{ color: categoryDetails.color }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2" style={{ color: "#555" }}>Loading premium services...</p>
          </div>
        ) : (
          <div className="row g-3">
            {categoryServices.map((service) => (
              <div key={service.id} className="col-12">
                <div 
                  className="card border-0 shadow-sm" 
                  onClick={() => handleServiceClick(service.id)}
                  style={{ 
                    cursor: "pointer", 
                    overflow: "hidden",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    borderRadius: "12px",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.06)";
                  }}
                >
                  <div className="row g-0">
                    <div className="col-4">
                      <div style={{
                        height: "100%",
                        background: `linear-gradient(135deg, ${categoryDetails.color} 0%, ${adjustColor(categoryDetails.color, -20)} 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white"
                      }}>
                        <i className={service.icon} style={{ fontSize: "2rem" }}></i>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="fw-bold mb-1" style={{ color: "#333" }}>{service.name}</h6>
                            <p className="small text-muted mb-2">{service.description}</p>
                          </div>
                          <div 
                            style={{ 
                              backgroundColor: `${categoryDetails.color}15`,
                              color: categoryDetails.color,
                              fontSize: "0.7rem",
                              fontWeight: "600",
                              padding: "3px 8px",
                              borderRadius: "12px"
                            }}
                          >
                            PREMIUM
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mt-2">
                          <span className="fw-bold" style={{ color: categoryDetails.color }}>
                            From ₹{service.price}
                          </span>
                          <button 
                            className="btn btn-sm" 
                            style={{ 
                              backgroundColor: categoryDetails.color,
                              color: "white",
                              borderRadius: "20px",
                              padding: "5px 15px",
                              fontWeight: "600",
                              fontSize: "0.8rem"
                            }}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Premium Offer Banner */}
      <div className="px-3 mb-4">
        <div className="rounded-3 p-4" style={{
          background: "white",
          backgroundImage: `linear-gradient(135deg, ${categoryDetails.color}10 25%, white 25%)`,
          border: `1px solid ${categoryDetails.color}30`,
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
        }}>
          <div className="row align-items-center">
            <div className="col-3 text-center">
              <div style={{
                width: "65px",
                height: "65px",
                borderRadius: "50%",
                backgroundColor: categoryDetails.color,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontSize: "1.8rem",
                boxShadow: `0 8px 20px ${categoryDetails.color}50`
              }}>
                <i className="fas fa-percentage"></i>
              </div>
            </div>
            <div className="col-9">
              <h5 className="fw-bold mb-1" style={{ color: "#333" }}>Premium Membership Offer</h5>
              <p className="mb-2" style={{ fontSize: "0.9rem", color: "#555" }}>Get 20% off on all premium services with annual membership</p>
              <button 
                className="btn btn-sm"
                onClick={() => navigate('/membership')}
                style={{
                  backgroundColor: categoryDetails.color,
                  color: "white",
                  borderRadius: "20px",
                  padding: "5px 15px",
                  fontWeight: "600",
                  fontSize: "0.8rem"
                }}
              >
                Join Now <i className="fas fa-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="px-3 pb-4">
        <h5 className="fw-bold mb-3" style={{ color: "#333" }}>What Our Premium Clients Say</h5>
        <div className="bg-white rounded-3 shadow-sm p-3">
          {[
            { name: "Rahul Kumar", rating: 5, comment: "The Premium Suit Cleaning service exceeded my expectations. My designer suit looks better than when I bought it!" },
            { name: "Ananya Singh", rating: 5, comment: "As someone who invests in quality clothing, I trust only Nezto for my premium items. Worth every penny." }
          ].map((review, index) => (
            <div key={index} className={`${index > 0 ? "mt-3 pt-3 border-top" : ""}`}>
              <div className="d-flex justify-content-between align-items-start">
                <div className="d-flex align-items-center">
                  <div style={{
                    width: "45px",
                    height: "45px",
                    backgroundColor: `${categoryDetails.color}15`,
                    color: categoryDetails.color,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "12px",
                    fontSize: "1.2rem"
                  }}>
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold" style={{ color: "#333" }}>{review.name}</h6>
                    <div>
                      {Array(5).fill().map((_, i) => (
                        <i 
                          key={i}
                          className="fas fa-star"
                          style={{ 
                            fontSize: "0.8rem", 
                            color: i < review.rating ? categoryDetails.color : "#ddd" 
                          }}
                        ></i>
                      ))}
                      <span className="ms-1" style={{ fontSize: "0.8rem", color: "#777" }}>
                        Premium Member
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{
                  backgroundColor: "white",
                  border: `1px solid ${categoryDetails.color}`,
                  borderRadius: "50%",
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  color: categoryDetails.color
                }}>
                  <i className="fas fa-check"></i>
                </div>
              </div>
              <p className="mt-2 mb-0" style={{ fontSize: "0.9rem", color: "#555", fontStyle: "italic" }}>"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom padding for mobile */}
      <div style={{ height: "80px" }}></div>
    </div>
  );
};

// Helper function to adjust color brightness
function adjustColor(color, amount) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => 
    ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
  );
}

export default PremiumCategory; 