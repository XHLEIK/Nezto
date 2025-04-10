import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/OrdersPage.css';
import { useUser } from '../UserContext';

// SVG component for washing machine icon
const WashingMachineIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 2H6C4.34 2 3 3.34 3 5V19C3 20.66 4.34 22 6 22H18C19.66 22 21 20.66 21 19V5C21 3.34 19.66 2 18 2ZM19 19C19 19.55 18.55 20 18 20H6C5.45 20 5 19.55 5 19V10H19V19ZM19 8H5V5C5 4.45 5.45 4 6 4H18C18.55 4 19 4.45 19 5V8Z" fill="currentColor"/>
    <path d="M12 12C10.34 12 9 13.34 9 15C9 16.66 10.34 18 12 18C13.66 18 15 16.66 15 15C15 13.34 13.66 12 12 12ZM12 16C11.45 16 11 15.55 11 15C11 14.45 11.45 14 12 14C12.55 14 13 14.45 13 15C13 15.55 12.55 16 12 16Z" fill="currentColor"/>
    <path d="M8 6H6V8H8V6Z" fill="currentColor"/>
    <path d="M12 6H10V8H12V6Z" fill="currentColor"/>
  </svg>
);

const OrdersPage = () => {
  const navigate = useNavigate();
  const { orders } = useUser();
  const [activeTab, setActiveTab] = useState('active');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample order data if not available in context
  const sampleOrders = [
    {
      id: 'ord-001',
      serviceName: 'Premium Laundry',
      status: 'active',
      orderDate: '2023-04-01T10:30:00',
      deliveryDate: '2023-04-03T18:00:00',
      totalAmount: 49.99,
      items: [
        { name: 'Shirts', quantity: 3, price: 10.99 },
        { name: 'Pants', quantity: 2, price: 8.99 }
      ],
      paymentMethod: 'Credit Card',
      deliveryAddress: '123 Main St, Apartment 4B, New York, NY 10001',
      trackingStatus: 'in_progress'
    },
    {
      id: 'ord-002',
      serviceName: 'Dry Cleaning',
      status: 'completed',
      orderDate: '2023-03-22T14:45:00',
      deliveryDate: '2023-03-24T17:30:00',
      totalAmount: 35.50,
      items: [
        { name: 'Suits', quantity: 1, price: 25.99 },
        { name: 'Dress', quantity: 1, price: 9.50 }
      ],
      paymentMethod: 'PayTm',
      deliveryAddress: '456 Park Ave, New York, NY 10022',
      trackingStatus: 'delivered'
    },
    {
      id: 'ord-003',
      serviceName: 'Express Wash & Fold',
      status: 'canceled',
      orderDate: '2023-03-15T09:15:00',
      cancelDate: '2023-03-15T12:30:00',
      totalAmount: 22.99,
      items: [
        { name: 'Mixed Laundry', quantity: 1, price: 22.99 }
      ],
      paymentMethod: 'Google Pay',
      deliveryAddress: '789 Broadway, New York, NY 10003',
      cancelReason: 'Customer requested cancellation'
    },
    {
      id: 'ord-004',
      serviceName: 'Bedding Cleaning',
      status: 'completed',
      orderDate: '2023-03-10T11:00:00',
      deliveryDate: '2023-03-12T16:45:00',
      totalAmount: 45.75,
      items: [
        { name: 'Comforter', quantity: 1, price: 29.99 },
        { name: 'Bed Sheets', quantity: 2, price: 7.88 }
      ],
      paymentMethod: 'Cash',
      deliveryAddress: '321 Elm St, New York, NY 10012',
      trackingStatus: 'delivered'
    }
  ];

  // Use orders from context or sample data
  const allOrders = React.useMemo(() => {
    try {
      // Check if orders from context exist and are an array
      if (orders && Array.isArray(orders) && orders.length > 0) {
        console.log('Using orders from context:', orders);
        return orders;
      } 
      
      // Use sample data as fallback
      console.log('Using sample orders data');
      return sampleOrders;
    } catch (error) {
      console.error('Error processing orders data:', error);
      return sampleOrders;
    }
  }, [orders]);

  // Initialize filtered orders based on active tab
  useEffect(() => {
    try {
      console.log('useEffect running - activeTab:', activeTab, 'allOrders:', allOrders);
      
      // Safety check for allOrders
      if (!allOrders || !Array.isArray(allOrders)) {
        console.warn('allOrders is not an array:', allOrders);
      }
      
      filterOrders();
      
      // Simulate loading
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Error in useEffect:', error);
      setIsLoading(false);
      setFilteredOrders([]);
    }
  }, [activeTab, allOrders]);

  // Filter orders based on active tab
  const filterOrders = () => {
    try {
      let filtered = Array.isArray(allOrders) ? allOrders : [];
      
      console.log('Filtering orders:', filtered);
      
      // Filter by status
      if (activeTab !== 'all') {
        filtered = filtered.filter(order => order && order.status === activeTab);
      }
      
      console.log('Filtered orders:', filtered);
      setFilteredOrders(filtered);
    } catch (error) {
      console.error('Error filtering orders:', error);
      setFilteredOrders([]);
    }
  };

  // Format date in a readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'N/A';
    }
  };

  // Format time in a readable format
  const formatTime = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return '';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    if (!status) return '#757575';
    try {
      switch (status) {
        case 'active': return '#ff9800';
        case 'completed': return '#4caf50';
        case 'canceled': return '#f44336';
        default: return '#757575';
      }
    } catch (error) {
      console.error('Error getting status color:', error);
      return '#757575';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <i className="fas fa-sync-alt fa-spin"></i>;
      case 'completed': return <i className="fas fa-check-circle"></i>;
      case 'canceled': return <i className="fas fa-times-circle"></i>;
      default: return <i className="fas fa-question-circle"></i>;
    }
  };

  // Get status label
  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'In Progress';
      case 'completed': return 'Delivered';
      case 'canceled': return 'Canceled';
      default: return 'Unknown';
    }
  };

  // Handle book again action
  const handleBookAgain = (orderId) => {
    // Clone the order items to a new order
    navigate('/checkout');
  };

  // Navigate to order details
  const handleViewDetails = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="orders-header">
        <div className="header-content">
          <Link to="/profile" className="back-button">
            <i className="fas fa-arrow-left"></i>
          </Link>
          <h1 className="header-title">My Orders</h1>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="orders-tabs">
        <button 
          className={`tab-button ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All
        </button>
        <button 
          className={`tab-button ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => setActiveTab('active')}
        >
          Active
        </button>
        <button 
          className={`tab-button ${activeTab === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed
        </button>
        <button 
          className={`tab-button ${activeTab === 'canceled' ? 'active' : ''}`}
          onClick={() => setActiveTab('canceled')}
        >
          Canceled
        </button>
      </div>

      {/* Order list */}
      <div className="orders-content">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your orders...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="orders-list">
            {filteredOrders.map((order, index) => (
              <div key={order.id || index} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <div 
                      className="order-status-indicator" 
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {getStatusIcon(order.status)}
                      <span>{getStatusLabel(order.status)}</span>
                    </div>
                    <div className="order-date">
                      Ordered on {formatDate(order.orderDate)} at {formatTime(order.orderDate)}
                    </div>
                  </div>
                  <div className="order-amount">
                    ₹{(order.totalAmount || 0).toFixed(2)}
                  </div>
                </div>
                
                <div className="order-body" onClick={() => handleViewDetails(order.id)}>
                  <div className="service-icon">
                    <WashingMachineIcon />
                  </div>
                  <div className="order-details">
                    <h3 className="service-name">{order.serviceName || 'Unknown Service'}</h3>
                    <p className="order-id">Order ID: {order.id || 'N/A'}</p>
                    <p className="items-summary">
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item, index) => (
                          <span key={index}>
                            {item.quantity || 1} x {item.name || 'Item'}
                            {index < order.items.length - 1 ? ', ' : ''}
                          </span>
                        ))
                      ) : (
                        <span>No items</span>
                      )}
                    </p>
                  </div>
                  <div className="view-details">
                    <i className="fas fa-chevron-right"></i>
                  </div>
                </div>
                
                <div className="order-footer">
                  {order.status === 'completed' && (
                    <button className="book-again-btn" onClick={() => handleBookAgain(order.id)}>
                      <i className="fas fa-redo"></i> Book Again
                    </button>
                  )}
                  {order.status === 'active' && (
                    <button className="track-order-btn" onClick={() => navigate(`/order-tracking/${order.id}`)}>
                      <i className="fas fa-map-marker-alt"></i> Track Order
                    </button>
                  )}
                  {order.status === 'canceled' && order.cancelReason && (
                    <div className="cancel-reason">
                      <i className="fas fa-info-circle"></i> {order.cancelReason}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-orders">
            <div className="empty-icon">
              {activeTab === 'active' ? (
                <i className="fas fa-shopping-cart"></i>
              ) : activeTab === 'completed' ? (
                <i className="fas fa-check-circle"></i>
              ) : activeTab === 'canceled' ? (
                <i className="fas fa-times-circle"></i>
              ) : (
                <i className="fas fa-box-open"></i>
              )}
            </div>
            <h3>No {activeTab !== 'all' ? activeTab : ''} orders found</h3>
            <p>
              {activeTab === 'active' 
                ? "You don't have any active orders right now. Place an order to get started." 
                : activeTab === 'completed' 
                  ? "You haven't completed any orders yet. Your delivered orders will appear here." 
                  : activeTab === 'canceled' 
                    ? "You don't have any canceled orders. We hope your experience has been great!" 
                    : "You haven't placed any orders yet. Explore our services and place your first order."}
            </p>
            <button className="shop-now-btn" onClick={() => navigate('/services')}>
              Book a Service
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage; 