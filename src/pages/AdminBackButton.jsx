import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminBackButton.css';

export default function AdminBackButton({ label = 'Back to Dashboard' }) {
  const navigate = useNavigate();
  return (
    <button className="admin-back-btn" onClick={() => navigate('/admin')}>
      ← {label}
    </button>
  );
}
