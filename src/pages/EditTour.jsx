import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './CreateTour.css';

export default function EditTour() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    price: '',
    duration: '',
    groupSize: '',
    shortDescription: '',
    description: '',
    highlights: '',
    includes: ''
  });
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Fetch existing tour data
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/tours/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const tour = res.data;
        setFormData({
          title: tour.title || '',
          destination: tour.destination || '',
          price: tour.price || '',
          duration: tour.duration || '',
          groupSize: tour.groupSize || '',
          shortDescription: tour.shortDescription || '',
          description: tour.description || '',
          highlights: Array.isArray(tour.highlights)
            ? tour.highlights.join('\n')
            : tour.highlights || '',
          includes: Array.isArray(tour.includes)
            ? tour.includes.join('\n')
            : tour.includes || '',
        });
        setExistingImages(tour.images || []);
      } catch (err) {
        alert('Failed to load tour: ' + (err.response?.data?.message || err.message));
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    images.forEach(file => data.append('images', file));

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_API_URL}/tours/${id}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Tour updated successfully!');
      navigate('/admin');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '100px', textAlign: 'center', fontFamily: 'Montserrat' }}>
        Loading tour...
      </div>
    );
  }

  return (
    <div className="create-tour-page">
      {/* Hero Section */}
      <section className="create-tour-hero">
        <div className="create-tour-hero-overlay"></div>
        <div className="create-tour-hero-content">
          <button className="create-tour-back" onClick={() => navigate('/admin')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Dashboard
          </button>
          <div className="create-tour-hero-info">
            <span className="create-tour-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Admin Panel
            </span>
            <h1 className="create-tour-title">Edit Tour</h1>
            <p className="create-tour-subtitle">Update the details of this travel experience</p>
          </div>
        </div>
      </section>

      {/* Main Form */}
      <div className="create-tour-container">
        <form onSubmit={handleSubmit} className="create-tour-form">
          <div className="create-tour-grid">
            {/* Left Column */}
            <div className="create-tour-main">

              {/* Basic Info */}
              <div className="create-tour-section">
                <h2 className="create-tour-section-title">
                  <span className="gold-accent">Basic</span> Information
                </h2>
                <div className="form-group">
                  <label className="form-label">Tour Title</label>
                  <input type="text" className="form-input" required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Destination</label>
                    <input type="text" className="form-input" required
                      value={formData.destination}
                      onChange={e => setFormData({...formData, destination: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Price (₹) — shown as "Starting from"</label>
                    <input type="number" className="form-input" required
                      placeholder="e.g., 4500 (will show as Starting from ₹4,500)"
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Duration</label>
                    <input type="text" className="form-input"
                      placeholder="e.g., 3 Days / 2 Nights"
                      value={formData.duration}
                      onChange={e => setFormData({...formData, duration: e.target.value})}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Group Size</label>
                    <input type="text" className="form-input"
                      placeholder="e.g., Max 12 Travelers"
                      value={formData.groupSize}
                      onChange={e => setFormData({...formData, groupSize: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="create-tour-section">
                <h2 className="create-tour-section-title">
                  <span className="gold-accent">Tour</span> Description
                </h2>
                <div className="form-group">
                  <label className="form-label">Short Description</label>
                  <textarea className="form-textarea" rows="3"
                    value={formData.shortDescription}
                    onChange={e => setFormData({...formData, shortDescription: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Full Description</label>
                  <textarea className="form-textarea" rows="6" required
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                  />
                </div>
              </div>

              {/* Highlights & Includes */}
              <div className="create-tour-section">
                <h2 className="create-tour-section-title">
                  <span className="gold-accent">Highlights</span> & Inclusions
                </h2>
                <div className="form-group">
                  <label className="form-label">Tour Highlights</label>
                  <textarea className="form-textarea" rows="5"
                    placeholder="Enter each highlight on a new line"
                    value={formData.highlights}
                    onChange={e => setFormData({...formData, highlights: e.target.value})}
                  />
                  <span className="form-hint">Enter each highlight on a new line</span>
                </div>
                <div className="form-group">
                  <label className="form-label">What's Included</label>
                  <textarea className="form-textarea" rows="5"
                    placeholder="Enter each inclusion on a new line"
                    value={formData.includes}
                    onChange={e => setFormData({...formData, includes: e.target.value})}
                  />
                  <span className="form-hint">Enter each inclusion on a new line</span>
                </div>
              </div>

            </div>

            {/* Right Sidebar */}
            <div className="create-tour-sidebar">

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="create-tour-upload-card" style={{marginBottom: '1.5rem'}}>
                  <h3 className="upload-card-title">Current Images</h3>
                  <div className="image-preview-grid">
                    {existingImages.map((src, index) => (
                      <div key={index} className="image-preview-item">
                        <img src={src} alt={`Tour ${index + 1}`} />
                        <span className="image-number">{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Upload New Images */}
              <div className="create-tour-upload-card">
                <h3 className="upload-card-title">Update Images</h3>
                <p className="upload-card-desc">Upload new photos to replace existing ones</p>
                <label className="image-upload-area">
                  <input type="file" multiple accept="image/*"
                    onChange={handleImageChange} className="hidden-input"
                  />
                  <div className="upload-content">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span className="upload-text">Click to upload new images</span>
                    <span className="upload-hint">PNG, JPG up to 10MB each</span>
                  </div>
                </label>
                {imagePreview.length > 0 && (
                  <div className="image-preview-grid" style={{marginTop: '1rem'}}>
                    {imagePreview.map((src, index) => (
                      <div key={index} className="image-preview-item">
                        <img src={src} alt={`Preview ${index + 1}`} />
                        <span className="image-number">{index + 1}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="create-tour-actions">
                <button type="submit" disabled={saving} className="btn-create-tour">
                  {saving ? (
                    <><span className="btn-spinner"></span> Saving...</>
                  ) : (
                    <><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                      <polyline points="17 21 17 13 7 13 7 21"/>
                      <polyline points="7 3 7 8 15 8"/>
                    </svg> Save Changes</>
                  )}
                </button>
                <button type="button" onClick={() => navigate('/admin')} className="btn-cancel">
                  Cancel
                </button>
              </div>

              {/* Support Card */}
              <div className="create-tour-support-card">
                <h4>Need Help?</h4>
                <p>Contact our support team for assistance.</p>
                <a href="tel:+919907740169" className="support-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/>
                  </svg>
                  +91 9907740169
                </a>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}