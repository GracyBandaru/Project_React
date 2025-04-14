import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 3000);
    }, 1500);
  };

  return (
    <motion.section 
      className="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="contact-header">
        <h2>Contact HomeHopper</h2>
        <p>We're here to help with your rental journey</p>
      </div>

      <div className="contact-container">
        {/* Contact Form */}
        <motion.div 
          className="contact-form"
          initial={{ x: -50 }}
          animate={{ x: 0 }}
        >
          {submitSuccess && (
            <div className="success-message">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className={`form-group ${errors.name ? 'error' : ''}`}>
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className={`form-group ${errors.email ? 'error' : ''}`}>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className={`form-group ${errors.message ? 'error' : ''}`}>
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                placeholder="How can we help you?"
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  <FaPaperPlane /> Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          className="contact-info"
          initial={{ x: 50 }}
          animate={{ x: 0 }}
        >
          <div className="info-card">
            <FaMapMarkerAlt className="icon" />
            <h3>Our Headquarters</h3>
            <p>123 Rental Plaza<br />San Francisco, CA 94107</p>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="map-link"
            >
              View on Map
            </a>
          </div>

          <div className="info-card">
            <FaPhone className="icon" />
            <h3>Call Us</h3>
            <p>General Inquiries: <a href="tel:+15551234567">(555) 123-4567</a></p>
            <p>Support: <a href="tel:+15559876543">(555) 987-6543</a></p>
          </div>

          <div className="info-card">
            <FaEnvelope className="icon" />
            <h3>Email Us</h3>
            <p>General: <a href="mailto:hello@homehopper.com">hello@homehopper.com</a></p>
            <p>Support: <a href="mailto:support@homehopper.com">support@homehopper.com</a></p>
          </div>

          <div className="info-card">
            <FaClock className="icon" />
            <h3>Office Hours</h3>
            <p>Monday - Friday: 9AM - 7PM</p>
            <p>Saturday: 10AM - 4PM</p>
            <p>Sunday: Closed</p>
          </div>
        </motion.div>
      </div>

      {/* Google Maps */}
      <div className="map-container">
        <iframe
          title="HomeHopper Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.158170127117!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjkiVw!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </motion.section>
  );
};

export default Contact;