import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../shared/PropertyCard';
import './TenantDashboard.css';

function PropertySearch() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useState({
        propertyName: '',
        state: '',
        country: ''
    });
    const [filteredProperties, setFilteredProperties] = useState([]);

    useEffect(() => {
        const fetchAllProperties = async () => {
            setLoading(true);
            setError(null);
            try {
                const token = localStorage.getItem('tenantToken');
                const response = await axios.get('http://localhost:5162/api/property', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log('API Response:', response.data);

                if (response.data && Array.isArray(response.data.$values)) {
                    setProperties(response.data.$values);
                    setFilteredProperties(response.data.$values);
                } else {
                    setError('Error: Received unexpected data structure from the API.');
                }
            } catch (err) {
                console.error('Error fetching properties:', err);
                setError('Failed to load properties.');
            } finally {
                setLoading(false);
            }
        };

        fetchAllProperties();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const filtered = properties.filter(property => {
            const nameMatch = !searchParams.propertyName || property.propertyName?.toLowerCase().includes(searchParams.propertyName.toLowerCase());
            const stateMatch = !searchParams.state || property.state?.toLowerCase().includes(searchParams.state.toLowerCase());
            const countryMatch = !searchParams.country || property.country?.toLowerCase().includes(searchParams.country.toLowerCase());
            return nameMatch && stateMatch && countryMatch;
        });
        setFilteredProperties(filtered);
    };

    const handleApplyNow = (propertyId) => {
        navigate(`/tenant/apply/${propertyId}`);
    };

    const goToGeneralApplication = () => {
        navigate('/tenant/apply');
    };

    if (loading) {
        return <div>Loading properties...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div className="property-list-tenant-container">
            <div className="apply-now-button-top-right">
                <button onClick={goToGeneralApplication}>Apply for Rent</button>
            </div>
            <h2>Available Properties</h2>
            <div className="property-grid">
                {filteredProperties.map(property => (
                    <PropertyCard
                        key={property.PropertyID} // Assuming PropertyID is the unique key
                        property={property}
                        showApplyButton={true}
                        onApplyNow={handleApplyNow}
                        isTenantView={true}
                    />
                ))}
            </div>
        </div>
    );
}

export default PropertySearch;