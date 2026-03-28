import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane, faPhone, faEnvelope, faMapMarkerAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-columns">

          {/* Column 1: Logo & About */}
          <div className="footer-column">
            <div className="footer-logo">
              <FontAwesomeIcon icon={faPaperPlane} className="footer-logo-icon" />
              <span>Holiday Planner<br />Tour & Travels</span>
            </div>
            <p className="footer-text">
              Your trusted travel partner, bringing the best destinations and experiences for an unforgettable journey.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-column">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/tours">Tour</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/booking">Booking</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-column">
            <h3 className="footer-title">Contact Us</h3>
            <ul className="footer-contact-list">
              <li>
                <FontAwesomeIcon icon={faMapMarkerAlt} className="footer-contact-icon" />
                <span>Vill-Prosadpur, P.O-Chandanpur, P.S-Haripal, Dist-Hooghly, PIN-712223</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} className="footer-contact-icon" />
                <a href="tel:+919907740169">+91 9907740169</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faEnvelope} className="footer-contact-icon" />
                <a href="mailto:nazmussayadatmondal@gmail.com">nazmussayadatmondal@gmail.com</a>
              </li>
              <li>
                <FontAwesomeIcon icon={faClock} className="footer-contact-icon" />
                <span>Mon – Sat, 9:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div className="footer-column">
            <h3 className="footer-title">Follow Us</h3>
            <div className="footer-social">
              <a href="FACEBOOK_URL" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="INSTAGRAM_URL" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
            {/* WhatsApp */}
            <a href="https://wa.me/919907740169" target="_blank" rel="noopener noreferrer" className="footer-whatsapp">
              <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
                <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.338.638 4.625 1.848 6.625L2.667 29.333l6.885-1.807A13.285 13.285 0 0 0 16.003 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.003 2.667zm0 24.267a11.01 11.01 0 0 1-5.616-1.539l-.403-.24-4.086 1.073 1.09-3.98-.263-.41A10.974 10.974 0 0 1 5.04 16c0-6.044 4.919-10.96 10.963-10.96S26.96 9.956 26.96 16s-4.913 10.933-10.957 10.933zm6.01-8.2c-.33-.165-1.951-.963-2.254-1.073-.303-.11-.523-.165-.743.165-.22.33-.853 1.073-1.046 1.293-.193.22-.385.248-.715.083-.33-.165-1.394-.514-2.655-1.638-.981-.875-1.643-1.956-1.835-2.286-.193-.33-.021-.508.145-.673.15-.148.33-.385.495-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.743-1.793-1.018-2.454-.268-.644-.54-.557-.743-.567l-.633-.011c-.22 0-.578.083-.88.413-.303.33-1.155 1.128-1.155 2.751s1.183 3.191 1.348 3.411c.165.22 2.328 3.556 5.643 4.988.789.34 1.404.543 1.884.695.791.252 1.511.216 2.08.131.635-.095 1.951-.797 2.226-1.567.275-.77.275-1.43.193-1.567-.083-.138-.303-.22-.633-.385z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Holiday Planner Tour & Travels. All Rights Reserved.</p>
          <p className="footer-developer">Designed & Developed by Asif Mondal</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;