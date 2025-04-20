import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/FAQPage.css';

const FAQPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState({});

  // FAQ data
  const faqCategories = [
    { id: 'general', name: 'General', icon: 'fa-info-circle' },
    { id: 'services', name: 'Services', icon: 'fa-tshirt' },
    { id: 'pricing', name: 'Pricing', icon: 'fa-tag' },
    { id: 'ordering', name: 'Ordering', icon: 'fa-shopping-cart' },
    { id: 'delivery', name: 'Delivery', icon: 'fa-truck' },
    { id: 'payment', name: 'Payment', icon: 'fa-credit-card' },
    { id: 'account', name: 'Account', icon: 'fa-user' }
  ];

  const faqItems = {
    general: [
      {
        id: 'g1',
        question: 'What is Nezto?',
        answer: 'Nezto is a premium laundry and dry cleaning service that offers doorstep pickup and delivery. We use eco-friendly cleaning methods and offer a variety of services to meet all your garment care needs.'
      },
      {
        id: 'g2',
        question: 'In which cities does Nezto operate?',
        answer: "Nezto currently operates in major cities across India including Delhi, Mumbai, Bangalore, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad, and Gurugram. We're constantly expanding to new locations."
      },
      {
        id: 'g3',
        question: 'What are your operating hours?',
        answer: 'Our pickup and delivery services operate from 8:00 AM to 9:00 PM, seven days a week. Our customer support is available from 9:00 AM to 8:00 PM on all days.'
      },
      {
        id: 'g4',
        question: 'How do I contact customer support?',
        answer: 'You can reach our customer support team through the "Contact Support" section in the app, via email at support@nezto.com, or by calling our toll-free number 1800-123-4567.'
      }
    ],
    services: [
      {
        id: 's1',
        question: 'What services does Nezto offer?',
        answer: 'Nezto offers a comprehensive range of garment care services including dry cleaning, wash & fold, ironing, premium laundry, stain removal, shoe cleaning, carpet cleaning, curtain cleaning, and specialized care for leather and designer wear.'
      },
      {
        id: 's2',
        question: 'How are my clothes cleaned?',
        answer: 'We use state-of-the-art cleaning methods and eco-friendly detergents. Different garments are treated according to their fabric type and care instructions. Our professional staff is trained to handle all types of fabrics and stains.'
      },
      {
        id: 's3',
        question: 'Do you offer express service?',
        answer: 'Yes, we offer express service with same-day or next-day delivery for urgent requirements at an additional charge. Express service availability may vary by location and current order volume.'
      },
      {
        id: 's4',
        question: 'How do you handle delicate or special garments?',
        answer: "We have specialized processes for delicate fabrics and premium garments. Our experts assess each item and use appropriate cleaning methods based on the fabric type, embellishments, and manufacturer's care instructions."
      }
    ],
    pricing: [
      {
        id: 'p1',
        question: 'How is pricing calculated?',
        answer: 'Our pricing is per item and varies based on the service type, garment type, and any special treatment required. You can view our detailed price list in the app by selecting a service category.'
      },
      {
        id: 'p2',
        question: 'Are there any hidden charges?',
        answer: 'No, we believe in transparent pricing. The price shown for each item includes all cleaning charges. Additional charges apply only for express service, stain removal (for stubborn stains), or specialized treatment, which will be communicated before processing.'
      },
      {
        id: 'p3',
        question: 'Do you offer any discounts or subscriptions?',
        answer: 'Yes, we offer various discounts for first-time users, bulk orders, and seasonal promotions. We also have subscription plans that provide regular service at discounted rates with added benefits.'
      }
    ],
    ordering: [
      {
        id: 'o1',
        question: 'How do I place an order?',
        answer: 'Simply open the Nezto app, select the service you need, add items to your cart, choose a convenient pickup and delivery time, and confirm your order. You can also add special instructions for specific garments.'
      },
      {
        id: 'o2',
        question: 'Can I modify or cancel my order?',
        answer: 'Yes, you can modify or cancel your order through the app until your clothes are picked up. Once the cleaning process begins, cancellation may not be possible. For assistance with modifications after pickup, please contact customer support.'
      },
      {
        id: 'o3',
        question: 'Is there a minimum order value?',
        answer: 'Yes, there is a minimum order value of ₹199 for free pickup and delivery. Orders below this amount will incur a small delivery fee.'
      }
    ],
    delivery: [
      {
        id: 'd1',
        question: 'How long does delivery take?',
        answer: 'Standard service typically takes 48-72 hours from pickup to delivery. Express service offers 24-hour turnaround. The exact timeframe will be shown when you place your order and depends on the service selected.'
      },
      {
        id: 'd2',
        question: 'Is pickup and delivery free?',
        answer: 'Yes, pickup and delivery are free for orders above ₹199. For orders below this amount, a nominal delivery fee will be applied.'
      },
      {
        id: 'd3',
        question: 'How will I know when my order is ready for delivery?',
        answer: "You will receive real-time notifications through the app at each stage of the process. When your order is ready for delivery, you'll receive a notification and SMS with the estimated delivery time and delivery person details."
      },
      {
        id: 'd4',
        question: "What if I'm not available during delivery?",
        answer: "If you're not available during the scheduled delivery time, you can reschedule it through the app or ask us to deliver to an alternate address. For security, we may require an OTP verification for alternate delivery arrangements."
      }
    ],
    payment: [
      {
        id: 'pay1',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit/debit cards, UPI (PhonePe, Google Pay, Paytm), net banking, and wallet payments. We also offer a cash-on-delivery option in select locations.'
      },
      {
        id: 'pay2',
        question: 'When will I be charged for my order?',
        answer: 'For online payments, you will be charged when you place the order. For cash-on-delivery orders, payment is collected at the time of delivery.'
      },
      {
        id: 'pay3',
        question: 'How do refunds work?',
        answer: "If you're not satisfied with our service, we offer a reclean or refund. Refunds are processed within 5-7 working days and credited back to the original payment method."
      }
    ],
    account: [
      {
        id: 'a1',
        question: 'How do I create an account?',
        answer: "You can sign up using your mobile number or email. We'll send a verification code to validate your contact information. Once verified, you can set up your profile and add delivery addresses."
      },
      {
        id: 'a2',
        question: 'How do I reset my password?',
        answer: "Click on \"Forgot Password\" on the login screen. Enter your registered email or phone number, and we'll send you a password reset link or OTP."
      },
      {
        id: 'a3',
        question: 'Can I have multiple addresses?',
        answer: 'Yes, you can save multiple addresses in your profile for home, office, or any other location. You can select your preferred address during checkout.'
      }
    ]
  };

  // Handle item toggling
  const toggleItem = (itemId) => {
    setExpandedItems({
      ...expandedItems,
      [itemId]: !expandedItems[itemId]
    });
  };

  // Filter FAQ items based on search query
  const getFilteredFAQs = () => {
    if (!searchQuery.trim()) {
      return faqItems[activeCategory] || [];
    }

    const query = searchQuery.toLowerCase();
    const results = [];

    Object.values(faqItems).forEach(categoryItems => {
      const filtered = categoryItems.filter(
        item => item.question.toLowerCase().includes(query) || 
               item.answer.toLowerCase().includes(query)
      );
      results.push(...filtered);
    });

    return results;
  };

  const filteredFAQs = getFilteredFAQs();

  return (
    <div className="faq-page-container">
      <div className="faq-page-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>FAQ & Help Center</h1>
      </div>

      <div className="faq-content">
        {/* Search Bar */}
        <div className="faq-search-container">
          <div className="search-box">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery('')}>
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>

        {/* Popular Topics */}
        {!searchQuery && (
          <div className="popular-topics">
            <h2>Popular Topics</h2>
            <div className="topic-cards">
              <div className="topic-card" onClick={() => navigate('/contact-support')}>
                <div className="topic-icon"><i className="fas fa-headset"></i></div>
                <div className="topic-text">Contact Support</div>
              </div>
              <div className="topic-card" onClick={() => setActiveCategory('ordering')}>
                <div className="topic-icon"><i className="fas fa-shopping-cart"></i></div>
                <div className="topic-text">How to Order</div>
              </div>
              <div className="topic-card" onClick={() => setActiveCategory('delivery')}>
                <div className="topic-icon"><i className="fas fa-truck"></i></div>
                <div className="topic-text">Delivery Info</div>
              </div>
              <div className="topic-card" onClick={() => setActiveCategory('payment')}>
                <div className="topic-icon"><i className="fas fa-credit-card"></i></div>
                <div className="topic-text">Payment Options</div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Categories */}
        {!searchQuery && (
          <div className="faq-categories">
            <h2>Browse by Category</h2>
            <div className="category-tabs">
              {faqCategories.map(category => (
                <button
                  key={category.id}
                  className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <i className={`fas ${category.icon}`}></i> {category.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Items */}
        <div className="faq-items">
          {searchQuery && <h2>Search Results</h2>}
          {!searchQuery && <h2>{faqCategories.find(c => c.id === activeCategory)?.name} FAQs</h2>}
          
          {filteredFAQs.length === 0 ? (
            <div className="no-results">
              <i className="fas fa-search"></i>
              <p>No results found for "{searchQuery}"</p>
              <button className="reset-search" onClick={() => setSearchQuery('')}>Clear Search</button>
            </div>
          ) : (
            <div className="accordion">
              {filteredFAQs.map(item => (
                <div key={item.id} className="accordion-item">
                  <button
                    className={`accordion-header ${expandedItems[item.id] ? 'active' : ''}`}
                    onClick={() => toggleItem(item.id)}
                  >
                    <span>{item.question}</span>
                    <i className={`fas fa-chevron-${expandedItems[item.id] ? 'up' : 'down'}`}></i>
                  </button>
                  {expandedItems[item.id] && (
                    <div className="accordion-content">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="contact-support-section">
          <h2>Still Need Help?</h2>
          <p>Our support team is here to assist you</p>
          <div className="support-options">
            <button className="support-option" onClick={() => navigate('/contact-support')}>
              <i className="fas fa-comment-alt"></i>
              <span>Chat with Us</span>
            </button>
            <button className="support-option" onClick={() => window.location.href = 'mailto:support@nezto.com'}>
              <i className="fas fa-envelope"></i>
              <span>Email Support</span>
            </button>
            <button className="support-option" onClick={() => window.location.href = 'tel:18001234567'}>
              <i className="fas fa-phone-alt"></i>
              <span>Call Us</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 