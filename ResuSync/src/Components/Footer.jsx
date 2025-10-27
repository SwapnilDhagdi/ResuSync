import React from 'react';
import '../css/Footer.css'; // Import the CSS file

const Footer = () => {
  // Get the current year dynamically for the copyright notice
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        
       
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/services">Services</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>

        <div className="footer-info">
          <p>&copy; {currentYear} My Awesome App. All rights reserved.</p>
          <p>Built with React.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;