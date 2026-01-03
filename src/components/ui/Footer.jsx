import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-columns">
          {/* Column 1: Logo & About Us */}
          <div className="footer-column">
            <div className="footer-logo">
              <FontAwesomeIcon icon={faPaperPlane} className="footer-logo-icon" />
              <span>Holiday Planner<br></br>Tour & Travels</span>
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
              <li><Link to="/tour">Tour</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/booking">Booking</Link></li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div className="footer-column">
            <h3 className="footer-title">Follow Us</h3>
            <div className="footer-social">
              <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
            </div>
          </div>
        </div>

        {/* Bottom Row: Rights Reserved */}
        <div className="footer-bottom">
          © {new Date().getFullYear()} Holiday Planner Tour & Travels. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;