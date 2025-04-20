import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import '../styles/OrderTrackingPage.css';

const OrderTrackingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { activeBooking, updateBookingStatus, clearActiveBooking } = useUser();
  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  // Custom tracking steps for laundry service flow
  const [trackingSteps, setTrackingSteps] = useState([
    { id: 1, name: 'Service Booked', completed: true, time: new Date() },
    { id: 2, name: 'Pick Up Confirmed', completed: false },
    { id: 3, name: 'Handed Over to Washerman', completed: false },
    { id: 4, name: 'Clothes Delivered', completed: false }
  ]);
  
  // Use the OTP from the active booking
  const [orderOTP, setOrderOTP] = useState('');
  
  // Format time from timestamp
  const formatTime = (date) => {
    if (!date) return '';
    const timeObj = new Date(date);
    return timeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format date from timestamp
  const formatDate = (date) => {
    if (!date) return '';
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short',
      year: 'numeric'
    });
  };
  
  // Format relative time (e.g. "15 min ago")
  const formatRelativeTime = (date) => {
    if (!date) return '';
    const now = new Date();
    const then = new Date(date);
    const diffMs = now - then;
    const diffMins = Math.round(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hr ago`;
    
    return formatDate(date);
  };
  
  // Mock function to simulate professional location
  const getProfessionalLocation = () => {
    // In a real app, this would be fetched from an API
    return {
      lat: 28.4595 + (Math.random() * 0.01),
      lng: 77.0266 + (Math.random() * 0.01)
    };
  };

  // Custom function to update tracking steps
  const updateCustomTrackingStatus = (stepId) => {
    setTrackingSteps(prevSteps => 
      prevSteps.map(step => {
        if (step.id === stepId) {
          return { ...step, completed: true, time: new Date() };
        }
        // Also mark previous steps as completed if not already
        if (step.id < stepId && !step.completed) {
          return { ...step, completed: true, time: new Date() };
        }
        return step;
      })
    );
    setActiveStep(stepId);
  };
  
  useEffect(() => {
    // If no active booking, redirect to home
    if (!activeBooking) {
      navigate('/');
      return;
    }
    
    // Set initial tracking steps with first step completed
    setTrackingSteps(prev => [
      { ...prev[0], completed: true, time: new Date(activeBooking.createdAt) },
      ...prev.slice(1)
    ]);
    
    // Set active step to 2 (Pick Up stage) to show the confirm button
    setActiveStep(2);
    
    // Set the OTP from the active booking
    if (activeBooking.otp) {
      setOrderOTP(activeBooking.otp);
    } else {
      // Fallback: If no OTP exists in the booking, generate a new one
      const newOTP = Math.floor(1000 + Math.random() * 9000).toString();
      setOrderOTP(newOTP);
      
      // Update the active booking with the new OTP
      const updatedBooking = {
        ...activeBooking,
        otp: newOTP
      };
      
      // Save to localStorage to persist the OTP
      try {
        localStorage.setItem('nezto_active_booking', JSON.stringify(updatedBooking));
        console.log("OrderTrackingPage: Generated and saved new OTP:", newOTP);
      } catch (e) {
        console.error("Error saving OTP to localStorage:", e);
      }
    }
    
    // Check if returning from OTP verification page with success
    if (location.state && location.state.otpVerified) {
      // Update to step 3 (Handed Over to Washerman) after OTP verification
      updateCustomTrackingStatus(3);
    }
    
    // Clean up function
    return () => {
      // Cleanup code if needed
    };
  }, [activeBooking, navigate, location]);
  
  // If no active booking, show loading
  if (!activeBooking) {
    return (
      <div className="tracking-loading">
        <div className="loading-animation">
          <div className="spinner"></div>
          <p>Loading your booking details...</p>
        </div>
      </div>
    );
  }
  
  // Get service color
  const getCategoryColor = () => {
    const service = activeBooking.service;
    if (service && service.category) {
      const categories = {
        "daily": "#FF9800",
        "premium": "#8E44AD",
        "home": "#4CAF50",
        "quick": "#F44336",
        "default": "#2A8D8F"
      };
      return categories[service.category] || categories.default;
    }
    return "#2A8D8F"; // Default color
  };
  
  const categoryColor = getCategoryColor();
  
  // Get current step from custom tracking steps
  const getCurrentStep = () => {
    const completed = trackingSteps.filter(step => step.completed);
    return completed.length > 0 ? completed[completed.length - 1] : null;
  };
  
  const currentStep = getCurrentStep();
  
  // Calculate progress percentage based on custom tracking steps
  const calculateProgress = () => {
    const completedSteps = trackingSteps.filter(step => step.completed).length;
    const totalSteps = trackingSteps.length;
    return (completedSteps / totalSteps) * 100;
  };

  // Estimated arrival time (mock for demo)
  const getEstimatedArrival = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 25);
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get step status text based on active step
  const getStatusText = () => {
    switch(activeStep) {
      case 1: return 'Your service has been booked';
      case 2: return 'Your clothes will be picked up soon';
      case 3: return 'Your clothes are being processed';
      case 4: return 'Your clothes have been delivered';
      default: return 'Processing your order';
    }
  };

  return (
    <div className="order-tracking-page">
      {/* Header */}
      <div className="tracking-header" style={{ backgroundColor: categoryColor,borderRadius:"10px" }}>
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Order Tracking</h1>
        <button className="refresh-button">
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>
      
      {/* Service Details */}
      <div className="service-details">
        <div className="service-details-header">
          <h3>Service Details</h3>
          <button className="details-toggle">
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>
        
        <div className="service-details-content">
          <div className="detail-item">
            <span className="detail-label">Order ID</span>
            <span className="detail-value">{activeBooking.id}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Service Type</span>
            <span className="detail-value">{activeBooking.service.name}</span>
          </div>
          {activeBooking.service.selectedOption && (
            <div className="detail-item">
              <span className="detail-label">Selected Option</span>
              <span className="detail-value">{activeBooking.service.selectedOption}</span>
            </div>
          )}
          <div className="detail-item">
            <span className="detail-label">Quantity</span>
            <span className="detail-value">{activeBooking.service.quantity || 1}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Payment Method</span>
            <span className="detail-value">
              {activeBooking.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Total Amount</span>
            <span className="detail-value price">₹{activeBooking.service.totalPrice}</span>
          </div>
        </div>
      </div>
      
      {/* Nezto Advertisement */}
      <div className="nezto-ad">
        <div className="ad-content">
          <div className="ad-icon">
            <i className="fas fa-star"></i>
          </div>
          <div className="ad-text">
            <h4>Experience Premium Laundry Service</h4>
            <p>Get 20% off on your next order with code: <span className="promo-code">NEZTO20</span></p>
          </div>
          <button className="ad-button">Book Now</button>
        </div>
      </div>
      
      {/* Progress Tracker */}
      <div className="progress-tracker">
        <div className="tracker-header">
          <h3>Track Progress</h3>
          <p className="last-updated">Last updated: {formatRelativeTime(currentStep?.time || activeBooking.createdAt)}</p>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ 
                width: `${calculateProgress()}%`,
                background: `linear-gradient(to right, ${categoryColor}, ${categoryColor}CC)`
              }}
            ></div>
          </div>
        </div>
        
        <div className="tracking-steps">
          {trackingSteps.map((step) => (
            <div key={step.id} className={`tracking-step ${step.completed ? 'completed' : ''} ${activeStep === step.id ? 'active' : ''}`}>
              <div className="step-connector-top"></div>
              <div 
                className="step-indicator"
                style={{ 
                  backgroundColor: step.completed ? `${categoryColor}15` : '#f0f0f0',
                  color: step.completed ? categoryColor : '#666',
                  borderColor: step.id === activeStep ? categoryColor : 'transparent'
                }}
              >
                {step.completed ? (
                  <i className="fas fa-check"></i>
                ) : (
                  <span className="step-number">{step.id}</span>
                )}
              </div>
              <div className="step-connector-bottom"></div>
              <div className="step-details">
                <div className="step-info">
                  <p className="step-name">{step.name}</p>
                  {step.completed && step.time && (
                    <p className="step-time">{formatTime(step.time)}</p>
                  )}
                </div>
                {step.completed && (
                  <div className="step-status">
                    <i className="fas fa-check-circle" style={{ color: categoryColor }}></i>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Order OTP Section */}
        <div className="order-otp-section">
          <div className="otp-header">
            <h4 align="center">Pickup Conformation OTP</h4>
            <p align="center"></p>
          </div>
          <div className="otp-display">
            <div className="otp-digit">{orderOTP[0]}</div>
            <div className="otp-digit">{orderOTP[1]}</div>
            <div className="otp-digit">{orderOTP[2]}</div>
            <div className="otp-digit">{orderOTP[3]}</div>
          </div>
          <p className="otp-note">Give this OTP to our rider to confirm your pickup</p>
        </div>
      </div>
      
      {/* Washerman/Service Professional Info */}
      <div className={`professional-info ${activeStep < 2 ? 'faded' : ''}`}>
        <div className="professional-header">
          <h3>{activeStep >= 3 ? 'Washerman Details' : 'Pickup Agent'}</h3>
          {activeStep >= 2 && (
            <div className="rating-badge">
              <i className="fas fa-star"></i> 4.8
            </div>
          )}
        </div>
        
        <div className="professional-card">
          {activeStep >= 2 ? (
            <div className="professional-content">
              <div className="professional-left">
                <div className="professional-avatar">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Professional" />
                  {activeStep >= 2 && <div className="online-indicator"></div>}
                </div>
                <div className="professional-details">
                  <h4>Rahul Kumar</h4>
                  <div className="professional-meta">
                    <span className="reviews">(124 reviews)</span>
                    <span className="experience">3 yrs experience</span>
                  </div>
                  <p className="professional-role">{activeStep >= 3 ? 'Expert Washerman' : 'Pickup Specialist'}</p>
                  {activeStep === 2 && <p className="distance-info">1.8 km away • On the way</p>}
                </div>
              </div>
              <div className="professional-contact">
                <button className="call-button">
                  <i className="fas fa-phone-alt"></i>
                </button>
                <button className="message-button">
                  <i className="fas fa-comment-alt"></i>
                </button>
              </div>
            </div>
          ) : (
            <div className="professional-pending">
              <div className="professional-placeholder">
                <i className="fas fa-user-clock"></i>
              </div>
              <p>Assigning a pickup agent for your order...</p>
            </div>
          )}
        </div>
        
        {/* Cancel Service Button */}
        {activeStep >= 2 && (
          <div className="cancel-service-container">
            <button className="cancel-service-button" onClick={() => {
              if (window.confirm('Are you sure you want to cancel this service? This action cannot be undone.')) {
                // Clear the active booking from context and localStorage
                clearActiveBooking();
                // Navigate back to home page
                navigate('/');
              }
            }}>
              <i className="fas fa-times-circle"></i>
              Cancel Service
            </button>
          </div>
        )}
      </div>
      
      {/* Status Message */}
      <div className="status-message">
        <p>{getStatusText()}</p>
      </div>
      
      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="support-button">
          <i className="fas fa-headset"></i>
          Contact Support
        </button>
        <button className="cancel-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default OrderTrackingPage; 