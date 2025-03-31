import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useUser } from "./UserContext";

const ServicesPage = () => {
  const navigate = useNavigate();
  const { services } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Default services in case context is not available
  const defaultServices = [
    { id: "dry-clean", name: "Dry Cleaning", icon: "fas fa-tshirt", price: 499, description: "Professional eco-friendly cleaning" },
    { id: "laundry", name: "Laundry Wash", icon: "fas fa-soap", price: 349, description: "Wash, dry and fold service" },
    { id: "ironing", name: "Ironing Service", icon: "fas fa-temperature-high", price: 199, description: "Professional ironing service" },
    { id: "shoe-clean", name: "Shoe Cleaning", icon: "fas fa-shoe-prints", price: 349, description: "Detailed shoe cleaning and care" },
    { id: "carpet-clean", name: "Carpet Cleaning", icon: "fas fa-broom", price: 1299, description: "Deep cleaning for carpets and rugs" },
    { id: "stain-removal", name: "Stain Removal", icon: "fas fa-eraser", price: 299, description: "Effective stain treatment" },
  ];
  
  // State to hold the services that will be displayed
  const [availableServices, setAvailableServices] = useState(defaultServices);
  
  useEffect(() => {
    try {
      if (services && services.length > 0) {
        setAvailableServices(services);
      } else {
        // If no services from context, use defaults
        setAvailableServices(defaultServices);
      }
    } catch (err) {
      console.error("Error loading services:", err);
      setError("Failed to load services, showing default options");
      setAvailableServices(defaultServices);
    } finally {
      // Ensure loading is set to false
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, [services]);
  
  // Handle booking a service
  const handleBookService = (serviceId) => {
    try {
      navigate(`/service/${serviceId}`);
    } catch (err) {
      console.error("Navigation error:", err);
      alert("Could not navigate to service booking page. Please try again.");
    }
  };

  // Show loading spinner while services load
  if (isLoading) {
    return (
      <div className="container-fluid p-0">
        <div className="text-center py-5">
          <div className="loading-spinner mx-auto mb-3"></div>
          <p className="text-muted">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      {/* Show error banner if there was an issue loading services */}
      {error && (
        <div className="alert alert-warning mb-3" role="alert">
          {error}
        </div>
      )}
      
      {/* Services Header */}
      <div className="mb-3">
        <h5 style={{ 
          fontWeight: "700", 
          color: "#333", 
          position: "relative",
          display: "inline-block",
          marginBottom: "1.5rem"
        }}>
          Our Services
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

      {/* Services Grid */}
      <div className="row g-3 mb-4">
        {availableServices.map((service, index) => (
          <div key={index} className="col-6">
            <div className="p-3 rounded shadow-sm h-100" style={{ 
              background: "linear-gradient(135deg, #40BFC1 0%, #32a8aa 100%)", 
              color: "white", 
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <h5 className="fw-bold d-flex align-items-center">
                  <span style={{ 
                    fontSize: "1.3rem", 
                    marginRight: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <i className={service.icon}></i>
                  </span>
                  <span>{service.name}</span>
                </h5>
                <p style={{ 
                  fontSize: "13px", 
                  marginBottom: "12px",
                  opacity: 0.8
                }}>{service.description}</p>
                <h6 style={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  display: "inline-block",
                  padding: "5px 12px",
                  borderRadius: "20px",
                  fontSize: "14px",
                  marginBottom: "12px"
                }}>₹{service.price.toFixed(0)}</h6>
              </div>
              <button 
                className="btn w-100" 
                style={{ 
                  backgroundColor: "white", 
                  color: "#40BFC1",
                  fontWeight: "600",
                  borderRadius: "10px",
                  padding: "8px"
                }}
                onClick={() => handleBookService(service.id)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Banner */}
      <div className="p-4 mb-5 rounded" style={{ 
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

      {/* Animated Special Offer Card */}
      <div className="special-offer-card">
        <div className="shimmer-effect"></div>
        <div className="offer-content">
          <div className="offer-badge">EXCLUSIVE</div>
          <h2>Monsoon Sale</h2>
          <h3>FLAT 40% OFF</h3>
          <p>On premium laundry services</p>
          <div className="offer-timer">
            <div className="timer-unit">
              <span className="time-value">2</span>
              <span className="time-label">Days</span>
            </div>
            <div className="timer-unit">
              <span className="time-value">18</span>
              <span className="time-label">Hours</span>
            </div>
            <div className="timer-unit">
              <span className="time-value">45</span>
              <span className="time-label">Mins</span>
            </div>
          </div>
          <button className="pulse-button" onClick={() => handleBookService("premium-laundry")}>
            GET NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
