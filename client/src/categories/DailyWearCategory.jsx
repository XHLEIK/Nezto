import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

const DailyWearCategory = () => {
  const navigate = useNavigate();
  const { services } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryServices, setCategoryServices] = useState([]);
  
  // Category details
  const categoryDetails = {
    id: "daily",
    name: "Daily Wear",
    icon: "fas fa-tshirt",
    color: "#FF5A5F",
    description: "Professional cleaning solutions for your everyday clothing items.",
    longDescription: "Our Daily Wear services provide expert care for all your regular clothing items. From casual wear to work attire, we ensure your everyday clothes look fresh, clean, and well-maintained with every wash.",
    features: [
      "Eco-friendly cleaning processes",
      "Stain removal expertise",
      "Safe for regular washing",
      "Color protection technology",
      "Fresh scent options available"
    ]
  };
  
  // Daily wear related services
  const dailyWearServices = [
    'dry-clean',
    'laundry',
    'ironing',
    'stain-removal',
    'express-service'
  ];
  
  useEffect(() => {
    setIsLoading(true);
    try {
      if (services && services.length > 0) {
        // Filter services related to daily wear category
        const filtered = services.filter(service => dailyWearServices.includes(service.id));
        setCategoryServices(filtered);
      }
    } catch (error) {
      console.error("Error filtering services:", error);
    } finally {
      setIsLoading(false);
    }
  }, [services]);
  
  const handleServiceClick = (serviceId) => {
    if (serviceId === 'express-service') {
      navigate('/services/wash-and-fold');
    } else {
      navigate(`/service/${serviceId}`);
    }
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
        <h5 className="mb-0 ms-2 fw-bold">Daily Wear</h5>
      </div>
      
      {/* Category Banner */}
      <div className="px-3 py-4 position-relative" style={{ 
        background: `linear-gradient(135deg, ${categoryDetails.color} 0%, ${adjustColor(categoryDetails.color, -20)} 100%)`,
        color: "white",
        borderRadius: "0 0 20px 20px"
      }}>
        <div className="row align-items-center">
          <div className="col-9">
            <h1 className="fw-bold mb-2" style={{ fontSize: "1.8rem" }}>{categoryDetails.name}</h1>
            <p className="mb-0">{categoryDetails.description}</p>
          </div>
          <div className="col-3 text-center">
            <div style={{ 
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              fontSize: "2rem"
            }}>
              <i className={categoryDetails.icon}></i>
            </div>
          </div>
        </div>
      </div>
      
      {/* Why Choose Us */}
      <div className="px-3 py-4">
        <h5 className="fw-bold mb-3">Why Choose Our Daily Wear Services</h5>
        <div className="bg-white rounded-3 shadow-sm p-3 mb-4">
          <p className="mb-3">{categoryDetails.longDescription}</p>
          <div>
            {categoryDetails.features.map((feature, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <div style={{ 
                  minWidth: "24px", 
                  height: "24px", 
                  backgroundColor: `${categoryDetails.color}15`,
                  color: categoryDetails.color,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px"
                }}>
                  <i className="fas fa-check" style={{ fontSize: "0.7rem" }}></i>
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Services */}
      <div className="px-3 pb-4">
        <h5 className="fw-bold mb-3">Our Daily Wear Services</h5>
        
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
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-3 text-center">
                        <div style={{
                          width: "60px",
                          height: "60px",
                          backgroundColor: `${categoryDetails.color}15`,
                          color: categoryDetails.color,
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
                            <i className="fas fa-tag me-1 text-primary"></i>
                            From ₹{service.price}
                          </span>
                        </div>
                      </div>
                      <div className="col-3 text-end">
                        <button 
                          className="btn btn-sm" 
                          style={{ 
                            backgroundColor: categoryDetails.color,
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
        )}
      </div>
      
      {/* Promotional Banner */}
      <div className="px-3 mb-4">
        <div className="rounded-3 p-3" style={{
          background: `linear-gradient(135deg, ${categoryDetails.color} 0%, ${adjustColor(categoryDetails.color, -20)} 100%)`,
          color: "white"
        }}>
          <div className="row align-items-center">
            <div className="col-8">
              <h5 className="fw-bold mb-1">First-Time Offer</h5>
              <p className="mb-0" style={{ fontSize: "0.9rem" }}>30% off on your first Daily Wear service booking</p>
            </div>
            <div className="col-4 text-end">
              <button 
                className="btn btn-sm btn-light"
                onClick={() => navigate('/services')}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Customer Reviews */}
      <div className="px-3 pb-4">
        <h5 className="fw-bold mb-3">Customer Reviews</h5>
        <div className="bg-white rounded-3 shadow-sm p-3">
          {[
            { name: "Rahul M.", rating: 5, comment: "My work clothes have never looked better! The ironing service is exceptional." },
            { name: "Neha S.", rating: 4, comment: "Great quality service, timely delivery. Will use again for my everyday clothes." }
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
                        className={`fas fa-star ${i < review.rating ? "text-warning" : "text-muted"}`}
                        style={{ fontSize: "0.8rem" }}
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

export default DailyWearCategory; 