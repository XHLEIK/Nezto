import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ReviewsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [activeRatingFilter, setActiveRatingFilter] = useState("all");
  const [activeServiceFilter, setActiveServiceFilter] = useState("all");
  const [activeSortOption, setActiveSortOption] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Sample reviews data
  const allReviews = [
    {
      id: 1,
      name: "Rahul M.",
      rating: 5,
      comment: "Outstanding service! Delivery was on time and my clothes have never looked better. The stains I thought would never come out are completely gone. Highly recommend!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "2023-06-15",
      service: "dry-clean",
      serviceName: "Dry Cleaning",
      verified: true
    },
    {
      id: 2,
      name: "Priya S.",
      rating: 5,
      comment: "The premium suit cleaning is worth every penny. Exceptional quality and attention to detail. My suit looks brand new and the fabric feels amazing. Great job!",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "2023-06-10",
      service: "premium-suit",
      serviceName: "Premium Suit Cleaning",
      verified: true
    },
    {
      id: 3,
      name: "Amit K.",
      rating: 4,
      comment: "Fast delivery and professional service. The app made tracking my order super easy. Would use again, but hope for a bit more attention to detail next time.",
      avatar: "https://randomuser.me/api/portraits/men/68.jpg",
      date: "2023-06-05",
      service: "laundry",
      serviceName: "Laundry",
      verified: true
    },
    {
      id: 4,
      name: "Roshni P.",
      rating: 3,
      comment: "Ironing service was good but not great. Some of my shirts still had minor wrinkles. Delivery was prompt though, and customer service was helpful when I mentioned the issue.",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      date: "2023-06-01",
      service: "ironing",
      serviceName: "Ironing",
      verified: true
    },
    {
      id: 5,
      name: "Vikram S.",
      rating: 5,
      comment: "Used the curtain cleaning service and was amazed by the results! Our curtains look like new and smell so fresh. The team was careful with the delicate fabric too.",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      date: "2023-05-28",
      service: "curtain-clean",
      serviceName: "Curtain Cleaning",
      verified: false
    },
    {
      id: 6,
      name: "Neha T.",
      rating: 2,
      comment: "Disappointed with the stain removal service. The tough stains are still visible, though somewhat faded. Expected better results for the premium price.",
      avatar: "https://randomuser.me/api/portraits/women/90.jpg",
      date: "2023-05-25",
      service: "stain-removal",
      serviceName: "Stain Removal",
      verified: true
    },
    {
      id: 7,
      name: "Raj G.",
      rating: 5,
      comment: "The express service is a lifesaver! Got my shirts clean and pressed within hours for an unexpected meeting. Worth every rupee and will definitely use again.",
      avatar: "https://randomuser.me/api/portraits/men/42.jpg",
      date: "2023-05-22",
      service: "express-service",
      serviceName: "Express Service",
      verified: true
    },
    {
      id: 8,
      name: "Kavita R.",
      rating: 4,
      comment: "Leather jacket cleaning was excellent. They managed to remove all spots without damaging the material. Only giving 4 stars because delivery was a day later than promised.",
      avatar: "https://randomuser.me/api/portraits/women/35.jpg",
      date: "2023-05-20",
      service: "leather-care",
      serviceName: "Leather Care",
      verified: false
    },
    {
      id: 9,
      name: "Anand P.",
      rating: 1,
      comment: "Very unhappy with the service. My expensive shirt was damaged during cleaning, and customer service took too long to respond to my complaint.",
      avatar: "https://randomuser.me/api/portraits/men/20.jpg",
      date: "2023-05-15",
      service: "dry-clean",
      serviceName: "Dry Cleaning",
      verified: true
    },
    {
      id: 10,
      name: "Meera K.",
      rating: 5,
      comment: "Bedding cleaning service exceeded expectations! Our comforters and pillows smell amazing and look so clean. The pickup and delivery were right on schedule too.",
      avatar: "https://randomuser.me/api/portraits/women/55.jpg",
      date: "2023-05-12",
      service: "bedding-clean",
      serviceName: "Bedding Cleaning",
      verified: true
    },
    {
      id: 11,
      name: "Arjun S.",
      rating: 4,
      comment: "Good quality carpet cleaning. Most stains came out, though one stubborn mark remains. The team was courteous and professional throughout.",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      date: "2023-05-10",
      service: "carpet-cleaning",
      serviceName: "Carpet Cleaning",
      verified: true
    },
    {
      id: 12,
      name: "Sanya M.",
      rating: 5,
      comment: "Premium laundry service is excellent! My delicate clothes were treated with care and came back looking perfect. Love the subtle fragrance too.",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      date: "2023-05-05",
      service: "premium-laundry",
      serviceName: "Premium Laundry",
      verified: true
    }
  ];

  // Define service categories for filter
  const serviceCategories = [
    { id: "all", name: "All Services" },
    { id: "dry-clean", name: "Dry Cleaning" },
    { id: "premium-suit", name: "Premium Suit" },
    { id: "laundry", name: "Laundry" },
    { id: "ironing", name: "Ironing" },
    { id: "curtain-clean", name: "Curtain Cleaning" },
    { id: "stain-removal", name: "Stain Removal" },
    { id: "express-service", name: "Express Service" },
    { id: "leather-care", name: "Leather Care" },
    { id: "bedding-clean", name: "Bedding Cleaning" },
    { id: "carpet-cleaning", name: "Carpet Cleaning" },
    { id: "premium-laundry", name: "Premium Laundry" }
  ];

  // Simulating data loading
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call with setTimeout
    setTimeout(() => {
      setReviews(allReviews);
      setFilteredReviews(allReviews);
      setIsLoading(false);
    }, 800);
  }, []);

  // Filter and sort reviews
  useEffect(() => {
    let result = [...allReviews];
    
    // Filter by rating
    if (activeRatingFilter !== "all") {
      result = result.filter(review => review.rating === parseInt(activeRatingFilter));
    }
    
    // Filter by service
    if (activeServiceFilter !== "all") {
      result = result.filter(review => review.service === activeServiceFilter);
    }
    
    // Sort reviews
    switch (activeSortOption) {
      case "newest":
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "highest":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        result.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    
    setFilteredReviews(result);
  }, [activeRatingFilter, activeServiceFilter, activeSortOption]);

  // Go back to previous page
  const handleBack = () => {
    navigate(-1);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    return (
      <div className="d-flex">
        {[...Array(5)].map((_, i) => (
          <i 
            key={i} 
            className={`fas fa-star me-1 ${i < rating ? 'text-warning' : 'text-muted'}`}
            style={{ fontSize: "0.8rem" }}
          ></i>
        ))}
      </div>
    );
  };

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <div className="d-flex align-items-center mb-0 px-3 py-3 shadow-sm" style={{ 
        background: "white",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <button 
          className="btn btn-sm" 
          onClick={handleBack}
          style={{ background: "none", border: "none" }}
        >
          <i className="fas fa-arrow-left" style={{ color: "#333" }}></i>
        </button>
        <h5 className="mb-0 ms-2 fw-bold">Customer Reviews</h5>
        <button 
          className="btn btn-sm ms-auto" 
          onClick={() => setShowFilters(!showFilters)}
          style={{ background: "none", border: "none" }}
        >
          <i className="fas fa-filter" style={{ color: showFilters ? "#40BFC1" : "#333" }}></i>
        </button>
      </div>
      
      {/* Stats Banner */}
      <div className="position-relative mb-3">
        <div style={{ 
          background: "linear-gradient(135deg, #40BFC1 0%, #2A8D8F 100%)",
          color: "white",
          padding: "20px",
          position: "relative",
          overflow: "hidden"
        }}>
          <div className="row align-items-center position-relative" style={{ zIndex: 2 }}>
            <div className="col-7">
              <h2 className="mb-0 fw-bold" style={{ fontSize: "2.5rem" }}>4.6</h2>
              <div className="d-flex align-items-center my-2">
                {[...Array(5)].map((_, i) => (
                  <i 
                    key={i} 
                    className={`fas fa-star me-1 ${i < 4 ? 'text-warning' : i < 5 ? 'text-warning opacity-75' : 'text-muted'}`}
                    style={{ fontSize: "1rem" }}
                  ></i>
                ))}
              </div>
              <p className="mb-0" style={{ fontSize: "0.8rem" }}>Based on {allReviews.length} reviews</p>
            </div>
            <div className="col-5">
              <div className="progress mb-2" style={{ height: "6px" }}>
                <div className="progress-bar bg-warning" style={{ width: "85%" }}></div>
              </div>
              <div className="d-flex justify-content-between" style={{ fontSize: "0.7rem" }}>
                <span>5 ★ ({allReviews.filter(r => r.rating === 5).length})</span>
              </div>
              
              <div className="progress mb-2 mt-2" style={{ height: "6px" }}>
                <div className="progress-bar bg-warning" style={{ width: "65%" }}></div>
              </div>
              <div className="d-flex justify-content-between" style={{ fontSize: "0.7rem" }}>
                <span>4 ★ ({allReviews.filter(r => r.rating === 4).length})</span>
              </div>
              
              <div className="progress mb-2 mt-2" style={{ height: "6px" }}>
                <div className="progress-bar bg-warning" style={{ width: "45%" }}></div>
              </div>
              <div className="d-flex justify-content-between" style={{ fontSize: "0.7rem" }}>
                <span>3 ★ ({allReviews.filter(r => r.rating === 3).length})</span>
              </div>
            </div>
          </div>
          
          <div 
            className="position-absolute" 
            style={{ 
              top: "0", 
              right: "-30px", 
              fontSize: "7rem", 
              opacity: "0.05",
              color: "white"
            }}
          >
            <i className="fas fa-star"></i>
          </div>
        </div>
      </div>
      
      {/* Filter Section - Collapsible */}
      {showFilters && (
        <div className="px-3 mb-3 animate__animated animate__fadeIn">
          <div className="bg-white rounded-3 p-3 shadow-sm">
            <h6 className="fw-bold mb-3">Filters</h6>
            
            {/* Rating Filter */}
            <div className="mb-3">
              <p className="fw-semibold mb-2" style={{ fontSize: "0.9rem" }}>Rating</p>
              <div className="d-flex flex-wrap gap-2">
                {["all", "5", "4", "3", "2", "1"].map((rating) => (
                  <button
                    key={rating}
                    className={`btn btn-sm ${activeRatingFilter === rating ? 'btn-primary' : 'btn-outline-secondary'}`}
                    style={{ 
                      fontSize: "0.8rem",
                      backgroundColor: activeRatingFilter === rating ? "#40BFC1" : "white",
                      borderColor: activeRatingFilter === rating ? "#40BFC1" : "#dee2e6",
                      color: activeRatingFilter === rating ? "white" : "#666"
                    }}
                    onClick={() => setActiveRatingFilter(rating)}
                  >
                    {rating === "all" ? "All Ratings" : `${rating} ★`}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Service Filter */}
            <div className="mb-3">
              <p className="fw-semibold mb-2" style={{ fontSize: "0.9rem" }}>Service</p>
              <select 
                className="form-select form-select-sm" 
                value={activeServiceFilter}
                onChange={(e) => setActiveServiceFilter(e.target.value)}
                style={{ fontSize: "0.9rem" }}
              >
                {serviceCategories.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Sort Options */}
            <div>
              <p className="fw-semibold mb-2" style={{ fontSize: "0.9rem" }}>Sort By</p>
              <div className="d-flex flex-wrap gap-2">
                {[
                  { id: "newest", label: "Newest First" },
                  { id: "oldest", label: "Oldest First" },
                  { id: "highest", label: "Highest Rating" },
                  { id: "lowest", label: "Lowest Rating" }
                ].map((option) => (
                  <button
                    key={option.id}
                    className={`btn btn-sm ${activeSortOption === option.id ? 'btn-primary' : 'btn-outline-secondary'}`}
                    style={{ 
                      fontSize: "0.8rem",
                      backgroundColor: activeSortOption === option.id ? "#40BFC1" : "white",
                      borderColor: activeSortOption === option.id ? "#40BFC1" : "#dee2e6",
                      color: activeSortOption === option.id ? "white" : "#666"
                    }}
                    onClick={() => setActiveSortOption(option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Reviews List */}
      <div className="px-3 mb-4">
        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status" style={{ color: "#40BFC1" }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2 text-muted">Loading reviews...</p>
          </div>
        ) : (
          <div className="row g-3">
            {filteredReviews.map((review) => (
              <div key={review.id} className="col-12">
                <div className="bg-white rounded-3 p-3 shadow-sm">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex">
                      <img 
                        src={review.avatar} 
                        alt={review.name}
                        className="rounded-circle me-3"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                      <div>
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 fw-bold">{review.name}</h6>
                          {review.verified && (
                            <span 
                              className="badge ms-2"
                              style={{ 
                                backgroundColor: "rgba(64, 191, 193, 0.1)",
                                color: "#40BFC1",
                                fontSize: "0.7rem",
                                padding: "2px 6px"
                              }}
                            >
                              <i className="fas fa-check-circle me-1"></i> Verified
                            </span>
                          )}
                        </div>
                        <div className="d-flex align-items-center mt-1">
                          {renderStars(review.rating)}
                          <span className="ms-2 text-muted" style={{ fontSize: "0.75rem" }}>
                            {formatDate(review.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span 
                      className="badge"
                      style={{ 
                        backgroundColor: "rgba(64, 191, 193, 0.1)",
                        color: "#40BFC1",
                        fontSize: "0.7rem",
                        padding: "5px 8px"
                      }}
                    >
                      {review.serviceName}
                    </span>
                  </div>
                  
                  <p className="mb-0" style={{ 
                    fontSize: "0.9rem", 
                    color: "#555",
                    lineHeight: "1.5"
                  }}>
                    "{review.comment}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* No Reviews Message */}
        {!isLoading && filteredReviews.length === 0 && (
          <div className="text-center py-5">
            <div 
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                backgroundColor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 15px",
                fontSize: "2rem",
                color: "#aaa"
              }}
            >
              <i className="fas fa-search"></i>
            </div>
            <h5 className="mb-2">No Reviews Found</h5>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              We couldn't find any reviews matching your filters.
            </p>
            <button
              className="btn btn-outline-primary mt-2"
              style={{ 
                borderColor: "#40BFC1",
                color: "#40BFC1"
              }}
              onClick={() => {
                setActiveRatingFilter("all");
                setActiveServiceFilter("all");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Bottom Padding for Fixed Footer */}
      <div style={{ height: "70px" }}></div>
    </div>
  );
};

export default ReviewsPage; 