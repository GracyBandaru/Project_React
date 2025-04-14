import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaSpinner, FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import './OwnerDashboard.css'; // Assuming you use the same CSS

function DeleteProperty() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fetchPropertyDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('ownerToken');
                const response = await axios.get(`http://localhost:5162/api/property/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                setProperty(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching property details:', err);
                setError(err.response?.data?.message || 'Failed to load property details.');
                setLoading(false);
            }
        };

        fetchPropertyDetails();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to permanently delete "${property?.propertyName}"?`)) {
            return;
        }

        setIsDeleting(true);
        try {
            const token = localStorage.getItem('ownerToken');
            await axios.delete(`http://localhost:5162/api/property/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            alert('Property deleted successfully.');
            navigate('/owner/properties');
        } catch (error) {
            console.error('Error deleting property:', error);
            alert(error.response?.data?.message || 'Failed to delete property.');
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <FaSpinner className="spinner-icon" />
                <p>Loading property details for deletion...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-container">
                <FaExclamationTriangle className="error-icon" />
                <h3>Error</h3>
                <p>{error}</p>
                <Link to="/owner/properties" className="btn-secondary">Back to My Properties</Link>
            </div>
        );
    }

    if (!property) {
        return <div>Property not found.</div>;
    }

    return (
        <div className="delete-property-container">
            <h2><FaTrash /> Confirm Delete Property</h2>
            <p>Are you sure you want to delete the following property?</p>
            <h3>{property.propertyName}</h3>
            <p>Address: {property.address}, {property.state}, {property.country}</p>
            <div className="delete-actions">
                <button onClick={handleDelete} className="btn-danger" disabled={isDeleting}>
                    {isDeleting ? <FaSpinner className="spinner" spin /> : 'Delete'}
                </button>
                <Link to="/owner/properties" className="btn-secondary">Cancel</Link>
            </div>
        </div>
    );
}

export default DeleteProperty;