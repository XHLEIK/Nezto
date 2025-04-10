import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      {/* Legal section */}
      <div className="profile-section">
        <h3 className="section-title">Legal</h3>
        <div className="profile-options">
          <div className="profile-option" onClick={() => navigate('/about')}>
            <div className="option-icon">
              <i className="fas fa-info-circle"></i>
            </div>
            <div className="option-text">
              <span>About Nezto</span>
            </div>
            <i className="fas fa-chevron-right"></i>
          </div>
          
          <div className="profile-option" onClick={() => navigate('/terms-conditions')}>
            <div className="option-icon">
              <i className="fas fa-file-contract"></i>
            </div>
            <div className="option-text">
              <span>Terms & Conditions</span>
            </div>
            <i className="fas fa-chevron-right"></i>
          </div>
          
          <div className="profile-option" onClick={() => navigate('/faq')}>
            <div className="option-icon">
              <i className="fas fa-question-circle"></i>
            </div>
            <div className="option-text">
              <span>FAQ & Help Center</span>
            </div>
            <i className="fas fa-chevron-right"></i>
          </div>
          
          <div className="profile-option" onClick={() => navigate('/contact-support')}>
            <div className="option-icon">
              <i className="fas fa-headset"></i>
            </div>
            <div className="option-text">
              <span>Contact Support</span>
            </div>
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage; 