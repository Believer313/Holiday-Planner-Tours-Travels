// src/App.jsx — FINAL VERSION (Revenue Dashboard + All Pages)
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import React from "react";
import HomePage from "./Landing_page/Home/HomePage";
import TourPage from "./Landing_page/Tours/TourPage";
import TourDetails from "./Landing_page/Tours/TourDetails";
import AboutPage from "./Landing_page/AboutUs/AboutPage";
import GalleryPage from "./Landing_page/Gallery/GalleryPage";
import ContactUsPage from "./Landing_page/ContactUs/ContactUsPage";
import Booking from "./Landing_page/Booking/BookingPage";
import AuthPage from "./pages/AuthPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminDashboard from "./pages/AdminDashboard";
import CreateTour from "./pages/CreateTour";
import AdminBookings from "./pages/AdminBookings";
import AdminUsers from "./pages/AdminUsers";
import AdminRevenue from "./pages/AdminRevenue";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import FactsAndFigures from "./components/ui/FactsAndFigure";
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from "./pages/NotFound";

// ─── WhatsApp Floating Button ────────────────────────────────────────────────
const WhatsAppButton = () => (
  <a
    href="https://wa.me/919907740169"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    style={{
      position: 'fixed',
      bottom: '28px',
      right: '24px',
      zIndex: 9999,
      width: "64px",
      height: "64px",
      borderRadius: '50%',
      backgroundColor: '#25D366',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      textDecoration: 'none',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'scale(1.1)';
      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)';
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width="38"
      height="38"
      fill="#ffffff"
    >
      <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.338.638 4.625 1.848 6.625L2.667 29.333l6.885-1.807A13.285 13.285 0 0 0 16.003 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.003 2.667zm0 24.267a11.01 11.01 0 0 1-5.616-1.539l-.403-.24-4.086 1.073 1.09-3.98-.263-.41A10.974 10.974 0 0 1 5.04 16c0-6.044 4.919-10.96 10.963-10.96S26.96 9.956 26.96 16s-4.913 10.933-10.957 10.933zm6.01-8.2c-.33-.165-1.951-.963-2.254-1.073-.303-.11-.523-.165-.743.165-.22.33-.853 1.073-1.046 1.293-.193.22-.385.248-.715.083-.33-.165-1.394-.514-2.655-1.638-.981-.875-1.643-1.956-1.835-2.286-.193-.33-.021-.508.145-.673.15-.148.33-.385.495-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.743-1.793-1.018-2.454-.268-.644-.54-.557-.743-.567l-.633-.011c-.22 0-.578.083-.88.413-.303.33-1.155 1.128-1.155 2.751s1.183 3.191 1.348 3.411c.165.22 2.328 3.556 5.643 4.988.789.34 1.404.543 1.884.695.791.252 1.511.216 2.08.131.635-.095 1.951-.797 2.226-1.567.275-.77.275-1.43.193-1.567-.083-.138-.303-.22-.633-.385z" />
    </svg>
  </a>
);

// ─── Layout Component — Hides Navbar/Footer on Auth & Admin Pages ────────────
const Layout = ({ children }) => {
  const location = useLocation();
  const noLayoutPaths = [
    '/auth', '/signin', '/signup',
    '/forgot-password',
    '/reset-password',
    '/admin'
  ];
  const hideLayout = noLayoutPaths.some(path =>
    location.pathname === path || location.pathname.startsWith(path + '/')
  );
  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && (
        <>
          <FactsAndFigures />
          <Footer />
          <WhatsAppButton />
        </>
      )}
    </>
  );
};

const App = () => (
  <Router>
    <Layout>
      <Routes>
        {/* PUBLIC PAGES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/tours" element={<TourPage />} />
        <Route path="/tour" element={<Navigate to="/tours" replace />} />
        <Route path="/tour/:id" element={<TourDetails />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/booking" element={<Booking />} />
        {/* AUTH PAGES */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signin" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* ADMIN DASHBOARD — FULLY PROTECTED */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create-tour" element={<CreateTour />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/revenue" element={<AdminRevenue />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;