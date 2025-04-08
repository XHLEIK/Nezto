import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LocationPage.css';
import { useUser } from './UserContext';
import { initMap, reverseGeocode, initPlacesAutocomplete, getCurrentLocation } from './LocationMapHelper';

const LocationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, updateUserData, addSavedLocation } = useUser();
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  
  // Check if coming from SavedLocationsPage
  const fromSavedLocations = location.state?.fromSavedLocations || false;
  
  // State for the location
  const [currentLocation, setCurrentLocation] = useState(userData.location || {
    address: 'Golf Course Road, DLF Phase 5, Sector 42, Gurugram',
    lat: 28.4595,
    lng: 77.0266
  });
  
  // State for the search input
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle back button
  const handleBack = () => {
    if (fromSavedLocations) {
      navigate('/saved-locations');
    } else {
      navigate(-1); // Go back to previous page
    }
  };
  
  // Initialize the map
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Initialize the map
    const map = initMap(mapRef.current, currentLocation);
    
    if (!map) {
      console.error('Failed to initialize map');
      return;
    }
    
    // Save map reference
    googleMapRef.current = map;
    
    // Update location when map stops moving
    map.addListener('idle', async () => {
      const center = map.getCenter();
      const lat = center.lat();
      const lng = center.lng();
      
      try {
        const address = await reverseGeocode(lat, lng);
        setCurrentLocation({
          address,
          lat,
          lng
        });
      } catch (error) {
        console.error('Error getting address:', error);
        setCurrentLocation({
          address: 'Selected Location',
          lat,
          lng
        });
      }
    });
    
    // Initialize Places Autocomplete
    const searchInput = document.getElementById('location-search');
    if (searchInput) {
      initPlacesAutocomplete(searchInput, (location) => {
        // Center map on the selected place
        map.setCenter({ lat: location.lat, lng: location.lng });
        
        // Update location state
        setCurrentLocation(location);
      });
    }
    
    // Cleanup function
    return () => {
      // Clean up event listeners or anything else
      // The map will be destroyed automatically
    };
  }, []);
  
  // Update map when current location changes
  useEffect(() => {
    if (googleMapRef.current) {
      googleMapRef.current.setCenter({ lat: currentLocation.lat, lng: currentLocation.lng });
    }
  }, [currentLocation.lat, currentLocation.lng]);
  
  // Handle search submit - now handled by Places Autocomplete
  const handleSearch = (e) => {
    e.preventDefault();
    // The search functionality is now handled by the Google Places Autocomplete
  };
  
  // Handle confirming the location
  const handleConfirmLocation = () => {
    if (fromSavedLocations) {
      // Add as a saved location
      addSavedLocation(currentLocation);
      navigate('/saved-locations');
    } else {
      // Update current location directly
      updateUserData({ location: currentLocation });
      navigate(-1);
    }
  };
  
  // Handle changing the address
  const handleChangeAddress = () => {
    document.getElementById('location-search').focus();
  };
  
  // Center the map on user's current location
  const handleGetCurrentLocation = async () => {
    try {
      const userLocation = await getCurrentLocation();
      
      // Update map center
      if (googleMapRef.current) {
        googleMapRef.current.setCenter({ lat: userLocation.lat, lng: userLocation.lng });
      }
      
      // Update location state
      setCurrentLocation(userLocation);
    } catch (error) {
      console.error('Error getting current location:', error);
      alert(`Unable to get your current location: ${error}`);
    }
  };
  
  return (
    <div className="location-page">
      {/* Back button */}
      <button className="location-back-button" onClick={handleBack} aria-label="Back">
        <span>←</span>
      </button>
      
      {/* Search bar */}
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <input
            id="location-search"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search for a location"
          />
          <button type="submit" className="search-button" aria-label="Search">
            <span className="search-icon">🔍</span>
          </button>
        </form>
      </div>
      
      {/* Map container */}
      <div className="map-container">
        <div ref={mapRef} className="google-map" role="application" aria-label="Google Map"></div>
        
        {/* Custom centered marker */}
        <div className="map-marker" aria-hidden="true">
          <div className="map-marker-pin"></div>
        </div>
        
        {/* My Location Button */}
        <button 
          className="my-location-button"
          onClick={handleGetCurrentLocation}
          aria-label="Use my current location"
        >
          <span>📍</span>
        </button>
      </div>
      
      {/* Location selection */}
      <div className="location-selection">
        <h2 className="location-heading">
          {fromSavedLocations ? "Add new location" : "Select delivery location"}
        </h2>
        
        <div className="current-location">
          <p className="location-label">YOUR LOCATION</p>
          <div className="location-info">
            <span className="location-dot" aria-hidden="true">⚫</span>
            <p className="location-address">{currentLocation.address}</p>
            <button 
              className="change-button" 
              onClick={handleChangeAddress}
              aria-label="Change location"
            >
              CHANGE
            </button>
          </div>
        </div>
        
        <button 
          className="confirm-button" 
          onClick={handleConfirmLocation}
        >
          {fromSavedLocations ? "Add Location" : "Confirm location"}
        </button>
      </div>
    </div>
  );
};

export default LocationPage; 