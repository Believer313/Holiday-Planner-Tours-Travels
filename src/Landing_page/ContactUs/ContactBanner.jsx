import React from "react";
import contactBannerImage from "/assets/contactban.jpg"; // Import the banner image

const ContactBanner = () => {
  return (
    <div className="contact-banner">
      <img
        src={contactBannerImage}
        alt="Contact Banner"
        className="contact-banner-image"
      />
      <div className="contact-banner-overlay">
        <h1>Contact Us</h1>
        <p>We are here to assist you. Reach out to us anytime!</p>
      </div>
    </div>
  );
};

export default ContactBanner;