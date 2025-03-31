import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderDetailsPage.css';
import { useUser } from './UserContext';

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useUser();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  // Find the order from orders array
  React.useEffect(() => {
    const foundOrder = orders.find(o => o.id === orderId);
    if (foundOrder) {
      setOrder(foundOrder);
    } else {
      setError('Order not found');
    }
  }, [orderId, orders]);

  // Handle back button
  const handleBack = () => {
    navigate('/order-history');
  };
  
  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  // Format status
  const formatStatus = (status) => {
    switch(status) {
      case 'active':
        return 'Active';
      case 'delivered':
        return 'Delivered';
      case 'canceled':
        return 'Canceled';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };
  
  if (error) {
    return (
      <div className="order-details-page">
        <div className="order-details-header">
          <button className="back-button" onClick={handleBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1>Order Details</h1>
        </div>
        <div className="error-message">
          <p>{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="order-details-page">
        <div className="order-details-header">
          <button className="back-button" onClick={handleBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1>Order Details</h1>
        </div>
        <div className="loading">Loading order details...</div>
      </div>
    );
  }
  
  return (
    <div className="order-details-page">
      <div className="order-details-header">
        <button className="back-button" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Order Details</h1>
      </div>

      {/* Order Status Timeline */}
      <div className="order-status-timeline">
        <div className="timeline-item active">
          <div className="timeline-icon">
            <i className="fas fa-box"></i>
          </div>
          <div className="timeline-content">
            <h3>Order Placed</h3>
            <p>{new Date(order.orderDate).toLocaleString()}</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon">
            <i className="fas fa-user"></i>
          </div>
          <div className="timeline-content">
            <h3>Rider Assigned</h3>
            <p>{order.rider?.name || "Rahul Kumar"}</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon">
            <i className="fas fa-truck"></i>
          </div>
          <div className="timeline-content">
            <h3>Pickup</h3>
            <p>Estimated: {new Date(order.pickupDate).toLocaleString()}</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon">
            <i className="fas fa-washing-machine"></i>
          </div>
          <div className="timeline-content">
            <h3>Processing</h3>
            <p>Your clothes are being cleaned</p>
          </div>
        </div>

        <div className="timeline-item">
          <div className="timeline-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="timeline-content">
            <h3>Delivery</h3>
            <p>Estimated: {new Date(order.deliveryDate).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Rider Info */}
      <div className="rider-info-section">
        <h2>Delivery Partner</h2>
        <div className="rider-info">
          <div className="rider-details">
            <img src={order.rider?.avatar || "https://via.placeholder.com/40"} alt="Rider" className="rider-avatar" />
            <div className="rider-text">
              <h3>{order.rider?.name || "Rahul Kumar"}</h3>
              <p>Your delivery partner</p>
            </div>
          </div>
          <button className="contact-rider-btn">
            <i className="fas fa-phone"></i> Contact
          </button>
        </div>
      </div>

      {/* Order Details */}
      <div className="order-info-section">
        <h2>Order Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>Order ID</label>
            <p>{order.id}</p>
          </div>
          <div className="info-item">
            <label>Service Type</label>
            <p>{order.serviceName}</p>
          </div>
          <div className="info-item">
            <label>Pickup Address</label>
            <p>{order.pickupAddress}</p>
          </div>
          <div className="info-item">
            <label>Delivery Address</label>
            <p>{order.deliveryAddress}</p>
          </div>
          <div className="info-item">
            <label>Order Date</label>
            <p>{new Date(order.orderDate).toLocaleString()}</p>
          </div>
          <div className="info-item">
            <label>Estimated Delivery</label>
            <p>{new Date(order.deliveryDate).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div className="service-details-section">
        <h2>Service Details</h2>
        <div className="service-items">
          {order.items.map((item, index) => (
            <div key={index} className="service-item">
              <div className="item-icon">
                <i className="fas fa-tshirt"></i>
              </div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="price-breakdown-section">
        <h2>Price Breakdown</h2>
        <div className="price-details">
          <div className="price-item">
            <span>Subtotal</span>
            <span>₹{order.subtotal}</span>
          </div>
          <div className="price-item">
            <span>Delivery Fee</span>
            <span>₹{order.deliveryFee}</span>
          </div>
          <div className="price-item total">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage; 