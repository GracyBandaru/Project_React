import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './OwnerDashboard.css';

function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    ownerId: '' // Add ownerId to the profile state
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the profile data when the component mounts
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('ownerToken'); // Ensure the key matches the one used in SellLogin.js
        if (!token) {
          throw new Error('JWT token not found');
        }

        const response = await axios.get('http://localhost:5162/api/owner', { // Ensure the URL is correct
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.data) {
          throw new Error('Profile data not found');
        }

        setProfile({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.contactDetails, // Update to use contactDetails
          ownerId: response.data.ownerId // Set ownerId from response
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    navigate('/owner/editProfile', { state: { profile } });
  };

  const handleDelete = () => {
    navigate('/owner/deleteProfile', { state: { profile } });
  };

  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      
      {error && <p className="error-message">{error}</p>}
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">
            <FaUser size={40} />
          </div>
          <h3>{profile.name}</h3>
          <p>Property Owner</p>
        </div>

        <div className="profile-details">
          <p><FaEnvelope /> {profile.email}</p>
          <p><FaPhone /> {profile.phone}</p>
        </div>

        <div className="profile-actions">
          <button 
            type="button" 
            className="btn-edit"
            onClick={handleEdit}
          >
            <FaEdit /> Edit Profile
          </button>
          <button 
            type="button" 
            className="btn-delete"
            onClick={handleDelete}
          >
            <FaTrash /> Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
