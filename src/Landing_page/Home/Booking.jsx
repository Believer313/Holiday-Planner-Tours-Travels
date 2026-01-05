import React from 'react';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/booking');
  };

  return (
    <section className="booking-section">
      <div className="booking-container">

        {/* Text */}
        <div className="booking-text">
          <h1>Booking</h1>
          <p>
            Ready to explore breathtaking destinations? Our hassle-free booking system makes it easy to plan your dream trip.
            <br />
            Choose your destination, select your dates, and let us handle the rest and create unforgettable memories!
          </p>
          <button className="book-now-btn" onClick={handleBookNow}>
            <strong>Book now</strong>
          </button>
        </div>

        {/* Image */}
        <div className="booking-image-card">
          <img
            src="/assets/tourbook.jpg"
            alt="Travel Booking"
            className="booking-image"
          />
        </div>

      </div>
    </section>
  );
};

export default Booking;
