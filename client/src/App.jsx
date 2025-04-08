import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import "./App.css";
import "./common.css";
// Commenting out styles.css import if it doesn't exist
// import "./styles.css";
import HomePage from "./HomePage";
import ServicesPage from "./pages/ServicesPage";
import SplashScreen from "./SplashScreen";
import ProfilePage from "./ProfilePage";
import EditProfilePage from "./EditProfilePage";
import LocationPage from "./LocationPage";
import SavedLocationsPage from "./SavedLocationsPage";
import PaymentMethodsPage from "./PaymentMethodsPage";
import AddPaymentMethodPage from "./AddPaymentMethodPage";
import NotificationsPage from "./NotificationsPage";
import WishlistPage from "./WishlistPage";
import CheckoutPage from "./CheckoutPage";
import OrderHistoryPage from './OrderHistoryPage';
import OrderDetailsPage from './OrderDetailsPage';
import OrderConfirmationPage from './OrderConfirmationPage';
import ServicePaymentPage from './ServicePaymentPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import OrdersPage from './pages/OrdersPage';
import { UserProvider, useUser } from "./UserContext";
import FAQSupportPage from './FAQSupportPage';
import FAQCategoryPage from './FAQCategoryPage';
import ChatbotPage from './ChatbotPage';
import ClerkUserInfo from './ClerkUserInfo';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import LocationSearchMap from './LocationSearchMap';
import DryCleaningPage from "./services/DryCleaningPage";
import LaundryWashPage from "./services/LaundryWashPage";
import IroningPage from "./services/IroningPage";
import ShoeCleaningPage from "./services/ShoeCleaningPage";
import CarpetCleaningPage from "./services/CarpetCleaningPage";
import StainRemovalPage from "./services/StainRemovalPage";
import PremiumLaundryPage from "./services/PremiumLaundryPage";
import CurtainCleaningPage from "./services/CurtainCleaningPage";
import SuitCleaningPage from "./services/SuitCleaningPage";
import SteamPressingPage from "./services/SteamPressingPage";
import BeddingCleaningPage from "./services/BeddingCleaningPage";
import LeatherCarePage from "./services/LeatherCarePage";
import WashAndFoldPage from "./services/WashAndFoldPage";
import PremiumSuitCleaningPage from "./services/PremiumSuitCleaningPage";
import CurtainWashIronPage from "./services/CurtainWashIronPage";
import HomeCleaningPage from "./services/HomeCleaningPage";
import SofaCleaningPage from "./services/SofaCleaningPage";
import DesignerWearCarePage from "./services/DesignerWearCarePage";
import DailyWearCategory from "./categories/DailyWearCategory";
import PremiumCategory from "./categories/PremiumCategory";
import HomeCareCategory from "./categories/HomeCareCategory";
import QuickServiceCategory from "./categories/QuickServiceCategory";
import OffersPage from "./OffersPage";
import ReviewsPage from "./ReviewsPage";
import SearchPage from "./pages/SearchPage";
import PickupConfirmedPage from './pages/PickupConfirmedPage';
import AddLocationPage from './AddLocationPage';
import FAQPage from './pages/FAQPage';
import ContactSupportPage from './pages/ContactSupportPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import AboutPage from './pages/AboutPage';

// Wrapper component for LocationSearchMap with navigation
const LocationSearchMapWrapper = () => {
  const navigate = useNavigate();
  
  const handleSaveLocation = (location) => {
    console.log("Location saved from route:", location);
    // Navigate back to saved locations with state
    navigate('/saved-locations', { 
      replace: true, 
      state: { from: 'location-map', timestamp: Date.now() } 
    });
  };
  
  return <LocationSearchMap onSaveLocation={handleSaveLocation} />;
};

// Custom component to control scroll behavior
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    const scrollableElement = document.querySelector('.phone-content');
    if (scrollableElement) {
      scrollableElement.scrollTo(0, 0);
    }
  }, [pathname]);
  
  return null;
};

// Component to handle active states for navigation
const NavIcon = ({ to, icon, label, pathname }) => {
  const isActive = pathname === to;
  
  return (
    <Link 
      to={to} 
      className="nav-icon d-flex flex-column align-items-center" 
      style={{ 
        color: isActive ? "#40BFC1" : "#A8A8A8", 
        textDecoration: "none", 
        fontSize: isActive ? "1.3rem" : "1.1rem",
        fontWeight: isActive ? "bold" : "normal"
      }}
    >
      <i className={icon} style={{ marginBottom: "2px" }}></i>
      <span style={{ 
        fontSize: "0.7rem", 
        marginTop: "2px",
        opacity: isActive ? 1 : 0.8
      }}>{label}</span>
    </Link>
  );
};

// Main navigation component
const BottomNavigation = () => {
  const { pathname } = useLocation();
  
  return (
    <nav 
      className="navbar py-2 px-4 d-flex justify-content-around shadow-lg" 
      style={{ 
        backgroundColor: "#ffffff", 
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        borderTop: "1px solid #eaeaea",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        margin: 0,
        zIndex: 1010,
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)"
      }}
    >
      <NavIcon to="/" icon="fas fa-home" label="Home" pathname={pathname} />
      <NavIcon to="/services" icon="fas fa-list" label="Services" pathname={pathname} />
      <NavIcon to="/profile" icon="fas fa-user" label="Profile" pathname={pathname} />
    </nav>
  );
};

// Simple logo component for loading states
export const NeztoLogo = ({ size = 'medium' }) => {
  const sizes = {
    small: { fontSize: '24px', padding: '8px 20px' },
    medium: { fontSize: '28px', padding: '10px 25px' },
    large: { fontSize: '36px', padding: '15px 40px' }
  };
  
  const style = sizes[size] || sizes.medium;
  
  return (
    <div className="nezto-logo-container" style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '15px auto'
    }}>
      <div style={{ 
        backgroundColor: 'white',
        borderRadius: '50px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        padding: style.padding,
        textAlign: 'center'
      }}>
        <div style={{ 
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 800,
          fontSize: style.fontSize,
          color: '#40BFC1',
          letterSpacing: '3px'
        }}>
          NEZTO
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  // Handle platform-specific initialization
  useEffect(() => {
    // Track route changes
    const handleRouteChange = () => {
      console.log('App: Route changed to', window.location.pathname);
    };
    
    window.addEventListener('popstate', handleRouteChange);
    
    // Fixed the touchmove event listener to prevent issues
    const handleTouchMove = (e) => {
      // Allow scrolling in the phone content area
      const phoneContent = document.querySelector('.phone-content');
      if (phoneContent && !phoneContent.contains(e.target)) {
        e.preventDefault();
      }
    };
    
    // Add the event listener with passive: false to allow preventDefault
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // Handle app initialization logic
    const initializeApp = () => {
      setIsAppReady(true);
      console.log('App: Initialized');
    };
    
    initializeApp();
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Handle back button on Android
  useEffect(() => {
    const handleBackButton = (e) => {
      // Handle back button logic here
      // This would be integrated with actual native functionality when converted
    };
    
    window.addEventListener('popstate', handleBackButton);
    
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  if (!isAppReady) {
    return null; // Wait until app is initialized
  }

  return (
    <div className="phone-wrapper">
      <div className="phone-container">
        <div className="phone-notch"></div>
        <UserProvider>
          <Router>
            <ScrollToTop />
            {showSplash ? (
              <SplashScreen onComplete={handleSplashComplete} />
            ) : (
              <div className="phone-content container-fluid p-0" style={{ 
                backgroundColor: "#f8f9fa", 
                fontFamily: "'Poppins', sans-serif",
                height: "100%",
                position: "relative",
                overflowX: "hidden",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch"
              }}>
                
                {/* Header - Only show on Home and Services pages */}
                <Routes>
                  <Route path="/profile" element={null} />
                  <Route path="/edit-profile" element={null} />
                  <Route path="/location" element={null} />
                  <Route path="/saved-locations" element={null} />
                  <Route path="/payment-methods" element={null} />
                  <Route path="/add-payment-method" element={null} />
                  <Route path="/notifications" element={null} />
                  <Route path="/wishlist" element={null} />
                  <Route path="/checkout" element={null} />
                  <Route path="/service-payment" element={null} />
                  <Route path="/order-history" element={null} />
                  <Route path="/order-details/:orderId" element={null} />
                  <Route path="/faq" element={null} />
                  <Route path="/faq/:category" element={null} />
                  <Route path="/faq/chat" element={null} />
                  <Route path="/clerk-user-info" element={null} />
                  <Route path="/service/:id" element={null} />
                  <Route path="/order-confirmation/:orderId" element={null} />
                  <Route path="/location-search" element={null} />
                  <Route path="/otp-verification" element={null} />
                  <Route path="/services/dry-cleaning" element={<DryCleaningPage />} />
                  <Route path="/services/laundry-wash" element={<LaundryWashPage />} />
                  <Route path="/services/ironing" element={<IroningPage />} />
                  <Route path="/services/shoe-cleaning" element={<ShoeCleaningPage />} />
                  <Route path="/services/carpet-cleaning" element={<CarpetCleaningPage />} />
                  <Route path="/services/stain-removal" element={<StainRemovalPage />} />
                  <Route path="/services/premium-laundry" element={<PremiumLaundryPage />} />
                  <Route path="/services/curtain-clean" element={<CurtainCleaningPage />} />
                  <Route path="/services/suit-cleaning" element={<SuitCleaningPage />} />
                  <Route path="/services/steam-pressing" element={<SteamPressingPage />} />
                  <Route path="/services/bedding-cleaning" element={<BeddingCleaningPage />} />
                  <Route path="/services/leather-care" element={<LeatherCarePage />} />
                  <Route path="/services/wash-and-fold" element={<WashAndFoldPage />} />
                  <Route path="/services/premium-suit-cleaning" element={<PremiumSuitCleaningPage />} />
                  <Route path="/services/curtain-wash-iron" element={<CurtainWashIronPage />} />
                  <Route path="/services/home-cleaning" element={<HomeCleaningPage />} />
                  <Route path="/services/sofa-cleaning" element={<SofaCleaningPage />} />
                  <Route path="/service/designer-wear" element={<DesignerWearCarePage />} />
                  <Route path="/service/quick-ironing" element={<IroningPage />} />
                  <Route path="*" element={<HeaderWithNav />} />
                </Routes>

                {/* Main Content with Padding */}
                <div className="content-container px-3 pb-5 pt-2" style={{ 
                  marginBottom: "80px", 
                  paddingBottom: "30px",
                  position: "relative",
                  zIndex: 1
                }}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/edit-profile" element={<EditProfilePage />} />
                    <Route path="/location" element={<LocationPage />} />
                    <Route path="/saved-locations" element={<SavedLocationsPage />} />
                    <Route path="/add-location" element={<AddLocationPage />} />
                    <Route path="/payment-methods" element={<PaymentMethodsPage />} />
                    <Route path="/add-payment-method" element={<AddPaymentMethodPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/service-payment" element={<ServicePaymentPage />} />
                    <Route path="/order-history" element={<OrderHistoryPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/order-details/:id" element={<OrderDetailsPage />} />
                    <Route path="/order-confirmation/:id" element={<OrderConfirmationPage />} />
                    <Route path="/order-tracking" element={<OrderTrackingPage />} />
                    <Route path="/otp-verification" element={<OTPVerificationPage />} />
                    <Route path="/pickup-confirmed" element={<PickupConfirmedPage />} />
                    <Route path="/faq-support" element={<FAQSupportPage />} />
                    <Route path="/faq-category/:id" element={<FAQCategoryPage />} />
                    <Route path="/chatbot" element={<ChatbotPage />} />
                    <Route path="/clerk-user-info" element={<ClerkUserInfo />} />
                    <Route path="/location-map" element={<LocationSearchMapWrapper />} />
                    <Route path="/offers" element={<OffersPage />} />
                    <Route path="/reviews" element={<ReviewsPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    
                    {/* Direct routes to specific service pages */}
                    <Route path="/service/dry-clean" element={<DryCleaningPage />} />
                    <Route path="/service/laundry" element={<LaundryWashPage />} />
                    <Route path="/service/laundry-wash" element={<LaundryWashPage />} />
                    <Route path="/service/ironing" element={<IroningPage />} />
                    <Route path="/service/shoe-cleaning" element={<ShoeCleaningPage />} />
                    <Route path="/service/carpet-cleaning" element={<CarpetCleaningPage />} />
                    <Route path="/service/stain-removal" element={<StainRemovalPage />} />
                    <Route path="/service/premium-laundry" element={<PremiumLaundryPage />} />
                    <Route path="/service/curtain-clean" element={<CurtainCleaningPage />} />
                    <Route path="/service/suit-clean" element={<SuitCleaningPage />} />
                    <Route path="/service/steam-press" element={<SteamPressingPage />} />
                    <Route path="/service/bedding-clean" element={<BeddingCleaningPage />} />
                    <Route path="/service/leather-care" element={<LeatherCarePage />} />
                    <Route path="/service/wash-fold" element={<WashAndFoldPage />} />
                    <Route path="/service/express-service" element={<WashAndFoldPage />} />
                    <Route path="/service/premium-suit" element={<PremiumSuitCleaningPage />} />
                    <Route path="/service/curtain-wash-iron" element={<CurtainWashIronPage />} />
                    <Route path="/service/home-cleaning" element={<HomeCleaningPage />} />
                    <Route path="/service/sofa-cleaning" element={<SofaCleaningPage />} />
                    <Route path="/service/designer-wear" element={<DesignerWearCarePage />} />
                    <Route path="/service/quick-ironing" element={<IroningPage />} />
                    
                    {/* Category Pages */}
                    <Route path="/category/daily-wear" element={<DailyWearCategory />} />
                    <Route path="/category/premium" element={<PremiumCategory />} />
                    <Route path="/category/home-care" element={<HomeCareCategory />} />
                    <Route path="/category/quick" element={<QuickServiceCategory />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/contact-support" element={<ContactSupportPage />} />
                    <Route path="/terms-conditions" element={<TermsConditionsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                  </Routes>
                </div>

                {/* Bottom Navigation */}
                <BottomNavigation />
              </div>
            )}
          </Router>
        </UserProvider>
      </div>
    </div>
  );
};

/* Header with Navigation */
const HeaderWithNav = () => {
  const navigate = useNavigate();
  const { userData } = useUser();
  const [wishlistHover, setWishlistHover] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  
  // Count items in cart and wishlist
  const cartCount = userData?.cartItems?.length || 0;
  const wishlistCount = userData?.wishlistItems?.length || 0;
  
  return (
    <header className="d-flex justify-content-between align-items-center p-3 shadow-sm" 
      style={{ 
        backgroundColor: "#ffffff", 
        height: "70px",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 1000,
        borderBottom: "none",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
      }}>
      {/* Logo */}
      <div 
        className="logo" 
        style={{ 
          fontWeight: "700", 
          fontSize: "1.7rem", 
          color: "#40BFC1",
          cursor: "pointer"
        }}
        onClick={() => navigate('/')}
      >
        Nezto
      </div>
      {/* Auth Components */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
        <SignedIn>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{ position: "relative" }}>
              <button
                className="icon-button"
                onClick={() => navigate('/wishlist')}
                onMouseEnter={() => setWishlistHover(true)}
                onMouseLeave={() => setWishlistHover(false)}
                style={{
                  background: wishlistHover ? "#f0f8f8" : "none",
                  border: "none",
                  color: "#40BFC1",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  transition: "background-color 0.2s"
                }}
              >
                <i className="fas fa-heart"></i>
              </button>
              {wishlistCount > 0 && (
                <div style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  backgroundColor: "#FF5A5F",
                  color: "white",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}>
                  {wishlistCount}
                </div>
              )}
            </div>
            <div style={{ position: "relative" }}>
              <button
                className="icon-button"
                onClick={() => navigate('/checkout')}
                onMouseEnter={() => setCartHover(true)}
                onMouseLeave={() => setCartHover(false)}
                style={{
                  background: cartHover ? "#f0f8f8" : "none",
                  border: "none",
                  color: "#40BFC1",
                  fontSize: "1.2rem",
                  cursor: "pointer",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  transition: "background-color 0.2s"
                }}
              >
                <i className="fas fa-shopping-cart"></i>
              </button>
              {cartCount > 0 && (
                <div style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  backgroundColor: "#FF5A5F",
                  color: "white",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "0.7rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}>
                  {cartCount}
                </div>
              )}
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>
    </header>
  );
};

/* Home Component */
const Home = () => {
  // Implement touch feedback for interactive elements
  const handleServicePress = (index, serviceName, serviceId) => {
    console.log(`Service ${serviceName} pressed`);
    // This could show more details about the service
  };

  // Handle special offer button clicks
  const handleOfferClick = (couponCode, discount) => {
    // In a real app, this would send the coupon to user's WhatsApp
    // Here we'll just show a notification
    const notification = document.createElement('div');
    notification.className = 'whatsapp-notification';
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fab fa-whatsapp"></i>
        <div class="notification-text">
          <p>Coupon code <strong>${couponCode}</strong> has been sent to your WhatsApp!</p>
          <p class="notification-subtext">Check your messages for ${discount}% discount</p>
        </div>
        <button class="notification-close">×</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate the notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
    
    // Add close button listener
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.classList.remove('show');
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 5000);
  };

  // Helper component for consistent number circles
  const CircleNumber = ({ number }) => (
    <div className="step-icon" style={{ 
      width: "40px", 
      height: "40px", 
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      boxShadow: "0 3px 8px rgba(64, 191, 193, 0.3)",
      backgroundColor: "#40BFC1",
      color: "white",
      fontWeight: "600",
      fontSize: "18px",
      position: "relative",
      overflow: "hidden"
    }}>
      {number}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "50%",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "40px 40px 0 0"
      }}></div>
    </div>
  );

  return (
    <div className="home-container">
      {/* Hero Banner */}
      <div className="hero-banner">
        <h1>Expert Laundry Services</h1>
        <p>Professional cleaning for all your garments</p>
        <Link to="/services" style={{ textDecoration: 'none' }}>
          <button className="book-now-btn">Book Now</button>
        </Link>
      </div>
      
      {/* Top Services Section */}
      <div className="section">
        <div className="section-header">
          <h2>Our Laundry Services</h2>
          <p style={{ marginTop: "12px" }}>Quality solutions for all your clothing needs</p>
        </div>
        
        <div className="services-grid">
          {[
            { icon: <i className="fas fa-tshirt" style={{fontSize: "28px"}}></i>, text: "Dry Clean", description: "Premium care for delicate fabrics", id: 1 },
            { icon: <i className="fas fa-water" style={{fontSize: "28px"}}></i>, text: "Wash & Fold", description: "Fresh, neatly folded everyday clothes", id: 2 },
            { icon: <i className="fas fa-temperature-high" style={{fontSize: "30px"}}></i>, text: "Ironing", description: "Crisp, wrinkle-free garments", id: 3 },
            { icon: <i className="fas fa-brush" style={{fontSize: "28px"}}></i>, text: "Stain Removal", description: "Expert treatment for tough stains", id: 4 }
          ].map((service, index) => (
            <div 
              key={index} 
              className="service-card" 
              onClick={() => handleServicePress(index, service.text, service.id)}
            >
              <div>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.text}</h3>
                <div className="service-description">
                  <p>{service.description}</p>
                </div>
              </div>
              <Link 
                to={`/service/${service.id}`} 
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Booking service: ${service.text}`);
                }}
              >
                <button className="service-btn">Book Now</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* How It Works Section - 2x2 Grid with Clockwise Flow */}
      <div className="section how-it-works">
        <div className="section-header">
          <h2>How It Works</h2>
          <p style={{ marginTop: "12px" }}>Simple steps for clean clothes</p>
        </div>
        
        <div className="steps-grid">
          <div className="step-row">
            <div className="step">
              <CircleNumber number="1" />
              <h3>Book Service</h3>
              <p>Choose your laundry needs</p>
            </div>
            
            <div className="step-arrow right"></div>
            
            <div className="step">
              <CircleNumber number="2" />
              <h3>Schedule Pickup</h3>
              <p>We collect from your location</p>
              <div className="step-flow">
                <div className="step-arrow-vertical right-down"></div>
              </div>
            </div>
          </div>
          
          <div className="step-row">
            <div className="step">
              <CircleNumber number="4" />
              <h3>Delivery</h3>
              <p>Clean clothes at your door</p>
            </div>
            
            <div className="step-arrow left"></div>
            
            <div className="step">
              <CircleNumber number="3" />
              <h3>Professional Clean</h3>
              <p>Expert care for your garments</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Special Offer Ad Banner */}
      <div className="ad-banner">
        <div className="ad-content">
          <h2>Special Offer</h2>
          <h3>30% OFF First Order</h3>
          <p>Use code: NEZTO30</p>
          <button className="ad-btn" onClick={() => handleOfferClick('NEZTO30', 30)}>Claim Now</button>
        </div>
      </div>
      
      {/* Recommended For You Section - with FontAwesome icons instead of images */}
      <div className="section">
        <div className="section-header">
          <h2>Recommended For You</h2>
          <p style={{ marginTop: "12px" }}>Personalized laundry solutions</p>
        </div>
        
        <div className="recommendation-carousel">
          {[
            { icon: "fa-user-tie", title: "Premium Suit Cleaning", price: "599", id: 5 },
            { icon: "fa-broom", title: "Carpet Cleaning", price: "1299", id: 6 },
            { icon: "fa-stream", title: "Curtain Wash & Iron", price: "799", id: 7 }
          ].map((item, index) => (
            <div key={index} className="recommendation-card">
              <div className="rec-icon">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <h3>{item.title}</h3>
              <p className="price">₹{item.price}</p>
              <Link 
                to={`/service/${item.id}`} 
                onClick={() => console.log(`Booking recommended service: ${item.title}`)}
              >
                <button className="book-btn">Book Now</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* Animated Special Offer Card */}
      <div className="special-offer-card">
        <div className="shimmer-effect"></div>
        <div className="offer-content">
          <div className="offer-badge">EXCLUSIVE</div>
          <h2>Monsoon Sale</h2>
          <h3>FLAT 40% OFF</h3>
          <p>On premium laundry services</p>
          <div className="offer-timer">
            <div className="timer-unit">
              <span className="time-value">2</span>
              <span className="time-label">Days</span>
            </div>
            <div className="timer-unit">
              <span className="time-value">18</span>
              <span className="time-label">Hours</span>
            </div>
            <div className="timer-unit">
              <span className="time-value">45</span>
              <span className="time-label">Mins</span>
            </div>
          </div>
          <button className="pulse-button" onClick={() => handleOfferClick('MONSOON40', 40)}>GET NOW</button>
        </div>
      </div>
      
      {/* Additional Special Offer 1 */}
      <div className="ad-banner" style={{ background: 'linear-gradient(45deg, #6C5CE7, #8E44AD)' }}>
        <div className="ad-content">
          <h2>Limited Time Offer</h2>
          <h3>Free Delivery</h3>
          <p>On orders above $25</p>
          <button className="ad-btn" style={{ color: '#8E44AD' }} onClick={() => handleOfferClick('FREEDEL', 100)}>Get Free Delivery</button>
        </div>
      </div>
      
      {/* Top Features Section */}
      <div className="section features-section">
        <div className="section-header">
          <h2>Why Choose Us</h2>
          <p style={{ marginTop: "12px" }}>The Nezto laundry advantage</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-star"></i>
            </div>
            <h3>Quality Cleaning</h3>
            <p>Premium fabric care with attention to detail</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-truck"></i>
            </div>
            <h3>Fast Delivery</h3>
            <p>Quick 24-36 hour turnaround service</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="far fa-clock"></i>
            </div>
            <h3>Flexible Timing</h3>
            <p>Schedule pickups at your convenience</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Fabric Protection</h3>
            <p>Gentle treatment for all garment types</p>
          </div>
        </div>
      </div>
      
      {/* Additional Special Offer 2 */}
      <div className="ad-banner" style={{ background: 'linear-gradient(45deg, #00B894, #00CEC9)' }}>
        <div className="ad-content">
          <h2>Premium Membership</h2>
          <h3>50% OFF Monthly Plan</h3>
          <p>Unlimited free delivery + priority service</p>
          <button className="ad-btn" style={{ color: '#00B894' }} onClick={() => handleOfferClick('PREMIUM50', 50)}>Join Now</button>
        </div>
      </div>
      
      {/* Customer Testimonials */}
      <div className="section testimonials">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
          <p style={{ marginTop: "12px" }}>Trusted by thousands of satisfied customers</p>
        </div>
        
        <div className="testimonial-carousel">
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p>"My clothes have never been cleaner! The stain removal service is exceptional. Highly recommend Nezto for all laundry needs!"</p>
            <div className="customer-info">
              <div className="customer-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="customer-details">
                <h4>Sarah Johnson</h4>
                <p>Regular Customer</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p>"Incredibly convenient service. They picked up my laundry on time and delivered perfectly folded clothes the next day!"</p>
            <div className="customer-info">
              <div className="customer-avatar" style={{ backgroundColor: "#6C5CE7" }}>
                <i className="fas fa-user"></i>
              </div>
              <div className="customer-details">
                <h4>Michael Chen</h4>
                <p>Premium Member</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="rating">★★★★☆</div>
            <p>"The ironing service is fantastic. My shirts have never looked better. Very professional staff and great attention to detail."</p>
            <div className="customer-info">
              <div className="customer-avatar" style={{ backgroundColor: "#E84393" }}>
                <i className="fas fa-user-alt"></i>
              </div>
              <div className="customer-details">
                <h4>Emma Rodriguez</h4>
                <p>Business Customer</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p>"I love how they handle delicate fabrics. Had my wedding dress cleaned by them and it looks brand new!"</p>
            <div className="customer-info">
              <div className="customer-avatar" style={{ backgroundColor: "#00B894" }}>
                <i className="fas fa-user-tie"></i>
              </div>
              <div className="customer-details">
                <h4>David Smith</h4>
                <p>New Customer</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p>"Their subscription plan saves me so much time every month. The app is easy to use and their customer service is top-notch."</p>
            <div className="customer-info">
              <div className="customer-avatar" style={{ backgroundColor: "#FF7675" }}>
                <i className="fas fa-user-check"></i>
              </div>
              <div className="customer-details">
                <h4>Sophia Williams</h4>
                <p>Monthly Subscriber</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p>"What a time-saver! I've been using Nezto for three months and haven't had to worry about laundry once. Completely reliable."</p>
            <div className="customer-info">
              <div className="customer-avatar" style={{ backgroundColor: "#0984E3" }}>
                <i className="fas fa-user-shield"></i>
              </div>
              <div className="customer-details">
                <h4>James Wilson</h4>
                <p>Family Plan Member</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="rating">★★★★☆</div>
            <p>"I appreciate the eco-friendly detergent options. My sensitive skin hasn't had any issues with their hypoallergenic cleaning."</p>
            <div className="customer-info">
              <div className="customer-avatar" style={{ backgroundColor: "#00CEC9" }}>
                <i className="fas fa-user-nurse"></i>
              </div>
              <div className="customer-details">
                <h4>Olivia Garcia</h4>
                <p>Eco-Conscious Customer</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="rating">★★★★★</div>
            <p>"The suit cleaning service is incredible! They restored my vintage suit to perfect condition. Worth every penny."</p>
            <div className="customer-info">
              <div className="customer-avatar" style={{ backgroundColor: "#636E72" }}>
                <i className="fas fa-user-graduate"></i>
              </div>
              <div className="customer-details">
                <h4>Robert Thompson</h4>
                <p>Business Executive</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Promotional Ad Banner */}
      <div className="ad-banner secondary-ad">
        <div className="ad-content">
          <h2>Download Our App</h2>
          <p>Schedule pickups, track orders, and get exclusive offers</p>
          <div className="app-buttons">
            <button className="app-btn">
              <i className="fab fa-apple"></i> App Store
            </button>
            <button className="app-btn">
              <i className="fab fa-google-play"></i> Google Play
            </button>
          </div>
        </div>
      </div>
      
      {/* Additional Special Offer 3 */}
      <div className="ad-banner" style={{ background: 'linear-gradient(45deg, #FD79A8, #E84393)', marginBottom: '40px' }}>
        <div className="ad-content">
          <h2>Summer Special</h2>
          <h3>Buy 2 Get 1 Free</h3>
          <p>On all dry cleaning services</p>
          <button className="ad-btn" style={{ color: '#E84393' }} onClick={() => handleOfferClick('SUMMER241', 33)}>Claim Offer</button>
        </div>
      </div>
    </div>
  );
};

export default App;
