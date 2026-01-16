import React from 'react';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    navigate('/booking');
  };

  return (
    <section className="home-booking-promo">
      <div className="home-booking-wrapper">

        {/* Text */}
        <div className="home-booking-content">
          <h1>Booking</h1>
          <p>
            Ready to explore breathtaking destinations? Our hassle-free booking system makes it easy to plan your dream trip.
            <br />
            Choose your destination, select your dates, and let us handle the rest and create unforgettable memories!
          </p>
          <button className="home-booking-cta" onClick={handleBookNow}>
            <strong>Book now</strong>
          </button>
        </div>

        {/* Image */}
        <div className="home-booking-visual">
          <img
            src="/assets/tourbook.jpg"
            alt="Travel Booking"
            className="home-booking-img"
          />
        </div>

      </div>
    </section>
  );
};

export default Booking;