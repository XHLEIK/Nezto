import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../UserContext';
import '../styles/OTPVerificationPage.css';

const OTPVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateCustomTrackingStatus } = useUser();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const orderId = location.state?.orderId;
  const returnTo = location.state?.returnTo || '/';
  
  // Create a timer for OTP resend
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Handle input change for OTP digits
  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    // Update the OTP state
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // If we have a digit and there's a next input, focus it
    if (value !== '' && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };
  
  // Handle backspace key
  const handleKeyDown = (index, e) => {
    // If backspace is pressed and the current field is empty, focus previous field
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };
  
  // Handle the paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (!/^\d+$/.test(pastedData)) return;
    
    // Fill OTP fields with pasted digits (up to 4)
    const digits = pastedData.slice(0, 4).split('');
    const newOtp = [...otp];
    
    digits.forEach((digit, index) => {
      if (index < 4) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    
    // Focus the next empty field or the last field
    const nextEmptyIndex = newOtp.findIndex(digit => digit === '');
    if (nextEmptyIndex !== -1) {
      inputRefs[nextEmptyIndex].current.focus();
    } else {
      inputRefs[3].current.focus();
    }
  };
  
  // Handle OTP verification
  const handleVerifyOTP = () => {
    const enteredOTP = otp.join('');
    
    if (enteredOTP.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }
    
    setLoading(true);
    console.log("OTPVerificationPage: OTP verified, preparing to navigate");
    
    // For now, accept any OTP as per requirement
    setTimeout(() => {
      setLoading(false);
      console.log("OTPVerificationPage: Navigating to pickup-confirmed page");
      
      // Navigate to pickup confirmed page
      navigate('/pickup-confirmed', { replace: true });
    }, 1500);
  };
  
  // Handle resend OTP
  const handleResendOTP = () => {
    setCountdown(30);
    // Simulated OTP resend functionality
    setTimeout(() => {
      alert('New OTP has been sent!');
    }, 1000);
  };
  
  return (
    <div className="otp-verification-page">
      <div className="otp-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Verify Pickup</h1>
      </div>
      
      <div className="otp-content">
        <div className="otp-icon">
          <i className="fas fa-shield-alt"></i>
        </div>
        
        <h2>OTP Verification</h2>
        <p className="otp-instructions">Enter the 4-digit verification code sent to the pickup agent to confirm the pickup</p>
        
        <div className="otp-input-container">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              maxLength={1}
              className="otp-input"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={index === 0 ? handlePaste : null}
              autoFocus={index === 0}
            />
          ))}
        </div>
        
        {error && <p className="otp-error">{error}</p>}
        
        <button 
          className="verify-button"
          onClick={handleVerifyOTP}
          disabled={loading || otp.some(digit => digit === '')}
        >
          {loading ? (
            <div className="loading-spinner"></div>
          ) : (
            "Verify OTP"
          )}
        </button>
        
        <div className="resend-container">
          <p>Didn't receive the code?</p>
          {countdown > 0 ? (
            <p className="countdown">Resend in {countdown}s</p>
          ) : (
            <button 
              className="resend-button" 
              onClick={handleResendOTP}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
      
      <div className="support-section">
        <p>Having trouble? <button className="support-link">Contact Support</button></p>
      </div>
    </div>
  );
};

export default OTPVerificationPage; 