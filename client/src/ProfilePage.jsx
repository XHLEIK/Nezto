import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ProfilePage.css';
import { useUser } from './UserContext';
import { SignInButton, UserButton, useAuth, useUser as useClerkUser } from '@clerk/clerk-react';

const ProfilePage = () => {
  const { userData, updateUserData, logout, toggleNotifications, orders, isSignedIn, clerkUser } = useUser();
  const { user: clerkUserDirect } = useClerkUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = async () => {
    try {
      await signOut();
      logout(); // Call the local logout function too
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleNotificationsToggle = () => {
    toggleNotifications();
  };

  const handleViewAllOrders = () => {
    navigate('/orders');
  };

  // If not signed in, show sign-in prompt with improved design
  if (!isSignedIn) {
    return (
      <div className="modern-profile-container">
        <div className="signin-header">
          <div className="signin-logo">
            <i className="fas fa-tshirt"></i>
          </div>
          <h2>Welcome to Nezto</h2>
          <p>Sign in to manage your laundry services, track orders, and access personalized features.</p>
        </div>
        <div className="signin-content">
          <div className="feature-list">
            <div className="feature-item">
              <i className="fas fa-history"></i>
              <div>
                <h3>Order History</h3>
                <p>Track all your previous orders</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-map-marker-alt"></i>
              <div>
                <h3>Saved Addresses</h3>
                <p>Quick checkout with saved locations</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-percent"></i>
              <div>
                <h3>Exclusive Offers</h3>
                <p>Access to member-only discounts</p>
              </div>
            </div>
          </div>
          <SignInButton mode="modal">
            <button className="signin-button">
              Sign In <i className="fas fa-arrow-right"></i>
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div className="modern-profile-container">
      {/* Modern Header with gradient background */}
      <div className="profile-header-section">
        <div className="header-top">
          <button className="back-button" onClick={() => navigate('/')}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1>Profile</h1>
          <div className="header-actions">
            <button onClick={() => navigate('/notifications')} className="icon-button">
              <i className="fas fa-bell"></i>
              {userData.unreadNotifications > 0 && (
                <span className="notification-badge">{userData.unreadNotifications}</span>
              )}
            </button>
          </div>
        </div>
        
        <div className="user-profile-card">
          <div className="profile-image-container">
            {clerkUserDirect?.imageUrl || userData.avatarUrl ? (
              <img 
                src={clerkUserDirect?.imageUrl || userData.avatarUrl} 
                alt={userData.name} 
                className="profile-image" 
              />
            ) : (
              <div className="profile-initials">
                {userData.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="user-info-container">
            <h2>{userData.name}</h2>
            <p className="user-email">{userData.email}</p>
            <p className="user-phone">{userData.phoneNumber || '+91 •••• ••••••'}</p>
            <button 
              className="edit-profile-button"
              onClick={() => navigate('/edit-profile')}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="profile-navigation">
        <button 
          className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </button>
        <button 
          className={`nav-tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <i className="fas fa-shopping-bag"></i>
          <span>Orders</span>
          {orders && orders.length > 0 && (
            <span className="tab-badge">{orders.length}</span>
          )}
        </button>
        <button 
          className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <i className="fas fa-cog"></i>
          <span>Settings</span>
        </button>
      </div>

      {/* Profile Content Section */}
      <div className="profile-content">
        {activeTab === 'profile' && (
          <>
            <div className="section-title">
              <h3>Your Account</h3>
              <p>Manage your personal preferences</p>
            </div>
            
            <div className="menu-section">
              <div className="menu-card" onClick={() => navigate('/wishlist')}>
                <div className="menu-card-left">
                  <div className="menu-card-icon" style={{backgroundColor: "rgba(255, 90, 95, 0.1)", color: "#FF5A5F"}}>
                    <i className="fas fa-heart"></i>
                  </div>
                  <div>
                    <h4>Saved Services</h4>
                    <p>Items you've saved for later</p>
                  </div>
                </div>
                <div className="menu-card-right">
                  {userData.wishlist && userData.wishlist.length > 0 && (
                    <span className="menu-badge">{userData.wishlist.length}</span>
                  )}
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
              
              <div className="menu-card" onClick={() => navigate('/orders')}>
                <div className="menu-card-left">
                  <div className="menu-card-icon" style={{backgroundColor: "rgba(64, 191, 193, 0.1)", color: "#40BFC1"}}>
                    <i className="fas fa-history"></i>
                  </div>
                  <div>
                    <h4>Order History</h4>
                    <p>View and manage your past orders</p>
                  </div>
                </div>
                <div className="menu-card-right">
                  {orders && orders.length > 0 && (
                    <span className="menu-badge">{orders.length}</span>
                  )}
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
              
              <div className="menu-card" onClick={() => navigate('/saved-locations')}>
                <div className="menu-card-left">
                  <div className="menu-card-icon" style={{backgroundColor: "rgba(118, 98, 228, 0.1)", color: "#7662E4"}}>
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h4>Saved Addresses</h4>
                    <p>Manage your delivery locations</p>
                  </div>
                </div>
                <div className="menu-card-right">
                  {userData.savedLocations && userData.savedLocations.length > 0 && (
                    <span className="menu-badge">{userData.savedLocations.length}</span>
                  )}
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
              
              <div className="menu-card" onClick={() => navigate('/payment-methods')}>
                <div className="menu-card-left">
                  <div className="menu-card-icon" style={{backgroundColor: "rgba(255, 177, 0, 0.1)", color: "#FFB100"}}>
                    <i className="fas fa-credit-card"></i>
                  </div>
                  <div>
                    <h4>Payment Methods</h4>
                    <p>Manage your payment options</p>
                  </div>
                </div>
                <div className="menu-card-right">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
            </div>
            
            <div className="section-title">
              <h3>Support & Help</h3>
              <p>Get assistance and information</p>
            </div>
            
            <div className="menu-section">
              <div className="menu-card" onClick={() => navigate('/faq')}>
                <div className="menu-card-left">
                  <div className="menu-card-icon" style={{backgroundColor: "rgba(0, 194, 184, 0.1)", color: "#00C2B8"}}>
                    <i className="fas fa-question-circle"></i>
                  </div>
                  <div>
                    <h4>FAQ & Help Center</h4>
                    <p>Answers to common questions</p>
                  </div>
                </div>
                <div className="menu-card-right">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
              
              <div className="menu-card" onClick={() => navigate('/contact-support')}>
                <div className="menu-card-left">
                  <div className="menu-card-icon" style={{backgroundColor: "rgba(125, 95, 255, 0.1)", color: "#7D5FFF"}}>
                    <i className="fas fa-headset"></i>
                  </div>
                  <div>
                    <h4>Contact Support</h4>
                    <p>Get help from our team</p>
                  </div>
                </div>
                <div className="menu-card-right">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
              
              <div className="menu-card" onClick={() => navigate('/about')}>
                <div className="menu-card-left">
                  <div className="menu-card-icon" style={{backgroundColor: "rgba(32, 160, 255, 0.1)", color: "#20A0FF"}}>
                    <i className="fas fa-info-circle"></i>
                  </div>
                  <div>
                    <h4>About Nezto</h4>
                    <p>Learn about our company</p>
                  </div>
                </div>
                <div className="menu-card-right">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
              
              <div className="menu-card" onClick={() => navigate('/terms-conditions')}>
                <div className="menu-card-left">
                  <div className="menu-card-icon" style={{backgroundColor: "rgba(80, 80, 80, 0.1)", color: "#505050"}}>
                    <i className="fas fa-file-contract"></i>
                  </div>
                  <div>
                    <h4>Terms & Conditions</h4>
                    <p>Our policies and agreements</p>
                  </div>
                </div>
                <div className="menu-card-right">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'orders' && (
          <>
            <div className="section-title">
              <h3>Active Orders</h3>
              <p>Track your current orders and view OTP codes</p>
            </div>
            
            <div className="active-orders-section">
              {orders && orders.filter(order => order.status === 'active').length > 0 ? (
                <>
                  {orders.filter(order => order.status === 'active').map(order => (
                    <div key={order.id} className="active-order-card">
                      <div className="order-header">
                        <div className="order-status">
                          <div className="status-indicator" style={{ backgroundColor: "#40BFC1" }}>
                            <i className="fas fa-sync-alt fa-spin"></i>
                            <span>In Progress</span>
                          </div>
                          <p className="order-date">
                            <i className="far fa-calendar-alt"></i> 
                            {order.orderDate ? new Date(order.orderDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            }) : 'Processing'}
                          </p>
                        </div>
                        <div className="order-amount">₹{order.totalAmount ? order.totalAmount.toFixed(2) : '0.00'}</div>
                      </div>
                      
                      <div className="order-details">
                        <div className="service-icon">
                          <i className="fas fa-tshirt"></i>
                        </div>
                        <div className="service-details">
                          <h4>{order.serviceName || 'Service'}</h4>
                          <p className="order-id">Order ID: {order.id}</p>
                          <p className="order-items">
                            {order.items && order.items.length > 0 
                              ? order.items.map((item, idx) => (
                                  <span key={idx}>
                                    {item.quantity || 1} x {item.name || 'Item'}
                                    {idx < order.items.length - 1 ? ', ' : ''}
                                  </span>
                                ))
                              : 'Items processing'
                            }
                          </p>
                        </div>
                      </div>
                      
                      <div className="otp-section">
                        <div className="otp-box">
                          <div className="otp-label">Pickup OTP</div>
                          <div className="otp-value">{order.pickupOtp || '1234'}</div>
                        </div>
                        <div className="otp-box">
                          <div className="otp-label">Delivery OTP</div>
                          <div className="otp-value">{order.deliveryOtp || '5678'}</div>
                        </div>
                      </div>
                      
                      <div className="order-actions">
                        <button 
                          onClick={() => navigate(`/order-tracking/${order.id}`)}
                          className="tracking-btn"
                        >
                          <i className="fas fa-map-marker-alt"></i> Track Order
                        </button>
                        <button 
                          onClick={() => navigate(`/order-details/${order.id}`)}
                          className="details-btn"
                        >
                          <i className="fas fa-info-circle"></i> Details
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="empty-orders">
                  <div className="empty-icon">
                    <i className="fas fa-shopping-cart"></i>
                  </div>
                  <h3>No active orders</h3>
                  <p>You don't have any active orders right now</p>
                  <Link to="/services" className="book-now-btn">
                    <i className="fas fa-plus-circle"></i> Book a Service
                  </Link>
                </div>
              )}
              
              <div className="view-all-orders">
                <button onClick={handleViewAllOrders} className="view-all-btn">
                  View All Orders <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </>
        )}
        
        {activeTab === 'settings' && (
          <>
            <div className="section-title">
              <h3>App Settings</h3>
              <p>Customize your app experience</p>
            </div>
            
            <div className="menu-section">
              <div className="menu-card">
                <div className="menu-card-left">
                  <div className="menu-card-icon" style={{backgroundColor: "rgba(64, 191, 193, 0.1)", color: "#40BFC1"}}>
                    <i className="fas fa-bell"></i>
                  </div>
                  <div>
                    <h4>Notifications</h4>
                    <p>Manage your notification preferences</p>
                  </div>
                </div>
                <div className="menu-card-right">
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={userData.notificationsEnabled}
                      onChange={handleNotificationsToggle}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
              
              <div className="menu-card" onClick={() => navigate('/privacy')}>
                <div className="menu-card-left">
                  <div className="menu-card-icon" style={{backgroundColor: "rgba(118, 98, 228, 0.1)", color: "#7662E4"}}>
                    <i className="fas fa-lock"></i>
                  </div>
                  <div>
                    <h4>Privacy & Security</h4>
                    <p>Manage your account security</p>
                  </div>
                </div>
                <div className="menu-card-right">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
              
              <div className="menu-card" onClick={() => navigate('/terms')}>
                <div className="menu-card-left">
                  <div className="menu-card-icon" style={{backgroundColor: "rgba(0, 194, 184, 0.1)", color: "#00C2B8"}}>
                    <i className="fas fa-file-alt"></i>
                  </div>
                  <div>
                    <h4>Terms & Conditions</h4>
                    <p>View our terms of service</p>
                  </div>
                </div>
                <div className="menu-card-right">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
              
              <div className="menu-card" onClick={() => navigate('/about')}>
                <div className="menu-card-left">
                  <div className="menu-card-icon" style={{backgroundColor: "rgba(255, 177, 0, 0.1)", color: "#FFB100"}}>
                    <i className="fas fa-info-circle"></i>
                  </div>
                  <div>
                    <h4>About Nezto</h4>
                    <p>Learn more about our company</p>
                  </div>
                </div>
                <div className="menu-card-right">
                  <i className="fas fa-chevron-right"></i>
                </div>
              </div>
              
              <div className="menu-card logout-card" onClick={handleLogout}>
                <div className="menu-card-left">
                  <div className="menu-card-icon" style={{backgroundColor: "rgba(255, 90, 95, 0.1)", color: "#FF5A5F"}}>
                    <i className="fas fa-sign-out-alt"></i>
                  </div>
                  <div>
                    <h4>Logout</h4>
                    <p>Sign out of your account</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Logout Confirmation Modal with improved design */}
      {showLogoutConfirm && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-icon">
              <i className="fas fa-sign-out-alt"></i>
            </div>
            <h3>Sign Out</h3>
            <p>Are you sure you want to sign out of your account?</p>
            <div className="modal-actions">
              <button className="secondary-button" onClick={cancelLogout}>Cancel</button>
              <button className="danger-button" onClick={confirmLogout}>Sign Out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage; 