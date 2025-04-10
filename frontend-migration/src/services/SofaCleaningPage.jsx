import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const SofaCleaningPage = () => {
  const navigate = useNavigate();
  
  const serviceDetails = {
    id: "sofa-cleaning",
    name: "Sofa Cleaning",
    icon: "fas fa-couch",
    price: 899,
    description: "Professional cleaning for all types of sofas and upholstery",
    longDescription: "Our specialized Sofa Cleaning service restores and refreshes your upholstered furniture to like-new condition. Using advanced extraction methods and premium cleaning solutions, we remove dirt, stains, allergens, and odors from all types of sofas and upholstery, extending the life of your furniture while improving indoor air quality.",
    features: [
      "Deep extraction cleaning",
      "Stain and spot treatment",
      "Fabric-appropriate solutions",
      "Allergen removal",
      "Odor elimination",
      "Protective treatment available"
    ],
    priceOptions: [
      { name: "Single Seater Sofa", price: 899, unit: "per seat" },
      { name: "Double Seater Sofa", price: 1299, unit: "per sofa" },
      { name: "3-Seater Sofa", price: 1699, unit: "per sofa" },
      { name: "L-Shaped Sofa", price: 2499, unit: "per sofa" },
      { name: "Fabric Protection Treatment", price: 499, unit: "additional" }
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
        background: "linear-gradient(135deg, #8E44AD 0%, #9B59B6 100%)",
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
              <i className="fas fa-check-circle me-3" style={{ color: "#8E44AD" }}></i>
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
            <thead style={{ backgroundColor: "#F5EEF8" }}>
              <tr>
                <th>Sofa Type</th>
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
          backgroundColor: "#F5EEF8",
          border: "1px solid #E8DAEF",
          borderRadius: "12px"
        }}>
          <div className="d-flex align-items-center mb-2">
            <i className="fas fa-info-circle me-2" style={{ color: "#8E44AD" }}></i>
            <h6 className="fw-bold mb-0">Service Details</h6>
          </div>
          <p className="mb-0">The cleaning process takes approximately 1-3 hours depending on the size and condition of your sofa. Please allow 4-6 hours for complete drying. For best results, vacuum your sofa before our professionals arrive and remove any removable cushion covers.</p>
        </div>
      </div>
      
      {/* Book Now Button */}
      <div className="px-3 mt-5">
        <button 
          className="btn btn-lg w-100 py-3" 
          style={{ 
            backgroundColor: "#8E44AD", 
            color: "white",
            fontWeight: "600",
            borderRadius: "10px",
            boxShadow: "0 4px 15px rgba(142, 68, 173, 0.3)"
          }}
          onClick={handleBookService}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default SofaCleaningPage; 