import React, { useState } from "react";

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
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const destinations = [
    "Sundarbans",
    "Darjeeling",
    "Purulia",
    "Mumbai",
    "Goa",
    "Kerala Backwaters",
  ];

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
        setMessage(`Thank you ${formData.name}! Your booking request for ${formData.destination} has been received. We will call you within 2 hours at ${formData.phone}.`);
        setFormData({
          name: "",
          email: "",
          phone: "",
          destination: "",
          travelDate: "",
          travelers: "",
          specialRequests: "",
        });
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

  /* min date = today so past dates cannot be selected */
  const today = new Date().toISOString().split("T")[0];

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

        {/* Trust badges */}
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
                <option key={index} value={dest}>{dest}</option>
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

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Book Now →"}
        </button>

        <p className="booking-form-note">
          Prefer instant confirmation?{" "}
          <a href="https://wa.me/919907740169" target="_blank" rel="noopener noreferrer">
            WhatsApp us →
          </a>
        </p>

      </form>
    </>
  );
};

export default Bookings;