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
import AdminRevenue from "./pages/AdminRevenue";   // ADDED  DASHBOARD

import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import FactsAndFigures from "./components/ui/FactsAndFigure";
import 'bootstrap/dist/css/bootstrap.min.css';

// Layout Component — Hides Navbar/Footer on Auth & Admin Pages
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

        {/* 404 - Page Not Found */}
        <Route path="*" element={
          <div className="flex items-center justify-center min-h-screen bg-slate-900 text-white text-4xl font-bold">
            404 - Page Not Found
          </div>
        } />
      </Routes>
    </Layout>
  </Router>
);

export default App;