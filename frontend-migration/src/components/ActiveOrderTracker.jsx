import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import '../styles/ActiveOrderTracker.css';

const ActiveOrderTracker = ({ initiallyExpanded = false }) => {
  const { activeBooking, clearActiveBooking } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  // Set expanded state based on initiallyExpanded prop
  useEffect(() => {
    if (initiallyExpanded) {
      setIsExpanded(true);
    }
  }, [initiallyExpanded]);

  if (!activeBooking) {
    return null;
  }
  
  console.log("ActiveOrderTracker: Rendering with expanded =", isExpanded);

  // Format time from timestamp
  const formatTime = (date) => {
    if (!date) return '';
    const timeObj = new Date(date);
    return timeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get the current active step
  const getCurrentStep = () => {
    const completed = activeBooking.trackingSteps.filter(step => step.completed);
    return completed.length > 0 ? completed[completed.length - 1] : null;
  };

  // Get the next step
  const getNextStep = () => {
    const nextStepIndex = activeBooking.trackingSteps.findIndex(step => !step.completed);
    return nextStepIndex >= 0 ? activeBooking.trackingSteps[nextStepIndex] : null;
  };

  // Custom tracking steps for laundry service flow
  const trackingSteps = [
    { id: 1, name: 'Service Booked', completed: true, time: new Date(activeBooking.createdAt) },
    { id: 2, name: 'Pick Up Confirmed', completed: false },
    { id: 3, name: 'Handed Over to Washerman', completed: false },
    { id: 4, name: 'Clothes Delivered', completed: false }
  ];

  const handleViewDetails = () => {
    // Toggle expanded view
    setIsExpanded(!isExpanded);
  };

  const handleCancelBooking = () => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      clearActiveBooking();
    }
  };

  const handleTrackOrder = () => {
    navigate('/order-tracking', { state: { orderId: activeBooking.id } });
  };

  const currentStep = getCurrentStep();
  const nextStep = getNextStep();
  
  // Get appropriate background color based on service category
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

  // Calculate progress percentage based on custom tracking steps
  const calculateProgress = () => {
    const completedSteps = trackingSteps.filter(step => step.completed).length;
    const totalSteps = trackingSteps.length;
    return (completedSteps / totalSteps) * 100;
  };

  return (
    <div className={`active-order-tracker ${isExpanded ? 'expanded' : ''}`}>
      {/* Collapsed View */}
      <div className="tracker-collapsed" onClick={handleViewDetails} style={{ borderTop: `4px solid ${categoryColor}` }}>
        <div className="tracker-service">
          <div className="tracker-icon" style={{ backgroundColor: `${categoryColor}15`, color: categoryColor }}>
            <i className={activeBooking.service.icon || "fas fa-broom"}></i>
          </div>
          <div className="tracker-info">
            <h6>{activeBooking.service.name}</h6>
            <p style={{ color: categoryColor }}>{currentStep ? currentStep.name : 'Preparing your service'}</p>
          </div>
        </div>
        
        <div className="tracker-actions">
          <div className="tracker-time">
            <span>Est. time: {activeBooking.estimatedTime}</span>
          </div>
          <button className="btn-expand">
            <i className={`fas fa-chevron-${isExpanded ? 'down' : 'up'}`}></i>
          </button>
        </div>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="tracker-expanded">
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ 
                width: `${calculateProgress()}%`,
                background: `linear-gradient(to right, ${categoryColor}, ${categoryColor}CC)`
              }}
            ></div>
          </div>

          <div className="tracking-steps">
            {trackingSteps.map((step) => (
              <div key={step.id} className={`tracking-step ${step.completed ? 'completed' : ''}`}>
                <div 
                  className="step-indicator"
                  style={{ 
                    backgroundColor: step.completed ? `${categoryColor}15` : '#f0f0f0',
                    color: step.completed ? categoryColor : '#666'
                  }}
                >
                  {step.completed ? (
                    <i className="fas fa-check-circle"></i>
                  ) : (
                    <span className="step-number">{step.id}</span>
                  )}
                </div>
                <div className="step-details">
                  <p className="step-name">{step.name}</p>
                  {step.completed && step.time && (
                    <p className="step-time">{formatTime(step.time)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Order OTP Section */}
          <div className="order-otp-section">
            <div className="otp-header">
              <h4 align="center">Pickup Confirmation OTP</h4>
            </div>
            <div className="otp-display">
              <span className="otp-code">{activeBooking.otp}</span>
            </div>
          </div>

          <div className="tracker-buttons">
            <button 
              className="btn-track"
              onClick={handleTrackOrder}
              style={{ backgroundColor: categoryColor }}
            >
              <i className="fas fa-map-marker-alt me-2"></i>
              Track Order
            </button>
            
            <div className="secondary-buttons">
              <button 
                className="btn-cancel" 
                onClick={handleCancelBooking}
              >
                Cancel
              </button>
              <button 
                className="btn-support"
                onClick={() => navigate('/support')}
              >
                Support
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveOrderTracker; 