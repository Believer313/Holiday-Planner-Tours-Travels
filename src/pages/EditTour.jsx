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
    experience: '',
    shortDescription: '',
    description: '',
    highlights: '',
    includes: '',
    excludes: '',
    itinerary: '',
    imageCover: ''
  });
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  // Helper function to format arrays for textareas
  const formatArray = (arr) => {
    if (!arr) return '';
    if (Array.isArray(arr)) return arr.join('\n');
    return arr;
  };

  // Helper function to format itinerary for textarea
  const formatItinerary = (itinerary) => {
    if (!itinerary) return '';
    if (Array.isArray(itinerary)) {
      return itinerary.map(day => `${day.day}\n${day.title}\n${day.desc}`).join('\n\n');
    }
    return itinerary;
  };

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
          experience: tour.experience || '',
          shortDescription: tour.shortDescription || '',
          description: tour.description || '',
          highlights: formatArray(tour.highlights),
          includes: formatArray(tour.includes),
          excludes: formatArray(tour.excludes),
          itinerary: formatItinerary(tour.itinerary),
          imageCover: tour.imageCover || ''
        });
        
        setExistingImages(tour.images || []);
      } catch (err) {
        console.error('Error fetching tour:', err);
        alert('Failed to load tour: ' + (err.response?.data?.message || err.message));
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
    
    // Append all form fields
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });
    
    // Append new images
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
      console.error('Error updating tour:', err);
      alert('Error: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="create-tour-page">
        <div className="tour-loading">
          <div className="tour-loading-spinner"></div>
          <div className="tour-loading-text">Loading tour details...</div>
        </div>
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
                  <label className="form-label">Tour Title *</label>
                  <input 
                    type="text" 
                    name="title"
                    className="form-input" 
                    required
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Destination *</label>
                    <input 
                      type="text" 
                      name="destination"
                      className="form-input" 
                      required
                      value={formData.destination}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Price (₹) *</label>
                    <input 
                      type="number" 
                      name="price"
                      className="form-input" 
                      required
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Duration</label>
                    <input 
                      type="text" 
                      name="duration"
                      className="form-input"
                      placeholder="e.g., 8 Days / 7 Nights"
                      value={formData.duration}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Group Size</label>
                    <input 
                      type="text" 
                      name="groupSize"
                      className="form-input"
                      placeholder="e.g., Max 15 Travelers"
                      value={formData.groupSize}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Experience Level</label>
                  <select 
                    name="experience"
                    className="form-input"
                    value={formData.experience}
                    onChange={handleChange}
                  >
                    <option value="">Select Experience Level</option>
                    <option value="Premium">Premium</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Budget">Budget</option>
                    <option value="Family">Family Friendly</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="create-tour-section">
                <h2 className="create-tour-section-title">
                  <span className="gold-accent">Tour</span> Description
                </h2>
                <div className="form-group">
                  <label className="form-label">Short Description *</label>
                  <textarea 
                    name="shortDescription"
                    className="form-textarea" 
                    rows="3" 
                    required
                    value={formData.shortDescription}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Full Description *</label>
                  <textarea 
                    name="description"
                    className="form-textarea" 
                    rows="6" 
                    required
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Highlights & Inclusions */}
              <div className="create-tour-section">
                <h2 className="create-tour-section-title">
                  <span className="gold-accent">Tour</span> Details
                </h2>
                <div className="form-group">
                  <label className="form-label">Tour Highlights</label>
                  <textarea 
                    name="highlights"
                    className="form-textarea" 
                    rows="5"
                    placeholder="Enter each highlight on a new line"
                    value={formData.highlights}
                    onChange={handleChange}
                  />
                  <span className="form-hint">Enter each highlight on a new line</span>
                </div>
                <div className="form-group">
                  <label className="form-label">What's Included</label>
                  <textarea 
                    name="includes"
                    className="form-textarea" 
                    rows="5"
                    placeholder="Enter each inclusion on a new line"
                    value={formData.includes}
                    onChange={handleChange}
                  />
                  <span className="form-hint">Enter each inclusion on a new line</span>
                </div>
                <div className="form-group">
                  <label className="form-label">What's Excluded</label>
                  <textarea 
                    name="excludes"
                    className="form-textarea" 
                    rows="4"
                    placeholder="Enter each exclusion on a new line"
                    value={formData.excludes}
                    onChange={handleChange}
                  />
                  <span className="form-hint">Enter each exclusion on a new line</span>
                </div>
                <div className="form-group">
                  <label className="form-label">Day by Day Itinerary</label>
                  <textarea 
                    name="itinerary"
                    className="form-textarea" 
                    rows="10"
                    placeholder="Day 1: Arrival & Orientation&#10;Description of day 1 activities...&#10;&#10;Day 2: Sightseeing&#10;Description of day 2 activities..."
                    value={formData.itinerary}
                    onChange={handleChange}
                  />
                  <span className="form-hint">Format: Day, Title, Description (separate each day with a blank line)</span>
                </div>
              </div>

            </div>

            {/* Right Sidebar */}
            <div className="create-tour-sidebar">

              {/* Cover Image URL */}
              <div className="create-tour-upload-card">
                <h3 className="upload-card-title">Cover Image URL</h3>
                <p className="upload-card-desc">Optional: Enter image URL for cover photo</p>
                <input 
                  type="text"
                  name="imageCover"
                  className="form-input"
                  placeholder="https://example.com/cover-image.jpg"
                  value={formData.imageCover}
                  onChange={handleChange}
                />
              </div>

              {/* Existing Images */}
              {existingImages.length > 0 && (
                <div className="create-tour-upload-card">
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
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={handleImageChange} 
                    className="hidden-input"
                  />
                  <div className="upload-content">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span className="upload-text">Click to upload new images</span>
                    <span className="upload-hint">PNG, JPG up to 5MB each</span>
                  </div>
                </label>
                {imagePreview.length > 0 && (
                  <div className="image-preview-grid">
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