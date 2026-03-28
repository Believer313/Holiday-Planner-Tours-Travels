import React from 'react'
import Album from './Album'
import './Gallery.css'

function GalleryPage() {
  return (
    <div>
      {/* Hero Banner */}
      <div className="gallery-banner">
        <div className="gallery-banner-overlay">
          <span className="gallery-banner-tag">Our Memories</span>
          <h1>Tour Gallery</h1>
          <p>Real moments captured from real journeys across India</p>
        </div>
        <img src="/assets/Mountain_pointing.jpg" alt="Tour Gallery" className="gallery-banner-img" />
      </div>
      <Album />
    </div>
  )
}

export default GalleryPage