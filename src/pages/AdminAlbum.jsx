import React, { useState, useEffect } from "react";
import AdminBackButton from "./AdminBackButton";
import "./AdminGallery.css"; // Import the separate CSS file

function AdminAlbum() {
  const [sections, setSections] = useState([
    {
      id: "all",
      label: "All Photos",
    },
    {
      id: "sundarbans",
      label: "Sundarbans",
    },
    {
      id: "purulia",
      label: "Purulia",
    },
    {
      id: "darjeeling",
      label: "Darjeeling",
    },
    {
      id: "travelers",
      label: "Our Travelers",
    },
  ]);

  const [images, setImages] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightbox, setLightbox] = useState(null);
  const [showAddPhoto, setShowAddPhoto] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: "",
    location: "",
    category: "sundarbans",
    file: null,
    preview: null
  });
  const [newSection, setNewSection] = useState({
    id: "",
    label: ""
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  // Load data from localStorage
  useEffect(() => {
    const savedSections = localStorage.getItem("admin_sections");
    const savedImages = localStorage.getItem("admin_images");
    
    if (savedSections) {
      setSections(JSON.parse(savedSections));
    }
    
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    } else {
      const defaultImages = [
        {
          id: Date.now() + 1,
          src: "/assets/touristteamsunder.jpg",
          title: "Sundarban Tour Group",
          location: "Sundarbans, West Bengal",
          category: "travelers",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 2,
          src: "/assets/sunder island.jpg",
          title: "Sundarban Island",
          location: "Sundarbans, West Bengal",
          category: "sundarbans",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 3,
          src: "/assets/noukajatra.jpg",
          title: "Nouka Jatra — Boat Safari",
          location: "Sundarbans, West Bengal",
          category: "sundarbans",
          dateAdded: new Date().toISOString()
        },
        {
          id: Date.now() + 4,
          src: "/assets/purulia.jpg",
          title: "Purulia Hills",
          location: "Purulia, West Bengal",
          category: "purulia",
          dateAdded: new Date().toISOString()
        }
      ];
      setImages(defaultImages);
      localStorage.setItem("admin_images", JSON.stringify(defaultImages));
    }
  }, []);

  useEffect(() => {
    if (sections.length > 0) {
      localStorage.setItem("admin_sections", JSON.stringify(sections));
    }
  }, [sections]);

  useEffect(() => {
    if (images.length > 0) {
      localStorage.setItem("admin_images", JSON.stringify(images));
    }
  }, [images]);

  const filtered = activeFilter === "all"
    ? images
    : images.filter((img) => img.category === activeFilter);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setMessage({ text: "Please select a valid image file", type: "error" });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ text: "Image size should be less than 5MB", type: "error" });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto({ ...newPhoto, file: reader.result, preview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = () => {
    if (!newPhoto.title.trim()) {
      setMessage({ text: "Please enter a title", type: "error" });
      return;
    }
    if (!newPhoto.location.trim()) {
      setMessage({ text: "Please enter a location", type: "error" });
      return;
    }
    if (!newPhoto.file) {
      setMessage({ text: "Please select an image", type: "error" });
      return;
    }

    const newImageObj = {
      id: Date.now(),
      src: newPhoto.file,
      title: newPhoto.title.trim(),
      location: newPhoto.location.trim(),
      category: newPhoto.category,
      dateAdded: new Date().toISOString()
    };
    
    setImages([newImageObj, ...images]);
    setNewPhoto({
      title: "",
      location: "",
      category: sections.find(s => s.id !== "all")?.id || "sundarbans",
      file: null,
      preview: null
    });
    setShowAddPhoto(false);
    setMessage({ text: "Photo added successfully!", type: "success" });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleAddSection = () => {
    if (!newSection.label.trim()) {
      setMessage({ text: "Please enter a section name", type: "error" });
      return;
    }
    
    const sectionId = newSection.label.toLowerCase().replace(/\s+/g, '');
    if (sections.some(s => s.id === sectionId)) {
      setMessage({ text: "Section already exists!", type: "error" });
      return;
    }
    
    const newSectionObj = {
      id: sectionId,
      label: newSection.label.trim()
    };
    
    const newSections = [...sections];
    newSections.splice(1, 0, newSectionObj);
    setSections(newSections);
    setNewSection({ id: "", label: "" });
    setShowAddSection(false);
    setMessage({ text: "New section created!", type: "success" });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleDeletePhoto = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this photo?")) {
      setImages(images.filter(img => img.id !== id));
      setMessage({ text: "Photo deleted!", type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  const handleEditPhoto = (image, e) => {
    e.stopPropagation();
    const newTitle = prompt("Edit title:", image.title);
    if (newTitle && newTitle.trim()) {
      const newLocation = prompt("Edit location:", image.location);
      if (newLocation && newLocation.trim()) {
        const categoryOptions = sections.filter(s => s.id !== "all").map(s => s.id).join(", ");
        const newCategory = prompt(`Edit category (${categoryOptions}):`, image.category);
        if (newCategory && sections.some(s => s.id === newCategory.toLowerCase())) {
          setImages(images.map(img => 
            img.id === image.id 
              ? { ...img, title: newTitle.trim(), location: newLocation.trim(), category: newCategory.toLowerCase() }
              : img
          ));
          setMessage({ text: "Photo updated!", type: "success" });
          setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        } else {
          setMessage({ text: "Invalid category", type: "error" });
        }
      }
    }
  };

  const handleDeleteSection = (sectionId, e) => {
    e.stopPropagation();
    if (sectionId === "all") return;
    
    const sectionName = sections.find(s => s.id === sectionId)?.label;
    if (window.confirm(`Delete "${sectionName}" section? All photos in this section will be deleted too.`)) {
      setImages(images.filter(img => img.category !== sectionId));
      setSections(sections.filter(s => s.id !== sectionId));
      if (activeFilter === sectionId) {
        setActiveFilter("all");
      }
      setMessage({ text: `"${sectionName}" section removed`, type: "success" });
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  return (
    <section className="gallery-section">
      {/* Header */}
      <div className="gallery-header">
        <span className="gallery-tag">Admin Dashboard</span>
        <h1 className="gallery-title">Manage Gallery</h1>
        <p className="gallery-subtitle">
          Add photos, create new sections, and manage your gallery content
        </p>
      </div>

      {/* Admin Action Buttons */}
      <div className="admin-actions">
        <button className="admin-add-photo-btn" onClick={() => setShowAddPhoto(true)}>
          + Add New Photo
        </button>
        <button className="admin-add-section-btn" onClick={() => setShowAddSection(true)}>
          + Create New Section
        </button>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`admin-message ${message.type}`}>
          {message.text}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="gallery-filters">
        {sections.map((sec) => (
          <div key={sec.id} className="filter-tab-wrapper">
            <button
              className={`gallery-filter-btn ${activeFilter === sec.id ? "active" : ""}`}
              onClick={() => setActiveFilter(sec.id)}
            >
              {sec.label}
              {sec.id !== "all" && (
                <span className="category-count">
                  ({images.filter(img => img.category === sec.id).length})
                </span>
              )}
            </button>
            {sec.id !== "all" && (
              <button
                className="filter-delete-btn"
                onClick={(e) => handleDeleteSection(sec.id, e)}
                title={`Delete ${sec.label} section`}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Photo Count */}
      <div className="gallery-count">
        Showing {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
        {activeFilter !== "all" ? ` in ${sections.find(s => s.id === activeFilter)?.label}` : ""}
      </div>

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {filtered.map((img) => (
          <div
            className="gallery-card"
            key={img.id}
            onClick={() => setLightbox(img)}
          >
            <div className="gallery-image-wrapper">
              <img src={img.src} alt={img.title} loading="lazy" />
              <div className="gallery-overlay">
                <div className="gallery-caption">
                  <span className="gallery-caption-title">{img.title}</span>
                  <span className="gallery-caption-location">📍 {img.location}</span>
                </div>
                <div className="admin-card-actions">
                  <button
                    className="admin-action-icon edit"
                    onClick={(e) => handleEditPhoto(img, e)}
                    title="Edit"
                  >
                    ✎
                  </button>
                  <button
                    className="admin-action-icon delete"
                    onClick={(e) => handleDeletePhoto(img.id, e)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="gallery-empty">
          <p>No photos in this section yet. Click "Add New Photo" to get started!</p>
        </div>
      )}

      {/* Add Photo Modal */}
      {showAddPhoto && (
        <div className="admin-modal-overlay" onClick={() => setShowAddPhoto(false)}>
          <div className="admin-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Add New Photo</h3>
              <button className="admin-modal-close" onClick={() => setShowAddPhoto(false)}>✕</button>
            </div>
            
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Title *</label>
                <input
                  type="text"
                  placeholder="Enter photo title"
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                />
              </div>
              
              <div className="admin-form-group">
                <label>Location *</label>
                <input
                  type="text"
                  placeholder="Enter location"
                  value={newPhoto.location}
                  onChange={(e) => setNewPhoto({ ...newPhoto, location: e.target.value })}
                />
              </div>
              
              <div className="admin-form-group">
                <label>Category *</label>
                <select
                  value={newPhoto.category}
                  onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                >
                  {sections.filter(s => s.id !== "all").map(section => (
                    <option key={section.id} value={section.id}>{section.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="admin-form-group">
                <label>Image *</label>
                <div 
                  className="admin-file-upload"
                  onClick={() => document.getElementById("adminFileInput").click()}
                >
                  {newPhoto.preview ? (
                    <img src={newPhoto.preview} alt="Preview" className="admin-preview-img" />
                  ) : (
                    <>
                      <span className="admin-file-upload-icon">📸</span>
                      <p>Click to upload image</p>
                      <small>JPG, PNG, WEBP (Max 5MB)</small>
                    </>
                  )}
                  <input
                    id="adminFileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
            
            <div className="admin-modal-footer">
              <button className="admin-btn-cancel" onClick={() => setShowAddPhoto(false)}>
                Cancel
              </button>
              <button className="admin-btn-submit" onClick={handleAddPhoto}>
                Add Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Section Modal */}
      {showAddSection && (
        <div className="admin-modal-overlay" onClick={() => setShowAddSection(false)}>
          <div className="admin-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>Create New Section</h3>
              <button className="admin-modal-close" onClick={() => setShowAddSection(false)}>✕</button>
            </div>
            
            <div className="admin-modal-body">
              <div className="admin-form-group">
                <label>Section Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Goa, Kerala, Rajasthan"
                  value={newSection.label}
                  onChange={(e) => setNewSection({ ...newSection, label: e.target.value })}
                />
                <small className="admin-section-helper">
                  This will create a new filter tab in your gallery
                </small>
              </div>
            </div>
            
            <div className="admin-modal-footer">
              <button className="admin-btn-cancel" onClick={() => setShowAddSection(false)}>
                Cancel
              </button>
              <button className="admin-btn-submit admin-btn-submit-warning" onClick={handleAddSection}>
                Create Section
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
          <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-lightbox-close" onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.src} alt={lightbox.title} />
            <div className="gallery-lightbox-info">
              <span className="gallery-lightbox-title">{lightbox.title}</span>
              <span className="gallery-lightbox-location">📍 {lightbox.location}</span>
            </div>
          </div>
        </div>
      )}

      {/* Coming Soon Banner (Admin Version) */}
      <div className="gallery-coming-soon">
        <div className="gallery-coming-soon-content">
          <span className="gallery-coming-soon-icon">🛠️</span>
          <div>
            <h3>Admin Controls</h3>
            <p>Click "Create New Section" to add any destination you want. All photos and sections are saved automatically.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="gallery-cta">
        <p>View your gallery live</p>
        <a href="/gallery" className="gallery-cta-btn">Go to Gallery Page →</a>
        <a href="https://wa.me/919907740169" target="_blank" rel="noopener noreferrer" className="gallery-cta-whatsapp">
          <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
            <path d="M16.003 2.667C8.636 2.667 2.667 8.636 2.667 16c0 2.338.638 4.625 1.848 6.625L2.667 29.333l6.885-1.807A13.285 13.285 0 0 0 16.003 29.333C23.37 29.333 29.333 23.364 29.333 16S23.37 2.667 16.003 2.667zm0 24.267a11.01 11.01 0 0 1-5.616-1.539l-.403-.24-4.086 1.073 1.09-3.98-.263-.41A10.974 10.974 0 0 1 5.04 16c0-6.044 4.919-10.96 10.963-10.96S26.96 9.956 26.96 16s-4.913 10.933-10.957 10.933zm6.01-8.2c-.33-.165-1.951-.963-2.254-1.073-.303-.11-.523-.165-.743.165-.22.33-.853 1.073-1.046 1.293-.193.22-.385.248-.715.083-.33-.165-1.394-.514-2.655-1.638-.981-.875-1.643-1.956-1.835-2.286-.193-.33-.021-.508.145-.673.15-.148.33-.385.495-.578.165-.193.22-.33.33-.55.11-.22.055-.413-.028-.578-.083-.165-.743-1.793-1.018-2.454-.268-.644-.54-.557-.743-.567l-.633-.011c-.22 0-.578.083-.88.413-.303.33-1.155 1.128-1.155 2.751s1.183 3.191 1.348 3.411c.165.22 2.328 3.556 5.643 4.988.789.34 1.404.543 1.884.695.791.252 1.511.216 2.08.131.635-.095 1.951-.797 2.226-1.567.275-.77.275-1.43.193-1.567-.083-.138-.303-.22-.633-.385z" />
          </svg>
          WhatsApp Us
        </a>
      </div>

    </section>
  );
}

export default AdminAlbum;