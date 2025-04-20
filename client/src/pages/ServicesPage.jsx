import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Search, Star, ChevronDown } from 'lucide-react';

const ServicesPage = () => {
    // ... existing state and functions ...
    
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <NavBar />
            
            {/* Main Content */}
            <main className="flex-1 pt-16 pb-24">
                {/* Hero Section with improved styling */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 mb-10">
                    <div className="max-w-screen-lg mx-auto px-4">
                        <div className="text-center">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 animate-fadeIn">Our Premium Services</h1>
                            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto">
                                Professional laundry and dry cleaning services tailored to your needs
                            </p>
                        </div>
                    </div>
                </div>
                
                {/* Services Container */}
                <div className="max-w-screen-lg mx-auto px-4">
                    {/* Filter and Search Section - Enhanced */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-10 border-l-4 border-blue-500">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Search services..." 
                                        className="w-full py-3 pl-10 pr-4 rounded-lg bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-base" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                            activeCategory === category.id
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setActiveCategory('all')}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                        activeCategory === 'all'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    All Services
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Services Grid - Enhanced with better cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {filteredServices.map(service => (
                            <div 
                                key={service.id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 transform hover:-translate-y-2"
                            >
                                <div className="h-48 bg-gray-100 relative overflow-hidden">
                                    <img 
                                        src={service.image} 
                                        alt={service.name} 
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 24 24' fill='none' stroke='%236366F1' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E";
                                        }}
                                    />
                                    {service.popular && (
                                        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md">
                                            Popular
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="mb-3">
                                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                            {getCategoryName(service.category)}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-gray-800 text-xl mb-2">{service.name}</h3>
                                    <p className="text-gray-600 text-sm mb-4 flex-1">{service.description}</p>
                                    <div className="flex justify-between items-center mt-auto">
                                        <div>
                                            <span className="font-bold text-blue-600 text-xl">₹{service.price}</span>
                                            {service.oldPrice && (
                                                <span className="text-gray-400 text-sm line-through ml-2">₹{service.oldPrice}</span>
                                            )}
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                            <span className="text-sm text-gray-600 ml-1">{service.rating}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleServiceClick(service.id)}
                                        className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md"
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* No Results Message */}
                    {filteredServices.length === 0 && (
                        <div className="text-center py-12">
                            <div className="mb-4">
                                <Search className="h-12 w-12 mx-auto text-gray-300" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No services found</h3>
                            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
                            <button 
                                onClick={() => {
                                    setSearchQuery('');
                                    setActiveCategory('all');
                                }}
                                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}
                    
                    {/* FAQ Section */}
                    <div className="bg-white rounded-xl shadow-md p-8 mb-12">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                        
                        <div className="space-y-4">
                            {serviceFaqs.map((faq, index) => (
                                <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="flex justify-between items-center w-full text-left py-3"
                                        aria-expanded={activeFaq === index}
                                    >
                                        <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                                        <ChevronDown 
                                            className={`h-6 w-6 text-primary transition-transform duration-300 ${activeFaq === index ? 'transform rotate-180' : ''}`} 
                                        />
                                    </button>
                                    
                                    {activeFaq === index && (
                                        <div className="mt-2 text-gray-600 leading-relaxed">
                                            <p>{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to experience our premium services?</h2>
                        <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
                            Join thousands of satisfied customers who trust us with their laundry and dry cleaning needs.
                        </p>
                        <button 
                            onClick={() => navigate('/signup')}
                            className="bg-white text-primary font-medium py-3 px-8 rounded-lg hover:bg-white/90 transition-colors text-lg shadow-md"
                        >
                            Get Started Today
                        </button>
                    </div>
                </div>
            </main>
            
            {/* Footer */}
            <Footer />
        </div>
    );
};

export default ServicesPage;