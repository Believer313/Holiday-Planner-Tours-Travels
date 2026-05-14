// src/pages/AdminBookings.jsx
import React, { useState, useEffect } from 'react';
import AdminBackButton from './AdminBackButton';
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
      console.error(err);
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
      fetchBookings(); // Refresh list
    } catch (err) {
      alert('Error updating status');
    }
  };

  if (loading) return <div className="loading">Loading Bookings...</div>;

  return (
    <div className="admin-container">
      <AdminBackButton label="Back to Dashboard" />
      <h1 className="admin-title">Bookings Management</h1>
      <p className="admin-subtitle">Total Bookings: {bookings.length}</p>

      <div className="table-container">
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Destination</th>
              <th>Travelers</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Booking Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b._id}>
                <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                <td><strong>{b.name}</strong></td>
                <td>{b.email}</td>
                <td>{b.phone}</td>
                <td>{b.destination}</td>
                <td>{b.travelers || b.totalPersons || 1}</td>
                <td className="price">₹{b.amount?.toLocaleString() || 0}</td>
                
                {/* Payment Status */}
                <td>
                  <span className={`status ${b.paymentStatus || 'pending'}`}>
                    {b.paymentStatus ? b.paymentStatus.toUpperCase() : 'PENDING'}
                  </span>
                </td>

                {/* Booking Status */}
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