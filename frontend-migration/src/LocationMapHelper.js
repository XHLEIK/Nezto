/**
 * LocationMapHelper.js - Helper functions for Google Maps integration in Nezto
 */

// Initialize a map instance
export const initMap = (mapElement, initialLocation, options = {}) => {
  if (!window.google || !window.google.maps || !mapElement) {
    console.error('Google Maps API not loaded or map element not found');
    return null;
  }

  const defaultOptions = {
    zoom: 15,
    center: { lat: initialLocation.lat, lng: initialLocation.lng },
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_BOTTOM
    },
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }
    ]
  };

  const mapOptions = { ...defaultOptions, ...options };
  return new window.google.maps.Map(mapElement, mapOptions);
};

// Reverse geocode a location
export const reverseGeocode = (lat, lng) => {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps) {
      reject('Google Maps API not loaded');
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results[0]) {
        resolve(results[0].formatted_address);
      } else {
        reject(`Geocoder failed due to: ${status}`);
      }
    });
  });
};

// Initialize Places Autocomplete
export const initPlacesAutocomplete = (inputElement, callback) => {
  if (!window.google || !window.google.maps || !window.google.maps.places || !inputElement) {
    console.error('Google Maps Places API not loaded or input element not found');
    return null;
  }

  const autocomplete = new window.google.maps.places.Autocomplete(inputElement);
  
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    
    if (!place.geometry || !place.geometry.location) {
      console.log('No details available for input:', place.name);
      return;
    }
    
    const location = {
      address: place.formatted_address || place.name,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
    
    if (callback && typeof callback === 'function') {
      callback(location);
    }
  });
  
  return autocomplete;
};

// Get user's current location
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation is not supported by this browser.');
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        
        // Try to get the address
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK' && results[0]) {
            resolve({
              address: results[0].formatted_address,
              lat,
              lng
            });
          } else {
            resolve({
              address: 'Current Location',
              lat,
              lng
            });
          }
        });
      },
      (error) => {
        reject(error.message);
      }
    );
  });
}; 