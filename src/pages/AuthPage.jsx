// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPage.css';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // AUTO MAKE YOU ADMIN (only your email)
    const payload = {
      ...formData,
      ...(formData.email === 'mondalasif313@gmail.com' && { role: 'admin' })
    };

    const url = isSignUp
      ? `${import.meta.env.VITE_API_URL}/auth/register`
      : `${import.meta.env.VITE_API_URL}/auth/login`;

    try {
      const res = await axios.post(url, payload);

      // Save token + user info
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      const userName = res.data.user.name || 'Traveler';
      const userRole = res.data.user.role;

      if (isSignUp) {
        const msg = userRole === 'admin'
          ? `Welcome to the empire, ${userName} (ADMIN)`
          : `Welcome aboard, ${userName}! Your adventure begins!`;

        setMessage(msg);
        setTimeout(() => navigate('/'), 2000);
      } else {
        const msg = userRole === 'admin'
          ? `Welcome back, ${userName} (ADMIN) — Full control activated!`
          : `Welcome back, ${userName}! Ready for your next trip?`;

        setMessage(msg);
        setTimeout(() => navigate('/'), 1800);
      }

    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Something went wrong!';

      setMessage(errorMsg);

      // Auto switch to login if email exists
      if (errorMsg.includes('already in use') || errorMsg.includes('already registered')) {
        setIsSignUp(false);
        setMessage('Email already registered! Switching to Login...');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
          <p>{isSignUp ? 'Join Holiday Planner today' : 'Log in to book your dream trip'}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Please wait...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        {message && (
          <p className={`auth-message ${message.includes('Welcome') || message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </p>
        )}

        <div className="auth-toggle">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <span onClick={() => { setIsSignUp(!isSignUp); setMessage(''); }}>
              {isSignUp ? 'Sign In' : 'Sign Up Now'}
            </span>
          </p>

          {/* FORGOT PASSWORD LINK */}
          {!isSignUp && (
            <p style={{ marginTop: '15px' }}>
              <span
                onClick={() => navigate('/forgot-password')}
                style={{
                  color: '#228B22',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontWeight: '500'
                }}
              >
                Forgot Password?
              </span>
            </p>
          )}
        </div>

        <Link to="/" className="back-home">Back to Home</Link>
      </div>
    </div>
  );
}