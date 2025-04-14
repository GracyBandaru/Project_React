import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSpinner, FaExclamationTriangle, FaEdit } from 'react-icons/fa';
import './OwnerDashboard.css'; // Assuming you use the same CSS

function UpdateProperty() {
    const { id } = useParams(); // Get the property ID from the route parameters
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        propertyName: '',
        address: '',
        state: '',
        country: '',
        rentAmount: '',
        availabilityStatus: true,
        amenities: '',
        imagePath: '', // Will store URL if provided
        ownerID: '' // You might not need to manage this in the form
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
                // Basic token verification (you might have more robust logic)
                JSON.parse(atob(token.split('.')[1]));
                setAuthStatus('authenticated');
            } catch (err) {
                console.error('Session verification failed:', err);
                localStorage.removeItem('ownerToken');
                setAuthStatus('failed');
            }
        };

        const fetchPropertyDetails = async () => {
            setAuthStatus('checking');
            try {
                const token = localStorage.getItem('ownerToken');
                const response = await axios.get(`http://localhost:5162/api/property/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                const propertyData = response.data;
                setFormData(propertyData); // Directly set the form data
                setImagePreview(propertyData.imagePath ? (propertyData.imagePath.startsWith('http') ? propertyData.imagePath : `http://localhost:5162/${propertyData.imagePath}`) : null);
                setAuthStatus('authenticated');
            } catch (error) {
                console.error('Error fetching property details:', error);
                setAuthStatus('failed');
                // Handle error (e.g., display message to user)
            }
        };

        verifySession();
        if (authStatus === 'authenticated') {
            fetchPropertyDetails();
        }
        console.log('UpdateProperty - useParams ID on mount:', id); // Debugging
    }, [id, navigate]);

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
        } else if (name === 'imagePath' && !value && formData.imagePath) {
            setImagePreview(formData.imagePath.startsWith('http') ? formData.imagePath : `http://localhost:5162/${formData.imagePath}`);
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
            const payload = { ...formData }; // Send all form data as JSON

            const response = await axios.put(`http://localhost:5162/api/property/${id}`, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Update response:', response);

            if (response.status === 200) {
                alert('Property updated successfully!');
                navigate('/owner/properties');
            } else {
                const errorData = response.data;
                console.error('Error updating property:', errorData);
                alert(errorData?.message || 'Failed to update property.');
            }
        } catch (error) {
            console.error('Update error:', error);
            if (error.response?.status === 401) {
                alert('Session expired. Please login again.');
                localStorage.removeItem('ownerToken');
                navigate('/owner-login');
            } else {
                alert(error.response?.data?.message || 'Failed to update property');
            }
        } finally {
            setIsSubmitting(false);
        }
        console.log('UpdateProperty - handleSubmit ID:', id); // Debugging
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
                <p>Please log in again or check for errors.</p>
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
                    <input type="text" name="propertyName" value={formData.propertyName} onChange={handleChange} className={errors.propertyName ? 'error' : ''} />
                    {errors.propertyName && <span className="error-message">{errors.propertyName}</span>}
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className={errors.address ? 'error' : ''} />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>State</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} className={errors.state ? 'error' : ''} />
                        {errors.state && <span className="error-message">{errors.state}</span>}
                    </div>
                    <div className="form-group">
                        <label>Country</label>
                        <input type="text" name="country" value={formData.country} onChange={handleChange} className={errors.country ? 'error' : ''} />
                        {errors.country && <span className="error-message">{errors.country}</span>}
                    </div>
                </div>
                <div className="form-group">
                    <label>Rent Amount</label>
                    <input type="number" name="rentAmount" value={formData.rentAmount} onChange={handleChange} min="0" step="0.01" className={errors.rentAmount ? 'error' : ''} />
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
                    <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} placeholder="Pool, WiFi, Parking, etc." />
                </div>
                <div className="form-group">
                    <label>Update Image URL</label>
                    <input type="text" id="imagePath" name="imagePath" value={formData.imagePath} onChange={handleChange} placeholder="Enter new image URL" />
                </div>
                {imagePreview && (
                    <div className="image-preview">
                        <h3>Image Preview:</h3>
                        <img src={imagePreview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }} />
                    </div>
                )}
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <FaSpinner className="spinner" spin /> Updating Property...
                        </>
                    ) : (
                        'Update Property'
                    )}
                </button>
            </form>
        </div>
    );
}

export default UpdateProperty;