import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const DesignerWearCarePage = () => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useUser();
  const [selectedItems, setSelectedItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedItem, setSelectedItem] = useState('designer-dress');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Add useEffect to hide any map elements that might be coming from the parent layout
  useEffect(() => {
    // Hide any map elements that might be present
    const mapElements = document.querySelectorAll('.map-container, .location-map, [id*="map"]');
    mapElements.forEach(element => {
      element.style.display = 'none';
    });
    
    // Hide any Nezto logo that might be present
    const logoElements = document.querySelectorAll('.nezto-logo, [class*="logo"]');
    logoElements.forEach(element => {
      if (element.textContent.includes('Nezto')) {
        element.style.display = 'none';
      }
    });
    
    return () => {
      // Restore visibility when component unmounts
      mapElements.forEach(element => {
        element.style.display = '';
      });
      logoElements.forEach(element => {
        element.style.display = '';
      });
    };
  }, []);

  const serviceDetails = {
    id: "designer-wear",
    name: "Designer Wear Care",
    icon: "fas fa-crown",
    price: 799,
    description: "Expert care for luxury and designer garments",
    longDescription: "Our premium designer wear care service is specially designed for high-end clothing and luxury garments. We use specialized techniques and premium solvents to clean, treat, and meticulously finish your designer items, ensuring they maintain their quality, appearance, and value.",
    features: [
      "Specialized cleaning for designer fabrics",
      "Hand finishing for delicate details",
      "Premium packaging and protection",
      "Fabric care and preservation",
      "Expert stain treatment"
    ],
    priceOptions: [
      { id: "designer-dress", name: "Designer Dress", price: 799, unit: "per piece" },
      { id: "designer-suit", name: "Designer Suit", price: 999, unit: "per piece" },
      { id: "designer-gown", name: "Designer Gown", price: 1299, unit: "per piece" },
      { id: "luxury-garments", name: "Luxury Garments", price: 899, unit: "per piece" }
    ],
    process: [
      { name: "Inspection", description: "Detailed inspection of your designer garments to identify fabric type and special care requirements", icon: "fas fa-search" },
      { name: "Pre-Treatment", description: "Targeted spot treatment for stains and soiled areas with premium products", icon: "fas fa-spray-can" },
      { name: "Cleaning", description: "Gentle cleaning with specialized solvents for designer fabrics", icon: "fas fa-tshirt" },
      { name: "Finishing", description: "Hand finishing for delicate details and premium pressing", icon: "fas fa-iron" },
      { name: "Packaging", description: "Premium packaging to protect your designer garments", icon: "fas fa-box" }
    ],
    testimonials: [
      { name: "Priya S.", rating: 5, comment: "My designer dress looks brand new! The attention to detail was exceptional." },
      { name: "Rahul M.", rating: 5, comment: "I trust them with all my luxury suits. Professional service every time." }
    ],
    category: "premium",
    rating: 4.9
  };

  const handleItemSelect = (item) => {
    const existingItem = selectedItems.find(i => i.id === item.id);
    if (existingItem) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id));
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    setSelectedItems(selectedItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleAddToCart = () => {
    selectedItems.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        serviceType: 'Designer Wear Care'
      });
    });
    navigate('/cart');
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const handleBookService = () => {
    try {
      navigate('/service-payment', { state: { service: { ...serviceDetails, quantity: quantity, selectedOption: selectedItem, totalPrice: calculatePrice() } } });
    } catch (err) {
      console.error("Navigation error:", err);
      alert("Could not navigate to payment page. Please try again.");
    }
  };
  
  const handleWishlist = (e) => {
    e.stopPropagation();
    try {
      // Add to wishlist logic
      const itemToAdd = {
        id: serviceDetails.id,
        name: serviceDetails.name,
        price: calculatePrice(),
        quantity: quantity,
        icon: serviceDetails.icon,
        description: serviceDetails.description
      };
      
      addToWishlist?.(itemToAdd);
      setIsWishlisted(true);
      setTimeout(() => setIsWishlisted(false), 2000);
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };
  
  const handleBack = () => {
    navigate('/services');
  };

  const calculatePrice = () => {
    const item = serviceDetails.priceOptions.find(option => option.id === selectedItem);
    return item ? item.price * quantity : 0;
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  // Get category color for styling
  const getCategoryColor = () => {
    const categories = {
      "daily": "#FF9800",
      "premium": "#8E44AD",
      "home": "#4CAF50",
      "quick": "#F44336",
      "default": "#40BFC1"
    };
    return categories[serviceDetails.category] || categories.default;
  };

  const categoryColor = getCategoryColor();

  return (
    <div className="container-fluid p-0 pb-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Header with back button */}
      <div className="d-flex align-items-center justify-content-between px-3 py-3" style={{ 
        background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}DD 100%)`,
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <div className="d-flex align-items-center">
          <button 
            className="btn" 
            onClick={handleBack}
            style={{ 
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(5px)"
            }}
          >
            <i className="fas fa-arrow-left" style={{ fontSize: "0.9rem" }}></i>
          </button>
          <h5 className="mb-0 ms-2" style={{ fontSize: "1.3rem", fontWeight: "600" }}>{serviceDetails.name}</h5>
        </div>
        <button 
          onClick={handleWishlist}
          style={{ 
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            color: isWishlisted ? "#FF5A5F" : "white",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(5px)"
          }}
        >
          <i className={isWishlisted ? "fas fa-heart" : "far fa-heart"} style={{ fontSize: "1rem" }}></i>
        </button>
      </div>
      
      {/* Service Banner */}
      <div className="text-center p-4 position-relative" style={{ 
        background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}DD 100%)`,
        color: "white",
        borderRadius: "0 0 30px 30px",
        boxShadow: `0 8px 20px -10px ${categoryColor}88`
      }}>
        <div className="position-relative mb-4">
          <div style={{ 
            fontSize: "2.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            width: "90px",
            height: "90px",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 10px 20px -8px rgba(0, 0, 0, 0.2)"
          }}>
            <i className={serviceDetails.icon}></i>
          </div>
          <div className="position-absolute" style={{
            right: "calc(50% - 70px)",
            bottom: "-5px",
            backgroundColor: "rgba(255, 255, 255, 0.25)",
            color: "white",
            padding: "5px 15px",
            borderRadius: "20px",
            fontSize: "0.9rem",
            fontWeight: "500",
            backdropFilter: "blur(5px)"
          }}>
            {serviceDetails.rating} Rating
          </div>
        </div>
        <h1 className="fw-bold mb-3" style={{ 
          fontSize: "2rem", 
          textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
        }}>{serviceDetails.name}</h1>
        <p className="mb-3 mx-auto" style={{ maxWidth: "600px", fontSize: "1rem" }}>{serviceDetails.description}</p>
        <div style={{ 
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          display: "inline-block",
          padding: "8px 20px",
          borderRadius: "30px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          backdropFilter: "blur(5px)"
        }}>
          Starting from ₹{serviceDetails.price}
        </div>
      </div>
      
      {/* Quick Booking Calculator */}
      <div className="mx-3 p-4 rounded shadow-sm" style={{ 
        backgroundColor: "white", 
        marginTop: "-25px", 
        borderRadius: "12px",
        border: "1px solid #eaeaea",
        position: "relative",
        zIndex: 10
      }}>
        <h5 className="fw-bold mb-3">Quick Price Calculator</h5>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Select Item</label>
            <select 
              className="form-select" 
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              style={{ borderRadius: "8px", padding: "10px" }}
            >
              {serviceDetails.priceOptions.map(option => (
                <option key={option.id} value={option.id}>{option.name} - ₹{option.price}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Quantity</label>
            <div className="input-group">
              <button 
                className="btn" 
                type="button" 
                onClick={decrementQuantity}
                style={{ backgroundColor: `${categoryColor}15`, borderColor: "#e0e0e0" }}
              >-</button>
              <input 
                type="number" 
                className="form-control text-center" 
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                style={{ borderLeft: "none", borderRight: "none" }}
              />
              <button 
                className="btn" 
                type="button" 
                onClick={incrementQuantity}
                style={{ backgroundColor: `${categoryColor}15`, borderColor: "#e0e0e0" }}
              >+</button>
            </div>
          </div>
        </div>
        
        <hr className="my-3" />
        
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="text-muted mb-0">Total Price:</h5>
          <h4 className="mb-0" style={{ color: categoryColor, fontWeight: "700" }}>₹{calculatePrice()}</h4>
        </div>
        
        <button 
          className="btn w-100 mt-3" 
          onClick={handleBookService}
          style={{ 
            backgroundColor: categoryColor,
            color: "white",
            padding: "12px",
            borderRadius: "8px",
            fontWeight: "600",
            boxShadow: `0 4px 15px -5px ${categoryColor}88`
          }}
        >
          Book Service
        </button>
      </div>
      
      {/* Service Description */}
      <div className="px-3 mt-4 mb-4">
        <div className="p-4 rounded" style={{ backgroundColor: "#f8f9fa", borderRadius: "12px" }}>
          <h5 className="fw-bold mb-3">About This Service</h5>
          <p style={{ lineHeight: "1.8" }}>{serviceDetails.longDescription}</p>
        </div>
      </div>
      
      {/* Service Process */}
      <div className="px-3 mb-4">
        <h5 className="fw-bold mb-4">Our Service Process</h5>
        <div className="row g-3">
          {serviceDetails.process.map((step, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="p-3 h-100 d-flex flex-column align-items-center text-center" style={{ 
                backgroundColor: "white", 
                borderRadius: "12px",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.05)",
                border: "1px solid #eaeaea"
              }}>
                <div className="mb-3 rounded-circle d-flex align-items-center justify-content-center" style={{ 
                  width: "60px", 
                  height: "60px", 
                  backgroundColor: "#f0f8ff",
                  color: categoryColor
                }}>
                  <i className={step.icon} style={{ fontSize: "1.5rem" }}></i>
                </div>
                <h6 className="fw-bold">{step.name}</h6>
                <p className="text-muted small mb-0">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Service Features */}
      <div className="px-3 mb-5">
        <h5 className="fw-bold mb-3">Premium Features</h5>
        <div className="row g-3">
          {serviceDetails.features.map((feature, index) => (
            <div key={index} className="col-md-6">
              <div className="d-flex align-items-center p-3" style={{ 
                backgroundColor: "white", 
                borderRadius: "10px",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.05)",
                height: "100%",
                border: "1px solid #eaeaea"
              }}>
                <div className="me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ 
                  minWidth: "40px", 
                  height: "40px", 
                  backgroundColor: "#e8f5f5",
                  color: categoryColor
                }}>
                  <i className="fas fa-check"></i>
                </div>
                <span>{feature}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price List */}
      <div className="px-3 mb-5">
        <div className="p-4 rounded shadow-sm" style={{ backgroundColor: "white", borderRadius: "12px" }}>
          <h5 className="fw-bold mb-4">Premium Price List</h5>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead style={{ backgroundColor: `${categoryColor}15` }}>
                <tr>
                  <th style={{ fontWeight: "600" }}>Item</th>
                  <th style={{ fontWeight: "600" }}>Price (₹)</th>
                  <th style={{ fontWeight: "600" }}>Unit</th>
                </tr>
              </thead>
              <tbody>
                {serviceDetails.priceOptions.map((option, index) => (
                  <tr key={index}>
                    <td>{option.name}</td>
                    <td className="fw-bold" style={{ color: categoryColor }}>₹{option.price}</td>
                    <td>{option.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="alert alert-info mt-3 mb-0" role="alert" style={{ borderRadius: "8px" }}>
            <div className="d-flex">
              <div className="me-3">
                <i className="fas fa-info-circle fs-4"></i>
              </div>
              <div>
                <p className="mb-0">Pricing may vary based on fabric type, level of soiling, and special care requirements. Our team will assess the garments upon pickup for any additional charges.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Guarantee Section */}
      <div className="px-3 mb-4">
        <div className="p-3 rounded" style={{ 
          backgroundColor: `${categoryColor}10`,
          border: `1px solid ${categoryColor}30`,
          borderRadius: "12px"
        }}>
          <div className="d-flex align-items-center mb-2">
            <i className="fas fa-award me-2" style={{ color: categoryColor }}></i>
            <h6 className="fw-bold mb-0">Premium Guarantee</h6>
          </div>
          <p className="mb-0">We guarantee exceptional results for your designer wear. If you're not completely satisfied with our cleaning and finishing quality, we will re-clean your item at no additional cost. Your satisfaction is our highest priority.</p>
        </div>
      </div>
      
      {/* Customer Testimonials */}
      <div className="px-3 mb-5">
        <h5 className="fw-bold mb-3">Customer Reviews</h5>
        <div className="row g-3">
          {serviceDetails.testimonials.map((testimonial, index) => (
            <div key={index} className="col-md-6">
              <div className="p-3 h-100" style={{ 
                backgroundColor: "white", 
                borderRadius: "12px",
                boxShadow: "0 3px 10px rgba(0, 0, 0, 0.05)",
                border: "1px solid #eaeaea"
              }}>
                <div className="d-flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i} 
                      className={`fas fa-star me-1 ${i < testimonial.rating ? 'text-warning' : 'text-muted'}`}
                      style={{ fontSize: "0.9rem" }}
                    ></i>
                  ))}
                </div>
                <p className="mb-2" style={{ fontSize: "0.95rem" }}>"{testimonial.comment}"</p>
                <p className="mb-0 text-end" style={{ fontSize: "0.85rem", fontWeight: "600" }}>- {testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Book Now Button */}
      <div className="px-3 mt-4 mb-5">
        <button 
          className="btn btn-lg w-100 py-3" 
          style={{ 
            background: `linear-gradient(135deg, ${categoryColor} 0%, ${categoryColor}DD 100%)`,
            color: "white",
            fontWeight: "600",
            borderRadius: "10px",
            boxShadow: `0 8px 15px ${categoryColor}80`,
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}
          onClick={handleBookService}
        >
          <i className="fas fa-shopping-cart me-2"></i> Book Now • ₹{calculatePrice()}
        </button>
      </div>
    </div>
  );
};

export default DesignerWearCarePage; 