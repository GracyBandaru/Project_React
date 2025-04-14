// src/components/tenant/RentalApplicationForm.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Remove useParams
import './RentalApplicationForm.css'; // Import CSS for styling

function RentalApplicationForm() {
    const navigate = useNavigate();
    const [applicationData, setApplicationData] = useState({
        propertyId: '', // Will be manually entered
        ownerId: '',    // Will be manually entered
        noOfPeople: '',
        stayPeriod: '',
        tentativeStartDate: '',
        permanentAddress: '',
        state: '',
        country: '',
        specificRequirements: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApplicationData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError('');

        try {
            const token = localStorage.getItem('tenantToken');
            const response = await fetch('http://localhost:5162/api/RentalApplication/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(applicationData),
            });

            if (response.ok) {
                navigate('/tenant/applications'); // Redirect to applications list
            } else {
                const errorMessage = await response.text();
                setSubmitError(`Failed to submit application: ${errorMessage}`);
            }
        } catch (err) {
            setSubmitError('Error submitting application.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="rental-application-form">
            <h2>Rental Application</h2>
            {submitError && <div className="error-message">{submitError}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="propertyId">Property ID:</label>
                    <input
                        type="number"
                        id="propertyId"
                        name="propertyId"
                        value={applicationData.propertyId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="ownerId">Owner ID:</label>
                    <input
                        type="number"
                        id="ownerId"
                        name="ownerId"
                        value={applicationData.ownerId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="noOfPeople">Number of People:</label>
                    <input
                        type="number"
                        id="noOfPeople"
                        name="noOfPeople"
                        value={applicationData.noOfPeople}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="stayPeriod">Preferred Stay Period (e.g., 6 months, 1 year):</label>
                    <input
                        type="text"
                        id="stayPeriod"
                        name="stayPeriod"
                        value={applicationData.stayPeriod}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tentativeStartDate">Tentative Start Date:</label>
                    <input
                        type="date"
                        id="tentativeStartDate"
                        name="tentativeStartDate"
                        value={applicationData.tentativeStartDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="permanentAddress">Permanent Address:</label>
                    <textarea
                        id="permanentAddress"
                        name="permanentAddress"
                        value={applicationData.permanentAddress}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        id="state"
                        name="state"
                        value={applicationData.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={applicationData.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="specificRequirements">Specific Requirements (Optional):</label>
                    <textarea
                        id="specificRequirements"
                        name="specificRequirements"
                        value={applicationData.specificRequirements}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="submit-button" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
            <div className="navigation-links">
                <Link to="/tenant/search">Back to Property Search</Link>
                <Link to="/tenant">Go to Dashboard</Link>
                {/* Add more navigation links as needed */}
            </div>
        </div>
    );
}

export default RentalApplicationForm;