import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './EditProfilePage.css';
import { useUser } from './UserContext';
import { useUser as useClerkUser } from '@clerk/clerk-react';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUser();
  const { user: clerkUser } = useClerkUser();
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Local state for form fields
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    dob: '',
    gender: '',
    avatarUrl: ''
  });

  // Sync local state with context on component mount
  useEffect(() => {
    setFormData({
      ...userData,
      dob: userData.dob || '',
      gender: userData.gender || '',
      avatarUrl: userData.avatarUrl || ''
    });
    setPreviewImage(userData.avatarUrl || null);
  }, [userData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({
          ...formData,
          avatarUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle edit picture button click
  const handleEditPictureClick = () => {
    fileInputRef.current.click();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Update the user data in context
      updateUserData(formData);
      setIsSubmitting(false);
      
      // Navigate back to profile
      navigate('/profile');
    }, 800);
  };

  return (
    <div className="edit-profile-container">
      {/* Header with back button */}
      <div className="order-details-header">
        <Link to="/profile" className="back-button">
          <i className="fas fa-arrow-left"></i>
        </Link>
        <h1 className="header-title">Edit Profile</h1>
      </div>
      
      {/* Profile picture */}
      <div className="profile-picture-container">
        <div className="profile-picture">
          {previewImage ? (
            <img src={previewImage} alt="User avatar" />
          ) : clerkUser && clerkUser.imageUrl ? (
            <img src={clerkUser.imageUrl} alt="User avatar" />
          ) : (
            <div className="avatar-placeholder">
              {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleProfilePictureChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <button 
          className="edit-picture-button"
          onClick={handleEditPictureClick}
          title="Change profile picture"
        >
          <i className="fas fa-camera"></i>
        </button>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your phone number"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your email address"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob || ''}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender || ''}
            onChange={handleChange}
            className="form-control"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your address"
            rows="3"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="update-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default EditProfilePage; 