import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const navigate = useNavigate();
  const { services } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  
  // Default featured services
  const defaultServices = [
    { id: "dry-clean", name: "Dry Cleaning", icon: "fas fa-tshirt" },
    { id: "laundry", name: "Laundry", icon: "fas fa-soap" },
    { id: "ironing", name: "Ironing", icon: "fas fa-temperature-high" }
  ];
  
  // Get featured services (first 3)
  const [featuredServices, setFeaturedServices] = useState(defaultServices);
  
  useEffect(() => {
    try {
      if (services && services.length > 0) {
        setFeaturedServices(services.slice(0, 3));
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
  
  // Handle service click
  const handleServiceClick = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };
  
  // View all services
  const viewAllServices = () => {
    navigate('/services');
  };

  return (
    <div className="container-fluid p-0">
      {/* Welcome Message */}
      <div className="mb-4 px-1">
        <h2 style={{ fontWeight: "700", color: "#333" }}>Welcome!</h2>
        <p style={{ color: "#6c757d" }}>What would you like to clean today?</p>
      </div>
      
      {/* Services Section */}
      <div className="row g-3 justify-content-center mb-4 mx-0 p-4"
        style={{ 
          background: "linear-gradient(135deg, #40BFC1 0%, #32a8aa 100%)", 
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(64, 191, 193, 0.3)"
        }}>
        {featuredServices.map((service, index) => (
          <div key={index} className="col-4 text-center p-2">
            <div 
              className="service-box p-3 rounded" 
              style={{ 
                backgroundColor: "rgba(255, 255, 255, 0.15)", 
                backdropFilter: "blur(10px)",
                color: "white",
                borderRadius: "12px",
                transition: "transform 0.2s ease, opacity 0.2s ease",
                cursor: "pointer",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                height: "100px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="service-icon mb-2" style={{ 
                fontSize: "1.8rem", 
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <i className={service.icon}></i>
              </div>
              <p className="mb-0" style={{ 
                fontWeight: "600",
                textAlign: "center",
                fontSize: "0.9rem",
                lineHeight: "1.1"
              }}>{service.name}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* View All Services Button */}
      <div className="d-flex justify-content-center mb-4">
        <button 
          className="btn" 
          style={{ 
            backgroundColor: "#40BFC1", 
            color: "white",
            fontWeight: "600",
            borderRadius: "10px",
            padding: "10px 20px",
            boxShadow: "0 4px 8px rgba(64, 191, 193, 0.3)"
          }}
          onClick={viewAllServices}
        >
          View All Services
        </button>
      </div>
      
      {/* Promo Banner */}
      <div className="p-4 mb-4 rounded" style={{ 
        background: "linear-gradient(to right, #6979F8, #8C9EFF)",
        color: "white",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(105, 121, 248, 0.3)",
        textAlign: "center"
      }}>
        <h5 className="fw-bold mb-2">Spring Special Offer</h5>
        <p className="mb-0" style={{ fontSize: "14px" }}>
          Get 15% off on your first order
        </p>
      </div>
      
      {/* Features Section */}
      <div className="mb-3">
        <h5 style={{ 
          fontWeight: "700", 
          color: "#333", 
          position: "relative",
          display: "inline-block",
          marginBottom: "1.5rem"
        }}>
          Why Choose Us
          <span style={{
            position: "absolute",
            height: "3px",
            width: "40%",
            backgroundColor: "#40BFC1",
            bottom: "-8px",
            left: "0"
          }}></span>
        </h5>
      </div>
      
      <div className="row g-3 mb-5">
        {[
          { icon: "fas fa-star", title: "Quality Cleaning", desc: "We use eco-friendly products" },
          { icon: "fas fa-truck", title: "Free Pickup & Delivery", desc: "Right at your doorstep" },
          { icon: "fas fa-clock", title: "Quick Turnaround", desc: "24-48 hour service" },
          { icon: "fas fa-tags", title: "Affordable Prices", desc: "Best rates in the market" }
        ].map((feature, index) => (
          <div key={index} className="col-6 mb-3">
            <div className="p-3 rounded h-100" style={{ 
              backgroundColor: "white", 
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
              borderRadius: "12px",
              border: "1px solid #f0f0f0"
            }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem", color: "#40BFC1" }}>
                <i className={feature.icon}></i>
              </div>
              <h6 style={{ fontWeight: "600", color: "#333" }}>{feature.title}</h6>
              <p style={{ fontSize: "0.8rem", color: "#6c757d", marginBottom: 0 }}>
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
