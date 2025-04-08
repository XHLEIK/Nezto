import React, { useState, useEffect, useRef, useCallback, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import './LocationSearchMap.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { NeztoLogo } from './App';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Component to update map view when coordinates change
const MapViewUpdater = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, 16);
    }
  }, [center, map]);
  
  return null;
};

// Create a separate component for handling map clicks
const MapClickHandler = ({ onClick }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!map) return;
    
    const handleClick = (e) => {
      onClick(e);
    };
    
    map.on('click', handleClick);
    
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onClick]);
  
  return null;
};

// Error boundary component to catch map rendering errors
class MapErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Map error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="map-error-container">
          <div className="map-error">
            <i className="fas fa-exclamation-triangle"></i>
            <p>Sorry, we couldn't load the map.</p>
            <button onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const LocationSearchMap = ({ onSaveLocation }) => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [locationType, setLocationType] = useState('Home');
  const [isPrimary, setIsPrimary] = useState(false);
  const [mapCenter, setMapCenter] = useState([28.459497, 77.026634]); // Default center
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [isGettingCurrentLocation, setIsGettingCurrentLocation] = useState(true);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [isUnmounting, setIsUnmounting] = useState(false);
  const [mapError, setMapError] = useState(null);

  // Memoize the reverseGeocode function to avoid recreating it on every render
  const reverseGeocode = useCallback(async (lat, lng) => {
    if (isUnmounting) return;
    
    try {
      // Simulate reverse geocoding
      const locationName = `Golf Course Road, DLF Phase 5, Sector ${Math.floor(53 + Math.random() * 3)}`;
      
      setSelectedLocation({
        id: Date.now(),
        display_name: locationName,
        lat,
        lon: lng
      });
      
      setAddress(locationName);
    } catch (error) {
      console.error("Error reverse geocoding:", error);
    }
  }, [isUnmounting]);

  // Memoize handleMapClick to avoid recreating it on every render
  const handleMapClick = useCallback((e) => {
    if (isUnmounting) return;
    const { lat, lng } = e.latlng;
    reverseGeocode(lat, lng);
  }, [reverseGeocode, isUnmounting]);

  useEffect(() => {
    // Get user's current location when component mounts
    handleGetCurrentLocation();
    
    // Force map resize to fill container 
    const resizeTimer = setTimeout(() => {
      if (window.document.querySelector('.leaflet-container')) {
        window.dispatchEvent(new Event('resize'));
        setMapReady(true);
      }
    }, 300);

    // Add a listener for popstate (browser back button)
    const handlePopState = () => {
      console.log("Browser back button pressed");
      setIsUnmounting(true);
      // Immediately navigate to saved-locations to avoid blank state
      navigate('/saved-locations', { replace: true });
    };
    
    window.addEventListener('popstate', handlePopState);

    // Cleanup function to ensure proper unmounting
    return () => {
      console.log("Cleaning up LocationSearchMap");
      // Make sure to set unmounting flag first
      setIsUnmounting(true);
      clearTimeout(resizeTimer);
      
      // Remove popstate listener
      window.removeEventListener('popstate', handlePopState);
      
      // Clean up map instance
      if (mapInstance) {
        try {
          console.log("Removing map instance");
          mapInstance.off();
          mapInstance.remove();
        } catch (e) {
          console.warn('Error cleaning up map:', e);
        }
      }
      
      // Cancel any pending operations
      setIsGettingCurrentLocation(false);
      setShowLocationPrompt(false);
      
      // Force cleanup of any Leaflet elements in DOM with a small delay
      // to ensure all events are properly cleaned up
      setTimeout(() => {
        const leafletContainers = document.querySelectorAll('.leaflet-container');
        leafletContainers.forEach(container => {
          if (container && container.parentNode) {
            try {
              container.parentNode.removeChild(container);
            } catch (e) {
              console.warn('Error removing leaflet container:', e);
            }
          }
        });
      }, 0);
    };
  }, [mapInstance, navigate]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || isUnmounting) return;
    
    setIsSearching(true);
    try {
      // This would normally use a geocoding API
      // For demo purposes, we'll simulate a search result
      
      // Immediate feedback that the search is working
      console.log("Searching for:", searchQuery);
      
      // Simulate search results - reduced delay for better UX
      setTimeout(() => {
        if (isUnmounting) return;
        
        const simulatedResults = [
          {
            id: 1,
            display_name: `${searchQuery}, DLF Phase 5, Sector 53-54`,
            lat: 28.459497 + (Math.random() * 0.01),
            lon: 77.026634 + (Math.random() * 0.01)
          },
          {
            id: 2,
            display_name: `${searchQuery}, Golf Course Road, Sector 54`,
            lat: 28.455497 + (Math.random() * 0.01),
            lon: 77.096634 + (Math.random() * 0.01)
          }
        ];
        
        setSearchResults(simulatedResults);
        
        // Select first result automatically
        if (simulatedResults.length > 0) {
          handleLocationSelect(simulatedResults[0]);
        }
        
        setIsSearching(false);
      }, 300); // Reduced delay for better UX
    } catch (error) {
      console.error("Error searching for location:", error);
      setIsSearching(false);
    }
  };

  const handleLocationSelect = (location) => {
    if (isUnmounting) return;
    setSelectedLocation(location);
    setMapCenter([location.lat, location.lon]);
    setAddress(location.display_name);
  };

  const handleSaveLocation = () => {
    if (!selectedLocation || !address.trim() || isUnmounting) return;
    
    console.log("Saving location");
    // Save location data
    const newLocation = {
      id: Date.now(),
      label: locationType,
      address: address,
      lat: selectedLocation.lat,
      lng: selectedLocation.lon,
      isPrimary
    };
    
    // Start unmounting process
    setIsUnmounting(true);
    
    // Save the location
    onSaveLocation(newLocation);
    
    // Clean up map before navigation
    if (mapInstance) {
      try {
        console.log("Removing map on save");
        mapInstance.off();
        mapInstance.remove();
      } catch (e) {
        console.warn('Error cleaning up map:', e);
      }
    }
    
    // Force cleanup of any Leaflet elements in DOM
    setTimeout(() => {
      const leafletContainers = document.querySelectorAll('.leaflet-container');
      leafletContainers.forEach(container => {
        if (container && container.parentNode) {
          try {
            container.parentNode.removeChild(container);
          } catch (e) {
            console.warn('Error removing leaflet container:', e);
          }
        }
      });
      
      // Navigate with replacement to avoid history issues
      navigate('/saved-locations', { 
        replace: true, 
        state: { 
          from: 'location-map',
          timestamp: Date.now()
        } 
      });
    }, 0);
  };

  const handleBack = () => {
    console.log("Back button clicked");
    // Start unmounting process
    setIsUnmounting(true);
    
    // Clean up map before navigation
    if (mapInstance) {
      try {
        console.log("Removing map on back");
        mapInstance.off();
        mapInstance.remove();
      } catch (e) {
        console.warn('Error cleaning up map:', e);
      }
    }
    
    // Force cleanup of any Leaflet elements in DOM
    setTimeout(() => {
      const leafletContainers = document.querySelectorAll('.leaflet-container');
      leafletContainers.forEach(container => {
        if (container && container.parentNode) {
          try {
            container.parentNode.removeChild(container);
          } catch (e) {
            console.warn('Error removing leaflet container:', e);
          }
        }
      });
      
      // Always force navigation directly to saved-locations
      // Adding a timestamp to prevent caching issues
      navigate('/saved-locations', { 
        replace: true,
        state: { 
          from: 'location-map-back',
          timestamp: Date.now() 
        }
      });
    }, 0);
  };

  const handleGetCurrentLocation = () => {
    if (isUnmounting) return;
    
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setShowLocationPrompt(true);
      setIsGettingCurrentLocation(false);
      return;
    }
    
    setIsGettingCurrentLocation(true);
    setLocationError(null);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (isUnmounting) return;
        
        const { latitude, longitude } = position.coords;
        setMapCenter([latitude, longitude]);
        reverseGeocode(latitude, longitude);
        setIsGettingCurrentLocation(false);
        setShowLocationPrompt(false);
      },
      (error) => {
        if (isUnmounting) return;
        
        console.error("Error getting current location:", error);
        setIsGettingCurrentLocation(false);
        
        // Handle specific error codes
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location access denied. Please enable location services in your browser settings to use your current location.");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable. Please try again or search for your location manually.");
            break;
          case error.TIMEOUT:
            setLocationError("Request to get location timed out. Please try again or search manually.");
            break;
          default:
            setLocationError("An unknown error occurred while getting your location. Please try again.");
        }
        
        setShowLocationPrompt(true);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const closeLocationPrompt = () => {
    if (isUnmounting) return;
    setShowLocationPrompt(false);
  };

  // Only render the map if not unmounting
  if (isUnmounting) {
    return (
      <div className="location-search-map">
        <div className="map-loading-overlay full-screen">
          <NeztoLogo size="medium" />
          <div className="spinner"></div>
          <p>Returning to saved locations...</p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="location-search-map">
        <div className="map-header">
          <button className="back-btn" onClick={handleBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <span className="header-title">Map Error</span>
        </div>
        <div className="map-error-container">
          <NeztoLogo size="small" />
          <div className="map-error">
            <i className="fas fa-exclamation-triangle"></i>
            <p>{mapError || "Sorry, we couldn't load the map."}</p>
            <button onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="location-search-map">
      <div className="map-container" ref={mapContainerRef}>
        {isGettingCurrentLocation && !mapReady && (
          <div className="map-loading-overlay">
            <NeztoLogo size="small" />
            <div className="spinner"></div>
            <p>Detecting your location...</p>
          </div>
        )}
        <MapErrorBoundary>
          <MapContainer
            center={mapCenter} 
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
            attributionControl={false}
            whenCreated={(map) => {
              console.log("Map created");
              setMapInstance(map);
              setTimeout(() => {
                if (map) {
                  try {
                    map.invalidateSize();
                    setMapReady(true);
                  } catch (error) {
                    console.error("Map initialization error:", error);
                    setMapError("Error initializing map");
                  }
                }
              }, 100);
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {selectedLocation && (
              <Marker 
                position={[selectedLocation.lat, selectedLocation.lon]}
                eventHandlers={{
                  click: () => reverseGeocode(selectedLocation.lat, selectedLocation.lon)
                }}
              >
                <Popup>{address}</Popup>
              </Marker>
            )}
            <MapViewUpdater center={mapCenter} />
            <MapClickHandler onClick={handleMapClick} />
          </MapContainer>
        </MapErrorBoundary>
      </div>

      {showLocationPrompt && (
        <div className="location-prompt-overlay">
          <div className="location-prompt-card">
            <h3>Location Services</h3>
            <p>{locationError || "Please enable location services to find your current location."}</p>
            <div className="prompt-actions">
              <button className="prompt-action-btn" onClick={closeLocationPrompt}>
                Continue Manually
              </button>
              <button className="prompt-action-btn primary" onClick={handleGetCurrentLocation}>
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="map-header">
        <button className="back-btn" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <span className="header-title">Add Location</span>
      </div>

      <div className="search-container">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-box">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
      </div>
      
      <button 
        className="current-location-btn" 
        onClick={handleGetCurrentLocation}
        disabled={isGettingCurrentLocation}
        aria-label="Current location"
      >
        {isGettingCurrentLocation ? (
          <div className="small-spinner"></div>
        ) : (
          <i className="fas fa-crosshairs"></i>
        )}
      </button>

      <div className="location-details-panel">
        <h3>Select delivery location</h3>
        
        {isSearching ? (
          <div className="searching-indicator">
            <div className="spinner"></div>
            <p>Searching...</p>
          </div>
        ) : (
          <>
            <div className="selected-address">
              <p className="your-location-label">YOUR LOCATION</p>
              <div className="address-display">
                <div className="address-text">{address || "No location selected"}</div>
                {address && (
                  <button 
                    className="change-btn"
                    onClick={() => {
                      if (isUnmounting) return;
                      // Clear search query
                      setSearchQuery("");
                      // Automatically use GPS to get current location
                      handleGetCurrentLocation();
                    }}
                  >
                    CHANGE
                  </button>
                )}
              </div>
            </div>
            
            <div className="location-settings-container">
              <div className="location-type-selector">
                <label className="type-label">ADDRESS TYPE</label>
                <div className="select-wrapper">
                  <select 
                    value={locationType}
                    onChange={(e) => setLocationType(e.target.value)}
                    className="type-dropdown"
                  >
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="default-location-toggle">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isPrimary}
                    onChange={(e) => setIsPrimary(e.target.checked)}
                  />
                  <span>Set as default location</span>
                </label>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="confirm-button-container">
        <button 
          className="confirm-location-btn"
          onClick={handleSaveLocation}
          disabled={!selectedLocation || !address.trim()}
        >
          Confirm location
        </button>
      </div>
    </div>
  );
};

export default LocationSearchMap; 