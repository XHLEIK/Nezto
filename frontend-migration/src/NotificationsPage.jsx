import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotificationsPage.css';
import { useUser } from './UserContext';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUser();
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    userData.notificationsEnabled || false
  );

  // Handle requesting notification permission from browser
  const requestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications");
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  };

  // Handle back button
  const handleBack = () => {
    navigate(-1);
  };

  // Handle toggle switch change
  const handleToggleChange = async () => {
    const newState = !notificationsEnabled;
    
    if (newState) {
      // If enabling notifications, request permission first
      const permissionGranted = await requestNotificationPermission();
      
      if (permissionGranted) {
        setNotificationsEnabled(true);
        updateUserData({ notificationsEnabled: true });
      } else {
        // If permission was denied, keep toggle off
        setNotificationsEnabled(false);
        updateUserData({ notificationsEnabled: false });
      }
    } else {
      // If disabling notifications
      setNotificationsEnabled(false);
      updateUserData({ notificationsEnabled: false });
    }
  };

  // Check notification permission on component mount
  useEffect(() => {
    const checkPermission = async () => {
      if (!("Notification" in window)) {
        return;
      }

      // If permission already granted, update state
      if (Notification.permission === "granted" && userData.notificationsEnabled) {
        setNotificationsEnabled(true);
      } else if (Notification.permission === "denied") {
        setNotificationsEnabled(false);
        updateUserData({ notificationsEnabled: false });
      }
    };

    checkPermission();
  }, [userData.notificationsEnabled, updateUserData]);

  // Function to send a test notification
  const sendTestNotification = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications");
      return;
    }
    
    if (Notification.permission === "granted") {
      const notification = new Notification("Test Notification from Nezto", {
        body: "This is a test notification to confirm your settings are working correctly.",
        icon: "/favicon.ico" // Assuming you have a favicon
      });
      
      notification.onclick = function() {
        window.focus();
        this.close();
      };
    }
  };

  return (
    <div className="notifications-page">
      <div className="notification-header">
        <button className="back-button" onClick={handleBack}>
          <span>←</span>
        </button>
        <h1 className="notification-title">Notifications</h1>
        <div className="toggle-container">
          <label className="toggle">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={handleToggleChange}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
      
      <div className="notification-content">
        <div className="notification-description">
          <p>Toggle this setting to receive push notifications from Nezto. We'll keep you updated about order status, special offers, and important updates.</p>
        </div>
      
        {notificationsEnabled ? (
          <div className="notification-status enabled">
            <p>You will receive notifications about:</p>
            <ul>
              <li>Order status updates</li>
              <li>Special offers and promotions</li>
              <li>Service reminders</li>
              <li>Payment confirmations</li>
            </ul>
          </div>
        ) : (
          <div className="notification-status disabled">
            <p>
              You have disabled notifications for this app. Enable notifications 
              to stay updated about your orders, special offers, and important 
              updates.
            </p>
          </div>
        )}
      </div>
      
      {notificationsEnabled && (
        <div className="notification-test">
          <button 
            className="test-notification-button"
            onClick={sendTestNotification}
          >
            Send Test Notification
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage; 