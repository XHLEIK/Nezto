import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AboutPage.css';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="about-page-container">
      <div className="about-page-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>About Nezto</h1>
      </div>

      <div className="about-content">
        <div className="about-logo-section">
          <div className="about-logo">
            <div className="logo-text">NEZTO</div>
          </div>
          <p className="tagline">Transforming laundry, one garment at a time</p>
        </div>

        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, Nezto was born from a simple idea: to make laundry and dry cleaning services 
            more accessible, affordable, and eco-friendly for everyone. What started as a small operation 
            in Gurugram has quickly expanded to multiple cities across India.
          </p>
          <p>
            Our founders, recognizing the challenges of balancing work and personal responsibilities in 
            today's fast-paced world, created Nezto to give people back their most valuable asset—time.
          </p>
        </section>

        <section className="about-section vision-mission">
          <div className="vision-box">
            <i className="fas fa-eye"></i>
            <h3>Our Vision</h3>
            <p>
              To revolutionize the laundry industry through technology and innovation, making professional 
              garment care accessible to everyone.
            </p>
          </div>
          <div className="mission-box">
            <i className="fas fa-bullseye"></i>
            <h3>Our Mission</h3>
            <p>
              To deliver exceptional garment care services that save time, extend the life of your clothes, 
              and reduce environmental impact through sustainable practices.
            </p>
          </div>
        </section>

        <section className="about-section">
          <h2>Why Choose Nezto?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-tshirt"></i>
              </div>
              <h3>Expert Care</h3>
              <p>Professionally trained staff with expertise in handling all fabric types</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-truck"></i>
              </div>
              <h3>Free Pickup & Delivery</h3>
              <p>Convenient doorstep service at your preferred schedule</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>Eco-Friendly</h3>
              <p>Biodegradable detergents and water-efficient processes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Garment Protection</h3>
              <p>Insurance coverage for peace of mind with every order</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Book</h3>
                <p>Schedule a pickup through our app with just a few taps</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Collect</h3>
                <p>We pick up your clothes from your doorstep</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Clean</h3>
                <p>Your garments are professionally cleaned and treated</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Deliver</h3>
                <p>Freshly cleaned clothes delivered back to you</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section stats-section">
          <h2>Nezto in Numbers</h2>
          <div className="stats-container">
            <div className="stat-box">
              <div className="stat-number">20+</div>
              <div className="stat-label">Cities</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">100k+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">5M+</div>
              <div className="stat-label">Garments Cleaned</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">4.8</div>
              <div className="stat-label">App Rating</div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Commitment to Sustainability</h2>
          <p>
            At Nezto, we're committed to environmentally responsible practices. We use biodegradable, 
            phosphate-free detergents, water-efficient technologies, and eco-friendly packaging materials. 
            Our facilities are designed to minimize energy consumption and reduce waste.
          </p>
          <div className="eco-initiatives">
            <div className="eco-initiative">
              <i className="fas fa-water"></i>
              <span>Water Conservation</span>
            </div>
            <div className="eco-initiative">
              <i className="fas fa-recycle"></i>
              <span>Recyclable Packaging</span>
            </div>
            <div className="eco-initiative">
              <i className="fas fa-bolt"></i>
              <span>Energy Efficiency</span>
            </div>
            <div className="eco-initiative">
              <i className="fas fa-flask"></i>
              <span>Eco-friendly Chemicals</span>
            </div>
          </div>
        </section>

        <section className="about-section team-section">
          <h2>Leadership Team</h2>
          <div className="team-members">
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: '#e0e0e0' }}>
                <i className="fas fa-user"></i>
              </div>
              <h3>Rahul Sharma</h3>
              <p className="member-title">Co-founder & CEO</p>
            </div>
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: '#e0e0e0' }}>
                <i className="fas fa-user"></i>
              </div>
              <h3>Priya Patel</h3>
              <p className="member-title">Co-founder & COO</p>
            </div>
            <div className="team-member">
              <div className="member-photo" style={{ backgroundColor: '#e0e0e0' }}>
                <i className="fas fa-user"></i>
              </div>
              <h3>Vikram Singh</h3>
              <p className="member-title">CTO</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Contact Us</h2>
          <div className="contact-container">
            <div className="contact-info">
              <div><i className="fas fa-envelope"></i> <a href="mailto:info@nezto.com">info@nezto.com</a></div>
              <div><i className="fas fa-phone-alt"></i> <a href="tel:+919876543210">+91 98765 43210</a></div>
              <div><i className="fas fa-map-marker-alt"></i> 123 Business Park, Sector 42, Gurugram, Haryana 122001, India</div>
            </div>
            <div className="social-links">
              <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </section>

        <div className="about-footer">
          <p>© {new Date().getFullYear()} Nezto Laundry Services Pvt. Ltd. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 