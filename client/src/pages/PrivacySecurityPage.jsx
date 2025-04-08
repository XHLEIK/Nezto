import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LegalPages.css';

const PrivacySecurityPage = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-page-container">
      <div className="legal-page-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Privacy & Security</h1>
      </div>

      <div className="legal-content">
        <div className="last-updated">
          Last Updated: April 6, 2023
        </div>

        <section className="legal-section">
          <h2>Your Privacy Matters</h2>
          <p>
            At Nezto, we're committed to protecting your personal information and being transparent about how we use it. 
            This Privacy & Security Policy explains how we collect, use, and safeguard your information when you use our 
            laundry and dry-cleaning services.
          </p>
        </section>

        <section className="legal-section">
          <h2>Information We Collect</h2>
          <div className="info-card">
            <div className="info-icon"><i className="fas fa-user-circle"></i></div>
            <div className="info-content">
              <h3>Personal Information</h3>
              <p>Name, email address, phone number, delivery address, and payment details.</p>
            </div>
          </div>
          
          <div className="info-card">
            <div className="info-icon"><i className="fas fa-map-marker-alt"></i></div>
            <div className="info-content">
              <h3>Location Data</h3>
              <p>With your permission, we collect location data to provide pickup and delivery services.</p>
            </div>
          </div>
          
          <div className="info-card">
            <div className="info-icon"><i className="fas fa-shopping-bag"></i></div>
            <div className="info-content">
              <h3>Service Usage Information</h3>
              <p>Your order history, preferences, and interaction with our app.</p>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2>How We Use Your Information</h2>
          <ul className="bulleted-list">
            <li>To provide and improve our laundry and dry-cleaning services</li>
            <li>To process payments and manage your account</li>
            <li>To communicate with you about your orders and account</li>
            <li>To send you promotional offers and updates (with your consent)</li>
            <li>To analyze usage patterns and optimize our app experience</li>
            <li>To ensure the security of our services</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Security Measures</h2>
          <p>
            Protecting your data is our priority. We implement industry-standard security measures:
          </p>
          <div className="security-features">
            <div className="security-feature">
              <i className="fas fa-lock"></i>
              <span>Secure data encryption</span>
            </div>
            <div className="security-feature">
              <i className="fas fa-shield-alt"></i>
              <span>Robust access controls</span>
            </div>
            <div className="security-feature">
              <i className="fas fa-user-shield"></i>
              <span>Regular security assessments</span>
            </div>
            <div className="security-feature">
              <i className="fas fa-fingerprint"></i>
              <span>Secure authentication</span>
            </div>
          </div>
        </section>

        <section className="legal-section">
          <h2>Your Privacy Rights</h2>
          <p>You have the right to:</p>
          <ul className="bulleted-list">
            <li>Access the personal information we hold about you</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your data (subject to certain limitations)</li>
            <li>Opt out of marketing communications</li>
            <li>Withdraw consent for optional data processing</li>
          </ul>
          <p>To exercise these rights, contact our support team through the app or at <a href="mailto:privacy@nezto.com">privacy@nezto.com</a></p>
        </section>

        <section className="legal-section">
          <h2>Data Retention</h2>
          <p>
            We retain your information only as long as needed to provide our services or comply with legal obligations. 
            You may request deletion of your account at any time.
          </p>
        </section>

        <section className="legal-section">
          <h2>Third-Party Services</h2>
          <p>
            We may use trusted third-party services for payment processing, analytics, and delivery logistics. 
            These providers are bound by strict data protection agreements.
          </p>
        </section>

        <section className="legal-section">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this policy periodically. We'll notify you of significant changes via email or app notification.
          </p>
        </section>

        <section className="legal-section">
          <h2>Contact Us</h2>
          <p>
            If you have questions about our Privacy & Security Policy, please contact us at:
          </p>
          <div className="contact-info">
            <div><i className="fas fa-envelope"></i> <a href="mailto:privacy@nezto.com">privacy@nezto.com</a></div>
            <div><i className="fas fa-phone-alt"></i> <a href="tel:+919876543210">+91 98765 43210</a></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacySecurityPage; 