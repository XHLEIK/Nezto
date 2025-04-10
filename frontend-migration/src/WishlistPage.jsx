import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WishlistPage.css';
import { useUser } from './UserContext';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { userData, updateWishlistItem, removeFromWishlist, addToCart } = useUser();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle back button
  const handleBack = () => {
    navigate(-1);
  };
  
  // Handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) newQuantity = 1;
    updateWishlistItem(itemId, { quantity: newQuantity });
  };
  
  // Handle removing item from wishlist
  const handleRemoveItem = (itemId) => {
    setItemToRemove(itemId);
    setShowConfirmation(true);
  };
  
  // Confirm remove item
  const confirmRemove = () => {
    if (itemToRemove) {
      removeFromWishlist(itemToRemove);
      setItemToRemove(null);
    }
    setShowConfirmation(false);
  };
  
  // Cancel remove item
  const cancelRemove = () => {
    setItemToRemove(null);
    setShowConfirmation(false);
  };
  
  // Handle booking a service
  const handleBookNow = (item) => {
    addToCart(item);
    navigate('/checkout');
  };
  
  // Handle book all services
  const handleBookAll = () => {
    setIsLoading(true);
    
    // Simulating API call delay
    setTimeout(() => {
      userData.wishlist.forEach(item => addToCart(item));
      setIsLoading(false);
      navigate('/checkout');
    }, 500);
  };
  
  return (
    <div className="wishlist-page-container">
      <div className="wishlist-page-header">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Saved Services</h1>
        <div className="header-actions">
          {userData.wishlist && userData.wishlist.length > 0 && (
            <span className="item-badge">{userData.wishlist.length}</span>
          )}
        </div>
      </div>
      
      <div className="wishlist-content">
        {userData.wishlist && userData.wishlist.length > 0 ? (
          <>
            <div className="saved-services-section">
              <div className="section-header">
                <h2>Your Saved Services</h2>
                <p>Services you've saved for later booking</p>
              </div>
              
              <div className="service-cards">
                {userData.wishlist.map((item) => (
                  <div key={item.id} className="service-card">
                    <div className="service-card-header">
                      <div className="service-icon-wrapper">
                        <i className={item.icon || "fas fa-tshirt"}></i>
                      </div>
                      <button 
                        className="remove-button"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label="Remove from saved services"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    
                    <div className="service-card-content">
                      <h3 className="service-name">{item.name}</h3>
                      <p className="service-description">{item.description || "Professional cleaning service"}</p>
                      
                      <div className="service-price">
                        <span className="currency">₹</span>{(item.price).toFixed(2)}
                      </div>
                      
                      <div className="service-card-actions">
                        <div className="quantity-selector">
                          <button 
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <i className="fas fa-minus"></i>
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        
                        <button 
                          className="book-now-btn"
                          onClick={() => handleBookNow(item)}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="order-summary">
              <h3>Order Summary</h3>
              
              <div className="summary-details">
                <div className="summary-items">
                  {userData.wishlist.map((item) => (
                    <div key={item.id} className="summary-item">
                      <div className="summary-item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">× {item.quantity}</span>
                      </div>
                      <div className="item-price">
                        <span className="currency">₹</span>{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="summary-total">
                  <span>Total Amount</span>
                  <span className="total-price">
                    <span className="currency">₹</span>
                    {userData.wishlist.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                  </span>
                </div>
                
                <button 
                  className="book-all-btn"
                  onClick={handleBookAll}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span> Processing...
                    </>
                  ) : (
                    'Book All Services'
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-wishlist">
            <div className="empty-icon">
              <i className="fas fa-heart"></i>
            </div>
            <h2>Your wishlist is empty</h2>
            <p>Save your favorite services here to book them later</p>
            <button 
              className="explore-services-btn"
              onClick={() => navigate('/services')}
            >
              Explore Services
            </button>
          </div>
        )}
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="confirmation-modal">
            <div className="modal-icon warning">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Remove Service</h3>
            <p>Are you sure you want to remove this service from your saved items?</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={cancelRemove}>Cancel</button>
              <button className="confirm-btn" onClick={confirmRemove}>Remove</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage; 