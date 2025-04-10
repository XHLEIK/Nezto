import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation as useRouterLocation, Routes, Route } from 'react-router-dom';
import { useUser as useAppUser } from './UserContext';
import { useUser } from '@clerk/clerk-react';
import LocationSearchMap from './LocationSearchMap';
import './SavedLocationsPage.css';
import { NeztoLogo } from './App';

const SavedLocationsPage = () => {
  const navigate = useNavigate();
  const routerLocation = useRouterLocation();
  const queryParams = new URLSearchParams(routerLocation.search);
  const returnTo = queryParams.get('returnTo');
  const [showMapSearch, setShowMapSearch] = useState(false);
  
  const { userData, updateUserData, addSavedLocation, userLocations, setUserLocations } = useAppUser();
  const { user, isSignedIn } = useUser();
  
  // State for managing locations
  const [locations, setLocations] = useState([]);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [editLocationId, setEditLocationId] = useState(null);
  const [newLocation, setNewLocation] = useState('');
  const [newLocationType, setNewLocationType] = useState('Home');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  // Initialize locations from UserContext and Clerk metadata
  useEffect(() => {
    // Check if we're coming from a different page (i.e., not from LocationSearchMap)
    const locationState = routerLocation.state;
    
    // Force reload locations when coming back from location map
    if (locationState && (locationState.from === 'location-map' || locationState.from === 'location-map-back')) {
      console.log('Returning from location map, refreshing data');
    }
    
    if (userLocations && userLocations.length > 0) {
      setLocations(userLocations);
    } else if (userData && userData.savedLocations) {
      setLocations(userData.savedLocations);
    } else if (user && user.publicMetadata && user.publicMetadata.savedLocations) {
      try {
        // If locations exist in Clerk metadata but not in UserContext
        const clerkLocations = JSON.parse(user.publicMetadata.savedLocations);
        setLocations(clerkLocations);
        updateUserData({ savedLocations: clerkLocations });
        if (setUserLocations) {
          setUserLocations(clerkLocations);
        }
      } catch (error) {
        console.error('Error parsing saved locations:', error);
      }
    }
  }, [userData, user, userLocations, routerLocation.state]);

  const handleBack = () => {
    console.log("Saved Locations back button clicked, returnTo:", returnTo);
    if (returnTo === 'booking') {
      // When returning to booking page, navigate to the previous page
      navigate(-1);
    } else {
      navigate(-1);
    }
  };

  const handleAddLocation = () => {
    // Navigate to the new add location page but skip to the details form
    navigate('/add-location', { state: { skipToDetails: true } });
  };

  const handleSaveMapLocation = (location) => {
    saveNewLocation(location);
    setShowMapSearch(false);
  };

  const cancelAddLocation = () => {
    setShowAddLocation(false);
    setNewLocation('');
    setNewLocationType('Home');
  };

  const handleEditLocation = (location) => {
    setEditLocationId(location.id);
    setShowAddLocation(false);
    setNewLocation(location.address);
    setNewLocationType(location.label);
  };

  const cancelEditLocation = () => {
    setEditLocationId(null);
    setNewLocation('');
    setNewLocationType('Home');
  };

  const saveNewLocation = async (locationData = null) => {
    // If we're saving a location from the map
    if (locationData) {
      setLoading(true);
      try {
        // Create new location object from map data
        const newLocationObj = {
          id: locations.length > 0 ? Math.max(...locations.map(loc => loc.id)) + 1 : 1,
          label: locationData.label,
          address: locationData.address,
          lat: locationData.lat,
          lng: locationData.lng,
          isPrimary: locationData.isPrimary || locations.length === 0
        };
        
        // If this location is set as primary, make all others non-primary
        let updatedLocations;
        if (newLocationObj.isPrimary) {
          updatedLocations = locations.map(loc => ({
            ...loc,
            isPrimary: false
          }));
          updatedLocations.push(newLocationObj);
        } else {
          updatedLocations = [...locations, newLocationObj];
        }
        
        setLocations(updatedLocations);
        
        // Update UserContext
        if (addSavedLocation) {
          addSavedLocation(newLocationObj);
        } else {
          updateUserData({ savedLocations: updatedLocations });
        }

        // Update userLocations if available
        if (setUserLocations) {
          setUserLocations(updatedLocations);
        }
        
        // Save to Clerk metadata if signed in
        if (isSignedIn && user) {
          await user.update({
            publicMetadata: {
              ...user.publicMetadata,
              savedLocations: JSON.stringify(updatedLocations)
            }
          });
        }
        
        setStatus('Location added successfully!');
      } catch (error) {
        console.error('Error saving location:', error);
        setStatus('Failed to save location. Please try again.');
      } finally {
        setLoading(false);
        // Clear status after 3 seconds
        setTimeout(() => {
          setStatus('');
        }, 3000);
      }
      return;
    }

    // Regular form-based location saving (legacy code)
    if (!newLocation.trim()) return;
    
    setLoading(true);
    try {
      // Create new location object
      const newLocationObj = {
        id: locations.length > 0 ? Math.max(...locations.map(loc => loc.id)) + 1 : 1,
        label: newLocationType,
        address: newLocation,
        lat: 0, // Would use geocoding in a real app
        lng: 0,
        isPrimary: locations.length === 0 // Make first location primary by default
      };
      
      // Add to local state
      const updatedLocations = [...locations, newLocationObj];
      setLocations(updatedLocations);
      
      // Update UserContext
      if (addSavedLocation) {
        addSavedLocation(newLocationObj);
      } else {
        updateUserData({ savedLocations: updatedLocations });
      }

      // Update userLocations if available
      if (setUserLocations) {
        setUserLocations(updatedLocations);
      }
      
      // Save to Clerk metadata if signed in
      if (isSignedIn && user) {
        await user.update({
          publicMetadata: {
            ...user.publicMetadata,
            savedLocations: JSON.stringify(updatedLocations)
          }
        });
      }
      
      setStatus('Location added successfully!');
      setShowAddLocation(false);
      setNewLocation('');
      setNewLocationType('Home');
    } catch (error) {
      console.error('Error saving location:', error);
      setStatus('Failed to save location. Please try again.');
    } finally {
      setLoading(false);
      // Clear status after 3 seconds
      setTimeout(() => {
        setStatus('');
      }, 3000);
    }
  };

  const saveEditedLocation = async () => {
    if (!newLocation.trim() || !editLocationId) return;
    
    setLoading(true);
    try {
      // Find the location to edit
      const updatedLocations = locations.map(loc => {
        if (loc.id === editLocationId) {
          return {
            ...loc,
            label: newLocationType,
            address: newLocation
          };
        }
        return loc;
      });
      
      setLocations(updatedLocations);
      
      // Update UserContext
      updateUserData({ savedLocations: updatedLocations });

      // Update userLocations if available
      if (setUserLocations) {
        setUserLocations(updatedLocations);
      }
      
      // Save to Clerk metadata if signed in
      if (isSignedIn && user) {
        await user.update({
          publicMetadata: {
            ...user.publicMetadata,
            savedLocations: JSON.stringify(updatedLocations)
          }
        });
      }
      
      setStatus('Location updated successfully!');
      setEditLocationId(null);
      setNewLocation('');
      setNewLocationType('Home');
    } catch (error) {
      console.error('Error updating location:', error);
      setStatus('Failed to update location. Please try again.');
    } finally {
      setLoading(false);
      // Clear status after 3 seconds
      setTimeout(() => {
        setStatus('');
      }, 3000);
    }
  };

  const deleteLocation = async (id) => {
    setLoading(true);
    try {
      // Find the location being deleted
      const locationToDelete = locations.find(loc => loc.id === id);
      
      // Filter out the deleted location
      const updatedLocations = locations.filter(loc => loc.id !== id);
      
      // If we're deleting the primary location, make another one primary
      if (locationToDelete && locationToDelete.isPrimary && updatedLocations.length > 0) {
        updatedLocations[0].isPrimary = true;
      }
      
      setLocations(updatedLocations);
      
      // Update UserContext
      updateUserData({ savedLocations: updatedLocations });

      // Update userLocations if available
      if (setUserLocations) {
        setUserLocations(updatedLocations);
      }
      
      // Save to Clerk metadata if signed in
      if (isSignedIn && user) {
        await user.update({
          publicMetadata: {
            ...user.publicMetadata,
            savedLocations: JSON.stringify(updatedLocations)
          }
        });
      }
      
      setStatus('Location deleted successfully!');
    } catch (error) {
      console.error('Error deleting location:', error);
      setStatus('Failed to delete location. Please try again.');
    } finally {
      setLoading(false);
      // Clear status after 3 seconds
      setTimeout(() => {
        setStatus('');
      }, 3000);
    }
  };

  const setDefaultLocation = async (id) => {
    setLoading(true);
    try {
      // Update all locations, making only the selected one primary
      const updatedLocations = locations.map(loc => ({
        ...loc,
        isPrimary: loc.id === id
      }));
      
      setLocations(updatedLocations);
      
      // Update UserContext
      updateUserData({ 
        savedLocations: updatedLocations,
        selectedLocationId: id,
        location: updatedLocations.find(loc => loc.id === id)
      });

      // Update userLocations if available
      if (setUserLocations) {
        setUserLocations(updatedLocations);
      }
      
      // Save to Clerk metadata if signed in
      if (isSignedIn && user) {
        await user.update({
          publicMetadata: {
            ...user.publicMetadata,
            savedLocations: JSON.stringify(updatedLocations)
          }
        });
      }
      
      setStatus('Default location updated successfully!');
    } catch (error) {
      console.error('Error updating default location:', error);
      setStatus('Failed to update default location. Please try again.');
    } finally {
      setLoading(false);
      // Clear status after 3 seconds
      setTimeout(() => {
        setStatus('');
      }, 3000);
    }
  };

  const handleSelectLocation = (location) => {
    if (returnTo === 'booking') {
      if (setUserLocations) {
        // Update the selected location in the context
        const updatedLocations = locations.map(loc => ({
          ...loc,
          isPrimary: loc.id === location.id
        }));
        setUserLocations(updatedLocations);
      }
      // Navigate back to booking page
      navigate(-1);
    }
  };

  const renderLocation = (location) => {
    const isEditing = editLocationId === location.id;
    
    if (isEditing) {
      return (
        <div className="inline-edit-form" onClick={(e) => e.stopPropagation()}>
          <select 
            className="location-type-select"
            value={newLocationType}
            onChange={(e) => setNewLocationType(e.target.value)}
          >
            <option value="Home">Home</option>
            <option value="Work">Work</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="text"
            placeholder="Enter address"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            className="location-input"
          />
          <div className="edit-actions">
            <button 
              className="cancel-btn"
              onClick={cancelEditLocation}
            >
              Cancel
            </button>
            <button 
              className="save-btn"
              onClick={saveEditedLocation}
              disabled={!newLocation.trim() || loading}
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </div>
        </div>
      );
    }
    
    return (
      <>
        <div className="location-details">
          <span className="location-label">{location.label}</span>
          <p className="location-address">{location.address}</p>
          
          <div className="location-actions">
            <label className="default-checkbox">
              <input 
                type="checkbox" 
                checked={location.isPrimary} 
                onChange={() => setDefaultLocation(location.id)}
                disabled={loading || location.isPrimary}
                onClick={(e) => e.stopPropagation()}
              />
              <span>Set as default</span>
            </label>
          </div>
        </div>
        
        <div className="location-buttons">
          <button 
            className="edit-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleEditLocation(location);
            }}
            disabled={loading}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button 
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              deleteLocation(location.id);
            }}
            disabled={loading}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </>
    );
  };

  if (showMapSearch) {
    // Use key prop to force remount when showing the map
    try {
      console.log("Rendering LocationSearchMap component");
      return (
        <React.Suspense fallback={
          <div className="loading-container">
            <NeztoLogo size="medium" />
            <div className="loading-spinner"></div>
            <p>Loading map...</p>
          </div>
        }>
          <LocationSearchMap key={`map-${Date.now()}`} onSaveLocation={handleSaveMapLocation} />
        </React.Suspense>
      );
    } catch (error) {
      console.error("Error rendering map:", error);
      return (
        <div className="saved-locations-page">
          <div className="locations-header">
            <button className="back-btn" onClick={() => setShowMapSearch(false)}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <h2>Map Error</h2>
          </div>
          <NeztoLogo size="small" />
          <div className="error-message">
            <p>Sorry, we couldn't load the map. Please try again.</p>
            <button 
              className="retry-btn"
              onClick={() => {
                setShowMapSearch(false);
                setTimeout(() => setShowMapSearch(true), 100);
              }}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="saved-locations-page">
      <div className="locations-header">
        <button className="back-btn" onClick={handleBack}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2>Saved Locations</h2>
      </div>

      {status && (
        <div className={`status-message ${status.includes('Failed') ? 'error' : 'success'}`}>
          {status}
        </div>
      )}

      <div className="locations-content">
        <div className="add-location-row" onClick={handleAddLocation}>
          <i className="fas fa-plus"></i>
          <span>Add new location</span>
        </div>

        {showAddLocation && (
          <div className="add-location-form">
            <select 
              className="location-type-select"
              value={newLocationType}
              onChange={(e) => setNewLocationType(e.target.value)}
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Enter address"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="location-input"
            />
            <div className="add-location-actions">
              <button 
                className="cancel-btn"
                onClick={cancelAddLocation}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={() => saveNewLocation()}
                disabled={!newLocation.trim() || loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}

        {locations.length > 0 ? (
          <div className="locations-list">
            {locations.map((location) => (
              <div 
                key={location.id} 
                className={`location-item ${returnTo === 'booking' && !editLocationId ? 'selectable' : ''} ${editLocationId === location.id ? 'editing' : ''}`} 
                onClick={returnTo === 'booking' && !editLocationId ? () => handleSelectLocation(location) : undefined}
              >
                {renderLocation(location)}
              </div>
            ))}
          </div>
        ) : (
          <div className="no-locations">
            <p>No saved locations yet.</p>
            <p>Add your first location to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedLocationsPage; 