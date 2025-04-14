import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaHome, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import './MyProperties.css'; // Import the CSS file

function MyProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperties = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('ownerToken');
                const response = await axios.get('http://localhost:5162/api/Property', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProperties(response.data?.$values || (Array.isArray(response.data) ? response.data : []));
            } catch (err) {
                console.error('Fetch error:', err);
                setError('Failed to load properties.');
                setProperties([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) {
        return <div className="loading-properties">Loading properties...</div>;
    }

    if (error) {
        return <div className="error-loading">Error loading properties: {error}</div>;
    }

    if (properties.length === 0) {
        return <div className="no-properties">No properties found.</div>;
    }

    const handleEdit = (propertyId) => {
      navigate(`/owner/edit-property/${propertyId}`);
    };
  

    const handleDelete = (propertyId) => {
        navigate(`/owner/delete-property/${propertyId}`);
    };

    return (
        <div className="my-properties-container">
            <h2 className="my-properties-title">My Properties</h2>
            <ul className="property-grid"> {/* Ensure this class is used */}
                {properties.map(property => (
                    <li key={property.propertyID || property.id} className="property-item">
                        <div className="property-image-container">
                            {property.imagePath && (
                                <img
                                    src={property.imagePath}
                                    alt={property.propertyName || 'Property Image'}
                                    className="property-image"
                                />
                            )}
                        </div>
                        <div className="property-details">
                            <h3 className="property-title">{property.propertyName || 'Property Title'}</h3>
                            <p className="property-info">
                                <FaHome /> {property.address || 'Not specified'}
                            </p>
                            <p className="property-info">
                                <FaMapMarkerAlt /> {property.state || 'Not specified'}, {property.country || 'Not specified'}
                            </p>
                            <p className="property-info">
                                <FaDollarSign /> {property.rentAmount || 'Not specified'}/month
                            </p>
                            <div className="property-actions">
                                <button onClick={() => handleEdit(property.propertyID || property.id)} className="edit-button">
                                    <FaEdit /> Edit
                                </button>
                                <button onClick={() => handleDelete(property.propertyID || property.id)} className="delete-button">
                                    <FaTrash /> Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyProperties;