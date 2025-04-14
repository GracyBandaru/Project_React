import React from 'react';
import { FaHome, FaUsers, FaChartLine, FaHandshake } from 'react-icons/fa';
import './About.css';

const About = () => {
  const stats = [
    { value: "10,000+", label: "Properties Listed" },
    { value: "95%", label: "Customer Satisfaction" },
    { value: "24/7", label: "Support Available" },
    { value: "50+", label: "Cities Covered" }
  ];

  return (
    <section className="about">
      <div className="about-hero">
        <div className="hero-content">
          <h1>Our Story</h1>
          <p>Connecting people with their perfect homes since 2015</p>
        </div>
      </div>

      <div className="about-mission">
        <div className="mission-content">
          <h2>Why Choose HomeHopper?</h2>
          <p>
            We revolutionized property rentals by combining cutting-edge technology 
            with personalized service. Our AI-powered matching system ensures you 
            find homes tailored to your lifestyle.
          </p>
        </div>
        <div className="mission-stats">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="about-values">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <FaHome className="value-icon" />
            <h3>Home First</h3>
            <p>We believe everyone deserves a place they love coming back to.</p>
          </div>
          <div className="value-card">
            <FaUsers className="value-icon" />
            <h3>Community</h3>
            <p>Building relationships beyond just transactions.</p>
          </div>
          <div className="value-card">
            <FaChartLine className="value-icon" />
            <h3>Innovation</h3>
            <p>Constantly improving to serve you better.</p>
          </div>
          <div className="value-card">
            <FaHandshake className="value-icon" />
            <h3>Integrity</h3>
            <p>Honest advice you can trust.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;