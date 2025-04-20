import { User, Menu, X, Home, Package, PhoneCall, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function NavBar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Check if current route matches the nav item
    const isActive = (path) => location.pathname === path;

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { label: "Home", path: "/", icon: <Home size={16} /> },
        { label: "Services", path: "/services", icon: <Package size={16} /> },
        { label: "Contact", path: "/contact", icon: <PhoneCall size={16} /> }
    ];

    return (
        <header className="relative z-50">
            <div 
                className={`w-full fixed top-0 transition-all duration-300 ${
                    isScrolled 
                        ? "bg-white shadow-md py-2" 
                        : "bg-primary py-3 rounded-b-xl md:rounded-none"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div 
                            onClick={() => navigate("/")} 
                            className="flex items-center cursor-pointer"
                        >
                            <img 
                                src="/img/logo/logo-header.png" 
                                className="w-[110px] max-h-8" 
                                alt="NEZTO" 
                            />
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`flex items-center text-sm font-medium transition-colors ${
                                        isActive(item.path)
                                            ? isScrolled
                                                ? "text-primary"
                                                : "text-white border-b-2 border-white"
                                            : isScrolled
                                                ? "text-gray-600 hover:text-primary"
                                                : "text-white/80 hover:text-white"
                                    }`}
                                >
                                    <span className="mr-1">{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                            
                            {/* Search button */}
                            <button 
                                className={`p-2 rounded-full transition-colors ${
                                    isScrolled 
                                        ? "hover:bg-gray-100 text-gray-600" 
                                        : "hover:bg-white/10 text-white"
                                }`}
                            >
                                <Search size={20} />
                            </button>
                            
                            {/* Profile button */}
                            <button
                                onClick={() => navigate("/profile")}
                                className={`flex items-center justify-center w-9 h-9 rounded-full transition-all ${
                                    isScrolled 
                                        ? "bg-primary/10 hover:bg-primary/20 text-primary" 
                                        : "bg-white/20 hover:bg-white/30 text-white"
                                }`}
                            >
                                <User size={18} />
                            </button>
                        </nav>

                        {/* Mobile menu button */}
                        <div className="flex items-center space-x-3 md:hidden">
                            <button 
                                className={`p-2 rounded-full transition-colors ${
                                    isScrolled 
                                        ? "hover:bg-gray-100 text-gray-600" 
                                        : "hover:bg-white/10 text-white"
                                }`}
                            >
                                <Search size={20} />
                            </button>
                            
                            <button
                                onClick={() => navigate("/profile")}
                                className={`flex items-center justify-center w-9 h-9 rounded-full transition-all ${
                                    isScrolled 
                                        ? "bg-primary/10 hover:bg-primary/20 text-primary" 
                                        : "bg-white/20 hover:bg-white/30 text-white"
                                }`}
                            >
                                <User size={18} />
                            </button>
                            
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={`p-2 rounded-md ${
                                    isScrolled 
                                        ? "text-gray-600" 
                                        : "text-white"
                                }`}
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu, show/hide based on menu state */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white shadow-lg">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => {
                                        navigate(item.path);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium ${
                                        isActive(item.path)
                                            ? "bg-primary/10 text-primary"
                                            : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                >
                                    <span className="mr-2">{item.icon}</span>
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            {/* Spacer to prevent content from hiding under fixed navbar */}
            <div className={`h-16 ${mobileMenuOpen ? "md:h-16" : ""}`}></div>
        </header>
    );
}

export default NavBar;