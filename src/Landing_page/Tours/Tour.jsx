import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Tour = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===== SAMPLE TOURS =====
  const sampleTours = [
    {
      _id: "sample-1",
      title: "Sunderban Trip",
      images: ["/assets/Tiger.png"],
      shortDescription: "Explore mystical mangroves and spot the Royal Bengal Tiger.",
      price: 5000,
    },
    {
      _id: "sample-2",
      title: "Darjeeling Trip",
      images: ["/assets/Kanchenjunga.jpg"],
      shortDescription: "Witness breathtaking sunrises and world-famous tea gardens.",
      price: 7000,
    },
    {
      _id: "sample-3",
      title: "Purulia Trip",
      images: ["/assets/purulia.jpg"],
      shortDescription: "Experience tribal culture and mesmerizing Chhau dance.",
      price: 5500,
    },
  ];

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tours`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setTours([...sampleTours, ...data]);
      } catch (err) {
        console.error('Failed to fetch tours:', err);
        setTours(sampleTours);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (loading) {
    return (
      <div className="tour-loading">
        <div className="tour-loading-spinner"></div>
        <div className="tour-loading-text">Loading tours...</div>
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <section className="tour-section">
        <div className="tour-container">
          <div className="tour-section-header">
            <span className="tour-section-label">Discover</span>
            <h2 className="tour-title">Explore Our Tours</h2>
            <p className="tour-section-desc">Handcrafted journeys to India's most beautiful destinations</p>
          </div>
          <div className="tour-empty-state">
            <p>No tours available at the moment. Please check back soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="tour-section">
      <div className="tour-container">
        <div className="tour-section-header">
          <span className="tour-section-label">Discover</span>
          <h2 className="tour-title">Explore Our Tours</h2>
          <p className="tour-section-desc">Handcrafted journeys to India's most beautiful destinations</p>
        </div>

        <div className="tour-grid">
          {tours.map((tour) => (
            <div
              key={tour._id}
              className="tour-card"
              onClick={() => navigate(`/tour/${tour._id}`)}
            >
              <div className="tour-card-image-wrapper">
                <img
                  src={tour.images?.[0] || tour.imageCover || "/assets/Tiger.png"}
                  alt={tour.title}
                  className="tour-image"
                  onError={(e) => (e.target.src = "/assets/Tiger.png")}
                />
                <div className="tour-card-overlay"></div>
                {tour.experience && (
                  <div className="tour-card-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {tour.experience}
                  </div>
                )}
                <div className="tour-card-price-tag">
                  <span className="price-label-small">Starting from</span>
                  ₹{tour.price?.toLocaleString()}
                </div>
              </div>

              <div className="tour-details">
                <div className="tour-card-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {tour.destination || "India"}
                </div>
                <h3 className="tour-card-title">{tour.title}</h3>
                <p className="tour-card-description">
                  {tour.shortDescription || tour.description?.substring(0, 100) || "Discover this amazing journey with us."}
                </p>

                <div className="tour-card-meta">
                  {tour.duration && (
                    <div className="tour-card-meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      {tour.duration}
                    </div>
                  )}
                  {tour.groupSize && (
                    <div className="tour-card-meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      {tour.groupSize}
                    </div>
                  )}
                </div>

                <button
                  className="booking-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/booking?tourId=${tour._id}`);
                  }}
                >
                  Book Now
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tour;
