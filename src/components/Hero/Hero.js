import React from 'react';
import { FaSearch, FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt } from 'react-icons/fa';
import './Hero.css';
//import heroVideo from '../../public/assets/hero/bg-video.mp4'; // Adjust path based on your actual file location

const Hero = () => {
  return (
    <section className="hero">
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="bg-video"
      >
        <source src={process.env.PUBLIC_URL + '/assets/hero/bg-video.mp4'} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      
      {/* Hero Content */}
      <div className="hero-content">
        <h2>Find Your Perfect Rental Home</h2>
        <div className="search-container">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="City, Address, School, Agent, ZIP" 
              aria-label="Search for properties"
            />
            <button className="search-btn">Search</button>
          </div>
          <div className="filters">
            <select aria-label="Price range">
              <option>Any Price</option>
              <option>$500-$1000</option>
              <option>$1000-$2000</option>
            </select>
            <select aria-label="Bedrooms">
              <option>Any Beds</option>
              <option>1+ Bed</option>
              <option>2+ Beds</option>
            </select>
            <select aria-label="Property type">
              <option>Any Type</option>
              <option>Apartment</option>
              <option>House</option>
            </select>
          </div>
        </div>
        <div className="features">
          <div className="feature">
            <FaBed />
            <span>2+ Beds</span>
          </div>
          <div className="feature">
            <FaBath />
            <span>Private Bath</span>
          </div>
          <div className="feature">
            <FaRulerCombined />
            <span>800+ sqft</span>
          </div>
          <div className="feature">
            <FaMapMarkerAlt />
            <span>Prime Locations</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;