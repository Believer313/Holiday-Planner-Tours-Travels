import React, { useState } from "react";

function Contact() {
  const [user, setUser] = useState({ Name: '', Email: '', Phone: '', Message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    setSubmitted(true);
    setUser({ Name: '', Email: '', Phone: '', Message: '' });
  };

  return (
    <section className="contact-container">
      <div className="contact-grid">

        {/* Contact Details */}
        <div className="contact-details">
          <h2>Contact Us</h2>
          <p>Have any questions? Feel free to reach out to us.</p>

          <div className="contact-info">

            <p>
              <strong>📍 Address:</strong> Vill-Prosadpur, P.O-Chandanpur,
              P.S-Haripal, Dist-Hooghly, PIN-712223
            </p>

            {/* Clickable phone */}
            <p>
              <strong>📞 Phone:</strong>{" "}
              <a href="tel:+919907740169" className="contact-link">
                +91 9907740169
              </a>
            </p>

            {/* Clickable email */}
            <p>
              <strong>📧 Email:</strong>{" "}
              <a href="mailto:nazmussayadatmondal@gmail.com" className="contact-link">
                nazmussayadatmondal@gmail.com
              </a>
            </p>

            {/* Office hours */}
            <p>
              <strong>🕐 Hours:</strong> Monday – Saturday, 9:00 AM – 7:00 PM
            </p>

          </div>

          {/* WhatsApp button */}
          <a
            href="https://wa.me/919907740169"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-whatsapp-btn"
          >
            <svg viewBox="0 0 32 32" width="20" height="20" fill="currentColor">
              <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.338.638 4.625 1.848 6.625L2.667 29.333l6.885-1.807A13.285 13.285 0 0 0 16.003 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.003 2.667zm0 24.267a11.01 11.01 0 0 1-5.616-1.539l-.403-.24-4.086 1.073 1.09-3.98-.263-.41A10.974 10.974 0 0 1 5.04 16c0-6.044 4.919-10.96 10.963-10.96S26.96 9.956 26.96 16s-4.913 10.933-10.957 10.933zm6.01-8.2c-.33-.165-1.951-.963-2.254-1.073-.303-.11-.523-.165-.743.165-.22.33-.853 1.073-1.046 1.293-.193.22-.385.248-.715.083-.33-.165-1.394-.514-2.655-1.638-.981-.875-1.643-1.956-1.835-2.286-.193-.33-.021-.508.145-.673.15-.148.33-.385.495-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.743-1.793-1.018-2.454-.268-.644-.54-.557-.743-.567l-.633-.011c-.22 0-.578.083-.88.413-.303.33-1.155 1.128-1.155 2.751s1.183 3.191 1.348 3.411c.165.22 2.328 3.556 5.643 4.988.789.34 1.404.543 1.884.695.791.252 1.511.216 2.08.131.635-.095 1.951-.797 2.226-1.567.275-.77.275-1.43.193-1.567-.083-.138-.303-.22-.633-.385z" />
            </svg>
            Chat on WhatsApp
          </a>

        </div>

        {/* Contact Form */}
        <div className="contact-form">

          {submitted ? (
            <div className="contact-success">
              <div className="contact-success-icon">✓</div>
              <h3>Message Sent!</h3>
              <p>Thank you <strong>{user.Name || "there"}</strong>! We have received your message and will get back to you within 2 hours.</p>
              <button onClick={() => setSubmitted(false)} className="contact-reset-btn">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="Name"
                  placeholder="Enter your name"
                  value={user.Name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="Email"
                  placeholder="Enter your email"
                  value={user.Email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="Phone"
                  placeholder="Enter your phone number"
                  value={user.Phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="Message"
                  placeholder="Your message"
                  value={user.Message}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>

              <p className="contact-form-note">
                Prefer instant help?{" "}
                <a href="https://wa.me/919907740169" target="_blank" rel="noopener noreferrer">
                  WhatsApp us →
                </a>
              </p>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}

export default Contact;