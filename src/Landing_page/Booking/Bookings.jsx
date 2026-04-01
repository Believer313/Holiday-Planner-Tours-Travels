import React, { useState, useEffect } from "react";
import { initiatePayment } from "../../utils/razorpay";

const Bookings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelDate: "",
    travelers: "",
    specialRequests: "",
  });

  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [fetchingDestinations, setFetchingDestinations] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Fetch tours from database for destinations
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tours`);
        if (!response.ok) throw new Error();
        const tours = await response.json();
        const tourDestinations = tours.map(tour => tour.title);
        setDestinations(tourDestinations);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
        setDestinations([
          "Sundarbans Expedition",
          "Darjeeling Retreat",
          "Purulia Heritage",
          "Kashmir Paradise Tour"
        ]);
      } finally {
        setFetchingDestinations(false);
      }
    };
    fetchDestinations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/bookings/public`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setBookingId(data.bookingId || Date.now().toString());
        setMessage(`✅ Booking confirmed for ${formData.name}!`);
        setShowPayment(true);
        setBookingSuccess(true);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your internet or try again later.");
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setPaymentLoading(true);
    const amount = 1000; // ₹1000 advance payment
    
    await initiatePayment(amount, bookingId, {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      destination: formData.destination
    });
    
    setPaymentLoading(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      destination: "",
      travelDate: "",
      travelers: "",
      specialRequests: "",
    });
    setMessage("");
    setShowPayment(false);
    setBookingSuccess(false);
    setBookingId(null);
  };

  const today = new Date().toISOString().split("T")[0];

  if (fetchingDestinations) {
    return (
      <div className="booking-loading-destinations">
        <div className="booking-loading-spinner"></div>
        <p>Loading destinations...</p>
      </div>
    );
  }

  return (
    <>
      {message && (
        <div className="success-message">
          <span className="success-icon">✓</span>
          {message}
        </div>
      )}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="booking-form-inner">
        <div className="booking-trust">
          <span>✓ Free Cancellation</span>
          <span>✓ Secure Booking</span>
          <span>✓ Reply in 2 Hours</span>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" placeholder="Your full name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" placeholder="Your phone number" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="Your email address" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Destination</label>
            <select name="destination" value={formData.destination} onChange={handleChange} required>
              <option value="">Select destination</option>
              {destinations.map((dest, index) => (
                <option key={index} value={dest} title={dest}>
                  {dest.length > 35 ? dest.substring(0, 32) + '...' : dest}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Travel Date</label>
            <input type="date" name="travelDate" value={formData.travelDate} min={today} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Number of Travelers</label>
          <input type="number" name="travelers" placeholder="How many travelers?" value={formData.travelers} min="1" max="50" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Special Requests <span style={{fontWeight: 400, opacity: 0.7}}>(Optional)</span></label>
          <textarea name="specialRequests" placeholder="Any special requirements, dietary needs, etc." value={formData.specialRequests} onChange={handleChange} rows="3" />
        </div>

        {!showPayment ? (
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Book Now →"}
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            <button 
              type="button" 
              onClick={handlePayment} 
              disabled={paymentLoading}
              style={{
                background: '#064e3b',
                color: 'white',
                padding: '14px 24px',
                border: 'none',
                borderRadius: '8px',
                cursor: paymentLoading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              {paymentLoading ? "Processing..." : "💳 Pay Online (Test Mode) - ₹1,000"}
            </button>
            <button 
              type="button" 
              onClick={resetForm}
              style={{
                background: '#d4af37',
                color: '#064e3b',
                padding: '14px 24px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold'
              }}
            >
              Book Another Tour
            </button>
          </div>
        )}

        <p className="booking-form-note">
          Prefer instant confirmation?{" "}
          <a href="https://wa.me/919907740169" target="_blank" rel="noopener noreferrer">
            WhatsApp us →
          </a>
        </p>

        {showPayment && (
          <p style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginTop: '10px' }}>
            🔧 Test Mode: Use card 4111 1111 1111 1111 | Exp: 12/30 | CVV: 111
          </p>
        )}
      </form>
    </>
  );
};

export default Bookings;
