import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSpinner, FaExclamationTriangle, FaEdit } from 'react-icons/fa';
import './OwnerDashboard.css';

function UpdateProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    propertyName: '',
    address: '',
    state: '',
    country: '',
    rentAmount: '',
    availabilityStatus: true,
    amenities: '',
    imagePath: '',
    ownerID: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authStatus, setAuthStatus] = useState('checking');
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const verifySession = () => {
      const token = localStorage.getItem('ownerToken');
      if (!token) {
        setAuthStatus('failed');
        return;
      }
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setFormData(prev => ({
          ...prev,
          ownerID: parseInt(payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"])
        }));
        setAuthStatus('authenticated');
      } catch (err) {
        localStorage.removeItem('ownerToken');
        setAuthStatus('failed');
      }
    };

    const fetchPropertyDetails = async () => {
      try {
        const token = localStorage.getItem('ownerToken');
        const response = await axios.get(`http://localhost:5162/api/property/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const propertyData = response.data;
        setFormData(prev => ({
          ...propertyData,
          ownerID: prev.ownerID || propertyData.ownerID
        }));
        setImagePreview(propertyData.imagePath || '');
      } catch (error) {
        setAuthStatus('failed');
      }
    };

    verifySession();
    if (authStatus === 'authenticated') {
      fetchPropertyDetails();
    }
  }, [id, authStatus]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'imagePath') {
      setImagePreview(value);
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.propertyName.trim()) newErrors.propertyName = 'Required';
    if (!formData.address.trim()) newErrors.address = 'Required';
    if (!formData.country.trim()) newErrors.country = 'Required';
    if (!formData.state.trim()) newErrors.state = 'Required';
    if (!formData.rentAmount || parseFloat(formData.rentAmount) <= 0) newErrors.rentAmount = 'Must be positive';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('ownerToken');
      const response = await axios.put(`http://localhost:5162/api/property/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 204) {
        alert('✅ Property updated successfully!');
        navigate('/owner/properties');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert(error.response?.data?.message || 'Failed to update property');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authStatus === 'checking') {
    return (
      <div className="auth-status-container">
        <FaSpinner className="spinner-icon" spin />
        <p>Verifying session and loading property details...</p>
      </div>
    );
  }

  if (authStatus === 'failed') {
    return (
      <div className="auth-status-container error">
        <FaExclamationTriangle className="error-icon" />
        <h3>Session Expired or Error Loading Property</h3>
        <p>Please log in again.</p>
        <button className="auth-retry-btn" onClick={() => navigate('/owner-login')}>
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2><FaEdit /> Edit Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Property Name</label>
          <input type="text" name="propertyName" value={formData.propertyName} onChange={handleChange} />
          {errors.propertyName && <span className="error-message">{errors.propertyName}</span>}
        </div>

        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} />
            {errors.state && <span className="error-message">{errors.state}</span>}
          </div>
          <div className="form-group">
            <label>Country</label>
            <input type="text" name="country" value={formData.country} onChange={handleChange} />
            {errors.country && <span className="error-message">{errors.country}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Rent Amount</label>
          <input type="number" name="rentAmount" value={formData.rentAmount} onChange={handleChange} />
          {errors.rentAmount && <span className="error-message">{errors.rentAmount}</span>}
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" name="availabilityStatus" checked={formData.availabilityStatus} onChange={handleChange} />
            Available for Rent
          </label>
        </div>

        <div className="form-group">
          <label>Amenities (comma separated)</label>
          <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Update Image URL</label>
          <input type="text" name="imagePath" value={formData.imagePath} onChange={handleChange} />
        </div>

        {imagePreview && (
          <div className="image-preview">
            <h3>Image Preview:</h3>
            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? <><FaSpinner className="spinner" spin /> Updating Property...</> : 'Update Property'}
        </button>
      </form>
    </div>
  );
}

export default UpdateProperty;