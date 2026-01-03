// src/pages/CreateTour.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateTour.css';

export default function CreateTour() {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    price: '',
    durationDays: '',
    shortDescription: '',
    description: ''
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    images.forEach(file => data.append('images', file));

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/tours`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Tour created successfully!');
      navigate('/admin');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-tour-container">
      <div className="create-tour-card">
        <h1>Create New Tour</h1>
        <form onSubmit={handleSubmit}>
          <input placeholder="Tour Title" required onChange={e => setFormData({...formData, title: e.target.value})} />
          <input placeholder="Destination (e.g. Kerala)" required onChange={e => setFormData({...formData, destination: e.target.value})} />
          <input type="number" placeholder="Price (₹)" required onChange={e => setFormData({...formData, price: e.target.value})} />
          <input placeholder="Duration (e.g. 7 days)" onChange={e => setFormData({...formData, durationDays: e.target.value})} />
          <textarea placeholder="Short Description" onChange={e => setFormData({...formData, shortDescription: e.target.value})} rows="3" />
          <textarea placeholder="Full Description" required onChange={e => setFormData({...formData, description: e.target.value})} rows="6" />

          <input type="file" multiple accept="image/*" onChange={e => setImages(Array.from(e.target.files))} className="file-input" />

          <button type="submit" disabled={loading} className="btn-create">
            {loading ? 'Creating Tour...' : 'Create Tour'}
          </button>
        </form>
        <button onClick={() => navigate('/admin')} className="btn-back">
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}