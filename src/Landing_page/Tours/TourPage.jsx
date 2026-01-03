import React from 'react'
import TourBanner from './TourBanner';
import Tour from './Tour';
import TourDetails from './TourDetails';
import './Tour.css';


function TourPage() {
  return (
    <div>
      <TourBanner/>
      <Tour/>
    </div>
  )
}

export default TourPage
