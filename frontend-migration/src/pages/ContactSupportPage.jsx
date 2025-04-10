import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ContactSupportPage.css';

const ContactSupportPage = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    orderNumber: '',
    message: '',
    attachments: []
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Subject options
  const subjectOptions = [
    'Order Issue',
    'Account Problem',
    'Payment Query',
    'Service Feedback',
    'App Technical Issue',
    'Pickup/Delivery Problem',
    'General Inquiry',
    'Other'
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Handle file uploads
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.attachments.length > 3) {
      setErrors({
        ...errors,
        attachments: 'Maximum 3 files allowed'
      });
      return;
    }
    
    const newAttachments = [...formData.attachments];
    
    files.forEach(file => {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          attachments: 'Files must be less than 5MB'
        });
        return;
      }
      
      newAttachments.push({
        file,
        name: file.name,
        url: URL.createObjectURL(file)
      });
    });
    
    setFormData({
      ...formData,
      attachments: newAttachments
    });
    
    // Clear attachment error if it exists
    if (errors.attachments) {
      setErrors({
        ...errors,
        attachments: null
      });
    }
  };
  
  // Remove attachment
  const removeAttachment = (index) => {
    const newAttachments = [...formData.attachments];
    URL.revokeObjectURL(newAttachments[index].url);
    newAttachments.splice(index, 1);
    
    setFormData({
      ...formData,
      attachments: newAttachments
    });
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          orderNumber: '',
          message: '',
          attachments: []
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="contact-support-page">
      <div className="contact-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Contact Support</h1>
      </div>
      
      <div className="contact-content">
        <div className="quick-contact-options">
          <div className="quick-contact-option">
            <div className="option-icon">
              <i className="fas fa-comment-alt"></i>
            </div>
            <div className="option-content">
              <h3>Live Chat</h3>
              <p>Chat with our support team</p>
              <button className="option-button">Start Chat</button>
            </div>
          </div>
          
          <div className="quick-contact-option">
            <div className="option-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div className="option-content">
              <h3>Call Us</h3>
              <p>Toll-free: 1800-123-4567</p>
              <button 
                className="option-button"
                onClick={() => window.location.href = 'tel:18001234567'}
              >
                Call Now
              </button>
            </div>
          </div>
          
          <div className="quick-contact-option">
            <div className="option-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="option-content">
              <h3>Email</h3>
              <p>support@nezto.com</p>
              <button 
                className="option-button"
                onClick={() => window.location.href = 'mailto:support@nezto.com'}
              >
                Send Email
              </button>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          <p>Fill out the form below and we'll get back to you as soon as possible.</p>
          
          {isSuccess ? (
            <div className="success-message">
              <i className="fas fa-check-circle"></i>
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully. We'll respond to you shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && <div className="error-message">{errors.phone}</div>}
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? 'error' : ''}
                  >
                    <option value="">Select a subject</option>
                    {subjectOptions.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.subject && <div className="error-message">{errors.subject}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="orderNumber">Order Number (if applicable)</label>
                  <input
                    type="text"
                    id="orderNumber"
                    name="orderNumber"
                    value={formData.orderNumber}
                    onChange={handleChange}
                    placeholder="Enter order number"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your issue or question in detail"
                  rows="5"
                  className={errors.message ? 'error' : ''}
                ></textarea>
                {errors.message && <div className="error-message">{errors.message}</div>}
              </div>
              
              <div className="form-group">
                <label>
                  Attachments <span className="optional">(optional, max 3 files, 5MB each)</span>
                </label>
                <div className="file-upload-container">
                  <input
                    type="file"
                    id="attachments"
                    onChange={handleFileChange}
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    className="file-input"
                    disabled={formData.attachments.length >= 3}
                  />
                  <label htmlFor="attachments" className="file-upload-button">
                    <i className="fas fa-paperclip"></i> Attach Files
                  </label>
                </div>
                {errors.attachments && <div className="error-message">{errors.attachments}</div>}
                
                {formData.attachments.length > 0 && (
                  <div className="attachments-preview">
                    {formData.attachments.map((attachment, index) => (
                      <div key={index} className="attachment-item">
                        <div className="attachment-name">
                          <i className="fas fa-file"></i> {attachment.name}
                        </div>
                        <button
                          type="button"
                          className="remove-attachment"
                          onClick={() => removeAttachment(index)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span> Sending...
                    </>
                  ) : 'Submit'}
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="support-hours">
          <h3>Support Hours</h3>
          <p>Our customer support team is available:</p>
          <ul>
            <li><strong>Monday to Friday:</strong> 9:00 AM - 8:00 PM</li>
            <li><strong>Saturday and Sunday:</strong> 10:00 AM - 6:00 PM</li>
          </ul>
          <p>For urgent issues outside these hours, please use the emergency contact option in the app.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactSupportPage; 