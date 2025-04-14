// shared/PropertyCard.js
import React from 'react';

const cardStyles = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
};

const imageStyles = {
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '4px',
    marginBottom: '10px',
};

const titleStyles = {
    fontSize: '1.2em',
    fontWeight: 'bold',
    marginBottom: '5px',
};

const buttonStyles = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '1em',
};

function PropertyCard({ property, showApplyButton, onApplyNow, isTenantView }) {
    return (
        <div style={cardStyles} className="property-card">
            <h3 style={titleStyles}>{property.propertyName}</h3>
            <img style={imageStyles} src={property.imagePath ? (property.imagePath.startsWith('http') ? property.imagePath : `http://localhost:5162/${property.imagePath}`) : 'default_image_url'} alt={property.propertyName} />
            <p>Address: {property.address}, {property.state}, {property.country}</p>
            <p>Rent: ${property.rentAmount}/month</p>
            <p>Availability: {property.availabilityStatus}</p>
            <p>Amenities: {property.amenities}</p>
            {isTenantView && <p>Owner ID: {property.ownerID}</p>} {/* Uppercase 'O' and 'ID' */}
            {isTenantView && <p>Property ID: {property.propertyID}</p>} {/* Uppercase 'P' and 'ID' */}
            {showApplyButton && (
                <button style={buttonStyles} onClick={() => onApplyNow(property.PropertyID)}>Apply Now</button> 
            )}
            {/* ... other details you want to display ... */}
        </div>
    );
}

export default PropertyCard;