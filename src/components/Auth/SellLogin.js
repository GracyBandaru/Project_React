import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaHandshake } from 'react-icons/fa';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';// Add this import
import './Auth.css';

const SellLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5162/api/Owner/login', {
        email,
        password
      });

      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem('ownerToken', response.data.token);
        
        // Decode and log the token for inspection
        const decodedToken = jwtDecode(response.data.token);
        console.log('Decoded JWT Token:', decodedToken);
        
        // Redirect to owner dashboard
        navigate('/owner');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-page" style={{ backgroundImage: "url('/assets/auth-bg.jpg')" }}>
      <div className="auth-container">
        <div className="auth-header">
          <FaHandshake className="auth-icon" />
          <h2>Landlord Portal</h2>
          <p>Manage your properties</p>
        </div>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser />
            <input 
              type="email" 
              placeholder="Email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FaLock />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <div className="auth-footer">
          <p>Not registered? <Link to="/sell-register">List your property</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SellLogin;