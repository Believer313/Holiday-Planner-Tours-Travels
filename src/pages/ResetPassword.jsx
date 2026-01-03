// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Updating password...');

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reset-password/${token}`,
        { password }
      );
      setMessage(
        <span style={{ color: '#4ade80' }}>
          Password changed successfully! Redirecting to login...
        </span>
      );
      setTimeout(() => navigate('/auth'), 2000);
    } catch (err) {
      setMessage(
        <span style={{ color: '#ff6b6b' }}>
          Link expired or invalid. Please request a new one.
        </span>
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Set New Password</h2>
        <p>Enter your new password below</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength="6"
            style={{ marginBottom: '20px' }}
          />
          <button type="submit" className="auth-btn">
            Update Password
          </button>
        </form>

        <div style={{ marginTop: '25px', textAlign: 'center' }}>
          {message && <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{message}</p>}
          
          <button
            onClick={() => navigate('/auth')}
            style={{
              marginTop: '15px',
              background: 'transparent',
              border: '2px solid #228B22',
              color: '#228B22',
              padding: '10px 20px',
              borderRadius: '50px',
              cursor: 'pointer'
            }}
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}