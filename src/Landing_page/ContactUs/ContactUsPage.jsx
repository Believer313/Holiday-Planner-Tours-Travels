import React from 'react';
import ContactBanner from './ContactBanner';
import Contact from './Contact'; // Updated to match the renamed file
import ContactMap from './ContactMap';
import './Contact.css'; 

function ContactUsPage() {
  return (
    <div>
      <ContactBanner />
      <Contact />
      <ContactMap />
    </div>
  );
}

export default ContactUsPage;