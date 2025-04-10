import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LegalPages.css';

const TermsConditionsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="legal-page-container">
      <div className="legal-page-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Terms & Conditions</h1>
      </div>

      <div className="legal-content">
        <div className="last-updated">
          Last Updated: April 6, 2023
        </div>

        <section className="legal-section">
          <h2>Welcome to Nezto</h2>
          <p>
            These Terms and Conditions ("Terms") govern your use of the Nezto mobile application ("App") 
            and the laundry and dry cleaning services ("Services") provided by Nezto Laundry Services Pvt. Ltd. 
            ("Nezto", "we", "our", or "us").
          </p>
          <p>
            By downloading, accessing, or using our App, you agree to be bound by these Terms. 
            If you do not agree with any part of these Terms, you may not use our App or Services.
          </p>
        </section>

        <section className="legal-section">
          <h2>Using Our Services</h2>
          <div className="terms-card">
            <h3>Account Registration</h3>
            <p>
              To use our Services, you must create an account by providing accurate and complete information. 
              You are responsible for maintaining the confidentiality of your account credentials and for all 
              activities that occur under your account.
            </p>
          </div>
          
          <div className="terms-card">
            <h3>Service Eligibility</h3>
            <p>
              You must be at least 18 years old to use our Services. By using the App, you represent and warrant 
              that you meet this requirement.
            </p>
          </div>
          
          <div className="terms-card">
            <h3>Ordering Process</h3>
            <p>
              When you place an order through our App, you are making an offer to purchase the Services. 
              We reserve the right to accept or decline your order at our discretion.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <h2>Pricing and Payments</h2>
          <ul className="bulleted-list">
            <li>All prices displayed on the App are in Indian Rupees (INR) and are inclusive of taxes.</li>
            <li>We reserve the right to modify prices at any time without prior notice.</li>
            <li>Payment is processed securely through our authorized payment partners.</li>
            <li>By providing payment information, you represent that you are authorized to use the payment method.</li>
            <li>In case of any payment disputes or refunds, our Refund Policy shall apply.</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Delivery and Pickup</h2>
          <p>
            Our delivery and pickup services are subject to availability in your area. While we strive to meet all 
            scheduled timings, occasional delays may occur due to unforeseen circumstances. We will notify you of 
            any significant changes to your scheduled pickup or delivery.
          </p>
        </section>

        <section className="legal-section">
          <h2>Garment Care and Liability</h2>
          <div className="terms-card highlight-card">
            <h3>Garment Assessment</h3>
            <p>
              We inspect all items upon receipt. However, we cannot guarantee the removal of all stains or the 
              prevention of fading, shrinkage, or fabric damage inherent to certain materials.
            </p>
          </div>
          <div className="terms-card highlight-card">
            <h3>Limitation of Liability</h3>
            <p>
              Our maximum liability for any damaged or lost item is limited to ten times the service charge for that 
              particular item, or the actual value of the item, whichever is lower.
            </p>
          </div>
          <div className="terms-card highlight-card">
            <h3>Unclaimed Items</h3>
            <p>
              Items not claimed within 30 days of the scheduled delivery date may be donated or disposed of at our discretion.
            </p>
          </div>
        </section>

        <section className="legal-section">
          <h2>Prohibited Uses</h2>
          <p>You agree not to:</p>
          <ul className="bulleted-list">
            <li>Use the App for any illegal purpose</li>
            <li>Violate any applicable laws or regulations</li>
            <li>Impersonate another person or entity</li>
            <li>Interfere with the proper functioning of the App</li>
            <li>Attempt to gain unauthorized access to any portion of the App</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Intellectual Property</h2>
          <p>
            All content, trademarks, logos, and other intellectual property displayed on the App are owned by 
            Nezto or its licensors and are protected by applicable intellectual property laws. You may not use, 
            reproduce, or distribute any content from our App without our prior written consent.
          </p>
        </section>

        <section className="legal-section">
          <h2>Termination</h2>
          <p>
            We reserve the right to suspend or terminate your access to our Services at any time, with or without 
            cause and without prior notice. You may also terminate your account at any time by contacting our 
            customer support.
          </p>
        </section>

        <section className="legal-section">
          <h2>Changes to Terms</h2>
          <p>
            We may update these Terms from time to time. The updated version will be effective as of the date stated 
            at the top of the Terms. Your continued use of the App after such changes constitutes your acceptance of 
            the new Terms.
          </p>
        </section>

        <section className="legal-section">
          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes 
            arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Delhi, India.
          </p>
        </section>

        <section className="legal-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="contact-info">
            <div><i className="fas fa-envelope"></i> <a href="mailto:legal@nezto.com">legal@nezto.com</a></div>
            <div><i className="fas fa-phone-alt"></i> <a href="tel:+919876543210">+91 98765 43210</a></div>
            <div><i className="fas fa-map-marker-alt"></i> 123 Business Park, Sector 42, Gurugram, Haryana 122001, India</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsConditionsPage; 