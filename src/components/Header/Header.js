import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaKey, 
  FaHandshake, 
  FaEnvelope, 
  FaStar, 
  FaInfoCircle,
  FaNewspaper,
  FaUsers // Added team icon
} from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <NavLink to="/">
          <h1>HomeHopper</h1>
          <p>Discover, Rent, Live</p>
        </NavLink>
      </div>
      <nav className="nav-links">
        <NavLink to="/rent-login"><FaKey /> Rent</NavLink>
        <NavLink to="/sell-login"><FaHandshake /> Sell</NavLink>
        <NavLink to="/contact"><FaEnvelope /> Contact</NavLink>
        <NavLink to="/reviews"><FaStar /> Reviews</NavLink>
        <NavLink to="/about" end><FaInfoCircle /> About</NavLink>
        <NavLink to="/about/team"><FaUsers /> Team</NavLink> {/* Added icon here */}
        <NavLink to="/about/press"><FaNewspaper /> Press</NavLink>
      </nav>
    </header>
  );
};

export default Header;