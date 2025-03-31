import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUser as useClerkUser } from '@clerk/clerk-react';

// Create context
const UserContext = createContext();

// Define paths to the local SVG icons
const LOGO_PAYTM = "/images/paytm-logo-icon.svg";
const LOGO_MOBIKWIK = "/images/mobikwik-logo-icon.svg";
const LOGO_FREECHARGE = "/images/freecharge-logo-icon.svg";
const LOGO_GOOGLE_PAY = "/images/google-pay-primary-logo-logo-svgrepo-com.svg";
const LOGO_PHONEPE = "/images/phonepe-icon.svg";
const LOGO_BANK = "/images/bank-icon.svg";

// Create a provider component
export const UserProvider = ({ children }) => {
  const { user: clerkUser, isSignedIn } = useClerkUser();
  
  // Available services
  const [services, setServices] = useState([
    {
      id: 'dry-clean',
      name: 'Dry Cleaning',
      description: 'Professional eco-friendly cleaning',
      price: 15.99,
      type: 'cleaning',
      icon: 'fas fa-tshirt'
    },
    {
      id: 'laundry',
      name: 'Laundry',
      description: 'Wash, dry, and fold service',
      price: 12.99,
      type: 'cleaning',
      icon: 'fas fa-soap'
    },
    {
      id: 'ironing',
      name: 'Ironing',
      description: 'Professional ironing service',
      price: 8.99,
      type: 'cleaning',
      icon: 'fas fa-temperature-high'
    },
    {
      id: 'carpet-clean',
      name: 'Carpet Cleaning',
      description: 'Deep cleaning for carpets and rugs',
      price: 29.99,
      type: 'cleaning',
      icon: 'fas fa-broom'
    },
    {
      id: 'premium-laundry',
      name: 'Premium Laundry',
      description: 'Premium detergents and fabric care',
      price: 18.99,
      type: 'cleaning',
      icon: 'fas fa-star'
    },
    {
      id: 'stain-removal',
      name: 'Stain Removal',
      description: 'Specialized stain treatment',
      price: 10.99,
      type: 'cleaning',
      icon: 'fas fa-eraser'
    },
    {
      id: 'curtain-cleaning',
      name: 'Curtain Cleaning',
      description: 'Deep cleaning for all types of curtains',
      price: 24.99,
      type: 'cleaning',
      icon: 'fas fa-window-maximize'
    },
    {
      id: 'shoe-cleaning',
      name: 'Shoe Cleaning',
      description: 'Professional shoe cleaning and care',
      price: 14.99,
      type: 'cleaning',
      icon: 'fas fa-shoe-prints'
    },
    {
      id: 'leather-care',
      name: 'Leather Care',
      description: 'Specialized cleaning for leather items',
      price: 35.99,
      type: 'cleaning',
      icon: 'fas fa-medal'
    },
    {
      id: 'bedding-clean',
      name: 'Bedding Cleaning',
      description: 'Deep cleaning for quilts and comforters',
      price: 27.99,
      type: 'cleaning',
      icon: 'fas fa-bed'
    },
    {
      id: 'steam-press',
      name: 'Steam Pressing',
      description: 'Premium steam pressing service',
      price: 11.99,
      type: 'cleaning',
      icon: 'fas fa-stream'
    },
    {
      id: 'express-service',
      name: 'Express Delivery',
      description: 'Same day or next day service',
      price: 8.99,
      type: 'addon',
      icon: 'fas fa-bolt'
    }
  ]);
  
  // User locations
  const [userLocations, setUserLocations] = useState([
    {
      id: 1,
      label: 'Home',
      address: 'Golf Course Road, DLF Phase 5, Sector 42, Gurugram',
      coordinates: {
        lat: 28.4595,
        lng: 77.0266
      },
      isPrimary: true
    },
    {
      id: 2,
      label: 'Work',
      address: '456 Office Park, Bangalore',
      coordinates: {
        lat: 12.9769,
        lng: 77.6101
      },
      isPrimary: false
    }
  ]);

  const [userData, setUserData] = useState({
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Bangalore',
    dob: '',
    gender: '',
    // Notification preferences
    notificationsEnabled: false,
    // Current selected location
    location: {
      address: 'Golf Course Road, DLF Phase 5, Sector 42, Gurugram',
      lat: 28.4595,
      lng: 77.0266
    },
    // Multiple saved locations
    savedLocations: [
      {
        id: 1,
        label: 'Home',
        address: '123 Main Street, Bangalore',
        lat: 12.9716,
        lng: 77.5946,
      },
      {
        id: 2,
        label: 'Work',
        address: '456 Office Park, Bangalore',
        lat: 12.9769,
        lng: 77.6101,
      },
    ],
    // Wishlist items
    wishlist: [
      {
        id: 1,
        name: 'Dry Cleaning',
        type: 'cleaning',
        quantity: 1,
        price: 200,
      },
      {
        id: 2,
        name: 'Carpet Cleaning',
        type: 'cleaning',
        quantity: 1,
        price: 500,
      }
    ],
    // Shopping cart
    cart: [],
    // ID of the currently selected location
    selectedLocationId: 1,
    // Payment methods
    paymentMethods: [
      {
        id: 1,
        type: 'card',
        cardType: 'VISA',
        lastFourDigits: '4242',
        cardName: 'John Doe',
        expiryMonth: '12',
        expiryYear: '24',
        isDefault: true,
      },
      {
        id: 2,
        type: 'wallet',
        name: 'Paytm',
        icon: LOGO_PAYTM,
        balance: '₹2,500',
        mobileNumber: '9876543210',
        isDefault: false,
      },
      {
        id: 3,
        type: 'wallet',
        name: 'Mobikwik',
        icon: LOGO_MOBIKWIK,
        balance: '₹1,200',
        mobileNumber: '9876543210',
        isDefault: false,
      },
      {
        id: 4,
        type: 'wallet',
        name: 'FreeCharge',
        icon: LOGO_FREECHARGE,
        balance: '₹800',
        mobileNumber: '9876543210',
        isDefault: false,
      },
      {
        id: 5,
        type: 'wallet',
        name: 'Google Pay',
        icon: LOGO_GOOGLE_PAY,
        balance: '₹3,000',
        mobileNumber: '9876543210',
        isDefault: false,
      },
      {
        id: 6,
        type: 'wallet',
        name: 'PhonePe',
        icon: LOGO_PHONEPE,
        balance: '₹1,800',
        mobileNumber: '9876543210',
        isDefault: false,
      },
      {
        id: 7,
        type: 'netbanking',
        bankName: 'HDFC Bank',
        icon: LOGO_BANK,
        isDefault: false,
      }
    ]
  });

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([
    {
      id: '1',
      serviceName: 'Wash & Iron',
      status: 'active',
      orderDate: new Date().toISOString(),
      deliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      pickupDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      pickupAddress: '123 Main St, Kolkata',
      deliveryAddress: '123 Main St, Kolkata',
      items: [
        {
          name: 'Shirts',
          quantity: 2,
          price: 100
        },
        {
          name: 'Pants',
          quantity: 1,
          price: 80
        }
      ],
      subtotal: 180,
      deliveryFee: 20,
      total: 200,
      rider: {
        name: 'Rahul Kumar',
        phone: '+91 98765 43210',
        avatar: 'https://via.placeholder.com/40'
      }
    },
    {
      id: '2',
      serviceName: 'Dry Clean',
      status: 'delivered',
      orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      deliveryDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      pickupDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      pickupAddress: '123 Main St, Kolkata',
      deliveryAddress: '123 Main St, Kolkata',
      items: [
        {
          name: 'Suit',
          quantity: 1,
          price: 200
        }
      ],
      subtotal: 200,
      deliveryFee: 20,
      total: 220,
      rider: {
        name: 'Amit Singh',
        phone: '+91 98765 43211',
        avatar: 'https://via.placeholder.com/40'
      }
    }
  ]);

  // Sync user data with Clerk when the user signs in
  useEffect(() => {
    if (isSignedIn && clerkUser) {
      const firstName = clerkUser.firstName || '';
      const lastName = clerkUser.lastName || '';
      const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'User';
      
      const primaryEmailAddress = clerkUser.primaryEmailAddress?.emailAddress;
      const primaryPhoneNumber = clerkUser.primaryPhoneNumber?.phoneNumber;
      
      // Update the user data with Clerk information
      setUserData(prevData => ({
        ...prevData,
        id: clerkUser.id,
        name: fullName,
        email: primaryEmailAddress || prevData.email,
        phone: primaryPhoneNumber || prevData.phone,
        avatarUrl: clerkUser.imageUrl,
        clerkId: clerkUser.id
      }));
    }
  }, [isSignedIn, clerkUser]);

  const updateUserData = (newData) => {
    setUserData(prevData => ({
      ...prevData,
      ...newData
    }));
  };
  
  // Function to add a new location
  const addSavedLocation = (location) => {
    setUserData(prevState => {
      const existingLocations = prevState.savedLocations || [];
      
      // Check if this is the first location being added
      const isFirst = existingLocations.length === 0;
      
      // If it's the first location, make it primary
      const newLocation = {
        ...location,
        isPrimary: isFirst || location.isPrimary
      };
      
      // If this location is set as primary, make all others non-primary
      let updatedLocations;
      if (newLocation.isPrimary) {
        updatedLocations = existingLocations.map(loc => ({
          ...loc,
          isPrimary: false
        }));
        updatedLocations.push(newLocation);
      } else {
        updatedLocations = [...existingLocations, newLocation];
      }
      
      // If this is the first location, set it as selected location as well
      if (isFirst) {
        return {
          ...prevState,
          savedLocations: updatedLocations,
          selectedLocationId: newLocation.id,
          location: newLocation
        };
      }
      
      return {
        ...prevState,
        savedLocations: updatedLocations
      };
    });
    
    if (setUserLocations) {
      setUserLocations(prevLocations => {
        const existingLocations = prevLocations || [];
        
        // Check if this is the first location being added
        const isFirst = existingLocations.length === 0;
        
        // If it's the first location, make it primary
        const newLocation = {
          ...location,
          isPrimary: isFirst || location.isPrimary
        };
        
        // If this location is set as primary, make all others non-primary
        let updatedLocations;
        if (newLocation.isPrimary) {
          updatedLocations = existingLocations.map(loc => ({
            ...loc,
            isPrimary: false
          }));
          updatedLocations.push(newLocation);
        } else {
          updatedLocations = [...existingLocations, newLocation];
        }
        
        return updatedLocations;
      });
    }
  };
  
  // Function to set a location as default
  const setDefaultLocation = (locationId) => {
    setUserData(prevState => {
      const existingLocations = prevState.savedLocations || [];
      
      // Update all locations, making only the selected one primary
      const updatedLocations = existingLocations.map(loc => ({
        ...loc,
        isPrimary: loc.id === locationId
      }));
      
      // Find the location that was set as primary
      const primaryLocation = updatedLocations.find(loc => loc.id === locationId);
      
      return {
        ...prevState,
        savedLocations: updatedLocations,
        selectedLocationId: primaryLocation ? locationId : prevState.selectedLocationId,
        location: primaryLocation || prevState.location
      };
    });
    
    if (setUserLocations) {
      setUserLocations(prevLocations => {
        const existingLocations = prevLocations || [];
        
        // Update all locations, making only the selected one primary
        return existingLocations.map(loc => ({
          ...loc,
          isPrimary: loc.id === locationId
        }));
      });
    }
  };
  
  // Function to remove a saved location
  const removeSavedLocation = (locationId) => {
    setUserData(prevState => {
      const existingLocations = prevState.savedLocations || [];
      
      // Find the location being deleted
      const locationToDelete = existingLocations.find(loc => loc.id === locationId);
      
      // Filter out the deleted location
      const updatedLocations = existingLocations.filter(loc => loc.id !== locationId);
      
      // If we're deleting the primary location, make another one primary
      if (locationToDelete && locationToDelete.isPrimary && updatedLocations.length > 0) {
        updatedLocations[0].isPrimary = true;
      }
      
      // Determine new selected location if the selected one was deleted
      let newSelectedId = prevState.selectedLocationId;
      let newSelectedLocation = prevState.location;
      
      if (locationId === prevState.selectedLocationId) {
        // If the deleted location was selected, choose the new primary location
        const newPrimary = updatedLocations.find(loc => loc.isPrimary);
        if (newPrimary) {
          newSelectedId = newPrimary.id;
          newSelectedLocation = newPrimary;
        } else if (updatedLocations.length > 0) {
          // Otherwise choose the first location
          newSelectedId = updatedLocations[0].id;
          newSelectedLocation = updatedLocations[0];
        } else {
          // If no locations left, clear selection
          newSelectedId = null;
          newSelectedLocation = null;
        }
      }
      
      return {
        ...prevState,
        savedLocations: updatedLocations,
        selectedLocationId: newSelectedId,
        location: newSelectedLocation
      };
    });
    
    if (setUserLocations) {
      setUserLocations(prevLocations => {
        const existingLocations = prevLocations || [];
        
        // Find the location being deleted
        const locationToDelete = existingLocations.find(loc => loc.id === locationId);
        
        // Filter out the deleted location
        const updatedLocations = existingLocations.filter(loc => loc.id !== locationId);
        
        // If we're deleting the primary location, make another one primary
        if (locationToDelete && locationToDelete.isPrimary && updatedLocations.length > 0) {
          updatedLocations[0].isPrimary = true;
        }
        
        return updatedLocations;
      });
    }
  };
  
  // Function to add a new payment method
  const addPaymentMethod = (method) => {
    const newId = userData.paymentMethods?.length > 0 
      ? Math.max(...userData.paymentMethods.map(m => m.id)) + 1 
      : 1;
      
    const newMethod = {
      ...method,
      id: newId
    };
    
    // If this is the first payment method or it's set as default
    if (!userData.paymentMethods?.length || method.isDefault) {
      // Set all other methods as non-default
      const updatedMethods = (userData.paymentMethods || []).map(m => ({
        ...m,
        isDefault: false
      }));
      
      setUserData(prevData => ({
        ...prevData,
        paymentMethods: [...updatedMethods, {...newMethod, isDefault: true}]
      }));
    } else {
      setUserData(prevData => ({
        ...prevData,
        paymentMethods: [...(prevData.paymentMethods || []), newMethod]
      }));
    }
    
    return newId;
  };
  
  // Function to remove a payment method
  const removePaymentMethod = (id) => {
    const methodToRemove = userData.paymentMethods?.find(m => m.id === id);
    if (!methodToRemove) return;
    
    const updatedMethods = userData.paymentMethods.filter(m => m.id !== id);
    
    // If we removed the default method, set a new default
    if (methodToRemove.isDefault && updatedMethods.length > 0) {
      updatedMethods[0].isDefault = true;
    }
    
    setUserData(prevData => ({
      ...prevData,
      paymentMethods: updatedMethods
    }));
  };
  
  // Function to set a payment method as default
  const setDefaultPaymentMethod = (id) => {
    const updatedMethods = userData.paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    }));
    
    setUserData(prevData => ({
      ...prevData,
      paymentMethods: updatedMethods
    }));
  };

  // Function to add an item to wishlist
  const addToWishlist = (item) => {
    // Check if item already exists in wishlist
    const existingItem = userData.wishlist?.find(i => i.id === item.id);
    
    if (existingItem) {
      // If item exists, update quantity
      updateWishlistItem(item.id, { quantity: existingItem.quantity + 1 });
      return;
    }
    
    // If it's a new item, add to wishlist
    const newItem = {
      ...item,
      quantity: 1
    };
    
    setUserData(prevData => ({
      ...prevData,
      wishlist: [...(prevData.wishlist || []), newItem]
    }));
  };
  
  // Function to remove an item from wishlist
  const removeFromWishlist = (itemId) => {
    setUserData(prevData => ({
      ...prevData,
      wishlist: prevData.wishlist.filter(item => item.id !== itemId)
    }));
  };
  
  // Function to update a wishlist item
  const updateWishlistItem = (itemId, updates) => {
    setUserData(prevData => ({
      ...prevData,
      wishlist: prevData.wishlist.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    }));
  };
  
  // Function to add item to cart
  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, item]);
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  // Function to place an order - handle both cart orders and direct orders
  const placeOrder = (newOrder) => {
    // If we get a new order directly, use that
    if (newOrder) {
      try {
        // Create a complete order object with necessary defaults
        const completeOrder = {
          ...newOrder,
          id: newOrder.id || `order-${Date.now()}`,
          status: 'active',
          orderDate: newOrder.date || new Date().toISOString(),
          deliveryDate: new Date(Date.now() + 2*24*60*60*1000).toISOString(),
          pickupDate: new Date(Date.now() + 4*60*60*1000).toISOString(),
          pickupAddress: newOrder.location?.address || userData.address,
          deliveryAddress: newOrder.location?.address || userData.address,
          // Include delivery fee and calculate total
          subtotal: newOrder.price || 0,
          deliveryFee: 20,
          total: (newOrder.price || 0) + 20,
          // Add rider information
          rider: {
            name: 'Rahul Kumar',
            phone: '+91 98765 43210',
            avatar: 'https://via.placeholder.com/40'
          },
          // Make sure we have items array
          items: newOrder.items || [
            {
              name: newOrder.serviceName || 'Service',
              quantity: newOrder.quantity || 1,
              price: newOrder.price || 0
            }
          ]
        };
        
        // Add the order to the beginning of orders list
        setOrders(prevOrders => [completeOrder, ...(Array.isArray(prevOrders) ? prevOrders : [])]);
        return completeOrder;
      } catch (error) {
        console.error("Error adding direct order:", error);
        return null;
      }
    }
    
    // Handle cart-based orders
    if (cart.length === 0) return null;
    
    const cartOrder = {
      id: `order-${Date.now()}`,
      serviceName: 'Custom Service',
      serviceType: cart[0]?.type || 'Standard',
      status: 'active',
      orderDate: new Date().toISOString(),
      deliveryDate: new Date(Date.now() + 2*24*60*60*1000).toISOString(),
      pickupDate: new Date(Date.now() + 4*60*60*1000).toISOString(),
      paymentMethod: 'Google Pay',
      subtotal: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
      deliveryFee: 20,
      total: cart.reduce((total, item) => total + (item.price * item.quantity), 0) + 20,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price * item.quantity
      })),
      pickupAddress: userData.address || '123 Main Street, Apartment 4B, Gurgaon, Haryana 122001',
      deliveryAddress: userData.address || '123 Main Street, Apartment 4B, Gurgaon, Haryana 122001',
      rider: {
        name: 'Rahul Kumar',
        phone: '+91 98765 43210',
        avatar: 'https://via.placeholder.com/40'
      }
    };
    
    setOrders(prevOrders => [cartOrder, ...prevOrders]);
    setCart([]);
    return cartOrder;
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const cancelOrder = (orderId) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'canceled' } 
          : order
      )
    );
  };

  const rebookOrder = (orderId) => {
    const order = getOrderById(orderId);
    if (!order) return;
    
    const cartItems = order.items.map((item, index) => ({
      id: `rebook-${orderId}-${index}`,
      name: item.name,
      quantity: item.quantity,
      price: item.price / item.quantity,
      type: order.serviceType
    }));
    
    setCart(cartItems);
  };

  // Function to handle user logout
  const logout = async () => {
    // Reset local user data
    setUserData(prevData => ({
      ...prevData,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+91 98765 43210'
    }));
    
    // Note: Actual sign-out is handled by Clerk's UserButton or SignOutButton
  };

  // Function to toggle notifications
  const toggleNotifications = () => {
    setUserData(prevData => ({
      ...prevData,
      notificationsEnabled: !prevData.notificationsEnabled
    }));
  };

  return (
    <UserContext.Provider value={{
      userData,
      isSignedIn,
      clerkUser,
      updateUserData,
      addSavedLocation,
      setDefaultLocation,
      removeSavedLocation,
      userLocations,
      setUserLocations,
      addPaymentMethod,
      removePaymentMethod,
      setDefaultPaymentMethod,
      addToWishlist,
      removeFromWishlist,
      updateWishlistItem,
      addToCart,
      removeFromCart,
      placeOrder,
      orders,
      getOrderById,
      cancelOrder,
      rebookOrder,
      logout,
      toggleNotifications,
      // New values
      services
    }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}; 