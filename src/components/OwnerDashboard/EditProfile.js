import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Correct import statement
import { FaUser, FaEnvelope, FaPhone, FaLock, FaSave } from 'react-icons/fa';
import './OwnerDashboard.css';

function EditProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: location.state.profile.name || '',
    phoneNumber: location.state.profile.phone || '', // Adjusted to match expected field name
    password: '' // Initialize password as an empty string
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('ownerToken'); // Ensure the key matches the one used in SellLogin.js
      if (!token) {
        throw new Error('JWT token not found');
      }

      const decodedToken = jwtDecode(token); // Decode the JWT token
      const ownerId = decodedToken.ownerId; // Extract ownerId from the decoded token

      if (!ownerId) {
        throw new Error('Owner ID not found in token');
      }

      const payload = { ownerId, ...profile };
      console.log('Profile data being sent:', payload); // Debugging log

      const response = await axios.put('http://localhost:5162/api/Owner/update', payload, { // Ensure the URL is correct
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Server response:', response); // Debugging log

      if (response.status === 200) {
        alert('Profile updated successfully!');
        navigate('/owner/profile'); // Redirect to profile page after update
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message);
    }
  };

  return (
    <div className="edit-profile-page">
      <h2>Edit Profile</h2>
      
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><FaUser /> Full Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label><FaPhone /> Phone</label>
          <input
            type="tel"
            name="phoneNumber" // Adjusted to match expected field name
            value={profile.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label><FaLock /> New Password</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current"
          />
        </div>

        <button type="submit" className="btn-save">
          <FaSave /> Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
