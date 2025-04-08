import React, { useState, useEffect } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser as useAppUser } from './UserContext';
import './ClerkUserInfo.css';

const ClerkUserInfo = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const { userData, updateUserData } = useAppUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const [address, setAddress] = useState('');
  const [savedLocation, setSavedLocation] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  // Initialize location from user context
  useEffect(() => {
    if (userData && userData.location) {
      setSavedLocation(userData.location.address);
    }
  }, [userData]);

  const handleBack = () => {
    navigate('/profile');
  };

  const handleLocationSave = async () => {
    try {
      // Update location in UserContext
      updateUserData({
        location: { 
          address: address,
          lat: 0,  // Would use geocoding in a real app
          lng: 0
        }
      });

      // Save location in Clerk user metadata
      if (user) {
        await user.update({
          publicMetadata: {
            ...user.publicMetadata,
            location: address
          }
        });
      }

      setSavedLocation(address);
      setSaveStatus('Location saved successfully!');
      
      // Clear status after 3 seconds
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    } catch (error) {
      console.error('Error saving location:', error);
      setSaveStatus('Failed to save location. Please try again.');
    }
  };

  if (!isLoaded) {
    return (
      <div className="clerk-user-info">
        <div className="loading-spinner">Loading user data...</div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="clerk-user-info">
        <div className="not-signed-in">
          <h2>Not signed in</h2>
          <p>Please sign in to view your user data.</p>
          <button className="back-btn" onClick={handleBack}>Back to Profile</button>
        </div>
      </div>
    );
  }

  return (
    <div className="clerk-user-info">
      <div className="user-info-header">
        <Link to="/profile" className="back-button">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h2 className="header-title">User Information</h2>
      </div>
      
      <div className="user-profile-container">
        <div className="user-avatar">
          {user.imageUrl ? (
            <img src={user.imageUrl} alt="User avatar" />
          ) : (
            <div className="avatar-placeholder">
              {user.firstName && user.lastName
                ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
                : 'U'}
            </div>
          )}
        </div>
        
        <div className="user-name-display">
          <h3>{user.fullName || 'User'}</h3>
          {user.primaryEmailAddress && (
            <p>{user.primaryEmailAddress.emailAddress}</p>
          )}
        </div>
        
        <div className="user-details-card">
          <div className="user-info-section">
            <h3>Basic Information</h3>
            <div className="user-info-row">
              <span className="info-label">First Name:</span>
              <span className="info-value">{user.firstName || 'Not provided'}</span>
            </div>
            <div className="user-info-row">
              <span className="info-label">Last Name:</span>
              <span className="info-value">{user.lastName || 'Not provided'}</span>
            </div>
            <div className="user-info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">
                {user.primaryEmailAddress
                  ? user.primaryEmailAddress.emailAddress
                  : 'Not provided'}
              </span>
            </div>
          </div>
          
          <div className="user-info-section">
            <h3>Account Information</h3>
            <div className="user-info-row">
              <span className="info-label">User ID:</span>
              <span className="info-value user-id">{user.id}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Location Management Section */}
      <div className="location-card">
        <h3>Manage Your Location</h3>
        <input
          type="text"
          className="location-input"
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button 
          className="save-location-btn"
          onClick={handleLocationSave}
          disabled={!address.trim()}
        >
          Save Location
        </button>
        
        {saveStatus && (
          <div className={`save-status ${saveStatus.includes('Failed') ? 'error' : 'success'}`}>
            {saveStatus}
          </div>
        )}
        
        {savedLocation && (
          <div className="location-display">
            <p><strong>Current Location:</strong></p>
            <p>{savedLocation}</p>
          </div>
        )}

        {user.publicMetadata?.location && (
          <div className="location-display">
            <p><strong>Saved in Clerk:</strong></p>
            <p>{user.publicMetadata.location}</p>
          </div>
        )}
      </div>

      <button 
        className="sign-out-btn" 
        onClick={() => signOut(() => navigate('/'))}
      >
        Sign Out
      </button>
    </div>
  );
};

export default ClerkUserInfo; 