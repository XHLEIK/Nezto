import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { useUser } from "../UserContext";

const IroningPage = () => {
  const navigate = useNavigate();
  const { addToWishlist } = useUser();
  const [quantity, setQuantity] = useState(1);
  const [garmentType, setGarmentType] = useState("shirts");
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const serviceDetails = {
    id: "ironing",
    name: "Ironing Service",
    icon: "fas fa-hot-tub",
    price: 8.99,
    description: "Professional pressing service for wrinkle-free garments",
    longDescription: "Our professional ironing service delivers perfectly pressed, crisp garments. We use commercial-grade equipment and techniques to ensure your clothes look their best, perfectly pressed and ready to wear.",
    features: [
      "Commercial steam press equipment",
      "Skilled professional pressers",
      "Special attention to details & pleats",
      "Organized garment hanging & folding",
      "Express service available",
      "Temperature adjusted per fabric type"
    ],
    priceOptions: [
      { id: "shirts", name: "Shirts & Tops", price: 8.99, unit: "per piece" },
      { id: "pants", name: "Pants & Trousers", price: 12.99, unit: "per piece" },
      { id: "dresses", name: "Dresses", price: 14.99, unit: "per piece" },
      { id: "suits", name: "Suits (2 piece)", price: 19.99, unit: "per set" },
      { id: "sarees", name: "Sarees", price: 14.99, unit: "per piece" }
    ],
    process: [
      { name: "Sorting", description: "Categorizing garments by fabric type and temperature requirements", icon: "fas fa-tasks" },
      { name: "Pre-treatment", description: "Light misting for stubborn wrinkles if needed", icon: "fas fa-spray-can" },
      { name: "Pressing", description: "Professional steam pressing with commercial equipment", icon: "fas fa-temperature-high" },
      { name: "Finishing", description: "Final touches and detail work on collars, cuffs and pleats", icon: "fas fa-check-double" },
      { name: "Packaging", description: "Properly hung or folded to prevent new wrinkles", icon: "fas fa-box" }
    ],
    testimonials: [
      { name: "Vikash P.", rating: 4.8, comment: "Perfect pressing every time. My office shirts have never looked better!" },
      { name: "Sanya M.", rating: 4.9, comment: "Saved me so much time. The pleats on my trousers were perfect." }
    ],
    bulk_discounts: [
      { pieces: "10+ Items", discount: "10% Off" },
      { pieces: "25+ Items", discount: "15% Off" },
      { pieces: "50+ Items", discount: "20% Off" }
    ],
    category: "quick",
    rating: 4.6
  };
  
  const handleBookService = () => {
    try {
      navigate('/service-payment', { state: { service: { ...serviceDetails, quantity: quantity, selectedOption: garmentType, totalPrice: calculatePrice() } } });
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

  const calculatePrice = () => {
    const item = serviceDetails.priceOptions.find(option => option.id === garmentType);
    return item ? item.price * quantity : 0;
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
            <label className="form-label">Garment Type</label>
            <select 
              className="form-select" 
              value={garmentType}
              onChange={(e) => setGarmentType(e.target.value)}
              style={{ borderRadius: "8px", padding: "10px" }}
            >
              {serviceDetails.priceOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name} - ₹{option.price}</option>
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
      
      {/* Service Process */}
      <div className="px-3 mb-4">
        <h5 className="fw-bold mb-4">Our Ironing Process</h5>
        <div className="row g-3">
          {serviceDetails.process.map((step, index) => (
            <div key={index} className="col-md-4 col-sm-6 mb-3">
              <div className="p-3 h-100 d-flex flex-column align-items-center text-center" style={{ 
                backgroundColor: "white", 
                borderRadius: "12px",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.05)",
                border: "1px solid #eaeaea"
              }}>
                <div className="mb-3 rounded-circle d-flex align-items-center justify-content-center" style={{ 
                  width: "60px", 
                  height: "60px", 
                  backgroundColor: "#f3e5f5",
                  color: "#8e44ad"
                }}>
                  <i className={step.icon} style={{ fontSize: "1.5rem" }}></i>
                </div>
                <h6 className="fw-bold">{step.name}</h6>
                <p className="text-muted small mb-0">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Service Features */}
      <div className="px-3 mb-5">
        <h5 className="fw-bold mb-3">Premium Features</h5>
        <div className="row g-3">
          {serviceDetails.features.map((feature, index) => (
            <div key={index} className="col-md-6">
              <div className="d-flex align-items-center p-3" style={{ 
                backgroundColor: "white", 
                borderRadius: "10px",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.05)",
                height: "100%",
                border: "1px solid #eaeaea"
              }}>
                <div className="me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ 
                  minWidth: "40px", 
                  height: "40px", 
                  backgroundColor: "#f3e5f5",
                  color: "#8e44ad"
                }}>
                  <i className="fas fa-check"></i>
                </div>
                <span>{feature}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price List */}
      <div className="px-3 mb-5">
        <div className="p-4 rounded shadow-sm" style={{ backgroundColor: "white", borderRadius: "12px" }}>
          <h5 className="fw-bold mb-4">Detailed Price List</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead style={{ backgroundColor: "#f3e5f5" }}>
                <tr>
                  <th style={{ fontWeight: "600" }}>Item</th>
                  <th style={{ fontWeight: "600" }}>Price (₹)</th>
                  <th style={{ fontWeight: "600" }}>Unit</th>
                </tr>
              </thead>
              <tbody>
                {serviceDetails.priceOptions.map((option, index) => (
                  <tr key={index}>
                    <td>{option.name}</td>
                    <td className="fw-bold" style={{ color: "#8e44ad" }}>₹{option.price}</td>
                    <td>{option.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Bulk Discounts */}
          <h6 className="fw-bold mt-4 mb-3">Bulk Order Discounts</h6>
          <div className="row g-3">
            {serviceDetails.bulk_discounts.map((discount, index) => (
              <div key={index} className="col-md-4">
                <div className="p-3 text-center" style={{ 
                  backgroundColor: "#f3e5f5", 
                  borderRadius: "8px",
                  color: "#8e44ad",
                  height: "100%"
                }}>
                  <h6 className="fw-bold mb-2">{discount.pieces}</h6>
                  <p className="mb-0 fw-bold" style={{ fontSize: "1.1rem" }}>{discount.discount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Customer Testimonials */}
      <div className="px-3 mb-5">
        <h5 className="fw-bold mb-3">Customer Reviews</h5>
        <div className="row g-3">
          {serviceDetails.testimonials.map((testimonial, index) => (
            <div key={index} className="col-md-6">
              <div className="p-3 h-100" style={{ 
                backgroundColor: "white", 
                borderRadius: "12px",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.05)",
                border: "1px solid #eaeaea"
              }}>
                <div className="d-flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={`fas fa-star me-1 ${i < testimonial.rating ? 'text-warning' : 'text-muted'}`}
                      style={{ fontSize: "0.9rem" }}
                    ></i>
                  ))}
                </div>
                <p className="mb-2" style={{ fontSize: "0.95rem" }}>"{testimonial.comment}"</p>
                <p className="mb-0 text-end" style={{ fontSize: "0.85rem", fontWeight: "600" }}>- {testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Special Offer */}
      <div className="px-3 mb-5">
        <div className="p-4 rounded" style={{ 
          background: "linear-gradient(135deg, #8e44ad 0%, #673ab7 100%)",
          color: "white",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(142, 68, 173, 0.3)"
        }}>
          <div className="row align-items-center">
            <div className="col-md-7">
              <h5 className="fw-bold mb-2">Corporate & Office Special</h5>
              <p className="mb-md-0">Get 25% off for your office formal wear. Schedule weekly pickup and enjoy consistent professional appearance.</p>
            </div>
            <div className="col-md-5 text-md-end text-center mt-3 mt-md-0">
              <button 
                className="btn py-2 px-4" 
                style={{ 
                  backgroundColor: "white", 
                  color: "#8e44ad",
                  fontWeight: "600",
                  borderRadius: "8px",
                }}
                onClick={() => alert("Contact us at corporate@nezto.com for bulk orders.")}
              >
                Corporate Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Book Now Button */}
      <div className="px-3 mt-4 mb-5">
        <button 
          className="btn btn-lg w-100 py-3" 
          style={{ 
            background: "linear-gradient(135deg, #8e44ad 0%, #673ab7 100%)",
            color: "white",
            fontWeight: "600",
            borderRadius: "10px",
            boxShadow: "0 8px 15px rgba(142, 68, 173, 0.3)",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}
          onClick={handleBookService}
        >
          <i className="fas fa-calendar-check me-2"></i> Book Now
        </button>
        <div className="text-center mt-3">
          <p className="text-muted mb-0"><small>Free pickup and delivery for orders above ₹499</small></p>
        </div>
      </div>
    </div>
  );
};

export default IroningPage; 