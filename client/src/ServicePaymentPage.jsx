import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from './UserContext';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./ServicePaymentPage.css";

const ServicePaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, addActiveBooking } = useUser();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (location.state?.service) {
      setServiceDetails(location.state.service);
      setIsLoading(false);
    } else {
      // Redirect back if no service data was passed
      navigate('/services');
    }
  }, [location.state, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePaymentSelection = (paymentId) => {
    setSelectedPayment(paymentId);
  };

  const handleContinue = () => {
    if (selectedPayment) {
      // Prepare full service details with payment information
      const bookingDetails = {
        ...serviceDetails,
        paymentMethod: selectedPayment,
        estimatedTime: '30-40 min', // Default estimated time
        orderDate: new Date().toISOString(),
        status: 'confirmed'
      };
      
      // Create an active booking in the context
      addActiveBooking(bookingDetails);
      
      // Show confirmation splash screen
      setShowConfirmation(true);
      
      // Navigate to home page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };

  // Confirmation splash screen component
  const BookingConfirmation = () => (
    <div className="booking-confirmation">
      <div className="confirmation-content">
        <div className="confirmation-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h3>Service Booked Successfully!</h3>
        <p>Redirecting to home page...</p>
      </div>
    </div>
  );

  if (isLoading) {
    return <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="spinner-border" style={{ color: "#2A8D8F" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  if (showConfirmation) {
    return <BookingConfirmation />;
  }

  // Payment methods to display (UPI, cards, etc.)
  const paymentOptions = [
    { id: 'paytm', name: 'Paytm', balance: '₹0.73', type: 'upi', icon: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg' },
    { id: 'mobikwik', name: 'Mobikwik', balance: '₹0.00', type: 'upi', icon: 'https://play-lh.googleusercontent.com/B5cNBA15IxjCT-8UTXQYgXn2Zm_9ljP_9zBi2B-XPgW66zyes91RyNaz2eMVKWWBiz8' },
    { id: 'freecharge', name: 'FreeCharge', balance: '₹0.00', type: 'upi', icon: 'https://play-lh.googleusercontent.com/Vyp7I5S8SBxgdqO3k-ITQoSjvw5gjBN4sxQYFbf1qGZQzZKHgP5S49OqXoEwMgAH2w' },
  ];

  const getCategoryColor = () => {
    if (serviceDetails && serviceDetails.category) {
      const categories = {
        "daily": "#FF9800",
        "premium": "#8E44AD",
        "home": "#4CAF50",
        "quick": "#F44336",
        "default": "#40BFC1"
      };
      return categories[serviceDetails.category] || categories.default;
    }
    return "#40BFC1"; // Default color
  };

  const categoryColor = getCategoryColor();

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header */}
      <div className="d-flex align-items-center px-3 py-3 payment-header">
        <button className="btn back-button" onClick={handleBack}>
          <i className="fas fa-chevron-left" style={{ fontSize: "0.9rem", color: "#666" }}></i>
        </button>
        <h5 className="mb-0 ms-3" style={{ fontWeight: "600" }}>Select Payment Method</h5>
      </div>

      {/* Order Summary */}
      <div className="px-3 pt-2 pb-3" style={{ backgroundColor: "white", borderBottom: "1px solid #eaeaea" }}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-0" style={{ color: "#666", fontSize: "0.9rem" }}>Order Total</p>
            <h4 className="mb-0" style={{ fontWeight: "700", color: "#333" }}>₹{serviceDetails.totalPrice}</h4>
          </div>
          <div style={{ 
            padding: "8px 12px",
            backgroundColor: `${categoryColor}15`,
            borderRadius: "6px",
            display: "flex",
            alignItems: "center"
          }}>
            <i className={serviceDetails.icon} style={{ color: categoryColor, marginRight: "8px" }}></i>
            <span style={{ fontWeight: "500", color: categoryColor }}>{serviceDetails.name}</span>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="p-3">
        {/* UPI Options */}
        <div className="mb-4 payment-section">
          <h6 className="mb-3 ps-2" style={{ fontSize: "0.85rem", color: "#666", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Pay via UPI</h6>
          {paymentOptions.map((option) => (
            <div 
              key={option.id} 
              className="d-flex align-items-center justify-content-between p-3 mb-2 payment-option"
              style={{ 
                backgroundColor: "white", 
                borderRadius: "12px",
                border: selectedPayment === option.id ? `1px solid ${categoryColor}` : "1px solid #eaeaea",
                cursor: "pointer",
                boxShadow: selectedPayment === option.id ? `0 4px 12px ${categoryColor}30` : "0 1px 3px rgba(0,0,0,0.05)"
              }}
              onClick={() => handlePaymentSelection(option.id)}
            >
              <div className="d-flex align-items-center">
                <div className="payment-logo-container">
                  <img 
                    src={option.icon} 
                    alt={option.name} 
                    className="payment-logo"
                  />
                </div>
                <div>
                  <p className="mb-0" style={{ fontWeight: "500", color: "#333" }}>{option.name}</p>
                  <p className="mb-0" style={{ fontSize: "0.8rem", color: "#666" }}>{option.balance}</p>
                </div>
              </div>
              <div 
                className="payment-radio"
                style={{ 
                  border: `2px solid ${selectedPayment === option.id ? categoryColor : "#ddd"}`,
                }}
              >
                {selectedPayment === option.id && 
                  <div className="payment-radio-inner" style={{ backgroundColor: categoryColor }}></div>
                }
              </div>
            </div>
          ))}
        </div>

        {/* Netbanking Option */}
        <div className="mb-4 payment-section">
          <h6 className="mb-3 ps-2" style={{ fontSize: "0.85rem", color: "#666", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Netbanking</h6>
          <div 
            className="d-flex align-items-center justify-content-between p-3 mb-2 payment-option"
            style={{ 
              backgroundColor: "white", 
              borderRadius: "12px",
              border: selectedPayment === 'netbanking' ? `1px solid ${categoryColor}` : "1px solid #eaeaea",
              cursor: "pointer",
              boxShadow: selectedPayment === 'netbanking' ? `0 4px 12px ${categoryColor}30` : "0 1px 3px rgba(0,0,0,0.05)"
            }}
            onClick={() => handlePaymentSelection('netbanking')}
          >
            <div className="d-flex align-items-center">
              <div className="payment-icon-container" style={{ backgroundColor: "#f5f5f5" }}>
                <i className="fas fa-university" style={{ color: "#666" }}></i>
              </div>
              <p className="mb-0" style={{ fontWeight: "500", color: "#333" }}>Netbanking</p>
            </div>
            <i className="fas fa-chevron-right" style={{ color: "#ccc" }}></i>
          </div>
        </div>

        {/* Cash on Delivery Option */}
        <div className="mb-4 payment-section">
          <h6 className="mb-3 ps-2" style={{ fontSize: "0.85rem", color: "#666", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>Other Payment Methods</h6>
          <div 
            className="d-flex align-items-center justify-content-between p-3 mb-3 payment-option"
            style={{ 
              backgroundColor: "white", 
              borderRadius: "12px",
              border: selectedPayment === 'cod' ? `1px solid ${categoryColor}` : "1px solid #eaeaea",
              cursor: "pointer",
              boxShadow: selectedPayment === 'cod' ? `0 4px 12px ${categoryColor}30` : "0 1px 3px rgba(0,0,0,0.05)"
            }}
            onClick={() => handlePaymentSelection('cod')}
          >
            <div className="d-flex align-items-center">
              <div className="payment-icon-container" style={{ 
                backgroundColor: selectedPayment === 'cod' ? "#E8F5E9" : "#f5f5f5",
                transition: "all 0.3s ease" 
              }}>
                <i className="fas fa-money-bill-wave" style={{ color: "#4CAF50" }}></i>
              </div>
              <div>
                <p className="mb-0" style={{ fontWeight: "500", color: "#333" }}>Cash on delivery</p>
                <p className="mb-0" style={{ fontSize: "0.8rem", color: "#666" }}>Pay when service is completed</p>
              </div>
            </div>
            <div 
              className="payment-radio"
              style={{ 
                border: `2px solid ${selectedPayment === 'cod' ? categoryColor : "#ddd"}`,
              }}
            >
              {selectedPayment === 'cod' && 
                <div className="payment-radio-inner" style={{ backgroundColor: categoryColor }}></div>
              }
            </div>
          </div>

          {/* Continue Button - Moved right below Cash on Delivery */}
          <button 
            className="continue-button" 
            onClick={handleContinue}
            style={{ 
              backgroundColor: selectedPayment ? "#2A8D8F" : "#ccc",
              color: "white",
              boxShadow: selectedPayment ? "0 4px 12px rgba(42, 141, 143, 0.3)" : "none",
              marginTop: "10px"
            }}
            disabled={!selectedPayment}
          >
            Continue
          </button>
        </div>

        {/* Payment Security Info */}
        <div className="payment-info-section text-center mt-4">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <i className="fas fa-shield-alt me-2" style={{ color: "#666" }}></i>
            <p className="mb-0" style={{ color: "#666", fontSize: "0.9rem", fontWeight: "500" }}>Secure Payment Processing</p>
          </div>
          <p className="mb-0" style={{ color: "#888", fontSize: "0.8rem" }}>Your payment information is processed securely.</p>
        </div>
      </div>
    </div>
  );
};

export default ServicePaymentPage; 