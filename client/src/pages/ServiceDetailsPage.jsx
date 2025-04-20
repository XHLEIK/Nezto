import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavBar, Footer } from "../component/init";
import { Clock, CheckCircle, Star, ArrowLeft, Phone, Calendar } from 'lucide-react';
import { getServiceDetail, getAllServices } from '../utils/serviceDetails';

// Lazy-loaded components
const RelatedServices = lazy(() => import('../component/block/RelatedServices'));
const ServiceReviews = lazy(() => import('../component/block/ServiceReviews'));

// Loading component for suspense
const Loading = () => (
  <div className="animate-pulse space-y-4 p-4">
    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    <div className="h-32 bg-gray-200 rounded"></div>
  </div>
);

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [serviceDetail, setServiceDetail] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('description');
  const [relatedServices, setRelatedServices] = useState([]);

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    
    // Simulate loading delay to demonstrate suspense
    const timer = setTimeout(() => {
      const service = getServiceDetail(serviceId);
      
      if (service) {
        setServiceDetail(service);
        // Get other services from the same category for "Related Services"
        const allServices = getAllServices();
        const related = allServices
          .filter(s => s.category === service.category && s.id !== service.id)
          .slice(0, 3);
        setRelatedServices(related);
      } else {
        // Handle case when service is not found
        console.error(`Service with id ${serviceId} not found`);
        // Could redirect to 404 page or services list
      }
      
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [serviceId]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleBookNow = () => {
    // Implementation for booking functionality
    alert(`Booking ${quantity} units of ${serviceDetail?.name}`);
    // In a real app, this would add to cart or redirect to checkout
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <NavBar />
        <main className="flex-1 max-w-screen-lg mx-auto w-full px-4 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!serviceDetail) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <NavBar />
        <main className="flex-1 max-w-screen-lg mx-auto w-full px-4 py-20">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Not Found</h2>
            <p className="text-gray-600 mb-6">The service you're looking for doesn't exist or has been moved.</p>
            <button 
              onClick={handleGoBack}
              className="bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Back to Services
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <NavBar />

      {/* Main Content */}
      <main className="flex-1 max-w-screen-lg mx-auto w-full px-4 py-20">
        {/* Breadcrumb & Back Button */}
        <div className="flex items-center mb-4">
          <button 
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to Services</span>
          </button>
          
          {serviceDetail.popular && (
            <div className="ml-auto flex items-center bg-amber-100 py-1 px-2 rounded-full">
              <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
              <span className="text-xs text-amber-700 ml-1">Popular</span>
            </div>
          )}
        </div>

        {/* Service Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{serviceDetail.name}</h1>
          <p className="text-gray-600">{serviceDetail.description}</p>
        </div>

        {/* Service Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Left Column: Service Details */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-4">
              <div className="flex space-x-8">
                <button
                  className={`py-2 px-1 border-b-2 transition-colors ${
                    selectedTab === 'description'
                      ? 'border-primary text-primary font-medium'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => handleTabChange('description')}
                >
                  Description
                </button>
                <button
                  className={`py-2 px-1 border-b-2 transition-colors ${
                    selectedTab === 'process'
                      ? 'border-primary text-primary font-medium'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => handleTabChange('process')}
                >
                  Process
                </button>
                <button
                  className={`py-2 px-1 border-b-2 transition-colors ${
                    selectedTab === 'recommended'
                      ? 'border-primary text-primary font-medium'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => handleTabChange('recommended')}
                >
                  Recommended For
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="mb-8">
              {selectedTab === 'description' && (
                <div>
                  <div className="bg-gray-50 rounded-lg p-5 mb-6">
                    <h2 className="text-lg font-medium text-gray-800 mb-3">About this Service</h2>
                    <p className="text-gray-600 mb-4">{serviceDetail.fullDescription}</p>
                    
                    <h3 className="text-md font-medium text-gray-800 mb-2">Benefits</h3>
                    <ul className="space-y-2 mb-4">
                      {serviceDetail.benefits?.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={14} className="mr-1" />
                      <span>Turnaround time: {serviceDetail.turnaround}</span>
                    </div>
                  </div>
                  
                  {serviceDetail.addon && (
                    <div className="border border-primary/20 rounded-lg p-4 bg-primary/5">
                      <h3 className="text-md font-medium text-gray-800 mb-2">
                        Recommended Add-on
                      </h3>
                      <p className="font-medium text-primary mb-1">{serviceDetail.addon.name}</p>
                      <p className="text-gray-600 text-sm mb-2">{serviceDetail.addon.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-800 font-medium">{serviceDetail.addon.price}</span>
                        <button className="bg-white border border-primary text-primary py-1 px-3 rounded-lg text-sm hover:bg-primary hover:text-white transition-colors">
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedTab === 'process' && (
                <div className="bg-gray-50 rounded-lg p-5">
                  <h2 className="text-lg font-medium text-gray-800 mb-4">Our Process</h2>
                  <div className="space-y-4">
                    {serviceDetail.process?.map((step, index) => (
                      <div key={index} className="flex">
                        <div className="mr-3 flex-shrink-0">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs">
                            {index + 1}
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-700">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTab === 'recommended' && (
                <div className="bg-gray-50 rounded-lg p-5">
                  <h2 className="text-lg font-medium text-gray-800 mb-3">Recommended For</h2>
                  <ul className="space-y-2">
                    {serviceDetail.recommendedFor?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle size={16} className="text-primary mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Service Image (Placeholder) */}
            <div className="rounded-lg overflow-hidden bg-gray-100 h-64 flex items-center justify-center mb-8">
              <div className="text-gray-400 text-center p-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Service Image</p>
              </div>
            </div>

            {/* Related Services */}
            <Suspense fallback={<Loading />}>
              <RelatedServices services={relatedServices} />
            </Suspense>
          </div>

          {/* Right Column: Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Book This Service</h2>
              
              {/* Price */}
              <div className="flex items-end mb-4">
                <span className="text-2xl font-bold text-primary">{serviceDetail.price}</span>
                {serviceDetail.priceDetails && (
                  <span className="text-gray-500 text-sm ml-1">({serviceDetail.priceDetails})</span>
                )}
              </div>
              
              {/* Quantity Input */}
              <div className="mb-4">
                <label className="block text-gray-700 mb-1 text-sm">Quantity</label>
                <div className="flex">
                  <button 
                    className="bg-gray-100 px-3 py-2 rounded-l-lg border border-gray-200"
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  >
                    -
                  </button>
                  <input 
                    type="number" 
                    min="1" 
                    value={quantity} 
                    onChange={handleQuantityChange}
                    className="w-full text-center py-2 border-t border-b border-gray-200 focus:outline-none focus:ring-0"
                  />
                  <button 
                    className="bg-gray-100 px-3 py-2 rounded-r-lg border border-gray-200"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Estimated Total */}
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Estimated Total</span>
                  <span className="font-semibold text-gray-800">
                    {/* This is a simplified calculation - would need proper price parsing in real app */}
                    {serviceDetail.price.includes('/') 
                      ? serviceDetail.price 
                      : `₹${parseInt(serviceDetail.price.replace(/[^0-9]/g, '')) * quantity}`}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  * Final price may vary based on garment inspection
                </div>
              </div>
              
              {/* Booking Button */}
              <button 
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors mb-4"
                onClick={handleBookNow}
              >
                Book Now
              </button>
              
              {/* Schedule Pickup */}
              <button className="w-full flex items-center justify-center py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors mb-4">
                <Calendar size={16} className="mr-2" />
                Schedule Pickup
              </button>
              
              {/* Contact */}
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">Have questions?</div>
                <a 
                  href="tel:+919876543210"
                  className="flex items-center justify-center text-primary text-sm font-medium"
                >
                  <Phone size={14} className="mr-1" />
                  Call for assistance
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <Suspense fallback={<Loading />}>
          <ServiceReviews serviceId={serviceId} />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ServiceDetailsPage; 