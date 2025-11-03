import React from 'react';
import '../css/Footer.css'; 

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        
       
        <div className="footer-links">
          <a href="/about">About Us</a>      
          <a href="/contact">Contact</a>
        </div>

        <div className="footer-info">
          <p>&copy; {currentYear} ResuSync. All rights reserved.</p>
          <p>Swapnil Dhagdi</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;