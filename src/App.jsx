// src/App.jsx — COMPLETELY FIXED VERSION (Tawk.to LEFT, WhatsApp RIGHT)
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
import AdminAlbum from "./pages/AdminAlbum";
import EditTour from "./pages/EditTour";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import FactsAndFigures from "./components/ui/FactsAndFigure";
import Testimonials from "./components/ui/Testimonials";
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
      zIndex: 999999,
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
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.1)';
      e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)';
    }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="38" height="38" fill="#ffffff">
      <path d="M16.003 2.667C8.636 ...(your existing SVG path)... " />
    </svg>
  </a>
);

// ─── Protected Route — redirects to /signin if not admin ─────────────────────
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token || user.role !== 'admin') {
    return <Navigate to="/signin" replace />;
  }
  
  return children;
};

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

  // Inject CSS to force Tawk.to to bottom‑left (so WhatsApp stays on bottom‑right)
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Force Tawk.to iframe to bottom‑left, push it below WhatsApp z-index */
      iframe[src*="tawk.to"] {
        bottom: 20px !important;
        left: 20px !important;
        right: auto !important;
        top: auto !important;
        z-index: 99999 !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && (
        <>
          <Testimonials />
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
        
        {/* ADMIN DASHBOARD — PROTECTED — must sign in first */}
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/create-tour" element={<ProtectedRoute><CreateTour /></ProtectedRoute>} />
        <Route path="/admin/bookings" element={<ProtectedRoute><AdminBookings /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} />
        <Route path="/admin/revenue" element={<ProtectedRoute><AdminRevenue /></ProtectedRoute>} />
        <Route path="/admin/gallery" element={<ProtectedRoute><AdminAlbum /></ProtectedRoute>} />
        <Route path="/admin/edit-tour/:id" element={<ProtectedRoute><EditTour /></ProtectedRoute>} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;