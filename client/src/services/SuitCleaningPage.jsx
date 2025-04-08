import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const SuitCleaningPage = () => {
  const navigate = useNavigate();
  
  const serviceDetails = {
    id: "suit-clean",
    name: "Suit Cleaning",
    icon: "fas fa-user-tie",
    price: 599,
    description: "Expert cleaning and pressing for suits and formal wear",
    longDescription: "Our premium suit cleaning service is specially designed for business suits, tuxedos, and formal wear. We use specialized techniques and premium solvents to clean, treat, and meticulously press your suits, ensuring they maintain their shape, fit, and professional appearance.",
    features: [
      "Specialized dry cleaning for suits",
      "Precise hand finishing",
      "Button and seam inspection",
      "Hand pressing for lapels and collars",
      "Suit bag packaging"
    ],
    priceOptions: [
      { name: "2-Piece Suit", price: 599, unit: "per suit" },
      { name: "3-Piece Suit", price: 799, unit: "per suit" },
      { name: "Tuxedo", price: 899, unit: "per piece" },
      { name: "Blazer/Sport Coat", price: 399, unit: "per piece" },
      { name: "Formal Trousers", price: 249, unit: "per piece" }
    ]
  };
  
  const handleBookService = () => {
    try {
      navigate(`/service/${serviceDetails.id}`);
    } catch (err) {
      console.error("Navigation error:", err);
      alert("Could not navigate to service booking page. Please try again.");
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
        background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
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
      
      {/* Service Features */}
      <div className="px-3 mb-4">
        <h5 className="fw-bold mb-3">Features</h5>
        <div className="list-group">
          {serviceDetails.features.map((feature, index) => (
            <div key={index} className="list-group-item d-flex align-items-center">
              <i className="fas fa-check-circle me-3" style={{ color: "#2c3e50" }}></i>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price List */}
      <div className="px-3 mb-4">
        <h5 className="fw-bold mb-3">Price List</h5>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead style={{ backgroundColor: "#f5f7fa" }}>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {serviceDetails.priceOptions.map((option, index) => (
                <tr key={index}>
                  <td>{option.name}</td>
                  <td>₹{option.price}</td>
                  <td>{option.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Info Section */}
      <div className="px-3 mb-4">
        <div className="p-3 rounded" style={{ 
          backgroundColor: "#f5f7fa",
          border: "1px solid #dfe4ea",
          borderRadius: "12px"
        }}>
          <div className="d-flex align-items-center mb-2">
            <i className="fas fa-star me-2" style={{ color: "#2c3e50" }}></i>
            <h6 className="fw-bold mb-0">Professional Tip</h6>
          </div>
          <p className="mb-0">For best results, have your suits professionally cleaned after 3-4 wears to maintain their appearance and extend their lifespan. Empty all pockets before sending your suit for cleaning.</p>
        </div>
      </div>
      
      {/* Book Now Button */}
      <div className="px-3 mt-5">
        <button 
          className="btn btn-lg w-100 py-3" 
          style={{ 
            backgroundColor: "#2c3e50", 
            color: "white",
            fontWeight: "600",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(44, 62, 80, 0.3)"
          }}
          onClick={handleBookService}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SuitCleaningPage; 