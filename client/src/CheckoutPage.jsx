import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import { useUser } from './UserContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, placeOrder } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Handle back button
  const handleBack = () => {
    navigate(-1);
  };

  // Handle browse services
  const handleBrowseServices = () => {
    navigate('/');
  };

  // Handle place order
  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      const newOrder = placeOrder();
      setIsProcessing(false);
      setIsOrderPlaced(true);
      setOrderId(newOrder?.id);
    }, 1500);
  };

  // Handle view order details
  const handleViewOrderDetails = () => {
    navigate(`/order-details/${orderId}`);
  };

  // If cart is empty and no order was just placed
  if (cart.length === 0 && !isOrderPlaced) {
    return (
      <div className="checkout-page">
        <div className="checkout-header">
          <button className="back-button" onClick={handleBack}>
            &larr;
          </button>
          <h1 className="checkout-title">Checkout</h1>
        </div>
        
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button className="browse-services-btn" onClick={handleBrowseServices}>
            Browse Services
          </button>
        </div>
      </div>
    );
  }

  // If order was successfully placed
  if (isOrderPlaced) {
    return (
      <div className="checkout-page">
        <div className="checkout-header">
          <h1 className="checkout-title">Order Confirmed</h1>
        </div>
        
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h2>Thank You!</h2>
          <p>Your order has been placed successfully.</p>
          <p className="order-id">Order #{orderId}</p>
          
          <button 
            className="view-order-btn"
            onClick={handleViewOrderDetails}
          >
            View Order Details
          </button>
          
          <button 
            className="browse-services-btn"
            onClick={handleBrowseServices}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <button className="back-button" onClick={handleBack}>
          &larr;
        </button>
        <h1 className="checkout-title">Checkout</h1>
      </div>
      
      <div className="checkout-content">
        <h2 className="section-title">Your Cart</h2>
        
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-type">{item.type || 'Standard'}</p>
              </div>
              <div className="item-quantity">
                Qty: {item.quantity}
              </div>
              <div className="item-price">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>
        
        <div className="order-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{calculateTotal()}</span>
          </div>
          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₹0</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{calculateTotal()}</span>
          </div>
        </div>
        
        <button 
          className="place-order-btn"
          onClick={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage; 