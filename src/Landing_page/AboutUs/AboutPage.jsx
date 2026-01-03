import React from 'react'
import Aboutheading from './Aboutheading';
import Banner from './Banner';
import About from './About';
import OurTeam from './OurTeam';
import Mission from './Mission';
import './AboutUs.css';

function AboutPage() {
  return (
    <div>
      <Banner />
      <Aboutheading />
      <About />
      <Mission />
      <OurTeam />
    </div>
  )
}

export default AboutPage
