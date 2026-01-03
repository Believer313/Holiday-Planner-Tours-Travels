import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { CgMenu, CgClose } from "react-icons/cg";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
          <span>
            Holiday Planner <br />
            Tour & Travels
          </span>
        </Link>

        {/* MOBILE TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CgClose size={28} /> : <CgMenu size={28} />}
        </button>

        {/* MENU */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={closeMenu}
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/tour"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={closeMenu}
              >
                Tour
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={closeMenu}
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/gallery"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={closeMenu}
              >
                Gallery
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/booking"
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                onClick={closeMenu}
              >
                Booking
              </NavLink>
            </li>

            {/* AUTH BUTTONS */}
            <li className="nav-item">
              <NavLink
                to="/signin"
                className="nav-link auth-signin"
                onClick={closeMenu}
              >
                <FontAwesomeIcon icon={faUser} />
                Sign In
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/signup"
                className="nav-link auth-signup"
                onClick={closeMenu}
              >
                <FontAwesomeIcon icon={faUserPlus} />
                Sign Up
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
