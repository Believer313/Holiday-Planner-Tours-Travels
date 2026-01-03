import React from "react";

const ContactMap = () => {
  return (
    <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
      <iframe
        title="Client Office Location"
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d117762.73412702013!2d87.99690013511874!3d22.725065426163223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sAddress%3AVILL-Prosadpur%2CP.O-Chandanpur%2CP.S-Haripal%2CDist-Hooghly%2CPIN-712223!5e0!3m2!1sen!2sin!4v1756656108553!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default ContactMap;