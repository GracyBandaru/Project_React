import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>HomeHopper</h3>
          <p>Discover your perfect home with our curated selection of rental properties across the country.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/rent-login">Rent a Home</a></li>
            <li><a href="/sell-login">List a Property</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} HomeHopper. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;