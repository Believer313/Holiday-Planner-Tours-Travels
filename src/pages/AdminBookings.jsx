// src/pages/AdminBookings.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminBookings.css';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(res.data);
    } catch (err) {
      alert('Error fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${import.meta.env.VITE_API_URL}/bookings/${id}`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings();
    } catch (err) {
      alert('Error updating status');
    }
  };

  if (loading) return <div className="loading">Loading Bookings...</div>;

  return (
    <div className="admin-container">
      <h1 className="admin-title">Bookings Management</h1>
      <p className="admin-subtitle">Total Bookings: {bookings.length}</p>

      <div className="table-container">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Tour</th>
              <th>Phone</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id}>
                <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                <td>{b.user?.name || 'Guest'}<br/><small>{b.user?.email}</small></td>
                <td>{b.tour?.title || 'N/A'}</td>
                <td>{b.phone}</td>
                <td className="price">₹{b.totalPrice?.toLocaleString()}</td>
                <td>
                  <span className={`status ${b.status}`}>
                    {b.status || 'pending'}
                  </span>
                </td>
                <td>
                  {b.status !== 'confirmed' && (
                    <button className="btn-confirm" onClick={() => updateStatus(b._id, 'confirmed')}>
                      Confirm
                    </button>
                  )}
                  {b.status !== 'cancelled' && (
                    <button className="btn-cancel" onClick={() => updateStatus(b._id, 'cancelled')}>
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}