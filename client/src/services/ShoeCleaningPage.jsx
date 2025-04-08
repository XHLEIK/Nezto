import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { useUser } from "../UserContext";

const ShoeCleaningPage = () => {
  const navigate = useNavigate();
  const { addToWishlist } = useUser();
  const [quantity, setQuantity] = useState(1);
  const [shoeType, setShoeType] = useState("sneakers");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  
  const serviceDetails = {
    id: "shoe-cleaning",
    name: "Shoe Cleaning",
    icon: "fas fa-shoe-prints",
    price: 149,
    description: "Professional cleaning services for all types of shoes",
    longDescription: "Our premium shoe cleaning service restores your footwear to like-new condition. From everyday sneakers to luxury leather shoes, we use specialized techniques and cleaning solutions to remove dirt, stains, and odor while preserving the material and appearance of your shoes.",
    features: [
      "Deep cleaning for all shoe types",
      "Stain and scuff removal",
      "Odor elimination",
      "Color restoration",
      "Gentle cleaning agents"
    ],
    shoeTypes: [
      { id: "sneakers", name: "Sneakers/Sports Shoes", price: 149, description: "Deep cleaning for canvas & athletic shoes" },
      { id: "casual", name: "Casual Shoes", price: 179, description: "For everyday leather & suede casual footwear" },
      { id: "formal", name: "Formal Leather Shoes", price: 199, description: "Gentle cleaning & polishing for formal shoes" },
      { id: "boots", name: "Boots", price: 249, description: "Thorough cleaning for all types of boots" },
      { id: "designer", name: "Designer/Luxury Shoes", price: 299, description: "Special care for high-end footwear" }
    ],
    process: [
      { name: "Assessment", description: "Thorough evaluation of shoe condition and materials", icon: "fas fa-search" },
      { name: "Prep & Clean", description: "Removal of dirt, dust, and surface stains", icon: "fas fa-broom" },
      { name: "Deep Clean", description: "Specialized cleaning based on material type", icon: "fas fa-soap" },
      { name: "Stain Treatment", description: "Targeted spot cleaning for tough stains", icon: "fas fa-eraser" },
      { name: "Condition", description: "Material-specific conditioning to restore and protect", icon: "fas fa-hand-holding-water" },
      { name: "Finishing", description: "Polishing, brushing, and final touches", icon: "fas fa-magic" }
    ],
    testimonials: [
      { name: "Vikram S.", rating: 5, comment: "My white sneakers look brand new again! The team even got out a stain I thought was permanent." },
      { name: "Ananya T.", rating: 5, comment: "The attention to detail on my leather boots was amazing. They restored the color and fixed a small tear too." }
    ],
    addOns: [
      { id: "polish", name: "Polish & Shine", price: 49, description: "Professional polishing for leather shoes" },
      { id: "protect", name: "Water Protection", price: 79, description: "Protective coating to repel water & stains" },
      { id: "deodorize", name: "Deodorizing", price: 39, description: "Removes odors & freshens footwear" }
    ],
    category: "premium",
    rating: 4.9
  };
  
  const handleBookService = () => {
    try {
      navigate('/service-payment', { state: { service: { ...serviceDetails, quantity: quantity, selectedOption: shoeType, totalPrice: calculatePrice(), addOns: selectedAddOns } } });
    } catch (err) {
      console.error("Navigation error:", err);
      alert("Could not navigate to payment page. Please try again.");
    }
  };
  
  const handleWishlist = (e) => {
    e.stopPropagation();
    try {
      // Add to wishlist logic
      const itemToAdd = {
        id: serviceDetails.id,
        name: serviceDetails.name,
        price: calculatePrice(),
        quantity: quantity,
        icon: serviceDetails.icon,
        description: serviceDetails.description
      };
      
      addToWishlist?.(itemToAdd);
      setIsWishlisted(true);
      setTimeout(() => setIsWishlisted(false), 2000);
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };
  
  const handleBack = () => {
    navigate('/services');
  };

  const toggleAddOn = (addOnId) => {
    if (selectedAddOns.includes(addOnId)) {
      setSelectedAddOns(selectedAddOns.filter(id => id !== addOnId));
    } else {
      setSelectedAddOns([...selectedAddOns, addOnId]);
    }
  };

  const calculatePrice = () => {
    const shoe = serviceDetails.shoeTypes.find(type => type.id === shoeType);
    if (!shoe) return 0;
    
    let total = shoe.price * quantity;
    
    // Add price for selected add-ons
    selectedAddOns.forEach(addOnId => {
      const addOn = serviceDetails.addOns.find(a => a.id === addOnId);
      if (addOn) {
        total += addOn.price * quantity;
      }
    });
    
    return total;
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  // Get category color for styling
  const getCategoryColor = () => {
    const categories = {
      "daily": "#FF9800",
      "premium": "#8E44AD",
      "home": "#4CAF50",
      "quick": "#F44336",
      "default": "#40BFC1"
    };
    return categories[serviceDetails.category] || categories.default;
  };

  const categoryColor = getCategoryColor();

  return (
    <div className="container-fluid p-0 pb-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header with back button */}
      <div className="d-flex align-items-center justify-content-between px-3 py-3" style={{ 
        background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}DD 100%)`,
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div className="d-flex align-items-center">
          <button 
            className="btn" 
            onClick={handleBack}
            style={{ 
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(5px)"
            }}
          >
            <i className="fas fa-arrow-left" style={{ fontSize: "0.9rem" }}></i>
          </button>
          <h5 className="mb-0 ms-2" style={{ fontSize: "1.3rem", fontWeight: "600" }}>{serviceDetails.name}</h5>
        </div>
        <button 
          onClick={handleWishlist}
          style={{ 
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: isWishlisted ? "#FF5A5F" : "white",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(5px)"
          }}
        >
          <i className={isWishlisted ? "fas fa-heart" : "far fa-heart"} style={{ fontSize: "1rem" }}></i>
        </button>
      </div>
      
      {/* Service Banner */}
      <div className="text-center p-4 position-relative" style={{ 
        background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}DD 100%)`,
        color: "white",
        borderRadius: "0 0 30px 30px",
        boxShadow: `0 8px 20px -10px ${categoryColor}88`
      }}>
        <div className="position-relative mb-4">
          <div style={{ 
            fontSize: "2.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            width: "90px",
            height: "90px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 10px 20px -8px rgba(0, 0, 0, 0.2)"
          }}>
            <i className={serviceDetails.icon}></i>
          </div>
          <div className="position-absolute" style={{
            right: "calc(50% - 70px)",
            bottom: "-5px",
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            color: "white",
            padding: "5px 15px",
            borderRadius: "20px",
            fontSize: "0.9rem",
            fontWeight: "500",
            backdropFilter: "blur(5px)"
          }}>
            {serviceDetails.rating} Rating
          </div>
        </div>
        <h1 className="fw-bold mb-3" style={{ 
          fontSize: "2rem", 
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
        }}>{serviceDetails.name}</h1>
        <p className="mb-3 mx-auto" style={{ maxWidth: "600px", fontSize: "1rem" }}>{serviceDetails.description}</p>
        <div style={{ 
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          display: "inline-block",
          padding: "8px 20px",
          borderRadius: "30px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          backdropFilter: "blur(5px)"
        }}>
          Starting from ₹{serviceDetails.price}
        </div>
      </div>
      
      {/* Quick Booking Calculator */}
      <div className="mx-3 p-4 rounded shadow-sm" style={{ 
        backgroundColor: "white", 
        marginTop: "-25px", 
        borderRadius: "12px",
        border: "1px solid #eaeaea",
        position: "relative",
        zIndex: 10
      }}>
        <h5 className="fw-bold mb-3">Quick Price Calculator</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Shoe Type</label>
            <select 
              className="form-select" 
              value={shoeType}
              onChange={(e) => setShoeType(e.target.value)}
              style={{ borderRadius: "8px", padding: "10px" }}
            >
              {serviceDetails.shoeTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name} - ₹{type.price}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Quantity</label>
            <div className="input-group">
              <button 
                className="btn" 
                type="button" 
                onClick={decrementQuantity}
                style={{ backgroundColor: `${categoryColor}15`, borderColor: "#e0e0e0" }}
              >-</button>
              <input 
                type="number" 
                className="form-control text-center" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                style={{ borderLeft: "none", borderRight: "none" }}
              />
              <button 
                className="btn" 
                type="button" 
                onClick={incrementQuantity}
                style={{ backgroundColor: `${categoryColor}15`, borderColor: "#e0e0e0" }}
              >+</button>
            </div>
          </div>
        </div>
        
        {/* Add-ons Section */}
        <div className="mt-3">
          <label className="form-label">Add-on Services</label>
          <div className="row g-2">
            {serviceDetails.addOns.map(addOn => (
              <div key={addOn.id} className="col-12">
                <div 
                  className={`p-3 rounded d-flex align-items-center justify-content-between ${selectedAddOns.includes(addOn.id) ? 'border border-2' : 'border'}`} 
                  style={{ 
                    cursor: "pointer",
                    backgroundColor: selectedAddOns.includes(addOn.id) ? `${categoryColor}15` : "white",
                    borderColor: selectedAddOns.includes(addOn.id) ? categoryColor : "#e0e0e0"
                  }}
                  onClick={() => toggleAddOn(addOn.id)}
                >
                  <div>
                    <div className="fw-bold">{addOn.name}</div>
                    <div className="small text-muted">{addOn.description}</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="fw-bold me-2">₹{addOn.price}</div>
                    <div 
                      className="rounded-circle" 
                      style={{ 
                        width: "24px", 
                        height: "24px", 
                        border: `2px solid ${selectedAddOns.includes(addOn.id) ? categoryColor : '#adb5bd'}`,
                        backgroundColor: selectedAddOns.includes(addOn.id) ? categoryColor : 'transparent',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white"
                      }}
                    >
                      {selectedAddOns.includes(addOn.id) && <i className="fas fa-check fa-xs"></i>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <hr className="my-3" />
        
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="text-muted mb-0">Total Price:</h5>
          <h4 className="mb-0" style={{ color: categoryColor, fontWeight: "700" }}>₹{calculatePrice()}</h4>
        </div>
        
        <button 
          className="btn w-100 mt-3" 
          onClick={handleBookService}
          style={{ 
            backgroundColor: categoryColor,
            color: "white",
            padding: "12px",
            borderRadius: "8px",
            fontWeight: "600",
            boxShadow: `0 4px 15px -5px ${categoryColor}88`
          }}
        >
          Book Service
        </button>
      </div>
      
      {/* Service Description */}
      <div className="px-3 mt-4 mb-4">
        <div className="p-4 rounded" style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}>
          <h5 className="fw-bold mb-3">About This Service</h5>
          <p style={{ lineHeight: "1.8" }}>{serviceDetails.longDescription}</p>
        </div>
      </div>
      
      {/* Features */}
      <div className="px-3 mb-4">
        <div className="p-4 rounded" style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}>
          <h5 className="fw-bold mb-3">What's Included</h5>
          <div className="row g-2">
            {serviceDetails.features.map((feature, index) => (
              <div key={index} className="col-12">
                <div className="d-flex align-items-center p-2">
                  <div className="me-3" style={{ 
                    width: "36px", 
                    height: "36px", 
                    borderRadius: "50%", 
                    backgroundColor: `${categoryColor}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: categoryColor
                  }}>
                    <i className="fas fa-check"></i>
                  </div>
                  <div>{feature}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Service Process */}
      <div className="px-3 mb-4">
        <div className="p-4 rounded" style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}>
          <h5 className="fw-bold mb-3">Our Process</h5>
          <div className="row g-3">
            {serviceDetails.process.map((step, index) => (
              <div key={index} className="col-md-6 col-lg-2">
                <div className="text-center p-3" style={{ 
                  backgroundColor: "white", 
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}>
                  <div className="mb-2 mx-auto" style={{ 
                    width: "50px", 
                    height: "50px", 
                    borderRadius: "50%", 
                    backgroundColor: `${categoryColor}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    color: categoryColor
                  }}>
                    <i className={step.icon}></i>
                  </div>
                  <h6 className="fw-bold">{step.name}</h6>
                  <p className="small text-muted mb-0">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="px-3 mt-4">
        <div className="p-4 rounded shadow-sm" style={{ backgroundColor: "white", borderRadius: "12px" }}>
          <h5 className="fw-bold mb-3">Customer Testimonials</h5>
          <div className="row g-3">
            {serviceDetails.testimonials.map((testimonial, index) => (
              <div key={index} className="col-md-6">
                <div className="p-3" style={{ 
                  backgroundColor: `${categoryColor}08`,
                  borderRadius: "10px",
                  border: `1px solid ${categoryColor}20`
                }}>
                  <div className="d-flex align-items-center mb-2">
                    <div style={{ 
                      width: "40px",
                      height: "40px",
                      backgroundColor: `${categoryColor}20`,
                      color: categoryColor,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold"
                    }}>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="ms-2">
                      <p className="mb-0 fw-bold">{testimonial.name}</p>
                      <div>
                        <span style={{ color: "#FFD700" }}>★</span> {testimonial.rating}
                      </div>
                    </div>
                  </div>
                  <p className="mb-0">{testimonial.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Info Section */}
      <div className="px-3 mt-4 mb-4">
        <div className="p-3 rounded" style={{ 
          backgroundColor: `${categoryColor}10`,
          border: `1px solid ${categoryColor}30`,
          borderRadius: "12px"
        }}>
          <div className="d-flex align-items-center mb-2">
            <i className="fas fa-info-circle me-2" style={{ color: categoryColor }}></i>
            <h6 className="fw-bold mb-0">Important Information</h6>
          </div>
          <p className="mb-0">For best results, please remove laces and insoles before sending your shoes. We recommend professional shoe cleaning every 3 months for optimal care and maintenance.</p>
        </div>
      </div>
      
      {/* Book Now Button */}
      <div className="px-3 mt-4 mb-5">
        <button 
          className="btn btn-lg w-100 py-3" 
          style={{ 
            background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}DD 100%)`,
            color: "white",
            fontWeight: "600",
            borderRadius: "10px",
            boxShadow: `0 8px 15px ${categoryColor}80`,
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}
          onClick={handleBookService}
        >
          <i className="fas fa-shopping-cart me-2"></i> Book Now • ₹{calculatePrice()}
        </button>
        <div className="text-center mt-3">
          <p className="text-muted mb-0"><small>Free pickup and delivery for orders above ₹499</small></p>
        </div>
      </div>
    </div>
  );
};

export default ShoeCleaningPage; 