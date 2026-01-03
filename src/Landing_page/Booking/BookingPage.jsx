import React from "react";
import Book from "./Book";
import Bookings from "./Bookings";
import Hoarding from "./Hoarding";
import "./Booking.css";

function BookingPage() {
  return (
    <div className="booking-page">
      
      {/* TOP: Hoarding Image */}
      <Hoarding />

      {/* BELOW: Text + Form */}
      <div className="booking-container">
        
        {/* Left: Premium Text */}
        <div className="booking-text">
          <Book />
        </div>

        {/* Right: Booking Form */}
        <div className="booking-form">
          <Bookings />
        </div>

      </div>
    </div>
  );
}

export default BookingPage;
