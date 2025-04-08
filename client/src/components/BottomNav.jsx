import React, { useLocation, useNavigate } from 'react';

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current path is in our list of paths where we should hide the nav
  // ... existing code ...

  return (
    <div className={`bottom-nav ${shouldHideNav ? 'hidden' : ''}`}>
      <div className="nav-item" onClick={() => navigate('/')}>
        <i className={`fas fa-home ${location.pathname === '/' ? 'active' : ''}`}></i>
        <span className={location.pathname === '/' ? 'active' : ''}>Home</span>
      </div>
      <div className="nav-item" onClick={() => navigate('/search')}>
        <i className={`fas fa-search ${location.pathname === '/search' ? 'active' : ''}`}></i>
        <span className={location.pathname === '/search' ? 'active' : ''}>Search</span>
      </div>
      <div className="nav-item" onClick={() => navigate('/faq')}>
        <i className={`fas fa-question-circle ${location.pathname === '/faq' ? 'active' : ''}`}></i>
        <span className={location.pathname === '/faq' ? 'active' : ''}>Help</span>
      </div>
      <div className="nav-item" onClick={() => navigate('/orders')}>
        <i className={`fas fa-shopping-bag ${location.pathname === '/orders' ? 'active' : ''}`}></i>
        <span className={location.pathname === '/orders' ? 'active' : ''}>Orders</span>
      </div>
      <div className="nav-item" onClick={() => navigate('/profile')}>
        <i className={`fas fa-user ${location.pathname === '/profile' ? 'active' : ''}`}></i>
        <span className={location.pathname === '/profile' ? 'active' : ''}>Profile</span>
      </div>
    </div>
  );
}

export default BottomNav; 