// src/Landing_page/Tours/Tour.jsx   ← FINAL PERFECT VERSION
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Tour = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Your 3 beautiful sample tours (always visible during dev)
  const sampleTours = [
    {
      _id: "sample-1",
      title: "Sunderban Trip",
      images: ["/assets/Tiger.png"],
      shortDescription: "Explore mystical mangroves, spot the Royal Bengal Tiger, and sail through enchanting river deltas.",
      price: 4500,
    },
    {
      _id: "sample-2",
      title: "Darjeeling Trip",
      images: ["/assets/Kanchenjunga.jpg"],
      shortDescription: "Witness breathtaking sunrises at Tiger Hill, enjoy world-famous Darjeeling tea, and ride the iconic toy train.",
      price: 2500,
    },
    {
      _id: "sample-3",
      title: "Purulia Trip",
      images: ["/assets/purulia.jpg"],
      shortDescription: "Experience rugged landscapes, tribal culture, and mesmerizing Chhau dance performances in Purulia.",
      price: 5500,
    },
  ];

  useEffect(() => {
    const fetchRealTours = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tours`);
        if (res.ok) {
          const realTours = await res.json();
          setTours([...sampleTours, ...realTours]);
        } else {
          throw new Error();
        }
      } catch (err) {
        console.log('Backend down → showing only sample tours');
        setTours(sampleTours);
      } finally {
        setLoading(false);
      }
    };

    fetchRealTours();
  }, []);

  const handleCardClick = (id) => {
    if (id.startsWith('sample-')) {
      navigate('/tours');
      return;
    }
    navigate(`/tour/${id}`);
  };

  const handleBookingClick = (e, id) => {
    e.stopPropagation();
    if (id.startsWith('sample-')) {
      alert("This is a sample tour. Real booking coming soon!");
      return;
    }
    navigate(`/booking?tourId=${id}`);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', color: '#228B22', fontSize: '1.4rem' }}>
        Loading your dream tours...
      </div>
    );
  }

  return (
    <div className="tour-container">
      <h1 className="tour-title">Explore Our Tours</h1>
      <div className="tour-grid">
        {tours.map((tour) => (
          <div
            key={tour._id}
            className="tour-card"
            onClick={() => handleCardClick(tour._id)}
            style={{ cursor: tour._id.startsWith('sample-') ? 'default' : 'pointer' }}
          >
            {/* IMAGE — works with both sample & real tours */}
            <img
              src={
                tour.images?.[0] || 
                tour.imageCover || 
                '/assets/Tiger.png'
              }
              alt={tour.title || 'Tour'}
              className="tour-image"
              onError={(e) => (e.target.src = '/assets/Tiger.png')}
            />

            <div className="tour-details">
              <h3>{tour.title || 'Amazing Tour'}</h3>

              {/* DESCRIPTION — works with all field names */}
              <p>
                {tour.shortDescription ||
                 (tour.description && tour.description.substring(0, 100) + '...') ||
                 tour.destination ||
                 'Discover incredible destinations'}
              </p>

              {/* PRICE — safe fallback */}
              <p className="tour-price">
                From ₹{(tour.price || 0).toLocaleString()}
              </p>

              <button
                className="booking-button"
                onClick={(e) => handleBookingClick(e, tour._id)}
              >
                {tour._id.startsWith('sample-') ? 'Coming Soon' : 'Book Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tour;