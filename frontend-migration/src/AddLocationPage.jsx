import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useUser } from './UserContext';
import './AddLocationPage.css';
import 'leaflet/dist/leaflet.css';

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

// MapClickHandler component
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

const AddLocationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addSavedLocation } = useUser();
  
  // Check if we should skip to the details step directly
  const skipToDetails = location.state?.skipToDetails || false;
  
  // Search and map state
  const [searchQuery, setSearchQuery] = useState('');
  const [mapCenter, setMapCenter] = useState([28.459497, 77.026634]); // Default center
  const [markerPosition, setMarkerPosition] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  // Location details state
  const [selectedLocation, setSelectedLocation] = useState(skipToDetails ? { lat: 28.459497, lon: 77.026634 } : null);
  const [locationType, setLocationType] = useState('Home');
  const [isPrimary, setIsPrimary] = useState(false);
  const [houseNumber, setHouseNumber] = useState('');
  const [landmark, setLandmark] = useState('');
  const [completeAddress, setCompleteAddress] = useState(skipToDetails ? 'Enter your address manually' : '');
  
  // UI state
  const [currentStep, setCurrentStep] = useState(skipToDetails ? 'details' : 'search');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const searchInputRef = useRef(null);
  
  // Focus search input on component mount
  useEffect(() => {
    if (searchInputRef.current && currentStep === 'search') {
      searchInputRef.current.focus();
    }
    
    // Get user's current location if we're in search step
    if (currentStep === 'search') {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
          setMarkerPosition([latitude, longitude]);
          
          // Simulate reverse geocoding since we don't have a real API
          reverseGeocode(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, [currentStep]);
  
  // Simulate reverse geocoding
  const reverseGeocode = async (lat, lng) => {
    try {
      setIsSearching(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate a response
      const locationName = `Golf Course Road, DLF Phase 5, Sector ${Math.floor(53 + Math.random() * 3)}, Gurugram`;
      
      setSelectedLocation({
        display_name: locationName,
        lat,
        lon: lng
      });
      
      setCompleteAddress(locationName);
      setIsSearching(false);
    } catch (error) {
      console.error("Error reverse geocoding:", error);
      setIsSearching(false);
      setError("Could not retrieve address details");
    }
  };
  
  // Handle map click to update marker and get address
  const handleMapClick = useCallback((e) => {
    const { lat, lng } = e.latlng;
    setMarkerPosition([lat, lng]);
    reverseGeocode(lat, lng);
  }, []);
  
  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setError(null);
    
    try {
      // Simulate search results
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate fake search results
      const fakeResults = [
        {
          id: 1,
          display_name: `${searchQuery}, Sector 42, Gurugram, Haryana`,
          lat: 28.4595 + (Math.random() * 0.01),
          lon: 77.0266 + (Math.random() * 0.01)
        },
        {
          id: 2,
          display_name: `${searchQuery}, DLF Phase 5, Gurugram, Haryana`,
          lat: 28.4525 + (Math.random() * 0.01),
          lon: 77.0986 + (Math.random() * 0.01)
        }
      ];
      
      setSearchResults(fakeResults);
      setIsSearching(false);
    } catch (error) {
      console.error("Error searching for location:", error);
      setIsSearching(false);
      setError("Search failed. Please try again.");
    }
  };
  
  // Handle selecting a search result
  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setMapCenter([location.lat, location.lon]);
    setMarkerPosition([location.lat, location.lon]);
    setCompleteAddress(location.display_name);
    setSearchResults([]);
  };
  
  // Proceed to details step
  const handleContinue = () => {
    if (!selectedLocation) return;
    setCurrentStep('details');
  };
  
  // Final save function
  const handleSaveLocation = async () => {
    if (!selectedLocation && currentStep === 'search') {
      setError("Please select a location first");
      return;
    }
    
    // When skipping map view, allow saving with just the manual address
    if (currentStep === 'details' && !completeAddress) {
      setError("Please enter an address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create full address with house number and landmark
      const fullAddress = [
        houseNumber && `${houseNumber},`,
        completeAddress,
        landmark && `Near ${landmark}`
      ].filter(Boolean).join(' ');
      
      // Create location object
      const newLocation = {
        id: Date.now(),
        label: locationType,
        address: fullAddress,
        houseNumber,
        landmark,
        streetAddress: completeAddress,
        lat: selectedLocation?.lat || 0,
        lng: selectedLocation?.lon || 0,
        isPrimary
      };
      
      // Save location
      addSavedLocation(newLocation);
      
      // Navigate back to saved locations page
      navigate('/saved-locations', { 
        state: { from: 'add-location', timestamp: Date.now() } 
      });
    } catch (error) {
      console.error("Error saving location:", error);
      setError("Failed to save location. Please try again.");
      setIsLoading(false);
    }
  };
  
  // Go back function
  const handleBack = () => {
    if (currentStep === 'details') {
      if (skipToDetails) {
        // If we skipped to details, go back to saved locations
        navigate('/saved-locations');
      } else {
        // Otherwise, go back to search step
        setCurrentStep('search');
      }
    } else {
      // From search step, go back to saved locations
      navigate('/saved-locations');
    }
  };
  
  return (
    <div className="add-location-container">
      {/* Header */}
      <div className="location-header">
        <button className="back-button" onClick={handleBack} aria-label="Go back">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>{currentStep === 'search' ? 'Search Location' : 'Address Details'}</h1>
      </div>
      
      {/* Search Step */}
      {currentStep === 'search' && (
        <div className="search-step">
          {/* Search Form */}
          <div className="search-box-container">
            <form onSubmit={handleSearch} className="address-search-form">
              <div className="search-input-wrapper">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  ref={searchInputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for area, street name..."
                  className="location-search-input"
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="clear-search" 
                    onClick={() => setSearchQuery('')}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
              <button type="submit" className="search-button">
                {isSearching ? (
                  <div className="spinner-small"></div>
                ) : (
                  <i className="fas fa-arrow-right"></i>
                )}
              </button>
            </form>
          </div>
          
          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="search-results-container">
              {searchResults.map((result) => (
                <div 
                  key={result.id} 
                  className="search-result-item"
                  onClick={() => handleLocationSelect(result)}
                >
                  <i className="fas fa-map-marker-alt result-icon"></i>
                  <div className="result-text">{result.display_name}</div>
                </div>
              ))}
            </div>
          )}
          
          {/* Map */}
          <div className="map-container">
            <MapContainer 
              center={mapCenter} 
              zoom={16} 
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {markerPosition && (
                <Marker position={markerPosition} />
              )}
              
              <MapViewUpdater center={mapCenter} />
              <MapClickHandler onClick={handleMapClick} />
            </MapContainer>
            
            {/* Current location button */}
            <button 
              className="current-location-button"
              onClick={() => {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const { latitude, longitude } = position.coords;
                    setMapCenter([latitude, longitude]);
                    setMarkerPosition([latitude, longitude]);
                    reverseGeocode(latitude, longitude);
                  },
                  (error) => {
                    console.error("Error getting location:", error);
                    setError("Could not get your location");
                  }
                );
              }}
            >
              <i className="fas fa-crosshairs"></i>
            </button>
          </div>
          
          {/* Selected Location Panel */}
          {selectedLocation && (
            <div className="selected-location-panel">
              <div className="selected-address">
                <div className="address-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div className="address-details">
                  <div className="address-label">Selected Location</div>
                  <div className="address-text">{completeAddress}</div>
                </div>
              </div>
              
              <button 
                className="continue-button"
                onClick={handleContinue}
              >
                Continue <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Details Step */}
      {currentStep === 'details' && (
        <div className="details-step">
          <div className="selected-address-summary">
            <div className="address-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="address-details">
              {!skipToDetails ? (
                <>
                  <div className="address-text">{completeAddress}</div>
                  <button 
                    className="change-address-btn"
                    onClick={() => setCurrentStep('search')}
                  >
                    Change
                  </button>
                </>
              ) : (
                <div className="address-text">Enter your address details below</div>
              )}
            </div>
          </div>
          
          <div className="address-form">
            {skipToDetails && (
              <div className="form-group">
                <label>Full Address</label>
                <textarea
                  value={completeAddress}
                  onChange={(e) => setCompleteAddress(e.target.value)}
                  placeholder="Enter your complete address"
                  className="form-input address-textarea"
                  rows={3}
                />
              </div>
            )}
            
            <div className="form-group">
              <label>House / Flat No.</label>
              <input
                type="text"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                placeholder="e.g. Flat 101, House 24"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Landmark</label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="e.g. Near City Mall"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label>Save address as</label>
              <select
                value={locationType}
                onChange={(e) => setLocationType(e.target.value)}
                className="address-type-select"
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={isPrimary}
                  onChange={(e) => setIsPrimary(e.target.checked)}
                />
                <span className="checkbox-text">Set as default address</span>
              </label>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button
              className="save-address-button"
              onClick={handleSaveLocation}
              disabled={isLoading || (skipToDetails && !completeAddress.trim())}
            >
              {isLoading ? (
                <div className="spinner-small"></div>
              ) : (
                <>Save Location <i className="fas fa-check"></i></>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddLocationPage; 