// src/components/About/AboutLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import './About.css'; // Optional for styling

const AboutLayout = () => {
  return (
    <div className="about-layout">
      <Outlet /> {/* This renders the nested routes */}
    </div>
  );
};

export default AboutLayout;