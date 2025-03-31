import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './OrderHistoryPage.css';
import { useUser } from './UserContext';

// SVG component for washing machine icon
const WashingMachineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2H6C4.34 2 3 3.34 3 5V19C3 20.66 4.34 22 6 22H18C19.66 22 21 20.66 21 19V5C21 3.34 19.66 2 18 2ZM19 19C19 19.55 18.55 20 18 20H6C5.45 20 5 19.55 5 19V10H19V19ZM19 8H5V5C5 4.45 5.45 4 6 4H18C18.55 4 19 4.45 19 5V8Z" fill="#40BFC1"/>
    <path d="M12 12C10.34 12 9 13.34 9 15C9 16.66 10.34 18 12 18C13.66 18 15 16.66 15 15C15 13.34 13.66 12 12 12ZM12 16C11.45 16 11 15.55 11 15C11 14.45 11.45 14 12 14C12.55 14 13 14.45 13 15C13 15.55 12.55 16 12 16Z" fill="#40BFC1"/>
    <path d="M8 6H6V8H8V6Z" fill="#40BFC1"/>
    <path d="M12 6H10V8H12V6Z" fill="#40BFC1"/>
  </svg>
);

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const { orders, rebookOrder, deleteOrder } = useUser();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  // Filter orders based on active filter
  const filteredOrders = orders.filter(order => {
    if (activeFilter === 'all') return true;
    return order.status === activeFilter;
  });

  // Group orders by status
  const activeOrders = orders.filter(order => order.status === 'active');
  const historyOrders = orders.filter(order => order.status !== 'active');

  // Format date in a readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Handle filter change
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Handle book again action
  const handleBookAgain = (orderId) => {
    rebookOrder(orderId);
    navigate('/checkout');
  };

  // Navigate to order details
  const handleViewDetails = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  // Handle delete order
  const handleDeleteOrder = (orderId) => {
    setOrderToDelete(orderId);
    setShowDeleteConfirm(true);
  };

  // Confirm delete order
  const confirmDeleteOrder = () => {
    if (orderToDelete) {
      deleteOrder(orderToDelete);
      setShowDeleteConfirm(false);
      setOrderToDelete(null);
    }
  };

  // Cancel delete order
  const cancelDeleteOrder = () => {
    setShowDeleteConfirm(false);
    setOrderToDelete(null);
  };

  return (
    <div className="order-history-page">
      <div className="order-history-header">
        <Link to="/profile" className="back-button">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h1 className="header-title">Order History</h1>
      </div>

      {/* Active Bookings Section */}
      <div className="order-section">
        <h2 className="section-heading">Active & Upcoming Bookings</h2>
        
        {activeOrders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">
              <i className="fas fa-calendar-times"></i>
            </div>
            <h3>No active bookings</h3>
            <p>Your current bookings will appear here</p>
          </div>
        ) : (
          <div className="order-list">
            {activeOrders.map(order => (
              <div key={order.id} className="order-item">
                <div className="order-content" onClick={() => handleViewDetails(order.id)}>
                  <div className="order-icon">
                    <WashingMachineIcon />
                  </div>
                  <div className="order-details">
                    <h3 className="order-name">{order.serviceName}</h3>
                    <p className="order-status">
                      <i className="fas fa-truck-loading"></i> Delivery on {formatDate(order.deliveryDate)}
                    </p>
                    <p className="order-date">
                      <i className="fas fa-calendar-check"></i> Order placed on {formatDate(order.orderDate)}
                    </p>
                  </div>
                  <div className="order-actions">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order History Section */}
      <div className="order-section">
        <h2 className="section-heading">History</h2>
        
        <div className="order-filter-tabs">
          <button 
            className={`filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'canceled' ? 'active' : ''}`}
            onClick={() => handleFilterChange('canceled')}
          >
            Canceled
          </button>
          <button 
            className={`filter-tab ${activeFilter === 'delivered' ? 'active' : ''}`}
            onClick={() => handleFilterChange('delivered')}
          >
            Delivered
          </button>
        </div>
        
        {historyOrders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">
              <i className="fas fa-shopping-basket"></i>
            </div>
            <h3>No orders yet</h3>
            <p>Your order history will appear here</p>
          </div>
        ) : (
          <div className="order-list">
            {historyOrders
              .filter(order => {
                if (activeFilter === 'all') return true;
                return order.status === activeFilter;
              })
              .map(order => (
                <div key={order.id} className="order-item">
                  <div className="order-content" onClick={() => handleViewDetails(order.id)}>
                    <div className="order-icon">
                      <WashingMachineIcon />
                    </div>
                    <div className="order-details">
                      <h3 className="order-name">{order.serviceName}</h3>
                      <p className={`order-status ${order.status}`}>
                        {order.status === 'delivered' ? 
                          <><i className="fas fa-check-circle"></i> Delivered</> : 
                          <><i className="fas fa-times-circle"></i> Canceled</>
                        }
                      </p>
                      <p className="order-date">
                        <i className="fas fa-calendar-alt"></i> Order placed on {formatDate(order.orderDate)}
                      </p>
                    </div>
                    <div className="order-actions">
                      <i className="fas fa-chevron-right"></i>
                    </div>
                  </div>
                  
                  <div className="order-actions-container">
                    {order.status === 'canceled' && (
                      <button 
                        className="delete-order-btn"
                        onClick={() => handleDeleteOrder(order.id)}
                      >
                        <i className="fas fa-trash-alt"></i> Delete Order
                      </button>
                    )}
                    {order.status === 'delivered' && (
                      <button 
                        className="book-again-btn"
                        onClick={() => handleBookAgain(order.id)}
                      >
                        <i className="fas fa-redo"></i> Book Again
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-confirm-modal">
          <div className="delete-confirm-content">
            <h3>Delete Order</h3>
            <p>Are you sure you want to delete this order? This action cannot be undone.</p>
            <div className="delete-actions">
              <button className="cancel-btn" onClick={cancelDeleteOrder}>Cancel</button>
              <button className="confirm-btn" onClick={confirmDeleteOrder}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage; 