import React, { useEffect, useState, memo } from 'react';
import './SplashScreen.css';

const SplashScreen = memo(({ onComplete }) => {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Create a progress animation from 0 to 100%
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 50);
    
    // Start fade out animation after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2500);
    
    // Complete splash screen after animation duration
    const completeTimer = setTimeout(() => {
      setShowSplash(false);
      if (onComplete) onComplete();
    }, 3000);
    
    // Handle native app initialization tasks here
    const initApp = () => {
      // On a real native app, this would interface with native functionality
      console.log('App initialized');
    };
    
    initApp();
    
    // Prevent interaction during splash
    document.body.style.pointerEvents = 'none';
    
    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      document.body.style.pointerEvents = 'auto';
    };
  }, [onComplete]);
  
  if (!showSplash) return null;
  
  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`} role="dialog" aria-modal="true" aria-label="Nezto loading screen">
      <div className="splash-content">
        {/* Bubbles */}
        <div className="bubble bubble-1" aria-hidden="true"></div>
        <div className="bubble bubble-2" aria-hidden="true"></div>
        <div className="bubble bubble-3" aria-hidden="true"></div>
        <div className="bubble bubble-4" aria-hidden="true"></div>
        <div className="bubble bubble-5" aria-hidden="true"></div>
        <div className="small-bubble small-bubble-1" aria-hidden="true"></div>
        <div className="small-bubble small-bubble-2" aria-hidden="true"></div>
        
        {/* Sparkles */}
        <div className="sparkle sparkle-1" aria-hidden="true"></div>
        <div className="sparkle sparkle-2" aria-hidden="true"></div>
        
        {/* Laundry Basket Illustration */}
        <div className="laundry-basket" aria-hidden="true">
          <div className="basket-outline"></div>
          <div className="clothes-outline"></div>
        </div>
        
        {/* Washing Machine Illustration */}
        <div className="washing-machine" aria-hidden="true">
          <div className="machine-outline"></div>
          <div className="door-outline"></div>
          <div className="controls-outline"></div>
          <div className="detergent-outline"></div>
        </div>
        
        {/* Ironing Board Outline */}
        <div className="ironing-board" aria-hidden="true"></div>
        
        {/* Logo - centered in all dimensions */}
        <div className="logo-wrapper">
          <div className="logo-container">
            <h1 className="logo-text">
              <span className="logo-letter">N</span>
              <span className="logo-letter">E</span>
              <span className="logo-letter">Z</span>
              <span className="logo-letter">T</span>
              <span className="logo-letter">O</span>
            </h1>
          </div>
          
          {/* Progress bar */}
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          
          <div className="tagline">Premium Service</div>
        </div>
        
        {/* Footer */}
        <div className="splash-footer">
          <p>Your trusted partner for quality laundry solutions</p>
          <p>Professional cleaning services at your doorstep</p>
          <div className="copyright">© 2023 Nezto Laundry Services</div>
        </div>
      </div>
    </div>
  );
});

SplashScreen.displayName = 'SplashScreen';

export default SplashScreen; 