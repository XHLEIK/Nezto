import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './FAQSupportPage.css';

const FAQSupportPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleCategoryClick = (category) => {
    navigate(`/faq/${category.toLowerCase()}`);
  };

  const handleStartChat = () => {
    navigate('/faq/chat');
  };

  return (
    <div className="faq-support-page">
      <div className="faq-support-header">
        <Link to="/profile" className="back-button">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h1 className="header-title">FAQ & Support</h1>
      </div>

      <div className="faq-content">
        <h2 className="topics-header">All Topics</h2>

        <div className="faq-category" onClick={() => handleCategoryClick('Account')}>
          <div className="category-left">
            <div className="category-icon account-icon">
              <i className="fas fa-user"></i>
            </div>
            <span className="category-title">Account</span>
          </div>
          <div className="category-right">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>

        <div className="faq-category" onClick={() => handleCategoryClick('Payment')}>
          <div className="category-left">
            <div className="category-icon payment-icon">
              <i className="fas fa-hand-holding-usd"></i>
            </div>
            <span className="category-title">Payment</span>
          </div>
          <div className="category-right">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>

        <div className="faq-category" onClick={() => handleCategoryClick('Bookings')}>
          <div className="category-left">
            <div className="category-icon bookings-icon">
              <i className="fas fa-box"></i>
            </div>
            <span className="category-title">Bookings</span>
          </div>
          <div className="category-right">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
      </div>

      <div className="chat-button-container">
        <button className="start-chat-button" onClick={handleStartChat}>
          Start a new chat
        </button>
      </div>
    </div>
  );
};

export default FAQSupportPage; 