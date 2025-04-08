import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const CurtainWashIronPage = () => {
  const navigate = useNavigate();
  
  const serviceDetails = {
    id: "curtain-wash-iron",
    name: "Curtain Wash & Iron",
    icon: "fas fa-wind",
    price: 699,
    description: "Complete washing and ironing service for all curtain types",
    longDescription: "Our specialized Curtain Wash & Iron service provides comprehensive care for all types of curtains and drapes. We carefully wash your curtains using fabric-appropriate methods, gently dry them at controlled temperatures, and meticulously iron them to remove all wrinkles. Your curtains will be returned looking fresh, clean, and perfectly pressed.",
    features: [
      "Specialized curtain washing techniques",
      "Fabric-specific detergents",
      "Gentle drying process",
      "Expert ironing and finishing",
      "Careful packaging to prevent wrinkling",
      "Optional take-down and re-hang service"
    ],
    priceOptions: [
      { name: "Sheer Curtains", price: 699, unit: "per panel" },
      { name: "Light Cotton Curtains", price: 799, unit: "per panel" },
      { name: "Heavy/Lined Curtains", price: 999, unit: "per panel" },
      { name: "Extra Large Curtains", price: 1299, unit: "per panel" },
      { name: "Take-down & Re-hang Service", price: 499, unit: "per visit" }
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
        background: "linear-gradient(135deg, #00796B 0%, #009688 100%)",
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
              <i className="fas fa-check-circle me-3" style={{ color: "#00796B" }}></i>
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
            <thead style={{ backgroundColor: "#E0F2F1" }}>
              <tr>
                <th>Curtain Type</th>
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
      
      {/* Care Instructions */}
      <div className="px-3 mb-4">
        <div className="p-3 rounded" style={{ 
          backgroundColor: "#E0F2F1",
          border: "1px solid #B2DFDB",
          borderRadius: "12px"
        }}>
          <div className="d-flex align-items-center mb-2">
            <i className="fas fa-info-circle me-2" style={{ color: "#00796B" }}></i>
            <h6 className="fw-bold mb-0">Care Instructions</h6>
          </div>
          <p className="mb-0">For best results, please remove all hooks, rings, and hardware before sending your curtains. Take photos of your curtain arrangements if you want us to help with re-hanging them exactly as they were. Our specialized curtain cleaning process may take 3-5 days for optimal results.</p>
        </div>
      </div>
      
      {/* Book Now Button */}
      <div className="px-3 mt-5">
        <button 
          className="btn btn-lg w-100 py-3" 
          style={{ 
            backgroundColor: "#00796B", 
            color: "white",
            fontWeight: "600",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(0, 121, 107, 0.3)"
          }}
          onClick={handleBookService}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CurtainWashIronPage; 