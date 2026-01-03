import React from "react";
import { useState } from "react";

function Contact ()  {
  const [user, setUser] = useState({Name:'', Email:'', Message:''});
  const handleinputchange = (e) => 
     {const {name, value} = e.target; 
  setUser((prev) => ({...prev, [name]: value}));
};

const handleSubmit = (e) => { 
  e.preventDefault();
  console.log(user);
}
  
  
  return (
    <section className="contact-container">
      <div className="contact-grid">
        
        {/* Contact Details */}
        <div className="contact-details">
          <h2>Contact Us</h2>
          <p>Have any questions? Feel free to reach out to us.</p>

          <div className="contact-info">
            <p><strong>📍 Address:</strong>VILL-Prosadpur,P.O-Chandanpur,P.S-Haripal,Dist-Hooghly,PIN-712223</p>
            <p><strong>📞 Phone:</strong> +91 9907740169</p>
            <p><strong>📧 Email:</strong> nazmussayadatmondal@gmail.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input type="text" name="Name" placeholder="Enter your Name" value={user.Name} onChange={handleinputchange} />
            </div>

            <div>
              <label>Email</label>
              <input type="email" name="Email" placeholder="Enter your email" value={user.Email} onChange={handleinputchange} />
            </div>

            <div>
              <label>Message</label>
              <input rows="4" name="Message" placeholder="Your message" value={user.Message} onChange={handleinputchange}/>
        
            </div>

            <button type="submit">Send Message</button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
