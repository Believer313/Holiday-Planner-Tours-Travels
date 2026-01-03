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

  const destinations = ["Sundarbans", "Darjeeling", "Purulia"];

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
        "http://localhost:5000/api/bookings/public",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Booking Successful! We will contact you soon.");
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

  return (
    <>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      {/* ✅ APPLY booking-form CLASS HERE */}
      <form onSubmit={handleSubmit} className="booking-form">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label>Destination:</label>
        <select name="destination" value={formData.destination} onChange={handleChange} required>
          <option value="">Select a destination</option>
          {destinations.map((dest, index) => (
            <option key={index} value={dest}>{dest}</option>
          ))}
        </select>

        <label>Travel Date:</label>
        <input type="date" name="travelDate" value={formData.travelDate} onChange={handleChange} required />

        <label>Number of Travelers:</label>
        <input type="number" name="travelers" value={formData.travelers} min="1" onChange={handleChange} required />

        <label>Special Requests (Optional):</label>
        <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange} rows="4" />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Book Now"}
        </button>
      </form>
    </>
  );
};

export default Bookings;
