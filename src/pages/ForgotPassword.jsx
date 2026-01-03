// src/pages/ForgotPassword.jsx — FINAL FIXED VERSION
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);        // ← ADDED
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // PREVENT DOUBLE CLICK / SPAM
    if (loading) return;
    setLoading(true);
    setMessage('Sending reset link...');

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        { email }
      );

      // SUCCESS — SHOW BEAUTIFUL LINK
      setMessage(
        <div style={{ 
          background: 'linear-gradient(135deg, #162e26, #1e3a2f)', 
          padding: '30px', 
          borderRadius: '16px', 
          color: '#fff',
          border: '2px solid #228B22',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#4ade80', margin: '0 0 15px 0' }}>Reset Link Sent!</h3>
          <p style={{ margin: '0 0 20px 0', opacity: 0.9 }}>
            Valid for <strong>15 minutes only</strong>
          </p>
          <a 
            href={res.data.resetURL}
            style={{
              background: '#228B22',
              color: 'white',
              padding: '16px 40px',
              textDecoration: 'none',
              borderRadius: '50px',
              fontWeight: 'bold',
              fontSize: '18px',
              display: 'inline-block',
              boxShadow: '0 4px 15px rgba(34, 139, 34, 0.4)'
            }}
          >
            Reset Password Now
          </a>
          <p style={{ margin: '25px 0 0 0', fontSize: '13px', opacity: 0.7 }}>
            Or copy this link:
            <br />
            <code style={{ 
              background: '#000', 
              padding: '10px', 
              borderRadius: '8px', 
              fontSize: '11px',
              wordBreak: 'break-all',
              display: 'inline-block',
              marginTop: '8px'
            }}>
              {res.data.resetURL}
            </code>
          </p>
        </div>
      );

      // CRITICAL FIX — STOP HERE SO USER CAN'T CLICK AGAIN
      return;

    } catch (err) {
      setMessage(
        <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
          Email not found! Please check and try again.
        </span>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password?</h2>
        <p>Enter your email and we'll send you a reset link</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            style={{ marginBottom: '20px' }}
          />
          <button 
            type="submit" 
            disabled={loading} 
            className="auth-btn"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div style={{ marginTop: '30px', minHeight: '100px' }}>
          {message}
        </div>

        <button 
          onClick={() => navigate('/auth')} 
          style={{ 
            marginTop: '20px', 
            background: 'transparent', 
            border: '2px solid #228B22',
            color: '#228B22',
            padding: '12px 24px',
            borderRadius: '50px',
            fontWeight: 'bold'
          }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}