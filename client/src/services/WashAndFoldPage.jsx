import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { useUser } from "../UserContext";

const WashAndFoldPage = () => {
  const navigate = useNavigate();
  const { addToWishlist } = useUser();
  const [quantity, setQuantity] = useState(1);
  const [selectedItem, setSelectedItem] = useState("regular");
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const serviceDetails = {
    id: "wash-fold",
    name: "Wash & Fold",
    icon: "fas fa-tshirt",
    price: 349,
    description: "Convenient wash, dry and fold service for everyday clothes",
    longDescription: "Our Wash & Fold service offers a complete solution for your everyday laundry needs. We collect your clothes, carefully sort them, wash using premium detergents, thoroughly dry, and neatly fold everything before delivering back to you. Perfect for busy professionals and families looking to save time on routine laundry tasks.",
    features: [
      "Gentle machine washing",
      "Premium detergents and fabric softeners",
      "Temperature-controlled drying",
      "Professional folding and packaging",
      "Quick 24-hour turnaround"
    ],
    priceOptions: [
      { id: "regular", name: "Regular Wash", price: 349, unit: "per kg", description: "Basic wash with standard detergent" },
      { id: "premium", name: "Premium Wash", price: 399, unit: "per kg", description: "Premium detergents with fabric softener" },
      { id: "delicate", name: "Delicate Wash", price: 449, unit: "per kg", description: "Special care for delicate fabrics" },
      { id: "heavy", name: "Heavy Items", price: 499, unit: "per piece", description: "For comforters, curtains, etc." }
    ],
    process: [
      { name: "Sorting", description: "We sort your clothes by fabric, color, and washing requirements", icon: "fas fa-layer-group" },
      { name: "Washing", description: "Advanced washing using premium detergents and softeners", icon: "fas fa-soap" },
      { name: "Drying", description: "Gentle and precise drying at optimal temperatures", icon: "fas fa-wind" },
      { name: "Folding", description: "Professional and neat folding of all clothing items", icon: "fas fa-tshirt" },
      { name: "Packaging", description: "Garments packaged neatly and returned fresh and clean", icon: "fas fa-box" }
    ],
    testimonials: [
      { name: "Kiran T.", rating: 5, comment: "Super convenient service! My clothes always come back smelling fresh and neatly folded." },
      { name: "Anish S.", rating: 4, comment: "Great service overall. Love the weight-based pricing system." }
    ],
    category: "daily",
    rating: 4.8
  };
  
  const calculatePrice = () => {
    const selectedOption = serviceDetails.priceOptions.find(opt => opt.id === selectedItem);
    return selectedOption ? selectedOption.price * quantity : 0;
  };
  
  const handleBookService = () => {
    try {
      navigate('/service-payment', { state: { service: { ...serviceDetails, quantity: quantity, selectedOption: selectedItem, totalPrice: calculatePrice() } } });
    } catch (err) {
      console.error("Navigation error:", err);
      alert("Could not navigate to payment page. Please try again.");
    }
  };
  
  const handleWishlist = (e) => {
    e.stopPropagation();
    try {
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

  return (
    <div className="container-fluid p-0 pb-5">
      {/* Header with back button */}
      <div className="d-flex align-items-center mb-3 px-3 py-2" style={{ 
        background: "linear-gradient(135deg, #40BFC1 0%, #32a8aa 100%)",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <button 
          className="btn btn-sm text-white" 
          onClick={handleBack}
          style={{ background: "none", border: "none" }}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h5 className="mb-0 ms-2 fw-bold">{serviceDetails.name}</h5>
      </div>
      
      {/* Service Banner */}
      <div className="mb-4 text-center p-4" style={{ 
        background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
        color: "white",
        borderRadius: "0 0 20px 20px"
      }}>
        <div className="mb-3" style={{ 
          fontSize: "2.5rem",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto"
        }}>
          <i className={serviceDetails.icon}></i>
        </div>
        <h2 className="fw-bold mb-2">{serviceDetails.name}</h2>
        <p className="mb-3">{serviceDetails.description}</p>
        <div style={{ 
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          display: "inline-block",
          padding: "5px 15px",
          borderRadius: "20px",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}>
          Starting from ₹{serviceDetails.price}
        </div>
      </div>
      
      {/* Service Description */}
      <div className="px-3 mb-4">
        <h5 className="fw-bold mb-3">About This Service</h5>
        <p style={{ lineHeight: "1.6" }}>{serviceDetails.longDescription}</p>
      </div>
      
      {/* Service Process */}
      <div className="px-3 mb-4">
        <h5 className="fw-bold mb-4">Our Service Process</h5>
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
                  backgroundColor: "#e3f2fd",
                  color: "#3498db"
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
      <div className="px-3 mb-4">
        <h5 className="fw-bold mb-3">Features</h5>
        <div className="list-group">
          {serviceDetails.features.map((feature, index) => (
            <div key={index} className="list-group-item d-flex align-items-center">
              <i className="fas fa-check-circle me-3" style={{ color: "#3498db" }}></i>
              <span>{feature}</span>
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
              <thead style={{ backgroundColor: "#e3f2fd" }}>
                <tr>
                  <th style={{ fontWeight: "600" }}>Package</th>
                  <th style={{ fontWeight: "600" }}>Price (₹)</th>
                  <th style={{ fontWeight: "600" }}>Unit</th>
                </tr>
              </thead>
              <tbody>
                {serviceDetails.priceOptions.map((option, index) => (
                  <tr key={index}>
                    <td>{option.name}</td>
                    <td className="fw-bold" style={{ color: "#3498db" }}>₹{option.price}</td>
                    <td>{option.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="alert alert-primary mt-3 mb-0" role="alert" style={{ borderRadius: "8px", backgroundColor: "#e3f2fd", borderColor: "#bbdefb", color: "#0d47a1" }}>
            <div className="d-flex">
              <div className="me-3">
                <i className="fas fa-info-circle fs-4"></i>
              </div>
              <div>
                <p className="mb-0">For loads exceeding 8 kg, each additional kg will be charged at ₹80 per kg. Special care items like silk, wool, or cashmere may be charged extra.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Customer Testimonials */}
      <div className="px-3 mb-4">
        <h5 className="fw-bold mb-3">What Our Customers Say</h5>
        <div className="row g-3">
          {serviceDetails.testimonials.map((testimonial, index) => (
            <div key={index} className="col-md-6">
              <div className="p-3 rounded" style={{ 
                backgroundColor: "white",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                border: "1px solid #eaeaea"
              }}>
                <div className="d-flex align-items-center mb-2">
                  <div className="me-2" style={{ color: "#FFD700" }}>
                    {"★".repeat(testimonial.rating)}
                    {"☆".repeat(5 - testimonial.rating)}
                  </div>
                  <span className="fw-bold">{testimonial.name}</span>
                </div>
                <p className="mb-0 text-muted">{testimonial.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Book Now Button */}
      <div className="px-3 mt-5">
        <button 
          className="btn btn-lg w-100 py-3" 
          style={{ 
            backgroundColor: "#3498db", 
            color: "white",
            fontWeight: "600",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(52, 152, 219, 0.3)"
          }}
          onClick={handleBookService}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default WashAndFoldPage; 