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

  useEffect(() => {
    if (user.role !== 'admin') {
      alert('Access Denied. Only Admin can enter.');
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const toursRes = await axios.get(`${import.meta.env.VITE_API_URL}/tours`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTours(toursRes.data);
        const bookingsRes = await axios.get(`${import.meta.env.VITE_API_URL}/bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const bookingsData = Array.isArray(bookingsRes.data) ? bookingsRes.data : bookingsRes.data.bookings || bookingsRes.data.data || [];
        setBookings(bookingsData);
        const totalRevenue = bookingsData
          .filter(b => b.status === 'confirmed')
          .reduce((sum, b) => sum + (b.totalPrice || 0), 0);
        setStats({
          totalTours: toursRes.data.length,
          totalBookings: bookingsData.length,
          totalUsers: [...new Set(bookingsData.map(b => b.user?._id).filter(Boolean))].length,
          totalRevenue
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
      setStats(prev => ({ ...prev, totalTours: prev.totalTours - 1 }));
      alert('Tour deleted successfully!');
    } catch (err) {
      alert('Error deleting tour');
    }
  };

  const handleLogout = () => {
    if (!window.confirm('Are you sure you want to logout?')) return;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) return <div className="loading">Loading Dashboard...</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-header-left">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, <strong>{user.name || 'Admin'}</strong> — You control everything</p>
        </div>
        <div className="admin-header-right">
          <div className="admin-badge">Admin</div>
          <button className="btn-logout" onClick={handleLogout}>
            🔓 Logout
          </button>
        </div>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">🗺️</div>
          <div className="stat-info">
            <h3>{stats.totalTours}</h3>
            <p>Total Tours</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{stats.totalBookings}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👨‍👩‍👧‍👦</div>
          <div className="stat-info">
            <h3>{stats.totalUsers || 0}</h3>
            <p>Happy Travelers</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💵</div>
          <div className="stat-info">
            <h3>₹{stats.totalRevenue.toLocaleString()}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

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

      <div className="section">
        <p className="section-title">All Tours ({tours.length})</p>
        <div className="table-container">
          {tours.length === 0 ? (
            <div className="empty-state">No tours found. Add your first tour!</div>
          ) : (
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
                        src={tour.images?.[0] || '/placeholder.jpg'}
                        alt={tour.title}
                        className="tour-thumb"
                      />
                    </td>
                    <td><span className="tour-title">{tour.title}</span></td>
                    <td>{tour.destination}</td>
                    <td>{tour.duration}</td>
                    <td><span className="price">₹{tour.price?.toLocaleString()}</span></td>
                    <td>
                      <div className="actions">
                        <button className="btn-edit" onClick={() => navigate(`/admin/edit-tour/${tour._id}`)}>
                          ✏️ Edit
                        </button>
                        <button className="btn-delete" onClick={() => handleDelete(tour._id)}>
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

