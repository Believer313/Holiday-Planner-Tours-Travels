import React, { useState } from 'react';
import { useNavigate } } from 'react-router-dom';
import axios from 'axios';
import './CreateTour.css';

export default function CreateTour() {
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    setLoading(true);
    const data = new FormData();
    
    // Append all form fields
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });
    
    // Append images
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
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Admin Panel
            </span>
            <h1 className="create-tour-title">Create New Tour</h1>
            <p className="create-tour-subtitle">Design an unforgettable travel experience for your customers</p>
          </div>
        </div>
      </section>

      {/* Main Form Container */}
      <div className="create-tour-container">
        <form onSubmit={handleSubmit} className="create-tour-form">
          <div className="create-tour-grid">
            {/* Left Column - Main Details */}
            <div className="create-tour-main">
              {/* Basic Info Section */}
              <div className="create-tour-section">
                <h2 className="create-tour-section-title">
                  <span className="gold-accent">Basic</span> Information
                </h2>
                
                <div className="form-group">
                  <label className="form-label">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                      <line x1="4" y1="22" x2="4" y2="15"/>
                    </svg>
                    Tour Title *
                  </label>
                  <input 
                    type="text"
                    name="title"
                    className="form-input"
                    placeholder="e.g., Kashmir Paradise Tour"
                    required 
                    value={formData.title}
                    onChange={handleChange} 
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      Destination *
                    </label>
                    <input 
                      type="text"
                      name="destination"
                      className="form-input"
                      placeholder="e.g., Kashmir Valley"
                      required 
                      value={formData.destination}
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="23"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                      Price (₹) *
                    </label>
                    <input 
                      type="number"
                      name="price"
                      className="form-input"
                      placeholder="e.g., 24999"
                      required 
                      value={formData.price}
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                      Duration
                    </label>
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
                    <label className="form-label">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      Group Size
                    </label>
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
                  <label className="form-label">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    Experience Level
                  </label>
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

              {/* Descriptions Section */}
              <div className="create-tour-section">
                <h2 className="create-tour-section-title">
                  <span className="gold-accent">Tour</span> Description
                </h2>
                
                <div className="form-group">
                  <label className="form-label">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="17" y1="10" x2="3" y2="10"/>
                      <line x1="21" y1="6" x2="3" y2="6"/>
                      <line x1="21" y1="14" x2="3" y2="14"/>
                      <line x1="17" y1="18" x2="3" y2="18"/>
                    </svg>
                    Short Description *
                  </label>
                  <textarea 
                    name="shortDescription"
                    className="form-textarea"
                    placeholder="A brief, captivating summary that appears on tour cards (2-3 sentences)"
                    rows="3"
                    required
                    value={formData.shortDescription}
                    onChange={handleChange} 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/>
                      <line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                    Full Description *
                  </label>
                  <textarea 
                    name="description"
                    className="form-textarea"
                    placeholder="Detailed description of the tour experience, what makes it special, and what travelers can expect..."
                    rows="6"
                    required
                    value={formData.description}
                    onChange={handleChange} 
                  />
                </div>
              </div>

              {/* Highlights & Inclusions Section */}
              <div className="create-tour-section">
                <h2 className="create-tour-section-title">
                  <span className="gold-accent">Tour</span> Details
                </h2>
                
                <div className="form-group">
                  <label className="form-label">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    Tour Highlights
                  </label>
                  <textarea 
                    name="highlights"
                    className="form-textarea"
                    placeholder="Enter each highlight on a new line:&#10;• Private boat safari through mangroves&#10;• Expert naturalist guide&#10;• Sunrise photography sessions"
                    rows="5"
                    value={formData.highlights}
                    onChange={handleChange} 
                  />
                  <span className="form-hint">Enter each highlight on a new line</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    What's Included
                  </label>
                  <textarea 
                    name="includes"
                    className="form-textarea"
                    placeholder="Enter each inclusion on a new line:&#10;• Luxury accommodation&#10;• All meals included&#10;• Private transport"
                    rows="5"
                    value={formData.includes}
                    onChange={handleChange} 
                  />
                  <span className="form-hint">Enter each inclusion on a new line</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="21 4 8 17 3 12"/>
                    </svg>
                    What's Excluded
                  </label>
                  <textarea 
                    name="excludes"
                    className="form-textarea"
                    placeholder="Enter each exclusion on a new line:&#10;• Airfare/train fare&#10;• Personal expenses&#10;• Travel insurance"
                    rows="4"
                    value={formData.excludes}
                    onChange={handleChange} 
                  />
                  <span className="form-hint">Enter each exclusion on a new line</span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Day by Day Itinerary
                  </label>
                  <textarea 
                    name="itinerary"
                    className="form-textarea"
                    rows="10"
                    placeholder="Day 1: Arrival & Orientation&#10;Arrive at Srinagar Airport, transfer to houseboat. Welcome drink and evening Shikara ride on Dal Lake.&#10;&#10;Day 2: Srinagar Sightseeing&#10;Visit Mughal Gardens - Shalimar Bagh, Nishat Bagh, and Chashme Shahi. Explore Old City and local handicrafts.&#10;&#10;Day 3: Srinagar to Gulmarg&#10;Drive to Gulmarg, enjoy Gulmarg Gondola ride (Asia's highest cable car). Overnight stay in Gulmarg.&#10;&#10;Day 4: Gulmarg Exploration&#10;Free day for snow activities (winter) or golfing (summer). Visit St. Mary's Church.&#10;&#10;Day 5: Gulmarg to Pahalgam&#10;Drive via saffron fields and Avantipura Ruins. Evening walk along Lidder River.&#10;&#10;Day 6: Pahalgam Sightseeing&#10;Visit Betaab Valley, Aru Valley, and Chandanwari. Optional pony rides or river rafting.&#10;&#10;Day 7: Pahalgam to Srinagar&#10;Return to Srinagar, free time for shopping at Lal Chowk.&#10;&#10;Day 8: Departure&#10;Transfer to Srinagar Airport with beautiful memories."
                    value={formData.itinerary}
                    onChange={handleChange} 
                  />
                  <span className="form-hint">Format: Day, Title, Description (separate each day with a blank line)</span>
                </div>
              </div>
            </div>

            {/* Right Column - Images & Actions */}
            <div className="create-tour-sidebar">
              {/* Cover Image URL */}
              <div className="create-tour-upload-card">
                <h3 className="upload-card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  Cover Image URL
                </h3>
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

              {/* Gallery Images Upload */}
              <div className="create-tour-upload-card">
                <h3 className="upload-card-title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                  </svg>
                  Gallery Images
                </h3>
                <p className="upload-card-desc">Upload stunning photos to showcase your tour</p>
                
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
                    <span className="upload-text">Click to upload images</span>
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

              {/* Quick Tips Card */}
              <div className="create-tour-tips-card">
                <h4>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  Quick Tips
                </h4>
                <ul>
                  <li>Use high-quality images (min 1200px wide)</li>
                  <li>Write compelling, descriptive titles</li>
                  <li>Include all costs in the price</li>
                  <li>Be specific about what's included/excluded</li>
                  <li>Format itinerary with day, title, and description</li>
                  <li>Separate each day with a blank line</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="create-tour-actions">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="btn-create-tour"
                >
                  {loading ? (
                    <>
                      <span className="btn-spinner"></span>
                      Creating Tour...
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                      Create Tour
                    </>
                  )}
                </button>

                <button 
                  type="button"
                  onClick={() => navigate('/admin')} 
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>

              {/* Support Card */}
              <div className="create-tour-support-card">
                <h4>Need Help?</h4>
                <p>Contact our support team for assistance with creating tours.</p>
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