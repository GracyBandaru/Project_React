import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OwnerDashboard.css';

function DeleteProfile() {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) return;

    try {
      const token = localStorage.getItem('ownerToken');
      await axios.delete('http://localhost:5162/api/Owner/delete', {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Profile deleted successfully.');
      localStorage.removeItem('ownerToken');
      navigate('/sell-register');
    } catch (err) {
      console.error('❌ Failed to delete profile:', err);
      alert('Failed to delete profile. Please try again.');
    }
  };

  return (
    <div className="form-page">
      <h2>Delete Profile</h2>
      <p>Once deleted, your profile and properties will be permanently removed.</p>
      <button onClick={handleDelete} className="btn-danger">
        Delete My Profile
      </button>
    </div>
  );
}

export default DeleteProfile;
