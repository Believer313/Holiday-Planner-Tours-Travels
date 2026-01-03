// src/pages/AdminDashboard.jsx — FINAL 100% WORKING VERSION
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Protect route — only admin
  useEffect(() => {
    if (user.role !== 'admin') {
      alert('Access Denied. Only Admin can enter.');
      navigate('/');
    }
  }, [user, navigate]); // ← Fixed: removed extra "navigate]);"

  // Fetch all tours
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tours`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTours(res.data);
      } catch (err) {
        console.error('Failed to load tours:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this tour permanently?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTours(tours.filter(t => t._id !== id));
      alert('Tour deleted successfully!');
    } catch (err) {
      alert('Error deleting tour');
    }
  };

  if (loading) {
    return <div className="loading">Loading Dashboard...</div>;
  }

  return (
    <div className="admin-container">
      {/* HEADER */}
      <div className="admin-header">
        <h1>Prince (ADMIN) Dashboard</h1>
        <p>Welcome back, <strong>{user.name || 'Admin'}</strong> — You control everything</p>
      </div>

      {/* QUICK ACTION BUTTONS */}
      <div className="dashboard-actions">
        <button className="btn-primary" onClick={() => navigate('/admin/create-tour')}>
          + Add New Tour
        </button>

        <button className="btn-bookings" onClick={() => navigate('/admin/bookings')}>
          All Bookings
        </button>

        <button className="btn-users" onClick={() => navigate('/admin/users')}>
          Manage Users
        </button>
      </div>

      {/* TOURS TABLE */}
      <div className="section">
        <h2 className="section-title">All Tours ({tours.length})</h2>

        {tours.length === 0 ? (
          <div className="empty-state">
            <p>No tours yet. Click "Add New Tour" to create your first one!</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="tours-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Destination</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tours.map(tour => (
                  <tr key={tour._id}>
                    <td>
                      <img
                        src={tour.images?.[0] || tour.imageCover || '/assets/Tiger.png'}
                        alt={tour.title}
                        className="tour-thumb"
                        onError={(e) => e.target.src = '/assets/Tiger.png'}
                      />
                    </td>
                    <td className="tour-title">{tour.title}</td>
                    <td>{tour.destination || tour.location || '—'}</td>
                    <td className="price">₹{(tour.price || 0).toLocaleString()}</td>
                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => navigate(`/admin/edit-tour/${tour._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(tour._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}