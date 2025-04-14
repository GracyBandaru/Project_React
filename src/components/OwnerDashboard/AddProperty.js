import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaMapMarkerAlt,
    FaDollarSign,
    FaSwimmingPool,
    FaWifi,
    FaSpinner,
    FaExclamationTriangle
} from 'react-icons/fa';
import './OwnerDashboard.css';

function AddProperty() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        propertyName: '',
        address: '',
        state: '',
        country: '',
        rentAmount: '',
        availabilityStatus: true,
        amenities: '',
        imagePath: '' // Renamed to match backend
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [authStatus, setAuthStatus] = useState('checking');
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const verifySession = async () => {
            const token = localStorage.getItem('ownerToken');
            if (!token) {
                setAuthStatus('failed');
                return;
            }

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));

                if (payload.exp && payload.exp < Date.now() / 1000) {
                    throw new Error('Token expired');
                }

                if (!payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] && !payload.ownerId) {
                    throw new Error('Token missing required claims');
                }

                setAuthStatus('authenticated');
            } catch (err) {
                console.error('Session verification failed:', err);
                localStorage.removeItem('ownerToken');
                setAuthStatus('failed');
            }
        };

        verifySession();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }

        if (name === 'imagePath' && value) {
            setImagePreview(value);
        } else if (name === 'imagePath' && !value) {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.propertyName.trim()) newErrors.propertyName = 'Property name is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.country.trim()) newErrors.country = 'Country is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.rentAmount || parseFloat(formData.rentAmount) <= 0) {
            newErrors.rentAmount = 'Must be a positive number';
        }

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('ownerToken');
            const payload = JSON.parse(atob(token.split('.')[1]));
            const ownerId = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || payload.ownerId;

            const propertyData = {
                propertyName: formData.propertyName,
                address: formData.address,
                state: formData.state,
                country: formData.country,
                rentAmount: parseFloat(formData.rentAmount),
                availabilityStatus: formData.availabilityStatus,
                amenities: formData.amenities,
                ownerID: parseInt(ownerId, 10), // Ensure OwnerID is an integer
                imagePath: formData.imagePath
            };

            const response = await axios.post('http://localhost:5162/api/property', propertyData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' // Set Content-Type to application/json
                }
            });

            alert('Property added successfully!');
            navigate('/owner/properties');
        } catch (error) {
            console.error('Submission error:', error);
            if (error.response?.status === 401) {
                alert('Session expired. Please login again.');
                localStorage.removeItem('ownerToken');
                navigate('/owner-login');
            } else {
                alert(error.response?.data?.message || 'Failed to add property');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (authStatus === 'checking') {
        return (
            <div className="auth-status-container">
                <FaSpinner className="spinner-icon" spin />
                <p>Verifying your session...</p>
            </div>
        );
    }

    if (authStatus === 'failed') {
        return (
            <div className="auth-status-container error">
                <FaExclamationTriangle className="error-icon" />
                <h3>Session Expired</h3>
                <p>Please login again to continue</p>
                <button
                    className="auth-retry-btn"
                    onClick={() => navigate('/owner-login')}
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="form-container">
            <h2><FaHome /> Add New Property</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Property Name</label>
                    <input
                        type="text"
                        name="propertyName"
                        value={formData.propertyName}
                        onChange={handleChange}
                        className={errors.propertyName ? 'error' : ''}
                    />
                    {errors.propertyName && <span className="error-message">{errors.propertyName}</span>}
                </div>

                <div className="form-group">
                    <label><FaMapMarkerAlt /> Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={errors.address ? 'error' : ''}
                    />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={errors.state ? 'error' : ''}
                        />
                        {errors.state && <span className="error-message">{errors.state}</span>}
                    </div>

                    <div className="form-group">
                        <label>Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className={errors.country ? 'error' : ''}
                        />
                        {errors.country && <span className="error-message">{errors.country}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label><FaDollarSign /> Rent Amount</label>
                    <input
                        type="number"
                        name="rentAmount"
                        value={formData.rentAmount}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className={errors.rentAmount ? 'error' : ''}
                    />
                    {errors.rentAmount && <span className="error-message">{errors.rentAmount}</span>}
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="availabilityStatus"
                            checked={formData.availabilityStatus}
                            onChange={handleChange}
                        />
                        Available for Rent
                    </label>
                </div>

                <div className="form-group">
                    <label>Amenities (comma separated)</label>
                    <div className="amenities-hint">
                        <FaSwimmingPool /> <FaWifi /> (e.g., "Pool, WiFi, Parking")
                    </div>
                    <input
                        type="text"
                        name="amenities"
                        value={formData.amenities}
                        onChange={handleChange}
                        placeholder="Pool, WiFi, Parking, etc."
                    />
                </div>

                <div className="form-group">
                    <label>Image URL</label>
                    <input
                        type="text"
                        id="imagePath"
                        name="imagePath"
                        value={formData.imagePath}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                    />
                </div>

                {imagePreview && (
                    <div className="image-preview">
                        <h3>Image Preview:</h3>
                        <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }} />
                    </div>
                )}

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                   {isSubmitting ? (
    <>
        <FaSpinner className="spinner" spin="true" /> Adding Property...
    </>
) : (
    'List Property'
)}
                </button>
            </form>
        </div>
    );
}

export default AddProperty;