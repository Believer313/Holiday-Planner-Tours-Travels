import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTours: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Protect route — only admin
  useEffect(() => {
    if (user.role !== 'admin') {
      alert('Access Denied. Only Admin can enter.');
      navigate('/');
    }
  }, [user, navigate]);

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch tours
        const toursRes = await axios.get(`${import.meta.env.VITE_API_URL}/tours`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTours(toursRes.data);
        
        // Fetch bookings
        const bookingsRes = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(bookingsRes.data);
        
        // Calculate stats
        const totalRevenue = bookingsRes.data
          .filter(b => b.status === 'confirmed')
          .reduce((sum, b) => sum + (b.totalPrice || 0), 0);
        
        setStats({
          totalTours: toursRes.data.length,
          totalBookings: bookingsRes.data.length,
          totalUsers: [...new Set(bookingsRes.data.map(b => b.user?._id))].length,
          totalRevenue: totalRevenue
        });
      } catch (err) {
        console.error('Failed to load data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this tour permanently?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTours(tours.filter(t => t._id !== id));
      setStats({ ...stats, totalTours: stats.totalTours - 1 });
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
        <h1>Admin Dashboard</h1>
        <p>Welcome back, <strong>{user.name || 'Admin'}</strong> — You control everything</p>
      </div>

      {/* STATS CARDS */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>{stats.totalTours}</h3>
            <p>Total Tours</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>{stats.totalBookings}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Happy Travelers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>₹{stats.totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      {/* QUICK ACTION BUTTONS */}
      <div className="dashboard-actions">
        <button className="btn-primary" onClick={() => navigate('/admin/create-tour')}>
          ✨ + Add New Tour
        </button>
        <button className="btn-bookings" onClick={() => navigate('/admin/bookings')}>
          📋 All Bookings
        </button>
        <button className="btn-users" onClick={() => navigate('/admin/users')}>
          👥 Manage Users
        </button>
        <button className="btn-gallery" onClick={() => navigate('/admin/gallery')}>
          🖼️ Manage Gallery
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
                  <th>Duration</th>
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
                    <td>{tour.duration || '—'}</td>
                    <td className="price">₹{(tour.price || 0).toLocaleString()}</td>
                    <td className="actions">
                      <button
                        className="btn-edit"
                        onClick={() => navigate(`/admin/edit-tour/${tour._id}`)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(tour._id)}
                      >
                        🗑️ Delete
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
