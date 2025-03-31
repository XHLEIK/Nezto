import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import { useUser } from './UserContext';
import { SignInButton, UserButton, useAuth, useUser as useClerkUser } from '@clerk/clerk-react';

const ProfilePage = () => {
  const { userData, updateUserData, logout, toggleNotifications, orders, isSignedIn, clerkUser } = useUser();
  const { user: clerkUserDirect } = useClerkUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

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

  const navigateToNotifications = () => {
    navigate('/notifications');
  };

  // If not signed in, show sign-in prompt
  if (!isSignedIn) {
    return (
      <div className="profile-page not-signed-in">
        <div className="profile-header">
          <h2>Sign In to Your Account</h2>
          <p>Please sign in to access your profile and manage your settings.</p>
        </div>
        <div className="sign-in-container">
          <SignInButton mode="modal">
            <button className="sign-in-button">Sign In</button>
          </SignInButton>
        </div>
      </div>
    );
  }

  console.log("ProfilePage rendering with userData:", userData);
  console.log("Orders:", orders);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };
  
  const handleLocationEdit = () => {
    navigate('/saved-locations');
  };
  
  const handleAddressEdit = () => {
    navigate('/location');
  };
  
  const handlePaymentMethods = () => {
    navigate('/payment-methods');
  };

  const handleWishlist = () => {
    navigate('/wishlist');
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="user-info">
          <div className="avatar">
            {clerkUserDirect?.imageUrl || userData.avatarUrl ? (
              <img 
                src={clerkUserDirect?.imageUrl || userData.avatarUrl} 
                alt={userData.name} 
                className="clerk-avatar" 
              />
            ) : (
              userData.name.charAt(0)
            )}
          </div>
          <div className="user-details">
            <h2>{userData.name}</h2>
            <p>{userData.email}</p>
            <div className="user-button-container">
              <button 
                className="view-details-btn"
                onClick={() => navigate('/clerk-user-info')}
              >
                <i className="fas fa-user-circle"></i> View Full Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-menu">
        <div className="menu-item" onClick={() => navigate('/edit-profile')}>
          <div className="menu-item-left">
            <div className="menu-icon">
              <i className="fas fa-user"></i>
            </div>
            <div className="menu-text">
              <h3>My Account</h3>
              <p>Manage your personal information</p>
            </div>
          </div>
          <div className="menu-item-right">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
        
        <div className="menu-item" onClick={navigateToNotifications}>
          <div className="menu-item-left">
            <div className="menu-icon">
              <i className="fas fa-bell"></i>
            </div>
            <div className="menu-text">
              <h3>Notifications</h3>
              <p>Manage your notification settings</p>
            </div>
          </div>
          <div className="menu-item-right">
            <label className="switch">
              <input
                type="checkbox"
                checked={userData.notificationsEnabled}
                onChange={handleNotificationsToggle}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        
        <div className="menu-item" onClick={() => navigate('/wishlist')}>
          <div className="menu-item-left">
            <div className="menu-icon">
              <i className="fas fa-heart"></i>
            </div>
            <div className="menu-text">
              <h3>Wishlist</h3>
              <p>View your saved services</p>
            </div>
          </div>
          <div className="menu-item-right">
            <span className="count-badge">{userData.wishlist ? userData.wishlist.length : 0}</span>
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
        
        <div className="menu-item" onClick={() => navigate('/order-history')}>
          <div className="menu-item-left">
            <div className="menu-icon">
              <i className="fas fa-history"></i>
            </div>
            <div className="menu-text">
              <h3>Order History</h3>
              <p>View your past bookings</p>
            </div>
          </div>
          <div className="menu-item-right">
            <span className="count-badge">{orders ? orders.length : 0}</span>
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
        
        <div className="menu-item" onClick={() => navigate('/saved-locations')}>
          <div className="menu-item-left">
            <div className="menu-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="menu-text">
              <h3>Saved Locations</h3>
              <p>Manage your saved addresses</p>
            </div>
          </div>
          <div className="menu-item-right">
            <span className="count-badge">{userData.savedLocations ? userData.savedLocations.length : 0}</span>
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
        
        <div className="menu-item" onClick={() => navigate('/payment-methods')}>
          <div className="menu-item-left">
            <div className="menu-icon">
              <i className="fas fa-credit-card"></i>
            </div>
            <div className="menu-text">
              <h3>Payment Methods</h3>
              <p>Manage your payment options</p>
            </div>
          </div>
          <div className="menu-item-right">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
        
        <div className="menu-item" onClick={() => navigate('/faq')}>
          <div className="menu-item-left">
            <div className="menu-icon">
              <i className="fas fa-question-circle"></i>
            </div>
            <div className="menu-text">
              <h3>FAQ & Support</h3>
              <p>Get help with your questions</p>
            </div>
          </div>
          <div className="menu-item-right">
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>
        
        <div className="menu-item" onClick={handleLogout}>
          <div className="menu-item-left">
            <div className="menu-icon logout">
              <i className="fas fa-sign-out-alt"></i>
            </div>
            <div className="menu-text">
              <h3 className="logout">Logout</h3>
              <p>Sign out of your account</p>
            </div>
          </div>
        </div>
      </div>
      
      {showLogoutConfirm && (
        <div className="logout-confirm-modal">
          <div className="logout-confirm-content">
            <h3>Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="logout-actions">
              <button className="cancel-btn" onClick={cancelLogout}>Cancel</button>
              <button className="confirm-btn" onClick={confirmLogout}>Logout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage; 