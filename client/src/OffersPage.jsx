import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const OffersPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  // Offers data
  const allOffers = [
    { 
      id: "firstwash", 
      code: "FIRSTWASH", 
      discount: "50% OFF", 
      description: "on your first order", 
      maxDiscount: "Up to ₹150", 
      color: "#FF5A5F", 
      icon: "fas fa-percentage",
      category: "new-user",
      validTill: "30 June 2023",
      terms: "Valid once per user. Applicable on orders above ₹300."
    },
    { 
      id: "cleanmon", 
      code: "CLEANMON", 
      discount: "30% OFF", 
      description: "on Monday orders", 
      maxDiscount: "Up to ₹100", 
      color: "#FFB100", 
      icon: "fas fa-calendar-alt",
      category: "weekday",
      validTill: "Ongoing",
      terms: "Valid only on orders placed on Mondays. Minimum order value ₹250."
    },
    { 
      id: "bulkdeal", 
      code: "BULKDEAL", 
      discount: "₹300 OFF", 
      description: "on orders above ₹999", 
      maxDiscount: "", 
      color: "#00C2B8", 
      icon: "fas fa-tags",
      category: "bulk",
      validTill: "Ongoing",
      terms: "Valid on orders with minimum value of ₹999."
    },
    { 
      id: "welcome", 
      code: "WELCOME", 
      discount: "20% OFF", 
      description: "for new customers", 
      maxDiscount: "Up to ₹200", 
      color: "#7662E4", 
      icon: "fas fa-gift",
      category: "new-user",
      validTill: "Ongoing",
      terms: "For first-time users only. Cannot be combined with other offers."
    },
    { 
      id: "weekend", 
      code: "WEEKEND", 
      discount: "15% OFF", 
      description: "on weekend orders", 
      maxDiscount: "Up to ₹150", 
      color: "#FF5A5F", 
      icon: "fas fa-calendar-week",
      category: "weekday",
      validTill: "Ongoing",
      terms: "Valid only on orders placed on Saturday and Sunday."
    },
    { 
      id: "premium", 
      code: "PREMIUM", 
      discount: "10% OFF", 
      description: "on premium services", 
      maxDiscount: "Up to ₹500", 
      color: "#FFD700", 
      icon: "fas fa-crown",
      category: "service",
      validTill: "30 July 2023",
      terms: "Valid only on Premium category services."
    },
    { 
      id: "refer", 
      code: "REFER20", 
      discount: "₹200 OFF", 
      description: "when you refer a friend", 
      maxDiscount: "", 
      color: "#40BFC1", 
      icon: "fas fa-user-friends",
      category: "referral",
      validTill: "Ongoing",
      terms: "Both referrer and referee get ₹200 off on their next order."
    },
    { 
      id: "festival", 
      code: "FESTIVAL", 
      discount: "25% OFF", 
      description: "festival special", 
      maxDiscount: "Up to ₹300", 
      color: "#FF5A5F", 
      icon: "fas fa-star",
      category: "seasonal",
      validTill: "15 July 2023",
      terms: "Festive season special offer. Min order value ₹400."
    }
  ];

  // Filter offers based on selected category
  const filteredOffers = activeFilter === "all" 
    ? allOffers 
    : allOffers.filter(offer => offer.category === activeFilter);

  // Handle copy coupon code
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code)
      .then(() => {
        alert(`Coupon code ${code} copied to clipboard!`);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  // Go back to previous page
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Header */}
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
        <h5 className="mb-0 ms-2 fw-bold">Top Offers</h5>
      </div>
      
      {/* Hero Banner */}
      <div className="position-relative mb-4">
        <div style={{ 
          background: "linear-gradient(135deg, #40BFC1 0%, #2A8D8F 100%)",
          color: "white",
          padding: "25px 20px",
          position: "relative",
          overflow: "hidden"
        }}>
          <div className="position-relative" style={{ zIndex: 2 }}>
            <h1 className="fw-bold mb-2" style={{ fontSize: "1.8rem" }}>Exclusive Offers</h1>
            <p className="mb-0">Save big with our special discounts and deals</p>
          </div>
          <div 
            className="position-absolute" 
            style={{ 
              top: "10px", 
              right: "-20px", 
              fontSize: "8rem", 
              opacity: "0.1",
              color: "white",
              transform: "rotate(15deg)"
            }}
          >
            <i className="fas fa-tags"></i>
          </div>
        </div>
      </div>
      
      {/* Filter Tabs */}
      <div className="px-3 mb-3">
        <div className="bg-white rounded-3 p-2 shadow-sm" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          <div style={{ display: "inline-flex", gap: "10px" }}>
            {[
              { id: "all", label: "All Offers", icon: "fas fa-th-large" },
              { id: "new-user", label: "New User", icon: "fas fa-user-plus" },
              { id: "weekday", label: "Days", icon: "fas fa-calendar-day" },
              { id: "bulk", label: "Bulk Orders", icon: "fas fa-boxes" },
              { id: "service", label: "Services", icon: "fas fa-concierge-bell" },
              { id: "referral", label: "Referral", icon: "fas fa-user-friends" },
              { id: "seasonal", label: "Seasonal", icon: "fas fa-snowflake" },
            ].map((filter) => (
              <button
                key={filter.id}
                className={`btn ${activeFilter === filter.id ? 'btn-primary' : 'btn-light'}`}
                style={{ 
                  fontSize: "0.8rem",
                  padding: "8px 12px",
                  borderRadius: "50px",
                  backgroundColor: activeFilter === filter.id ? "#40BFC1" : "white",
                  color: activeFilter === filter.id ? "white" : "#666",
                  border: activeFilter === filter.id ? "none" : "1px solid #eee",
                  whiteSpace: "nowrap"
                }}
                onClick={() => setActiveFilter(filter.id)}
              >
                <i className={`${filter.icon} me-1`}></i> {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Offers List */}
      <div className="px-3 mb-4">
        <div className="row g-3">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="col-12">
              <div 
                className="bg-white rounded-3 p-3 shadow-sm position-relative overflow-hidden"
                style={{ 
                  border: `1px dashed ${offer.color}80`,
                  backgroundColor: `${offer.color}05`
                }}
              >
                {/* Coupon Pattern */}
                <div 
                  className="position-absolute" 
                  style={{ 
                    top: 0, 
                    bottom: 0, 
                    right: 0, 
                    width: "50px", 
                    background: `repeating-linear-gradient(
                      -45deg,
                      ${offer.color}10,
                      ${offer.color}10 10px,
                      transparent 10px,
                      transparent 20px
                    )` 
                  }}
                ></div>
                
                <div className="row">
                  <div className="col-2 d-flex align-items-center justify-content-center">
                    <div style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: `${offer.color}15`,
                      color: offer.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem"
                    }}>
                      <i className={offer.icon}></i>
                    </div>
                  </div>
                  <div className="col-7">
                    <div className="mb-1">
                      <h5 className="fw-bold mb-0" style={{ color: offer.color }}>{offer.discount}</h5>
                      <p className="mb-1" style={{ fontSize: "0.9rem" }}>{offer.description}</p>
                      {offer.maxDiscount && (
                        <span className="badge rounded-pill" style={{ 
                          backgroundColor: `${offer.color}15`,
                          color: offer.color,
                          fontSize: "0.7rem"
                        }}>
                          {offer.maxDiscount}
                        </span>
                      )}
                    </div>
                    <div className="mt-2" style={{ fontSize: "0.75rem", color: "#777" }}>
                      <p className="mb-0">
                        <i className="fas fa-clock me-1"></i> Valid till: {offer.validTill}
                      </p>
                    </div>
                  </div>
                  <div className="col-3 border-start d-flex flex-column align-items-center justify-content-center">
                    <div 
                      className="mb-2 text-center py-1 px-2 rounded-1"
                      style={{ 
                        backgroundColor: "#f5f5f5",
                        fontWeight: "600",
                        fontSize: "0.8rem",
                        letterSpacing: "1px",
                        width: "100%"
                      }}
                    >
                      {offer.code}
                    </div>
                    <button
                      className="btn btn-sm w-100"
                      style={{
                        backgroundColor: offer.color,
                        color: "white",
                        fontSize: "0.75rem",
                        padding: "5px 10px"
                      }}
                      onClick={() => handleCopyCode(offer.code)}
                    >
                      COPY
                    </button>
                  </div>
                </div>
                
                <div className="mt-2" style={{ fontSize: "0.75rem", color: "#777" }}>
                  <p className="mb-0">
                    <i className="fas fa-info-circle me-1"></i> {offer.terms}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* No Offers Message */}
      {filteredOffers.length === 0 && (
        <div className="px-3 text-center py-5">
          <div 
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              backgroundColor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 15px",
              fontSize: "2rem",
              color: "#aaa"
            }}
          >
            <i className="fas fa-search"></i>
          </div>
          <h5 className="mb-2">No Offers Found</h5>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            We couldn't find any offers matching your filter.
          </p>
          <button
            className="btn btn-outline-primary mt-2"
            style={{ 
              borderColor: "#40BFC1",
              color: "#40BFC1"
            }}
            onClick={() => setActiveFilter("all")}
          >
            View All Offers
          </button>
        </div>
      )}
      
      {/* Bottom Padding for Fixed Footer */}
      <div style={{ height: "70px" }}></div>
    </div>
  );
};

export default OffersPage; 