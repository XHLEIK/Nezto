import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './WishlistPage.css';
import { useUser } from './UserContext';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { userData, updateWishlistItem, removeFromWishlist, addToCart } = useUser();
  
  // Handle back button
  const handleBack = () => {
    navigate('/profile');
  };
  
  // Handle quantity change
  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) newQuantity = 1;
    updateWishlistItem(itemId, { quantity: newQuantity });
  };
  
  // Handle removing item from wishlist
  const handleRemoveItem = (itemId) => {
    removeFromWishlist(itemId);
  };
  
  // Handle booking a service
  const handleBookNow = (item) => {
    addToCart(item);
    navigate('/checkout');
  };
  
  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <Link to="/profile" className="back-button">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h1 className="header-title">Wishlist</h1>
      </div>
      
      <div className="wishlist-container">
        {userData.wishlist && userData.wishlist.length > 0 ? (
          <div className="wishlist-items">
            {userData.wishlist.map((item) => (
              <div key={item.id} className="wishlist-item-card">
                <div className="service-header">
                  <h2 className="service-name">{item.name}</h2>
                  <button 
                    className="remove-button"
                    onClick={() => handleRemoveItem(item.id)}
                    aria-label="Remove from wishlist"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
                
                <div className="service-details">
                  <div className="quantity-section">
                    <div className="quantity-label">Clothes Quantity</div>
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn minus" 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button 
                        className="quantity-btn plus" 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-price">
                    <span className="price-label">Price:</span>
                    <span className="price-value">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  
                  <div className="action-buttons">
                    <button 
                      className="book-now-btn"
                      onClick={() => handleBookNow(item)}
                    >
                      <i className="fas fa-shopping-cart"></i> Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-wishlist">
            <div className="empty-icon">
              <i className="fas fa-heart-broken"></i>
            </div>
            <h3>Your wishlist is empty</h3>
            <p>Services you save will appear here</p>
            <button 
              className="browse-services-btn"
              onClick={() => navigate('/services')}
            >
              Browse Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage; 