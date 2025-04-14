// Testimonials.js
import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: "Emily Rodriguez",
    role: "Tenant in San Francisco",
    rating: 5,
    comment: "Found my dream apartment in 3 days! The virtual tours saved me hours of commuting.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "James Wilson",
    role: "Landlord in NYC",
    rating: 4,
    comment: "Rented my property at 15% above market rate thanks to their pricing algorithm.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Aisha Khan",
    role: "First-time Renter",
    rating: 5,
    comment: "The lease signing process was completely digital - no paperwork nightmares!",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&auto=format&fit=crop"
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(function() {
    if (isHovering) return;
    
    var interval = setInterval(function() {
      setDirection(1);
      setCurrentIndex(function(prev) { return (prev + 1) % testimonials.length; });
    }, 5000);
    
    return function() { return clearInterval(interval); };
  }, [isHovering]);

  function goToPrev() {
    setDirection(-1);
    setCurrentIndex(function(prev) { return (prev - 1 + testimonials.length) % testimonials.length; });
  }

  function goToNext() {
    setDirection(1);
    setCurrentIndex(function(prev) { return (prev + 1) % testimonials.length; });
  }

  return React.createElement(
    'section',
    { className: 'testimonials', id: 'testimonials' },
    [
      React.createElement(
        'div',
        { className: 'section-header', key: 'header' },
        [
          React.createElement(
            motion.h2,
            {
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
              key: 'title'
            },
            'What Our Clients Say'
          ),
          React.createElement(
            motion.p,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.2 },
              key: 'subtitle'
            },
            'Trusted by thousands of renters and property owners'
          )
        ]
      ),
      React.createElement(
        'div',
        {
          className: 'carousel-container',
          key: 'carousel',
          onMouseEnter: function() { return setIsHovering(true); },
          onMouseLeave: function() { return setIsHovering(false); }
        },
        [
          React.createElement(
            motion.button,
            {
              className: 'nav-button prev',
              onClick: goToPrev,
              whileHover: { scale: 1.1 },
              whileTap: { scale: 0.9 },
              key: 'prev-btn'
            },
            React.createElement(FaChevronLeft, null)
          ),
          React.createElement(
            'div',
            { className: 'carousel-track', key: 'track' },
            React.createElement(
              AnimatePresence,
              null,
              React.createElement(
                motion.div,
                {
                  key: currentIndex,
                  custom: direction,
                  initial: { opacity: 0, x: direction > 0 ? 100 : -100 },
                  animate: { 
                    opacity: 1, 
                    x: 0,
                    transition: { type: 'spring', stiffness: 300, damping: 30 }
                  },
                  exit: { 
                    opacity: 0, 
                    x: direction > 0 ? -100 : 100,
                    transition: { duration: 0.3 }
                  },
                  className: 'testimonial-card'
                },
                [
                  React.createElement(FaQuoteLeft, { className: 'quote-icon', key: 'quote' }),
                  React.createElement(
                    'div',
                    { className: 'rating', key: 'rating' },
                    [...Array(5)].map(function(_, i) {
                      return React.createElement(
                        motion.span,
                        {
                          key: i,
                          whileHover: { scale: 1.2 },
                          transition: { type: 'spring', stiffness: 500 }
                        },
                        React.createElement(
                          FaStar,
                          { 
                            className: i < testimonials[currentIndex].rating ? "star-filled" : "star-empty" 
                          }
                        )
                      );
                    })
                  ),
                  React.createElement(
                    'p',
                    { className: 'comment', key: 'comment' },
                    testimonials[currentIndex].comment
                  ),
                  React.createElement(
                    motion.div,
                    {
                      className: 'client-info',
                      initial: { opacity: 0 },
                      animate: { opacity: 1 },
                      transition: { delay: 0.3 },
                      key: 'client'
                    },
                    [
                      React.createElement(
                        motion.img,
                        {
                          src: testimonials[currentIndex].image,
                          alt: testimonials[currentIndex].name,
                          className: 'client-image',
                          whileHover: { rotate: 5 },
                          transition: { type: 'spring' },
                          key: 'client-img'
                        }
                      ),
                      React.createElement(
                        'div',
                        { key: 'client-info-text' },
                        [
                          React.createElement(
                            'h4',
                            { key: 'name' },
                            testimonials[currentIndex].name
                          ),
                          React.createElement(
                            'p',
                            { className: 'role', key: 'role' },
                            testimonials[currentIndex].role
                          )
                        ]
                      )
                    ]
                  )
                ]
              )
            )
          ),
          React.createElement(
            motion.button,
            {
              className: 'nav-button next',
              onClick: goToNext,
              whileHover: { scale: 1.1 },
              whileTap: { scale: 0.9 },
              key: 'next-btn'
            },
            React.createElement(FaChevronRight, null)
          )
        ]
      ),
      React.createElement(
        motion.div,
        {
          className: 'carousel-dots',
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.5 },
          key: 'dots'
        },
        testimonials.map(function(_, index) {
          return React.createElement(
            motion.button,
            {
              key: index,
              className: 'dot ' + (index === currentIndex ? 'active' : ''),
              onClick: function() {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              },
              whileHover: { scale: 1.2 },
              whileTap: { scale: 0.9 }
            }
          );
        })
      )
    ]
  );
}

export default Testimonials;