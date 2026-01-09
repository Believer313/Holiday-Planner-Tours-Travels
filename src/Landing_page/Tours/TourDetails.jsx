import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Tour.css";

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  const sampleTours = {
    "sample-1": {
      title: "Sunderban Expedition",
      location: "Sundarbans, West Bengal",
      duration: "3 Days / 2 Nights",
      groupSize: "Max 12 Travelers",
      images: ["/assets/Tiger.png"],
      description: "Embark on an extraordinary journey through the world's largest mangrove forest, home to the legendary Royal Bengal Tiger. This curated expedition offers an immersive experience into one of nature's most unique ecosystems.",
      highlights: [
        "Private boat safari through pristine mangrove channels",
        "Expert naturalist guide for wildlife tracking",
        "Sunrise and sunset photography sessions",
        "Visit to traditional fishing villages",
        "Bird watching with over 300 species"
      ],
      includes: [
        "Luxury houseboat accommodation",
        "All gourmet meals (Bengali cuisine)",
        "Private boat transfers",
        "All permits and entry fees",
        "Professional wildlife guide"
      ],
      itinerary: [
        { day: "Day 1", title: "Arrival & Orientation", desc: "Arrive at Godkhali jetty, board luxury houseboat, orientation safari" },
        { day: "Day 2", title: "Deep Forest Exploration", desc: "Full day safari, tiger tracking, visit to watchtowers" },
        { day: "Day 3", title: "Sunrise Safari & Departure", desc: "Early morning safari, brunch, departure" }
      ],
      price: 4500,
    },
    "sample-2": {
      title: "Darjeeling Retreat",
      location: "Darjeeling, West Bengal",
      duration: "4 Days / 3 Nights",
      groupSize: "Max 10 Travelers",
      images: ["/assets/Kanchenjunga.jpg"],
      description: "Experience the magic of the Queen of Hills with breathtaking Himalayan views, world-famous tea gardens, and rich colonial heritage. A perfect blend of adventure and relaxation.",
      highlights: [
        "Tiger Hill sunrise over Kanchenjunga",
        "Private tea garden tour with tasting",
        "Himalayan Railway joy ride",
        "Buddhist monastery visits",
        "Trekking through rhododendron forests"
      ],
      includes: [
        "Heritage boutique hotel stay",
        "All meals and refreshments",
        "Private vehicle with driver",
        "All entry fees and permits",
        "Local expert guide"
      ],
      itinerary: [
        { day: "Day 1", title: "Arrival in Darjeeling", desc: "Transfer from NJP/Bagdogra, evening Mall Road walk" },
        { day: "Day 2", title: "Tiger Hill & Sightseeing", desc: "Sunrise at Tiger Hill, Batasia Loop, tea garden visit" },
        { day: "Day 3", title: "Monasteries & Adventure", desc: "Ghoom Monastery, toy train ride, rock garden" },
        { day: "Day 4", title: "Leisure & Departure", desc: "Morning at leisure, departure" }
      ],
      price: 2500,
    },
    "sample-3": {
      title: "Purulia Heritage",
      location: "Purulia, West Bengal",
      duration: "3 Days / 2 Nights",
      groupSize: "Max 15 Travelers",
      images: ["/assets/purulia.jpg"],
      description: "Discover the cultural heartland of Bengal with ancient temples, vibrant tribal traditions, and the mesmerizing Chhau dance. An authentic journey into rural India's rich heritage.",
      highlights: [
        "Private Chhau dance performance",
        "Tribal village homestay experience",
        "Ancient terracotta temple exploration",
        "Ayodhya Hills trekking adventure",
        "Traditional Santhali cuisine"
      ],
      includes: [
        "Eco-resort accommodation",
        "All meals (local cuisine)",
        "Private vehicle with driver",
        "Cultural performances",
        "Local tribal guide"
      ],
      itinerary: [
        { day: "Day 1", title: "Arrival & Cultural Immersion", desc: "Arrive Purulia, evening Chhau dance performance" },
        { day: "Day 2", title: "Heritage & Adventure", desc: "Ayodhya Hills trek, temple visits, tribal village tour" },
        { day: "Day 3", title: "Village Life & Departure", desc: "Morning village walk, handicraft shopping, departure" }
      ],
      price: 5500,
    },
  };

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tours/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setTour(data);
      } catch (err) {
        setTour(sampleTours[id]);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  if (loading) {
    return (
      <div className="tour-details-loading">
        <div className="tour-loading-spinner"></div>
        <p>Loading experience...</p>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="tour-not-found">
        <h2>Tour Not Found</h2>
        <p>The experience you're looking for doesn't exist.</p>
        <button className="booking-button" onClick={() => navigate("/tour")}>
          Explore All Tours
        </button>
      </div>
    );
  }

  return (
    <div className="tour-details-page">
      {/* Hero Section */}
      <section className="tour-details-hero">
        <img
          src={tour.images?.[activeImage] || "/assets/Tiger.png"}
          alt={tour.title}
          className="tour-details-hero-image"
        />
        <div className="tour-details-hero-overlay"></div>
        <div className="tour-details-hero-content">
          <button className="tour-details-back" onClick={() => navigate("/tour")}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Tours
          </button>
          <div className="tour-details-hero-info">
            <span className="tour-details-location">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {tour.location || "India"}
            </span>
            <h1 className="tour-details-title">{tour.title}</h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="tour-details-container">
        <div className="tour-details-grid">
          {/* Left Column - Details */}
          <div className="tour-details-main">
            {/* Quick Info Cards */}
            <div className="tour-quick-info">
              <div className="tour-quick-info-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <div>
                  <span className="label">Duration</span>
                  <span className="value">{tour.duration || "3 Days / 2 Nights"}</span>
                </div>
              </div>
              <div className="tour-quick-info-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <div>
                  <span className="label">Group Size</span>
                  <span className="value">{tour.groupSize || "Small Group"}</span>
                </div>
              </div>
              <div className="tour-quick-info-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <div>
                  <span className="label">Experience</span>
                  <span className="value">Premium</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="tour-details-section">
              <h2 className="tour-details-section-title">
                <span className="gold-accent">About</span> This Experience
              </h2>
              <p className="tour-details-description">{tour.description}</p>
            </div>

            {/* Highlights */}
            {tour.highlights && (
              <div className="tour-details-section">
                <h2 className="tour-details-section-title">
                  <span className="gold-accent">Tour</span> Highlights
                </h2>
                <ul className="tour-highlights-list">
                  {tour.highlights.map((item, index) => (
                    <li key={index}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Itinerary */}
            {tour.itinerary && (
              <div className="tour-details-section">
                <h2 className="tour-details-section-title">
                  <span className="gold-accent">Day by Day</span> Itinerary
                </h2>
                <div className="tour-itinerary">
                  {tour.itinerary.map((item, index) => (
                    <div key={index} className="tour-itinerary-item">
                      <div className="tour-itinerary-day">{item.day}</div>
                      <div className="tour-itinerary-content">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What's Included */}
            {tour.includes && (
              <div className="tour-details-section">
                <h2 className="tour-details-section-title">
                  <span className="gold-accent">What's</span> Included
                </h2>
                <div className="tour-includes-grid">
                  {tour.includes.map((item, index) => (
                    <div key={index} className="tour-includes-item">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="tour-details-sidebar">
            <div className="tour-booking-card">
              <div className="tour-booking-price">
                <span className="price-label">Starting from</span>
                <div className="price-value">
                  <span className="currency">₹</span>
                  <span className="amount">{tour.price?.toLocaleString()}</span>
                  <span className="per-person">/ person</span>
                </div>
              </div>
              
              <div className="tour-booking-features">
                <div className="feature">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Flexible Dates
                </div>
                <div className="feature">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Free Cancellation
                </div>
                <div className="feature">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  24/7 Support
                </div>
              </div>

              <button
                className={`booking-button-large ${id?.startsWith("sample-") ? "coming-soon" : ""}`}
                onClick={() => {
                  if (id?.startsWith("sample-")) {
                    alert("Booking will open soon!");
                  } else {
                    navigate(`/booking?tourId=${id}`);
                  }
                }}
              >
                {id?.startsWith("sample-") ? "Coming Soon" : "Book This Experience"}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>

              <p className="booking-note">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="16" x2="12" y2="12"/>
                  <line x1="12" y1="8" x2="12.01" y2="8"/>
                </svg>
                Reserve now, pay later. Secure your spot today!
              </p>
            </div>

            {/* Contact Card */}
            <div className="tour-contact-card">
              <h4>Need Help?</h4>
              <p>Our travel experts are here to assist you with any questions.</p>
              <a href="tel:+919876543210" className="contact-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/>
                </svg>
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;