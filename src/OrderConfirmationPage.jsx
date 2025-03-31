import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './OrderConfirmationPage.css';
import { useUser } from './UserContext';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useUser();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the order with the given ID
    const foundOrder = orders.find(o => String(o.id) === String(orderId));
    
    if (foundOrder) {
      setOrder(foundOrder);
    }
    
    setLoading(false);
  }, [orderId, orders]);

  const handleViewOrderHistory = () => {
    navigate('/order-history');
  };

  const handleTrackOrder = () => {
    navigate(`/order-details/${orderId}`);
  };

  const handleBack = () => {
    navigate('/home');
  };

  if (loading) {
    return (
      <div className="order-confirmation-page">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="order-confirmation-page">
        <div className="confirmation-header">
          <button className="back-button" onClick={handleBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1>Order Confirmation</h1>
        </div>
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          <p>Order not found. Please check your order history.</p>
          <button className="primary-button" onClick={handleViewOrderHistory}>
            View Order History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-header">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Order Confirmation</h1>
      </div>

      <div className="confirmation-container">
        <div className="success-animation">
          <div className="checkmark-circle">
            <div className="checkmark"></div>
          </div>
        </div>

        <h2>Order Placed Successfully!</h2>
        <p className="confirmation-message">
          Your laundry service has been booked successfully. We'll pick up your clothes soon.
        </p>

        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-item">
            <span className="item-label">Order ID:</span>
            <span className="item-value order-id">#{order.id}</span>
          </div>
          <div className="summary-item">
            <span className="item-label">Service:</span>
            <span className="item-value">{order.serviceName}</span>
          </div>
          <div className="summary-item">
            <span className="item-label">Quantity:</span>
            <span className="item-value">{order.quantity} items</span>
          </div>
          <div className="summary-item">
            <span className="item-label">Amount:</span>
            <span className="item-value">₹{order.price.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span className="item-label">Pickup Address:</span>
            <span className="item-value address-text">{order.location?.address || order.pickupAddress || "Not specified"}</span>
          </div>
          <div className="summary-item">
            <span className="item-label">Order Date:</span>
            <span className="item-value">{new Date(order.date).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <p>
            We'll assign a pickup partner who will collect your clothes at the
            scheduled time. You can track your order status at any time.
          </p>
        </div>

        <div className="action-buttons">
          <button className="secondary-button" onClick={handleViewOrderHistory}>
            View All Orders
          </button>
          <button className="primary-button" onClick={handleTrackOrder}>
            Track This Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage; 