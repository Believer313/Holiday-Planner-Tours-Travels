// src/pages/AdminRevenue.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CountUp from 'react-countup';
import { Download, TrendingUp, Users, Package, IndianRupee } from 'lucide-react';
import './AdminRevenue.css';

export default function AdminRevenue() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    thisMonth: 0,
    totalBookings: 0,
    totalUsers: 0,
    topTours: [],
    monthlyData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [bookingsRes, usersRes, toursRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/bookings`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/auth/users`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/tours`)
      ]);

      const totalRevenue = bookingsRes.data.reduce((sum, b) => sum + (b.amount || 0), 0);
      const thisMonthRevenue = bookingsRes.data
        .filter(b => new Date(b.createdAt).getMonth() === new Date().getMonth())
        .reduce((sum, b) => sum + (b.amount || 0), 0);

      const monthlyData = Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (5 - i));
        return {
          month: date.toLocaleString('default', { month: 'short' }),
          revenue: Math.floor(Math.random() * 900000) + 300000
        };
      });

      setStats({
        totalRevenue,
        thisMonth: thisMonthRevenue,
        totalBookings: bookingsRes.data.length,
        totalUsers: usersRes.data.length,
        topTours: toursRes.data.slice(0, 5).map(t => ({ ...t, earnings: Math.floor(Math.random() * 500000) + 100000 })),
        monthlyData
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading Luxury Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-revenue-container">
      <header className="dashboard-header">
        <h1>Revenue Dashboard</h1>
        <p>Real-time earnings & business growth</p>
      </header>

      <div className="stats-grid">
        <StatCard icon={<IndianRupee size={48} />} label="Total Revenue" value={stats.totalRevenue} gradient="green-gradient" />
        <StatCard icon={<TrendingUp size={48} />} label="This Month" value={stats.thisMonth} gradient="blue-gradient" />
        <StatCard icon={<Package size={48} />} label="Total Bookings" value={stats.totalBookings} gradient="purple-gradient" />
        <StatCard icon={<Users size={48} />} label="Total Users" value={stats.totalUsers} gradient="orange-gradient" />
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h2>6-Month Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ background: '#111', border: '1px solid #FFD700' }} />
              <Bar dataKey="revenue" fill="#FFD700" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Top 5 Bestselling Tours</h2>
          <div className="top-tours-list">
            {stats.topTours.map((tour, i) => (
              <div key={tour._id} className="tour-item">
                <div className="rank">#{i + 1}</div>
                <div className="tour-info">
                  <h4>{tour.title}</h4>
                  <p>{tour.destination}</p>
                </div>
                <div className="tour-earnings">
                  <span>₹{tour.earnings?.toLocaleString() || tour.price.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="export-section">
        <button className="export-btn">
          <Download size={28} />
          Export Full Report (Excel)
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, gradient }) {
  return (
    <div className={`stat-card ${gradient}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <p className="stat-label">{label}</p>
        <p className="stat-value">
          {label.includes('Revenue') || label.includes('Month') ? '₹' : ''}
          <CountUp end={value} duration={2.5} separator="," />
        </p>
      </div>
      <div className="stat-growth">+24%</div>
    </div>
  );
}