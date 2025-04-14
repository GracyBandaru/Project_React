import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaPhone, FaHandshake } from 'react-icons/fa';
import axios from 'axios';
import './Auth.css';

const SellRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contactDetails: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5162/api/Owner/register', formData);

      if (response.data) {
        setSuccess(true);
        setTimeout(() => navigate('/sell-login'), 2000);
      }
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-page" style={{ backgroundImage: "url('/assets/auth-bg.jpg')" }}>
      <div className="auth-container">
        <div className="auth-header">
          <FaHandshake className="auth-icon" />
          <h2>Register as Landlord</h2>
          <p>List and manage your properties</p>
        </div>
        
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">Registration successful! Redirecting to login...</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser />
            <input 
              type="text" 
              name="name"
              placeholder="Full Name" 
              required 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <FaEnvelope />
            <input 
              type="email" 
              name="email"
              placeholder="Email" 
              required 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <FaLock />
            <input 
              type="password" 
              name="password"
              placeholder="Password" 
              required 
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <FaPhone />
            <input 
              type="tel" 
              name="contactDetails"
              placeholder="Phone Number" 
              required 
              value={formData.contactDetails}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="auth-btn">Register</button>
        </form>
        <div className="auth-footer">
          <p>Already registered? <Link to="/sell-login">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SellRegister;