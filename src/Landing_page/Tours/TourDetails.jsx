// src/Landing_page/Tours/TourDetails.jsx   ← Your exact file name
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TourDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Your 3 beautiful sample details (fallback)
  const sampleTours = {
    "1": {
      title: "Sunderban Trip",
      images: ["/assets/Tiger.png"],
      description: `3 Days & 2 Nights Package:
- Pick-up and drop from Canning
- Deluxe room accommodation
- Tea, breakfast, lunch, and dinner included
- 24×7 experienced guide for assistance
- Visit watch tower and sightseeing spots via boat with safety
- Family-friendly boat trips
- Special Offer: Only ₹4,500 per person (4-bed sharing package)`,
      price: 4500,
    },
    "2": {
      title: "Darjeeling Trip",
      images: ["/assets/Kanchenjunga.jpg"],
      description: `4 Days & 3 Nights Package:
- Pick-up and drop from Kolkata
- Sleeper class train ticket included in package cost
- Deluxe room accommodation
- All meals provided (Halal food ensured)
- 24×7 expert guide
- Stay overnight at each sightseeing spot
- Complimentary gift after travel`,
      price: 2500,
    },
    "3": {
      title: "Purulia Trip",
      images: ["/assets/purulia.jpg"],
      description: `3 Days & 2 Nights Package:
- Pick-up and drop from designated locations
- AC and Non-AC deluxe tent accommodation
- Bed tea, breakfast, lunch, snacks, and dinner included
- 24×7 expert guide for assistance
- Price: ₹5,500 (2 or 3-bed sharing) / ₹5,300 (4-bed sharing)`,
      price: 5500,
    },
  };

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/tours/${id}`);
        if (res.ok) {
          const data = await res.json();
          setTour(data);
        } else {
          throw new Error();
        }
      } catch (err) {
        const sample = sampleTours[id];
        if (sample) {
          setTour(sample);
        } else {
          alert("Tour not found!");
          navigate('/tours');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id, navigate]);

  if (loading) return <div style={{textAlign:'center', padding:'100px', color:'#228B22'}}>Loading tour details...</div>;
  if (!tour) return null;

  return (
    <div className="tour-details-container">
      <img
        src={tour.images?.[0] || '/assets/Tiger.png'}
        alt={tour.title}
        className="tour-details-image"
        onError={(e) => e.target.src = '/assets/Tiger.png'}
      />
      <h1>{tour.title}</h1>
      <p className="tour-price">₹{tour.price.toLocaleString()} per person</p>
      <div style={{ whiteSpace: 'pre-line', lineHeight: '1.8', fontSize: '1.1rem', margin: '30px 0' }}>
        {tour.description || "Experience an unforgettable journey with us!"}
      </div>
      <button
        className="booking-button"
        onClick={() => navigate(`/booking?tourId=${id}`)}
        style={{ padding: '15px 40px', fontSize: '1.2rem' }}
      >
        Book This Tour Now
      </button>
    </div>
  );
};

export default TourDetails;