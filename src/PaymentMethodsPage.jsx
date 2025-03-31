import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentMethodsPage.css';
import { useUser } from './UserContext';

// Path to the bank SVG icon
const LOGO_BANK = "/images/bank-icon.svg";

const PaymentMethodsPage = () => {
  const navigate = useNavigate();
  const { userData, removePaymentMethod, setDefaultPaymentMethod } = useUser();
  const [showOptions, setShowOptions] = useState(null);
  
  // Get payment methods from userData or initialize if doesn't exist
  const paymentMethods = userData.paymentMethods || [];
  
  // Handle back button
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  
  // Handle adding a payment method
  const handleAddCard = () => {
    navigate('/add-payment-method', { state: { type: 'card' } });
  };
  
  const handleAddWallet = () => {
    navigate('/add-payment-method', { state: { type: 'wallet' } });
  };
  
  const handleNetbanking = () => {
    navigate('/add-payment-method', { state: { type: 'netbanking' } });
  };
  
  // Toggle options menu
  const toggleOptions = (id) => {
    if (showOptions === id) {
      setShowOptions(null);
    } else {
      setShowOptions(id);
    }
  };
  
  // Handle setting a payment method as default
  const handleSetDefault = (id) => {
    setDefaultPaymentMethod(id);
    setShowOptions(null);
  };
  
  // Handle deleting a payment method
  const handleDeleteMethod = (id) => {
    if (window.confirm('Are you sure you want to delete this payment method?')) {
      removePaymentMethod(id);
    }
    setShowOptions(null);
  };
  
  return (
    <div className="payment-methods-page">
      {/* Header */}
      <div className="payment-header">
        <button className="back-button" onClick={handleBack}>
          <span>←</span>
        </button>
        <h1 className="payment-title">Payment methods</h1>
      </div>
      
      <div className="payment-content">
        {/* Digital Wallets Section */}
        {paymentMethods.filter(method => method.type === 'wallet').length > 0 && (
          <div className="payment-section">
            <h2 className="section-title">Digital Wallets</h2>
            {paymentMethods.filter(method => method.type === 'wallet').map(method => (
              <div key={method.id} className="payment-method-item">
                <div className="payment-method-info">
                  <img src={method.icon} alt={method.name} className="payment-icon" />
                  <div className="payment-details">
                    <span className="payment-name">{method.name}</span>
                    <span className="payment-balance">{method.balance}</span>
                  </div>
                </div>
                
                <div className="options-container">
                  <button 
                    className="options-button" 
                    onClick={() => toggleOptions(method.id)}
                    aria-label="More options"
                  >
                    ⋮
                  </button>
                  
                  {showOptions === method.id && (
                    <div className="options-dropdown">
                      <button onClick={() => handleSetDefault(method.id)}>
                        {method.isDefault ? "Default" : "Set as default"}
                      </button>
                      <button onClick={() => handleDeleteMethod(method.id)}>
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Add Wallet Option if no wallets */}
        {paymentMethods.filter(method => method.type === 'wallet').length === 0 && (
          <div className="payment-section">
            <h2 className="section-title">Digital Wallets</h2>
            <div className="payment-method-item" onClick={handleAddWallet}>
              <div className="payment-method-info">
                <div className="payment-icon wallet-add-icon">+</div>
                <div className="payment-details">
                  <span className="payment-name">Add Digital Wallet</span>
                </div>
              </div>
              <span className="chevron-icon">›</span>
            </div>
          </div>
        )}

        {/* Netbanking Section */}
        <div className="payment-section">
          <h2 className="section-title">Netbanking</h2>
          {paymentMethods.filter(method => method.type === 'netbanking').map(method => (
            <div key={method.id} className="payment-method-item">
              <div className="payment-method-info">
                <div className="payment-icon netbanking-icon">
                  <img src={LOGO_BANK} alt="Netbanking" />
                </div>
                <div className="payment-details">
                  <span className="payment-name">{method.bankName}</span>
                </div>
              </div>
              
              <div className="options-container">
                <button 
                  className="options-button" 
                  onClick={() => toggleOptions(method.id)}
                  aria-label="More options"
                >
                  ⋮
                </button>
                
                {showOptions === method.id && (
                  <div className="options-dropdown">
                    <button onClick={() => handleSetDefault(method.id)}>
                      {method.isDefault ? "Default" : "Set as default"}
                    </button>
                    <button onClick={() => handleDeleteMethod(method.id)}>
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {/* Add Netbanking Option */}
          {paymentMethods.filter(method => method.type === 'netbanking').length === 0 && (
            <div className="payment-method-item" onClick={handleNetbanking}>
              <div className="payment-method-info">
                <div className="payment-icon netbanking-icon">
                  <img src={LOGO_BANK} alt="Netbanking" />
                </div>
                <div className="payment-details">
                  <span className="payment-name">Add Netbanking</span>
                </div>
              </div>
              <span className="chevron-icon">›</span>
            </div>
          )}
        </div>

        {/* Cards Section */}
        <div className="payment-section">
          <h2 className="section-title">Cards</h2>
          {paymentMethods.filter(method => method.type === 'card').length > 0 && (
            paymentMethods.filter(method => method.type === 'card').map(method => (
              <div key={method.id} className="payment-method-item">
                <div className="payment-method-info">
                  <div className={`card-icon ${method.cardType.toLowerCase()}`}>
                    <span>{method.cardType === 'VISA' ? 'visa' : method.cardType === 'MASTERCARD' ? 'mc' : 'card'}</span>
                  </div>
                  <div className="payment-details">
                    <span className="payment-name">{method.cardType} •••• {method.lastFourDigits}</span>
                    <span className="expires">Expires {method.expiryMonth}/{method.expiryYear}</span>
                  </div>
                </div>
                
                <div className="options-container">
                  <button 
                    className="options-button" 
                    onClick={() => toggleOptions(method.id)}
                    aria-label="More options"
                  >
                    ⋮
                  </button>
                  
                  {showOptions === method.id && (
                    <div className="options-dropdown">
                      <button onClick={() => handleSetDefault(method.id)}>
                        {method.isDefault ? "Default" : "Set as default"}
                      </button>
                      <button onClick={() => handleDeleteMethod(method.id)}>
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {/* Add New Card Button */}
          <div className="add-card-container" onClick={handleAddCard}>
            <div className="add-card-button">
              <span className="add-icon">+</span>
              <span className="add-text">Add new Card</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsPage; 