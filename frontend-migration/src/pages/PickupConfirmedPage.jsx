import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import '../styles/PickupConfirmedPage.css';

const PickupConfirmedPage = () => {
  const navigate = useNavigate();
  const { activeBooking, updateCustomTrackingStatus } = useUser();
  const [countdown, setCountdown] = useState(3);
  
  useEffect(() => {
    // Update tracking status to step 3 (Pick Up Confirmed)
    if (activeBooking) {
      updateCustomTrackingStatus(3);
    }
    
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Redirect to home page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/', { 
        state: { showTrackingPopup: true },
        replace: true
      });
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [navigate, updateCustomTrackingStatus, activeBooking]);
  
  return (
    <div className="pickup-confirmed-page">
      <div className="confirmation-content">
        <div className="confirmation-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <h3>Pickup Confirmed!</h3>
        <p>Your clothes have been handed over to the washerman</p>
        <div className="progress-indicator">
          <div className="progress-dot active"></div>
          <div className="progress-dot active"></div>
          <div className="progress-dot active"></div>
          <div className="progress-dot"></div>
        </div>
        <p className="redirect-text">Redirecting to home page in {countdown} seconds...</p>
      </div>
    </div>
  );
};

export default PickupConfirmedPage; 