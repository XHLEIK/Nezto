import React, { lazy, Suspense, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SplashScreen from './component/block/SplashScreen'
import { Helmet } from 'react-helmet'

// Lazy load the pages with prefetching
const HomePage = lazy(() => import(/* webpackPrefetch: true */ './pages/HomePage'))
const ProfilePage = lazy(() => import(/* webpackPrefetch: true */ './pages/ProfilePage'))
const ServicesPage = lazy(() => import(/* webpackPrefetch: true */ './pages/ServicesPages'))
const ServiceDetailsPage = lazy(() => import('./pages/ServiceDetailsPage'))

// Loading component for suspense fallback
const Loading = () => (
  <div className="flex items-center justify-center h-screen bg-white">
    <div 
      className="text-primary text-xl font-bold animate-pulse"
      style={{
        // Reserve space to prevent layout shift
        height: '24px',
        minWidth: '120px'
      }}
    >
      Loading...
    </div>
  </div>
);

// Error Boundary for handling failed suspense
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-white flex-col">
          <div className="text-red-500 text-xl font-bold mb-4">Something went wrong</div>
          <button 
            onClick={() => this.setState({ hasError: false })} 
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // Auto-hide splash after 2 seconds
    
    return () => clearTimeout(timer);
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      <Helmet>
        {/* Preconnect to necessary domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/img/logo/logo-header.png" as="image" />
        
        {/* Add font display strategies */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          media="print"
          onload="this.media='all'"
        />
        
        {/* Delay non-critical scripts */}
        <script src="/js/analytics.js" async defer></script>
        
        {/* Meta for PWA */}
        <meta name="theme-color" content="#40BFC1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </Helmet>
    
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={
              <Suspense fallback={<Loading />}>
                <HomePage />
              </Suspense>
            } />
            <Route path='/profile' element={
              <ErrorBoundary>
                <Suspense fallback={<Loading />}>
                  <ProfilePage />
                </Suspense>
              </ErrorBoundary>
            } />
            <Route path='/services' element={
              <Suspense fallback={<Loading />}>
                <ServicesPage />
              </Suspense>
            } />
            <Route path='/services/:serviceId' element={
              <Suspense fallback={<Loading />}>
                <ServiceDetailsPage />
              </Suspense>
            } />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App
