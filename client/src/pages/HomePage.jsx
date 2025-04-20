import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import NavBar from '../component/block/NavBar';
import Footer from '../component/block/Footer';
import { 
  Shirt, 
  Hammer, 
  WashingMachine, 
  Sparkles, 
  Clock, 
  Star, 
  ChevronRight, 
  MapPin, 
  ChevronDown, 
  Search, 
  ThumbsUp, 
  Percent, 
  Award, 
  TrendingUp, 
  Gift, 
  Shield, 
  Phone,
  Truck,
  Calendar,
  BadgeCheck,
  Mail,
  MessageSquare
} from 'lucide-react';

const HomePage = () => {
    const navigate = useNavigate();
    const [userLocation, setUserLocation] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [activeFaq, setActiveFaq] = useState(null);
    
    useEffect(() => {
        // Simulate fetching user location
        const savedLocation = localStorage.getItem('userLocation');
        if (savedLocation) {
            try {
                setUserLocation(JSON.parse(savedLocation));
            } catch (e) {
                console.error('Error parsing saved location', e);
                setUserLocation(null);
            }
        }
    }, []);
    
    // Section Title Component with larger touch targets
    const SectionTitle = ({ title, viewAll, onClick }) => (
        <div className="flex justify-between items-center mb-6 sm:mb-8 mt-8 sm:mt-10">
            <h2 className="font-semibold text-gray-800 text-2xl md:text-3xl">{title}</h2>
            {viewAll && (
                <button 
                    className="flex items-center text-primary text-base sm:text-lg font-medium p-3 hover:bg-primary/5 rounded-lg transition-colors"
                    onClick={onClick}
                    aria-label={`View all ${title}`}
                >
                    View All <ChevronRight className="ml-1 h-5 w-5 sm:h-6 sm:w-6" />
                </button>
            )}
        </div>
    );
    
    // Featured services
    const featuredServices = [
        { id: "dry-clean", name: "Dry Cleaning", icon: <Shirt className="h-8 w-8" />, price: "From ₹99", color: "bg-blue-100 text-blue-600" },
        { id: "laundry", name: "Laundry", icon: <WashingMachine className="h-8 w-8" />, price: "From ₹79", color: "bg-green-100 text-green-600" },
        { id: "ironing", name: "Ironing", icon: <Hammer className="h-8 w-8" />, price: "From ₹69", color: "bg-amber-100 text-amber-600" },
        { id: "express", name: "Express", icon: <Clock className="h-8 w-8" />, price: "From ₹149", color: "bg-purple-100 text-purple-600" },
        { id: "premium", name: "Premium", icon: <Award className="h-8 w-8" />, price: "From ₹299", color: "bg-red-100 text-red-600" },
        { id: "stain", name: "Stain Removal", icon: <Sparkles className="h-8 w-8" />, price: "From ₹99", color: "bg-teal-100 text-teal-600" },
        { id: "home", name: "Home Care", icon: <Shield className="h-8 w-8" />, price: "From ₹149", color: "bg-indigo-100 text-indigo-600" },
        { id: "offers", name: "Offers", icon: <Percent className="h-8 w-8" />, price: "Up to 50% off", color: "bg-pink-100 text-pink-600" }
    ];
    
    // Service categories
    const categories = [
        { id: "daily", name: "Daily Wear", color: "bg-[#FF5A5F]", description: "T-shirts, jeans, casual wear" },
        { id: "premium", name: "Premium", color: "bg-[#FFB100]", description: "Suits, dresses & delicates" },
        { id: "home", name: "Home Care", color: "bg-[#00C2B8]", description: "Curtains, bedding & towels" },
        { id: "quick", name: "Quick Service", color: "bg-[#7662E4]", description: "Same day turnaround" }
    ];
    
    // Services list
    const services = [
        { id: "shirt-laundry", name: "Shirt Laundry", price: "₹99/piece", category: "daily", icon: "/images/services/shirt.png" },
        { id: "jeans-wash", name: "Jeans Wash", price: "₹129/piece", category: "daily", icon: "/images/services/jeans.png" },
        { id: "suit-cleaning", name: "Suit Cleaning", price: "₹399/piece", category: "premium", icon: "/images/services/suit.png" },
        { id: "dress-cleaning", name: "Dress Cleaning", price: "₹349/piece", category: "premium", icon: "/images/services/dress.png" },
        { id: "curtain-cleaning", name: "Curtain Cleaning", price: "₹149/piece", category: "home", icon: "/images/services/curtain.png" },
        { id: "bedsheet-wash", name: "Bedsheet Wash", price: "₹199/set", category: "home", icon: "/images/services/bedsheet.png" },
        { id: "express-wash", name: "Express Wash", price: "₹149/kg", category: "quick", icon: "/images/services/express.png" },
        { id: "same-day", name: "Same Day Service", price: "₹299/kg", category: "quick", icon: "/images/services/sameday.png" },
        { id: "stain-removal", name: "Stain Removal", price: "₹99/piece", category: "daily", icon: "/images/services/stain.png" },
        { id: "ironing", name: "Ironing Service", price: "₹69/piece", category: "daily", icon: "/images/services/iron.png" }
    ];
    
    // Trending services
    const trendingServices = [
        { 
            id: "premium-suit", 
            name: "Premium Suit Care", 
            description: "Expert care for suits & formal attire", 
            price: 399, 
            rating: 4.8, 
            time: "3-4 days",
            image: "https://images.unsplash.com/photo-1543132685-cd9eb9d70343?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
        },
        { 
            id: "wash-fold", 
            name: "Wash & Fold", 
            description: "Everyday laundry service", 
            price: 99, 
            rating: 4.6, 
            time: "24 hours",
            image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
        },
        { 
            id: "curtain-cleaning", 
            name: "Curtain Cleaning", 
            description: "Professional curtain cleaning", 
            price: 249, 
            rating: 4.7, 
            time: "3-4 days",
            image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
        }
    ];
    
    // Bundle services
    const bundleServices = [
        { 
            id: "weekly-bundle", 
            name: "Weekly Bundle", 
            description: "5kg laundry + 2 suits/dresses", 
            price: 499, 
            savings: "₹150",
            image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
        },
        { 
            id: "family-bundle", 
            name: "Family Bundle", 
            description: "10kg laundry + 5 garments", 
            price: 899, 
            savings: "₹300",
            image: "https://images.unsplash.com/photo-1469504512102-900f29606341?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
        },
        { 
            id: "home-bundle", 
            name: "Home Bundle", 
            description: "Curtains, bedding & towels", 
            price: 1199, 
            savings: "₹400",
            image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
        }
    ];
    
    // Current offers
    const offers = [
        {
            code: "WELCOME50",
            discount: "50% OFF",
            description: "Get 50% off on your first order",
            validUntil: "31 Dec",
            color: "bg-gradient-to-r from-blue-500 to-indigo-600"
        },
        {
            code: "PREMIUM25",
            discount: "25% OFF",
            description: "Premium services special discount",
            validUntil: "15 Nov",
            color: "bg-gradient-to-r from-amber-500 to-orange-600"
        },
        {
            code: "WEEKEND15",
            discount: "15% OFF",
            description: "Weekend special for all services",
            validUntil: "Weekends",
            color: "bg-gradient-to-r from-emerald-500 to-teal-600"
        }
    ];
    
    // How it works steps
    const howItWorksSteps = [
        {
            step: 1,
            title: "Select Service",
            description: "Choose from our wide range of laundry and dry cleaning services",
            icon: <Shirt className="h-10 w-10" />
        },
        {
            step: 2,
            title: "Schedule Pickup",
            description: "Select a convenient date and time for collection",
            icon: <Calendar className="h-10 w-10" />
        },
        {
            step: 3,
            title: "Professional Care",
            description: "Our experts clean your items with professional care",
            icon: <Sparkles className="h-10 w-10" />
        },
        {
            step: 4,
            title: "Delivery",
            description: "Clean items delivered to your doorstep",
            icon: <Truck className="h-10 w-10" />
        }
    ];
    
    // Testimonials
    const testimonials = [
        { 
            name: "Rahul M.", 
            rating: 5, 
            comment: "Outstanding service! Delivery was on time and my clothes have never looked better.", 
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            service: "Premium Suit Care"
        },
        { 
            name: "Priya S.", 
            rating: 5, 
            comment: "The premium suit cleaning is worth every penny. Exceptional quality and attention to detail.", 
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            service: "Premium Laundry"
        },
        { 
            name: "Amit K.", 
            rating: 4, 
            comment: "Fast delivery and professional service. The app made tracking my order super easy.", 
            avatar: "https://randomuser.me/api/portraits/men/68.jpg",
            service: "Express Dry Clean"
        }
    ];
    
    // Why choose us
    const whyChooseUs = [
        {
            title: "Premium Quality",
            description: "Professional cleaning with attention to detail",
            icon: <BadgeCheck className="h-10 w-10" />
        },
        {
            title: "Express Service",
            description: "Same-day and next-day options available",
            icon: <Clock className="h-10 w-10" />
        },
        {
            title: "Free Pickup & Delivery",
            description: "Doorstep service at no extra cost",
            icon: <Truck className="h-10 w-10" />
        },
        {
            title: "Eco-Friendly",
            description: "Environmentally conscious cleaning methods",
            icon: <Shield className="h-10 w-10" />
        }
    ];
    
    // FAQ data
    const faqs = [
        {
            question: "How does pickup and delivery work?",
            answer: "We offer free doorstep pickup and delivery. Simply schedule a convenient time slot, and our delivery partners will collect your items and return them after cleaning. You can track the status of your order in real-time through our app or website."
        },
        {
            question: "What is the turnaround time for services?",
            answer: "Standard services typically take 48-72 hours, while our Express service offers same-day or next-day delivery depending on your location and the time of order. Premium services for delicate items may take 3-4 days to ensure proper care."
        },
        {
            question: "How are my clothes cleaned and handled?",
            answer: "Your garments are sorted by fabric type, color, and cleaning requirements. We use professional-grade equipment and eco-friendly detergents. Each item receives specialized treatment based on fabric care labels, ensuring they're properly cleaned while maintaining their quality and extending their lifespan."
        },
        {
            question: "What happens if my clothes are damaged?",
            answer: "While we take utmost care of your items, in the rare event of damage during our service, we offer a compensation policy. Please report any issues within 24 hours of delivery, and our customer service team will assist you with the claim process."
        },
        {
            question: "Can I specify special instructions for my order?",
            answer: "Absolutely! When placing your order, you can add special instructions for specific items. Whether it's extra starch for shirts, gentle wash for delicates, or addressing particular stains, our team will follow your instructions."
        }
    ];
    
    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };
    
    const handleServiceClick = (serviceId) => {
        navigate(`/services/${serviceId}`);
    };
    
    const viewAllServices = () => {
        navigate('/services');
    };
    
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <NavBar />

            {/* Main Content */}
            <main className="flex-1 pt-16 pb-24 w-full">
                {/* Location & Search Bar */}
                <div className="bg-white py-4 mb-4 shadow-sm">
                    <div className="max-w-screen-lg mx-auto px-4">
                        <div className="flex flex-col space-y-3">
                            <div 
                                className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer" 
                                onClick={() => navigate('/location')}
                            >
                                <MapPin className="h-5 w-5 text-primary" />
                                <div className="ml-2 flex items-center">
                                    {userLocation ? (
                                        <span className="text-sm font-medium text-gray-800">
                                            Deliver to: <span className="font-semibold">{userLocation.name}</span>
                                        </span>
                                    ) : (
                                        <span className="text-sm font-medium text-primary">
                                            Add delivery location
                                        </span>
                                    )}
                                    <ChevronDown className="h-4 w-4 ml-1 text-gray-400" />
                                </div>
                            </div>

                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Search for services..." 
                                    className="w-full py-3 pl-10 pr-4 rounded-lg bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-primary/20 text-base" 
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Main Content Container */}
                <div className="max-w-screen-lg mx-auto px-4">
                    {/* Main Banner - Static, no slider */}
                    <div className="rounded-xl overflow-hidden shadow-md mb-6">
                        <div className="bg-gradient-to-r from-primary to-primary/80 p-6 relative">
                            <div className="max-w-[70%] py-4">
                                <p className="text-white/90 text-sm font-medium mb-1">LIMITED TIME OFFER</p>
                                <h3 className="text-white font-bold text-2xl mb-2">First Order 50% OFF</h3>
                                <p className="text-white/90 text-base mb-4">Get 50% discount on your first laundry order</p>
                                <button 
                                    className="bg-white text-primary font-medium py-3 px-5 rounded-lg hover:bg-white/90 transition-colors text-sm"
                                    onClick={() => navigate('/services')}
                                >
                                    Order Now
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Featured Services Section - Enhanced for mobile */}
                    <div className="py-10 sm:py-14">
                        <div className="container mx-auto px-5">
                            <div className="text-center mb-8 sm:mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Featured Services</h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Discover our most popular services with doorstep pickup and delivery.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                                {featuredServices.map((service) => (
                                    <div 
                                        key={service.id}
                                        onClick={() => handleServiceClick(service.id)}
                                        className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6 flex flex-col items-center cursor-pointer touch-manipulation"
                                    >
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center bg-primary/10 rounded-full mb-4 sm:mb-5">
                                            {typeof service.icon === 'string' ? (
                                                <img 
                                                    src={service.icon} 
                                                    alt={service.name} 
                                                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236366F1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E";
                                                    }}
                                                />
                                            ) : (
                                                service.icon
                                            )}
                                        </div>
                                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 text-center">{service.name}</h3>
                                        <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2 text-center">{service.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Categories Section - Enhanced for mobile */}
                    <div className="bg-gray-50 py-14">
                        <div className="container mx-auto px-5">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Browse Categories</h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Find services across multiple categories to meet all your needs.
                                </p>
                            </div>
                            
                            <div className="flex overflow-x-auto pb-4 mb-8 hide-scrollbar">
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => setActiveTab('all')}
                                        className={`px-6 py-3 rounded-full text-lg font-medium whitespace-nowrap ${
                                            activeTab === 'all'
                                                ? 'bg-primary text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        All Categories
                                    </button>
                                    
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => setActiveTab(category.id)}
                                            className={`px-6 py-3 rounded-full text-lg font-medium whitespace-nowrap ${
                                                activeTab === category.id
                                                    ? 'bg-primary text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {services
                                    .filter((service) => activeTab === 'all' || service.category === activeTab)
                                    .map((service) => (
                                        <div
                                            key={service.id}
                                            onClick={() => handleServiceClick(service.id)}
                                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center cursor-pointer"
                                        >
                                            <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full mb-4">
                                                <img
                                                    src={service.icon}
                                                    alt={service.name}
                                                    className="w-10 h-10 object-contain"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236366F1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E";
                                                    }}
                                                />
                                            </div>
                                            <h3 className="text-base md:text-lg font-semibold text-gray-900 text-center">{service.name}</h3>
                                            <p className="text-sm md:text-base text-gray-500 mt-1 text-center">{service.price}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* How it works section */}
                    <SectionTitle title="How It Works" />
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {howItWorksSteps.map((step) => (
                                <div key={step.step} className="flex flex-col items-center text-center p-3">
                                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary relative">
                                        {step.icon}
                                        <span className="absolute -top-2 -right-2 bg-primary text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                                            {step.step}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-gray-800 text-lg mb-2">{step.title}</h3>
                                    <p className="text-base text-gray-600">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Trending Services - Card design optimized for touch */}
                    <SectionTitle title="Trending Services" viewAll onClick={viewAllServices} />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {trendingServices.map(service => (
                            <div 
                                key={service.id}
                                onClick={() => handleServiceClick(service.id)}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow"
                            >
                                <div className="h-40 bg-gray-100 relative">
                                    <img 
                                        src={service.image} 
                                        alt={service.name} 
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 24 24' fill='none' stroke='%236366F1' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E";
                                        }}
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium text-gray-800 text-base mb-1">{service.name}</h3>
                                    <p className="text-gray-500 text-sm mb-2">{service.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-primary text-base">₹{service.price}</span>
                                        <div className="flex items-center">
                                            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                                            <span className="text-sm text-gray-600 ml-1">{service.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Value Bundles Section */}
                    <SectionTitle title="Value Bundles" viewAll onClick={viewAllServices} />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {bundleServices.map(bundle => (
                            <div 
                                key={bundle.id}
                                onClick={() => handleServiceClick(bundle.id)}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col cursor-pointer hover:shadow-md transition-shadow"
                            >
                                <div className="h-40 bg-gray-100 relative">
                                    <img 
                                        src={bundle.image} 
                                        alt={bundle.name} 
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 24 24' fill='none' stroke='%236366F1' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E";
                                        }}
                                    />
                                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                                        Save {bundle.savings}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium text-gray-800 text-base mb-1">{bundle.name}</h3>
                                    <p className="text-gray-500 text-sm mb-2">{bundle.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-primary text-base">₹{bundle.price}</span>
                                        <button className="text-xs bg-primary/10 text-primary py-1 px-3 rounded-full font-medium">
                                            View Bundle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Current Offers - Static cards, no slider */}
                    <SectionTitle title="Current Offers" viewAll onClick={() => navigate('/offers')} />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {offers.map((offer, index) => (
                            <div 
                                key={index}
                                className={`${offer.color} rounded-xl p-5 text-white cursor-pointer hover:opacity-95 transition-opacity`}
                                onClick={() => navigate('/offers')}
                            >
                                <div className="border border-white/20 rounded-lg px-3 py-1 text-sm inline-block mb-3">
                                    {offer.code}
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{offer.discount}</h3>
                                <p className="mb-1 text-white/90">{offer.description}</p>
                                <p className="text-sm text-white/80">Valid till: {offer.validUntil}</p>
                            </div>
                        ))}
                    </div>
                    
                    {/* Why Choose Us - Enhanced for mobile */}
                    <SectionTitle title="Why Choose Us" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                        {whyChooseUs.map((item, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-center sm:items-start"
                            >
                                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 mb-4 sm:mb-0">
                                    {React.cloneElement(item.icon, { className: "w-10 h-10 md:w-12 md:h-12" })}
                                </div>
                                <div className="sm:ml-6 flex-1 text-center sm:text-left">
                                    <h3 className="font-semibold text-gray-800 text-xl mb-2">{item.title}</h3>
                                    <p className="text-base md:text-lg text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Testimonials Section - Enhanced for mobile visibility */}
                    <div className="bg-gray-50 py-16">
                        <div className="container mx-auto px-5">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Don't just take our word for it. Here's what customers have to say about their experience with us.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <div className="flex items-center mb-6">
                                            <div className="mr-4">
                                                <img 
                                                    src={testimonial.avatar} 
                                                    alt={testimonial.name} 
                                                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-primary"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        const initials = testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase();
                                                        e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%236366F1' rx='50' ry='50'/%3E%3Ctext x='50' y='50' font-size='40' text-anchor='middle' dominant-baseline='middle' fill='white' font-family='system-ui'%3E${initials}%3C/text%3E%3C/svg%3E`;
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-lg md:text-xl font-semibold">{testimonial.name}</h3>
                                                <p className="text-gray-500 text-base md:text-lg">{testimonial.service}</p>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="flex mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        className={`w-6 h-6 md:w-7 md:h-7 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-gray-600 text-base md:text-lg leading-relaxed">{testimonial.comment}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="text-center mt-10">
                                <button className="bg-white text-primary font-medium border-2 border-primary rounded-lg px-8 py-4 text-lg hover:bg-primary/5 transition-colors">
                                    View All Reviews
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Download App Banner - Enhanced for mobile */}
                    <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 sm:p-8 mb-8">
                        <div className="flex flex-col sm:flex-row justify-between items-center">
                            <div className="mb-6 sm:mb-0 text-center sm:text-left">
                                <h3 className="text-white font-bold text-2xl md:text-3xl mb-3">Download Our App</h3>
                                <p className="text-white/90 text-lg mb-6">Get exclusive offers and track your orders in real-time</p>
                                <div className="flex flex-col xs:flex-row space-y-3 xs:space-y-0 xs:space-x-3">
                                    <button className="bg-black text-white py-3 px-5 rounded-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM8.83333 13.5V6.5L13.5 10L8.83333 13.5Z" />
                                        </svg>
                                        <span className="text-base md:text-lg">Google Play</span>
                                    </button>
                                    <button className="bg-black text-white py-3 px-5 rounded-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M14.5 10C14.5 11.38 13.735 12.63 12.536 13.338C12.735 13.843 13.003 14.323 13.338 14.764C13.751 15.307 14.272 15.76 14.877 16.094C15.113 16.232 15.229 16.517 15.153 16.779C15.076 17.041 14.819 17.212 14.547 17.192C13.365 17.107 12.267 16.535 11.493 15.616C11.137 15.196 10.834 14.733 10.591 14.234C10.397 14.262 10.199 14.276 10 14.276C7.51 14.276 5.5 12.37 5.5 10C5.5 7.63 7.51 5.724 10 5.724C12.49 5.724 14.5 7.63 14.5 10Z" />
                                        </svg>
                                        <span className="text-base md:text-lg">App Store</span>
                                    </button>
                                </div>
                            </div>
                            <div className="relative h-60 w-60">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white font-bold text-2xl">Nezto</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Contact Section - Enhanced for mobile visibility */}
                    <div className="bg-white py-10 sm:py-14">
                        <div className="container mx-auto px-5">
                            <div className="text-center mb-10 sm:mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Have questions about our services? Our customer support team is here to help.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                                    <div className="bg-primary/10 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5">
                                        <Phone className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-semibold mb-2 sm:mb-3">Call Us</h3>
                                    <p className="text-gray-600 mb-4 sm:mb-5 text-base md:text-lg">Speak directly with our customer service team</p>
                                    <a 
                                        href="tel:+919876543210" 
                                        className="text-white bg-primary px-6 py-3.5 sm:py-4 rounded-lg font-medium text-lg block mx-auto w-full max-w-xs hover:bg-primary/90 transition-colors"
                                    >
                                        +91 98765 43210
                                    </a>
                                </div>
                                
                                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                                    <div className="bg-primary/10 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5">
                                        <Mail className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-semibold mb-2 sm:mb-3">Email Us</h3>
                                    <p className="text-gray-600 mb-4 sm:mb-5 text-base md:text-lg">Send us an email and we'll get back to you</p>
                                    <a 
                                        href="mailto:support@nezto.com" 
                                        className="text-white bg-primary px-6 py-3.5 sm:py-4 rounded-lg font-medium text-lg block mx-auto w-full max-w-xs hover:bg-primary/90 transition-colors"
                                    >
                                        support@nezto.com
                                    </a>
                                </div>
                                
                                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                                    <div className="bg-primary/10 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5">
                                        <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-semibold mb-2 sm:mb-3">Live Chat</h3>
                                    <p className="text-gray-600 mb-4 sm:mb-5 text-base md:text-lg">Chat with our team for immediate assistance</p>
                                    <button className="text-white bg-primary px-6 py-3.5 sm:py-4 rounded-lg font-medium text-lg block mx-auto w-full max-w-xs hover:bg-primary/90 transition-colors">
                                        Start Chat
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* FAQ Section - Enhanced for mobile visibility */}
                    <div className="bg-gray-100 py-10 sm:py-14">
                        <div className="container mx-auto px-5">
                            <div className="text-center mb-8 sm:mb-10">
                                <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Get answers to the most common questions about our services.
                                </p>
                            </div>
                            
                            <div className="max-w-3xl mx-auto">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="mb-4 sm:mb-5">
                                        <button
                                            onClick={() => toggleFaq(index)}
                                            className="flex justify-between items-center w-full text-left p-5 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                                            aria-expanded={activeFaq === index}
                                        >
                                            <span className="text-lg sm:text-xl font-medium text-gray-900 pr-4">{faq.question}</span>
                                            <ChevronDown 
                                                className={`h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 text-primary transition-transform ${activeFaq === index ? 'transform rotate-180' : ''}`} 
                                            />
                                        </button>
                                        
                                        {activeFaq === index && (
                                            <div className="mt-2 p-5 sm:p-6 bg-white rounded-xl shadow-sm">
                                                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
