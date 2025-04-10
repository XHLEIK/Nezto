import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

const QuickServiceCategory = () => {
  const navigate = useNavigate();
  const { services } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [categoryServices, setCategoryServices] = useState([]);
  
  // Category details
  const categoryDetails = {
    id: "quick",
    name: "Quick Services",
    icon: "fas fa-bolt",
    color: "#7662E4",
    description: "Fast, efficient cleaning services when time is of the essence.",
    longDescription: "Our Quick Services are designed for customers who need fast, efficient cleaning solutions. With expedited processing and same-day options, we ensure your urgent cleaning needs are met without compromising on quality.",
    features: [
      "Express service options",
      "Same-day delivery available",
      "Priority processing",
      "Real-time tracking",
      "No compromise on quality"
    ]
  };
  
  // Quick service related services
  const quickServiceIds = [
    'express-service',
    'ironing',
    'stain-removal',
    'steam-press',
    'laundry'
  ];
  
  useEffect(() => {
    setIsLoading(true);
    try {
      if (services && services.length > 0) {
        // Filter services related to quick service category
        const filtered = services.filter(service => quickServiceIds.includes(service.id));
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
    <div className="container-fluid p-0 pb-5" style={{ backgroundColor: "#f9f8fe" }}>
      {/* Speed-themed header with back button */}
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
        <span 
          className="ms-auto badge"
          style={{ 
            backgroundColor: `${categoryDetails.color}20`, 
            color: categoryDetails.color,
            padding: "6px 12px",
            fontWeight: "600",
            fontSize: "0.75rem",
            borderRadius: "20px",
          }}
        >
          <i className="fas fa-clock me-1"></i> 24h Turnaround
        </span>
      </div>
      
      {/* Quick Service Banner */}
      <div className="position-relative mb-3">
        <div style={{ 
          background: `linear-gradient(135deg, ${categoryDetails.color} 0%, ${adjustColor(categoryDetails.color, -30)} 100%)`,
          color: "white",
          padding: "25px",
          position: "relative",
          overflow: "hidden"
        }}>
          <div className="row align-items-center position-relative" style={{ zIndex: 2 }}>
            <div className="col-8">
              <h1 className="fw-bold mb-2" style={{ fontSize: "1.8rem" }}>{categoryDetails.name}</h1>
              <p className="mb-3">{categoryDetails.description}</p>
              <div className="d-flex align-items-center">
                <div style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  padding: "5px 15px",
                  borderRadius: "20px",
                  fontSize: "0.8rem",
                  marginRight: "10px"
                }}>
                  <i className="fas fa-stopwatch me-1"></i> Fast Turnaround
                </div>
                <div style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  padding: "5px 15px",
                  borderRadius: "20px",
                  fontSize: "0.8rem"
                }}>
                  <i className="fas fa-thumbs-up me-1"></i> Quality Service
                </div>
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
                position: "relative",
                overflow: "hidden"
              }}>
                <i className={categoryDetails.icon}></i>
                <div 
                  className="position-absolute" 
                  style={{ 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)" 
                  }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Speed lines in background */}
          <div 
            className="position-absolute" 
            style={{ 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              background: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.05) 10px,
                rgba(255,255,255,0.05) 20px
              )`,
              zIndex: 1
            }}
          ></div>
        </div>
        
        {/* Quick Service Counter */}
        <div className="px-3" style={{ marginTop: "-15px", position: "relative", zIndex: 5 }}>
          <div className="bg-white rounded-3 shadow-sm p-3">
            <div className="row g-0 text-center">
              {[
                { value: "2h", label: "Express Service" },
                { value: "24h", label: "Standard Delivery" },
                { value: "99%", label: "Customer Satisfaction" }
              ].map((stat, index) => (
                <div key={index} className="col-4">
                  <div style={{ 
                    padding: "10px", 
                    borderRight: index < 2 ? "1px solid #eee" : "none" 
                  }}>
                    <div className="fw-bold" style={{ color: categoryDetails.color, fontSize: "1.2rem" }}>
                      {stat.value}
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "#777" }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Why Choose Quick Services */}
      <div className="px-3 py-3">
        <div className="mb-3 d-flex align-items-center">
          <div style={{ 
            minWidth: "28px", 
            height: "28px", 
            backgroundColor: `${categoryDetails.color}15`,
            color: categoryDetails.color,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px"
          }}>
            <i className="fas fa-rocket" style={{ fontSize: "0.8rem" }}></i>
          </div>
          <h5 className="fw-bold mb-0">Why Choose Quick Services</h5>
        </div>
        
        <div className="bg-white rounded-3 shadow-sm p-3 mb-4">
          <p className="mb-3">{categoryDetails.longDescription}</p>
          
          <div className="mt-3">
            {categoryDetails.features.map((feature, index) => (
              <div key={index} className="d-flex align-items-center mb-2 pb-2" style={{ borderBottom: index < categoryDetails.features.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                <div style={{ 
                  width: "22px", 
                  height: "22px", 
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
                <span style={{ fontSize: "0.9rem" }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Express Timeline */}
      <div className="px-3 py-3">
        <div className="mb-3 d-flex align-items-center">
          <div style={{ 
            minWidth: "28px", 
            height: "28px", 
            backgroundColor: `${categoryDetails.color}15`,
            color: categoryDetails.color,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px"
          }}>
            <i className="fas fa-clock" style={{ fontSize: "0.8rem" }}></i>
          </div>
          <h5 className="fw-bold mb-0">Express Timeline</h5>
        </div>
        
        <div className="bg-white rounded-3 shadow-sm p-3 mb-4">
          <div className="position-relative">
            {/* Timeline line */}
            <div 
              className="position-absolute" 
              style={{ 
                left: "26px", 
                top: "35px", 
                bottom: "35px", 
                width: "2px", 
                backgroundColor: `${categoryDetails.color}30`,
                zIndex: 1
              }}
            ></div>
            
            {/* Timeline points */}
            {[
              { time: "0h", title: "Order Placed", description: "Your order is confirmed and assigned priority status" },
              { time: "1h", title: "Processing", description: "Your items are being cleaned with priority handling" },
              { time: "3h", title: "Quality Check", description: "Final inspection to ensure quality standards" },
              { time: "4h", title: "Ready for Delivery", description: "Your freshly cleaned items are on their way" }
            ].map((point, index) => (
              <div key={index} className="d-flex mb-4 position-relative" style={{ zIndex: 2 }}>
                <div className="me-3">
                  <div style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    backgroundColor: index === 0 ? categoryDetails.color : "white",
                    border: `2px solid ${categoryDetails.color}`,
                    color: index === 0 ? "white" : categoryDetails.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                    fontSize: "0.7rem",
                    boxShadow: "0 0 0 4px rgba(255,255,255,1)"
                  }}>
                    <i className={index === 0 ? "fas fa-play" : "fas fa-clock"}></i>
                  </div>
                </div>
                <div>
                  <div className="d-flex align-items-center mb-1">
                    <h6 className="fw-bold mb-0" style={{ fontSize: "0.9rem" }}>{point.title}</h6>
                    <span 
                      className="ms-2 badge"
                      style={{ 
                        backgroundColor: `${categoryDetails.color}15`, 
                        color: categoryDetails.color,
                        fontSize: "0.7rem"
                      }}
                    >
                      {point.time}
                    </span>
                  </div>
                  <p className="mb-0" style={{ fontSize: "0.8rem", color: "#666" }}>{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Available Quick Services */}
      <div className="px-3 py-3">
        <div className="mb-3 d-flex align-items-center">
          <div style={{ 
            minWidth: "28px", 
            height: "28px", 
            backgroundColor: `${categoryDetails.color}15`,
            color: categoryDetails.color,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px"
          }}>
            <i className="fas fa-list" style={{ fontSize: "0.8rem" }}></i>
          </div>
          <h5 className="fw-bold mb-0">Our Quick Services</h5>
        </div>
        
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status" style={{ color: categoryDetails.color }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2" style={{ color: "#666" }}>Loading quick services...</p>
          </div>
        ) : (
          <div className="row g-3">
            {categoryServices.map((service) => (
              <div key={service.id} className="col-12">
                <div 
                  className="bg-white rounded-3 shadow-sm overflow-hidden"
                  onClick={() => handleServiceClick(service.id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="row g-0">
                    <div className="col-3 position-relative">
                      <div style={{
                        background: `linear-gradient(135deg, ${categoryDetails.color} 0%, ${adjustColor(categoryDetails.color, -30)} 100%)`,
                        height: "100%",
                        minHeight: "110px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white"
                      }}>
                        <i className={service.icon} style={{ fontSize: "1.8rem" }}></i>
                      </div>
                      <div 
                        className="position-absolute" 
                        style={{ 
                          top: 0, 
                          left: 0, 
                          right: 0, 
                          height: "20px",
                          background: "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)"
                        }}
                      ></div>
                    </div>
                    <div className="col-9">
                      <div className="p-3 position-relative">
                        <div className="position-absolute" style={{ top: "10px", right: "10px" }}>
                          <div style={{
                            fontSize: "0.7rem",
                            color: categoryDetails.color,
                            fontWeight: "600",
                            backgroundColor: `${categoryDetails.color}10`,
                            padding: "3px 8px",
                            borderRadius: "20px",
                            display: "flex",
                            alignItems: "center"
                          }}>
                            <i className="fas fa-bolt me-1"></i> QUICK
                          </div>
                        </div>
                        
                        <h6 className="fw-bold mb-1">{service.name}</h6>
                        <p className="small text-muted mb-3" style={{ fontSize: "0.8rem" }}>
                          {service.description}
                        </p>
                        
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <i className="fas fa-clock me-1" style={{ color: "#aaa", fontSize: "0.7rem" }}></i>
                            <span style={{ fontSize: "0.7rem", color: "#888" }}>
                              Ready in 2-4 hours
                            </span>
                          </div>
                          <div className="fw-bold" style={{ color: categoryDetails.color }}>
                            ₹{service.price}
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
      
      {/* Speed Advantage Banner */}
      <div className="px-3 py-3">
        <div 
          className="rounded-3 p-4 position-relative overflow-hidden" 
          style={{
            background: "white",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
          }}
        >
          <div className="row align-items-center">
            <div className="col-4 text-center">
              <div style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                backgroundColor: categoryDetails.color,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
                fontSize: "1.8rem",
                boxShadow: `0 5px 15px ${categoryDetails.color}50`
              }}>
                <i className="fas fa-tachometer-alt"></i>
              </div>
            </div>
            <div className="col-8 position-relative" style={{ zIndex: 3 }}>
              <h5 className="fw-bold mb-1">Express Delivery</h5>
              <p className="mb-2" style={{ fontSize: "0.85rem" }}>
                Need your items even faster? Select Express Delivery at checkout for a 2-hour turnaround!
              </p>
              <button 
                className="btn btn-sm"
                onClick={() => navigate('/services/wash-and-fold')}
                style={{
                  backgroundColor: categoryDetails.color,
                  color: "white",
                  borderRadius: "20px",
                  padding: "5px 12px",
                  fontWeight: "600",
                  fontSize: "0.8rem"
                }}
              >
                Try Express <i className="fas fa-arrow-right ms-1"></i>
              </button>
            </div>
          </div>
          
          {/* Speedlines background */}
          <div 
            className="position-absolute" 
            style={{ 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              background: `repeating-linear-gradient(
                -45deg,
                ${categoryDetails.color}03,
                ${categoryDetails.color}03 2px,
                transparent 2px,
                transparent 8px
              )`,
              zIndex: 1,
              opacity: 0.5
            }}
          ></div>
        </div>
      </div>
      
      {/* Customer Reviews */}
      <div className="px-3 py-3">
        <div className="mb-3 d-flex align-items-center">
          <div style={{ 
            minWidth: "28px", 
            height: "28px", 
            backgroundColor: `${categoryDetails.color}15`,
            color: categoryDetails.color,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "10px"
          }}>
            <i className="fas fa-star" style={{ fontSize: "0.8rem" }}></i>
          </div>
          <h5 className="fw-bold mb-0">What Our Customers Say</h5>
        </div>
        
        <div className="mb-4" style={{ overflowX: "auto", whiteSpace: "nowrap", WebkitOverflowScrolling: "touch" }}>
          <div style={{ display: "inline-flex", paddingBottom: "10px", gap: "12px" }}>
            {[
              { name: "Aditya K.", rating: 5, comment: "The express service saved me! Got my suit cleaned perfectly in just 3 hours for an unexpected meeting." },
              { name: "Priya M.", rating: 5, comment: "Impressive turnaround time without compromising quality. My stained blouse came back perfect!" }
            ].map((review, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3 shadow-sm p-3"
                style={{ minWidth: "280px", maxWidth: "280px" }}
              >
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
                    <h6 className="mb-0 fw-bold" style={{ fontSize: "0.9rem" }}>{review.name}</h6>
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
                <p className="mb-0" style={{ fontSize: "0.85rem", color: "#555", whiteSpace: "normal" }}>
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom CTA */}
      <div className="px-3 py-3">
        <div 
          className="p-4 rounded-3 text-center text-white position-relative overflow-hidden"
          style={{ 
            background: `linear-gradient(135deg, ${categoryDetails.color} 0%, ${adjustColor(categoryDetails.color, -30)} 100%)`,
            boxShadow: `0 5px 20px ${categoryDetails.color}30`
          }}
        >
          <div className="position-relative" style={{ zIndex: 2 }}>
            <h5 className="fw-bold mb-2">Need It Done Fast?</h5>
            <p className="mb-3" style={{ fontSize: "0.9rem" }}>Book your quick service now and get your items back today!</p>
            <button 
              className="btn btn-light"
              onClick={() => document.getElementById('services-section').scrollIntoView({ behavior: 'smooth' })}
              style={{
                color: categoryDetails.color,
                borderRadius: "30px",
                padding: "8px 20px",
                fontWeight: "600",
                fontSize: "0.9rem"
              }}
            >
              Book Quick Service <i className="fas fa-bolt ms-1"></i>
            </button>
          </div>
          
          {/* Background pattern */}
          <div 
            className="position-absolute" 
            style={{ 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              background: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.05) 10px,
                rgba(255,255,255,0.05) 20px
              )`,
              zIndex: 1
            }}
          ></div>
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

export default QuickServiceCategory; 