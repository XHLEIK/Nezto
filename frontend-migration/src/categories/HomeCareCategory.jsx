import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeCareCategory = () => {
  const navigate = useNavigate();
  const { services } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryServices, setCategoryServices] = useState([]);
  
  // Category details
  const categoryDetails = {
    id: "home",
    name: "Home Care",
    icon: "fas fa-home",
    color: "#00C2B8",
    description: "Transform your living space with our professional home care services.",
    longDescription: "Our Home Care services provide comprehensive cleaning solutions for all areas of your home. From carpets and curtains to sofas and bedding, we ensure your living environment remains clean, fresh, and healthy.",
    features: [
      "Safe for families and pets",
      "Eco-friendly cleaning solutions",
      "Advanced stain removal techniques",
      "Allergen reduction treatments",
      "Same-day service options available"
    ]
  };
  
  // Home care related services
  const homeCareServices = [
    'carpet-cleaning',
    'curtain-clean',
    'bedding-clean',
    'home-cleaning',
    'sofa-cleaning'
  ];
  
  useEffect(() => {
    setIsLoading(true);
    try {
      if (services && services.length > 0) {
        // Filter services related to home care category
        const filtered = services.filter(service => homeCareServices.includes(service.id));
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
    <div className="container-fluid p-0 pb-5" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Header with back button */}
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
        <h5 className="mb-0 ms-2 fw-bold">{categoryDetails.name}</h5>
      </div>
      
      {/* Home Care Hero Banner */}
      <div className="px-3 pt-3 pb-4">
        <div className="rounded-4 overflow-hidden shadow-sm position-relative">
          <div style={{ 
            background: `linear-gradient(135deg, ${categoryDetails.color} 0%, ${adjustColor(categoryDetails.color, -20)} 100%)`,
            padding: "25px",
            color: "white"
          }}>
            <div className="row align-items-center">
              <div className="col-8">
                <h2 className="fw-bold">{categoryDetails.name}</h2>
                <p className="mb-3">{categoryDetails.description}</p>
                <button 
                  className="btn btn-light btn-sm"
                  onClick={() => document.getElementById('services-section').scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    color: categoryDetails.color,
                    fontWeight: "600",
                    borderRadius: "20px",
                    padding: "6px 15px"
                  }}
                >
                  Explore Services <i className="fas fa-arrow-down ms-1"></i>
                </button>
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
                  fontSize: "2.5rem"
                }}>
                  <i className={categoryDetails.icon}></i>
                </div>
              </div>
            </div>
          </div>
          
          {/* Overlap stats */}
          <div className="bg-white p-3">
            <div className="row g-2 text-center">
              {[
                { value: "100%", label: "Safe Products" },
                { value: "4.8", label: "Customer Rating" },
                { value: "24h", label: "Fast Service" }
              ].map((stat, index) => (
                <div key={index} className="col-4">
                  <div className="py-2" style={{ borderRight: index < 2 ? "1px solid #eee" : "none" }}>
                    <div className="fw-bold" style={{ fontSize: "1.2rem", color: categoryDetails.color }}>{stat.value}</div>
                    <div style={{ fontSize: "0.8rem", color: "#666" }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Why Choose Our Services */}
      <div className="px-3 pb-4">
        <div className="mb-3 d-flex align-items-center">
          <div style={{ 
            width: "30px", 
            height: "30px",
            backgroundColor: `${categoryDetails.color}15`,
            color: categoryDetails.color,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px"
          }}>
            <i className="fas fa-check"></i>
          </div>
          <h5 className="fw-bold mb-0">Why Choose Our Home Care</h5>
        </div>
        
        <div className="bg-white rounded-3 shadow-sm p-3 mb-4">
          <p className="mb-3">{categoryDetails.longDescription}</p>
          
          <div className="row g-3 mt-2">
            {categoryDetails.features.map((feature, index) => (
              <div key={index} className="col-12">
                <div className="d-flex align-items-center">
                  <div style={{ 
                    minWidth: "24px", 
                    height: "24px", 
                    backgroundColor: `${categoryDetails.color}10`,
                    color: categoryDetails.color,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "10px"
                  }}>
                    <i className="fas fa-check" style={{ fontSize: "0.7rem" }}></i>
                  </div>
                  <span style={{ fontSize: "0.9rem" }}>{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Services */}
      <div id="services-section" className="px-3 pb-4">
        <div className="mb-3 d-flex align-items-center">
          <div style={{ 
            width: "30px", 
            height: "30px",
            backgroundColor: `${categoryDetails.color}15`,
            color: categoryDetails.color,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px"
          }}>
            <i className="fas fa-list"></i>
          </div>
          <h5 className="fw-bold mb-0">Our Home Care Services</h5>
        </div>
        
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading services...</p>
          </div>
        ) : (
          <div className="row g-3">
            {categoryServices.map((service) => (
              <div key={service.id} className="col-12">
                <div 
                  className="card border-0 shadow-sm" 
                  onClick={() => handleServiceClick(service.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-body p-0">
                    <div className="row g-0">
                      <div className="col-4">
                        <div style={{ 
                          height: "100%",
                          minHeight: "120px",
                          background: `linear-gradient(135deg, ${categoryDetails.color}20 0%, ${categoryDetails.color}05 100%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <div style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "12px",
                            backgroundColor: "white",
                            color: categoryDetails.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.05)"
                          }}>
                            <i className={service.icon} style={{ fontSize: "1.5rem" }}></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-8">
                        <div className="p-3">
                          <h6 className="fw-bold mb-1">{service.name}</h6>
                          <p className="small text-muted mb-2">{service.description}</p>
                          <div className="d-flex align-items-center justify-content-between mt-3">
                            <div>
                              <span className="fw-bold" style={{ color: categoryDetails.color }}>
                                From ₹{service.price}
                              </span>
                            </div>
                            <button 
                              className="btn btn-sm" 
                              style={{
                                backgroundColor: categoryDetails.color,
                                color: "white",
                                borderRadius: "20px",
                                padding: "3px 12px",
                                fontSize: "0.8rem",
                                fontWeight: "600"
                              }}
                            >
                              <i className="fas fa-arrow-right me-1"></i> Select
                            </button>
                          </div>
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
      
      {/* How It Works */}
      <div className="px-3 pb-4">
        <div className="mb-3 d-flex align-items-center">
          <div style={{ 
            width: "30px", 
            height: "30px",
            backgroundColor: `${categoryDetails.color}15`,
            color: categoryDetails.color,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px"
          }}>
            <i className="fas fa-info-circle"></i>
          </div>
          <h5 className="fw-bold mb-0">How It Works</h5>
        </div>
        
        <div className="bg-white rounded-3 shadow-sm p-3 mb-4">
          <div className="row g-4">
            {[
              { step: 1, title: "Book Service", description: "Choose your service and select appointment time", icon: "fas fa-calendar-check" },
              { step: 2, title: "Professional Arrives", description: "Our certified cleaner will arrive with all equipment", icon: "fas fa-user-tie" },
              { step: 3, title: "Service Completed", description: "Your home will be clean and fresh in no time", icon: "fas fa-check-circle" }
            ].map((step, index) => (
              <div key={index} className="col-4 text-center">
                <div style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "50%",
                  backgroundColor: `${categoryDetails.color}15`,
                  color: categoryDetails.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 10px",
                  position: "relative"
                }}>
                  <i className={step.icon}></i>
                  <div style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: categoryDetails.color,
                    color: "white",
                    fontSize: "0.7rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600"
                  }}>
                    {step.step}
                  </div>
                </div>
                <h6 className="mb-1" style={{ fontSize: "0.9rem", fontWeight: "600" }}>{step.title}</h6>
                <p className="mb-0" style={{ fontSize: "0.75rem", color: "#777" }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Special Offer */}
      <div className="px-3 pb-4">
        <div className="rounded-3 p-3" style={{
          background: `linear-gradient(135deg, ${categoryDetails.color}20 0%, ${categoryDetails.color}05 100%)`,
          border: `1px dashed ${categoryDetails.color}`
        }}>
          <div className="row align-items-center">
            <div className="col-3 text-center">
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "white",
                color: categoryDetails.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontSize: "1.5rem",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
              }}>
                <i className="fas fa-gift"></i>
              </div>
            </div>
            <div className="col-9">
              <h5 className="fw-bold mb-1" style={{ color: categoryDetails.color }}>Seasonal Offer</h5>
              <p className="mb-2" style={{ fontSize: "0.9rem" }}>Get 15% off on all Home Care services this month</p>
              <span className="badge" style={{ backgroundColor: categoryDetails.color, color: "white", padding: "5px 10px" }}>
                Use code: HOME15
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="px-3 pb-4">
        <div className="mb-3 d-flex align-items-center">
          <div style={{ 
            width: "30px", 
            height: "30px",
            backgroundColor: `${categoryDetails.color}15`,
            color: categoryDetails.color,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px"
          }}>
            <i className="fas fa-star"></i>
          </div>
          <h5 className="fw-bold mb-0">What Customers Say</h5>
        </div>
        
        <div className="bg-white rounded-3 shadow-sm p-3">
          {[
            { name: "Vikram Singh", rating: 5, comment: "The carpet cleaning was exceptional. Stains I thought would never come out are completely gone!" },
            { name: "Meera Patel", rating: 5, comment: "Absolutely love how fresh my curtains look after cleaning. The team was professional and prompt." }
          ].map((review, index) => (
            <div key={index} className={`${index > 0 ? "mt-3 pt-3 border-top" : ""}`}>
              <div className="d-flex align-items-center mb-2">
                <div style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: `${categoryDetails.color}15`,
                  color: categoryDetails.color,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px",
                  fontSize: "1.2rem"
                }}>
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  <h6 className="mb-0 fw-bold">{review.name}</h6>
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
                  </div>
                </div>
              </div>
              <p className="mb-0" style={{ fontSize: "0.9rem" }}>"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="px-3 pb-4">
        <div className="bg-white rounded-3 shadow-sm p-4 text-center">
          <h5 className="fw-bold mb-2">Ready to Transform Your Home?</h5>
          <p className="mb-3" style={{ fontSize: "0.9rem" }}>Book your home care service today and enjoy a clean, fresh living space.</p>
          <button 
            className="btn"
            onClick={() => navigate('/services')}
            style={{
              backgroundColor: categoryDetails.color,
              color: "white",
              borderRadius: "30px",
              padding: "8px 25px",
              fontWeight: "600"
            }}
          >
            Book Now <i className="fas fa-arrow-right ms-1"></i>
          </button>
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

export default HomeCareCategory; 