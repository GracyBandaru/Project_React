import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome } from 'react-icons/fa';
import axios from 'axios';
import './Auth.css';

function RentRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactDetails: '',
    currentAddress: ''
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.contactDetails) newErrors.contactDetails = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) return;

    try {
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password, // Plain text password
        contactDetails: formData.contactDetails,
        currentAddress: formData.currentAddress
      };

      const response = await axios.post('http://localhost:5162/api/Tenant/register', registrationData);

      if (response.data) {
        alert('Registration successful! You can now login.');
        navigate('/rent-login');
      }
    } catch (err) {
      setApiError(err.response?.data || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <FaHome className="auth-icon" />
          <h2>Tenant Registration</h2>
          <p>Find your perfect home</p>
        </div>

        {apiError && <div className="auth-error">{apiError}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="input-group">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <FaLock />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="input-group">
            <FaLock />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>

          <div className="input-group">
            <FaPhone />
            <input
              type="tel"
              name="contactDetails"
              placeholder="Phone Number"
              value={formData.contactDetails}
              onChange={handleChange}
            />
            {errors.contactDetails && <span className="error">{errors.contactDetails}</span>}
          </div>

          <div className="input-group">
            <FaHome />
            <input
              type="text"
              name="currentAddress"
              placeholder="Current Address"
              value={formData.currentAddress}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/rent-login">Login here</Link>
          </p>
          <p className="demo-link">
            <Link to="/tenant">Go to Tenant Dashboard (Demo)</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RentRegister;