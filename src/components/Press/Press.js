import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import './Press.css';

// Import logos (save these in public/assets/press/)
const pressLogos = {
  techcrunch: "/assets/press/techcruch.png",
  forbes: "/assets/press/forbes.png",
  wsj: "/assets/press/wsj.png",
  bloomberg: "/assets/press/bloomberg.png"
};

const pressItems = [
  {
    id: 1,
    title: "HomeHopper Revolutionizes Rental Market",
    source: "TechCrunch",
    logo: "techcrunch",
    date: "NEW",
    url: "#",
    excerpt: "How this startup is using AI to match tenants with perfect homes 3x faster"
  },
  {
    id: 2,
    title: "Top 10 Proptech Startups to Watch",
    source: "Forbes",
    logo: "forbes",
    date: "NEW",
    url: "#",
    excerpt: "HomeHopper makes our annual list of most innovative real estate companies"
  },
  {
    id: 3,
    title: "Digital Leasing Trends Report",
    source: "Wall Street Journal",
    logo: "wsj",
    date: "May 2023",
    url: "#",
    excerpt: "Case study features HomeHopper's paperless lease signing process"
  },
  {
    id: 4,
    title: "Proptech Funding Boom Continues",
    source: "Bloomberg",
    logo: "bloomberg",
    date: "April 2023",
    url: "#",
    excerpt: "HomeHopper secures $20M Series B to expand rental platform"
  }
];

const Press = () => {
  return (
    <section className="press">
      <div className="section-header">
        <h2>Press & Media</h2>
        <p>Where HomeHopper has been featured</p>
      </div>

      <div className="press-grid">
        {pressItems.map((item) => (
          <div key={item.id} className="press-card">
            <div className="press-header">
              <img 
                src={pressLogos[item.logo]} 
                alt={item.source} 
                className="press-logo"
              />
              <div>
                <h3>{item.title}</h3>
                <div className="press-meta">
                  <span className="source">{item.source}</span>
                  {item.date === "NEW" && (
                    <span className="new-badge">
                      {item.date}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <p className="excerpt">{item.excerpt}</p>
            <a href={item.url} className="press-link">
              Read Article <FaExternalLinkAlt />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
// Add this at the very bottom (after all the code you shared):
export default Press;