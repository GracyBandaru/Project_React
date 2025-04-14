import React from 'react';
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import './Team.css';

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Real estate veteran with 15+ years experience transforming rental markets.",
    image: "/assets/team/sarah.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "sarah@homehopper.com"
    }
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    bio: "Tech innovator building the future of property management software.",
    image: "/assets/team/michael.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "michael@homehopper.com"
    }
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Head of Customer Success",
    bio: "Dedicated to creating exceptional rental experiences for every client.",
    image: "/assets/team/priya.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "priya@homehopper.com"
    }
  }
];

const Team = () => {
  return (
    <section className="team">
      <div className="team-header">
        <h2>Meet Our Team</h2>
        <p>The passionate people behind HomeHopper</p>
      </div>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.id} className="team-card">
            <div className="team-image">
              <img src={member.image} alt={member.name} />
              <div className="social-links">
                <a href={member.social.linkedin}><FaLinkedin /></a>
                <a href={member.social.twitter}><FaTwitter /></a>
                <a href={`mailto:${member.social.email}`}><FaEnvelope /></a>
              </div>
            </div>
            <div className="team-info">
              <h3>{member.name}</h3>
              <p className="role">{member.role}</p>
              <p className="bio">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;