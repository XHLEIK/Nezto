import React, { useState, useEffect, Component } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './ServiceBookingPage.css';
import { useUser } from './UserContext';
import { NeztoLogo } from './App';

// Separate Map component to isolate potential errors
const LocationMap = ({ selectedLocation, mapCenter }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [MapContainer, setMapContainer] = useState(null);
  const [TileLayer, setTileLayer] = useState(null);
  const [Marker, setMarker] = useState(null);
  const [Popup, setPopup] = useState(null);
  const [L, setL] = useState(null);
  
  // Lazy load Leaflet components to avoid SSR issues
  useEffect(() => {
    async function loadMap() {
      try {
        // Import leaflet and its CSS dynamically
        const leaflet = await import('leaflet');
        const reactLeaflet = await import('react-leaflet');
        // Import CSS directly to ensure it's loaded
        await import('leaflet/dist/leaflet.css');
        
        // Fix the marker icon issue in Leaflet
        delete leaflet.Icon.Default.prototype._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });
        
        setL(leaflet);
        setMapContainer(reactLeaflet.MapContainer);
        setTileLayer(reactLeaflet.TileLayer);
        setMarker(reactLeaflet.Marker);
        setPopup(reactLeaflet.Popup);
        setMapLoaded(true);
      } catch (error) {
        console.error('Error loading map components:', error);
      }
    }
    
    if (typeof window !== 'undefined') {
      loadMap();
    }
  }, []);
  
  // Component to update map center when coordinates change
  const MapUpdater = ({ center }) => {
    try {
      if (!mapLoaded) return null;
      
      const { useMap } = require('react-leaflet');
      const map = useMap();
      
      useEffect(() => {
        if (center) {
          map.setView(center, 14);
        }
      }, [center, map]);
      
      return null;
    } catch (error) {
      console.error('Error with MapUpdater:', error);
      return null;
    }
  };
  
  if (!mapLoaded || !MapContainer || !TileLayer || !Marker) {
    return (
      <div className="map-placeholder">
        <div className="map-loading">
          <i className="fas fa-map-marker-alt"></i>
          <p>Loading map...</p>
        </div>
      </div>
    );
  }
  
  try {
    return (
      <MapContainer 
        center={mapCenter} 
        zoom={14} 
        style={{ height: '100%', width: '100%' }} 
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {selectedLocation && selectedLocation.lat && selectedLocation.lng && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
            {Popup && (
              <Popup>{selectedLocation.address}</Popup>
            )}
          </Marker>
        )}
        <MapUpdater center={mapCenter} />
      </MapContainer>
    );
  } catch (error) {
    console.error('Error rendering map:', error);
    return (
      <div className="map-error">
        <i className="fas fa-exclamation-circle"></i>
        <p>Could not load map</p>
      </div>
    );
  }
};

// Add a simple Error Boundary component
class MapErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Map Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="map-error">
          <i className="fas fa-exclamation-circle"></i>
          <p>Map could not be loaded</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const ServiceBookingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const { userData, userLocations, setUserLocations, placeOrder, orders, setOrders } = useUser();
  const { user } = useUser();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([28.459497, 77.026634]); // Default center
  
  useEffect(() => {
    const getServiceDetails = () => {
      // Log to see what data we have for debugging
      console.log("Service ID:", id);
      console.log("Available services:", userData?.services);
      
      // First try to find by exact ID match
      let foundService = userData?.services?.find(s => s.id === parseInt(id));
      
      // If not found, try string comparison as fallback
      if (!foundService) {
        foundService = userData?.services?.find(s => String(s.id) === String(id));
      }
      
      // If service is found, set it
      if (foundService) {
        console.log("Found service:", foundService);
        setService(foundService);
      } else {
        // If no service is found in userData, use a default service for demo
        console.log("Service not found, using default");
        // Create a mock service based on the image provided
        const mockService = {
          id: parseInt(id) || Date.now(),
          name: "Dry Cleaning",
          description: "Quick and professional cleaning",
          price: 10.99,
          image: "https://via.placeholder.com/100"
        };
        setService(mockService);
      }
    };
    
    if (userData) {
      getServiceDetails();
    } else {
      // If userData is not available yet, create a demo service
      const demoService = {
        id: parseInt(id) || Date.now(),
        name: "Dry Cleaning",
        description: "Quick and professional cleaning",
        price: 10.99,
        image: "https://via.placeholder.com/100"
      };
      setService(demoService);
    }
  }, [id, userData]);
  
  useEffect(() => {
    // Set default selected location to primary location
    if (userLocations && userLocations.length > 0) {
      const primaryLocation = userLocations.find(loc => loc.isPrimary);
      if (primaryLocation) {
        setSelectedLocation(primaryLocation);
        if (primaryLocation.lat && primaryLocation.lng) {
          setMapCenter([primaryLocation.lat, primaryLocation.lng]);
        }
      } else {
        setSelectedLocation(userLocations[0]);
        if (userLocations[0].lat && userLocations[0].lng) {
          setMapCenter([userLocations[0].lat, userLocations[0].lng]);
        }
      }
    } else if (userData?.savedLocations && userData.savedLocations.length > 0) {
      const primaryLocation = userData.savedLocations.find(loc => loc.isPrimary);
      if (primaryLocation) {
        setSelectedLocation(primaryLocation);
        if (primaryLocation.lat && primaryLocation.lng) {
          setMapCenter([primaryLocation.lat, primaryLocation.lng]);
        }
      } else {
        setSelectedLocation(userData.savedLocations[0]);
        if (userData.savedLocations[0].lat && userData.savedLocations[0].lng) {
          setMapCenter([userData.savedLocations[0].lat, userData.savedLocations[0].lng]);
        }
      }
    }
    
    // Set loading to false after a timeout even if map doesn't load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
    
  }, [userLocations, userData]);
  
  const handleBack = () => {
    try {
      navigate(-1);
    } catch (error) {
      console.error("Navigation error:", error);
      navigate('/');
    }
  };
  
  const handleQuantityChange = (increment) => {
    setQuantity(prevQty => {
      const newQty = prevQty + increment;
      return newQty > 0 ? newQty : 1; // Ensure quantity is at least 1
    });
  };
  
  const handleLocationClick = () => {
    // Navigate to saved locations page with a specific return parameter
    console.log("Navigating to saved-locations with returnTo=booking");
    navigate('/saved-locations?returnTo=booking', { 
      state: { 
        from: 'booking',
        timestamp: Date.now() 
      }
    });
  };
  
  const handleBookService = () => {
    if (!service || !selectedLocation) return;
    
    // Create new order
    const newOrder = {
      id: Date.now(), // Simple unique ID
      serviceId: service.id,
      serviceName: service.name,
      quantity,
      price: service.price * quantity,
      location: selectedLocation,
      status: 'pending',
      date: new Date().toISOString(),
    };
    
    // Add to orders in context
    placeOrder(newOrder);
    
    // Navigate to confirmation page
    navigate(`/order-confirmation/${newOrder.id}`);
  };
  
  if (!service) {
    return (
      <div className="service-booking-page">
        <div className="service-booking-header">
          <button className="back-btn" onClick={handleBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h2>NEZTO</h2>
        </div>
        <NeztoLogo size="medium" />
        <div className="loading-message">Loading service details...</div>
      </div>
    );
  }
  
  return (
    <div className="service-booking-page">
      <div className="service-booking-header">
        <button className="back-btn" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2>NEZTO</h2>
      </div>
      
      <div className="service-details">
        <h3>{service.name}</h3>
        <p className="service-description">{service.description}</p>
      </div>
      
      <div className="booking-options">
        <div className="quantity-selector">
          <label>Quantity of clothes</label>
          <div className="quantity-control">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
        </div>
      </div>
      
      <div className="map-section">
        {mapError ? (
          <div className="map-error">
            <i className="fas fa-exclamation-circle"></i>
            <p>Sorry, we couldn't load the map.</p>
          </div>
        ) : loading ? (
          <div className="map-loading">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading map...</p>
          </div>
        ) : (
          <MapErrorBoundary>
            <div className="map-wrapper">
              <LocationMap 
                selectedLocation={selectedLocation} 
                mapCenter={mapCenter}
              />
            </div>
          </MapErrorBoundary>
        )}
      </div>
      
      <div className="location-selector">
        <label>Select delivery location</label>
        <div className="selected-location" onClick={handleLocationClick}>
          {selectedLocation ? (
            <>
              <div className="location-label-type">
                <i className="fas fa-map-marker-alt"></i>
                <span>{selectedLocation.label}</span>
                <div className="change-location-text">CHANGE</div>
              </div>
              <div className="location-address">{selectedLocation.address}</div>
            </>
          ) : (
            <div className="no-location">
              <p>No locations saved</p>
            </div>
          )}
        </div>
        
        <button className="change-pickup-btn" onClick={handleLocationClick}>
          Change pick up location
        </button>
      </div>
      
      <button 
        className="book-service-btn"
        onClick={handleBookService}
        disabled={!selectedLocation}
      >
        Book service
      </button>
    </div>
  );
};

export default ServiceBookingPage; 