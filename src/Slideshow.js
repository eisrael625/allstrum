import React, { useState, useEffect } from 'react';
import './Slideshow.css';

const Slideshow = ({ testimonials }) => {
  // Split into pairs: [[0,1], [2,3], [4,5]]
  const pairs = [];
  for (let i = 0; i < testimonials.length; i += 2) {
    pairs.push(testimonials.slice(i, i + 2));
  }

  const [currentPair, setCurrentPair] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentPair(prev => (prev + 1) % pairs.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, pairs.length]);

  return (
    <div
      className="testimonial-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="testimonial-slides">
        {pairs.map((pair, pairIndex) => (
          <div
            key={pairIndex}
            className={`testimonial-pair ${pairIndex === currentPair ? 'active' : ''}`}
          >
            {pair.map((text, i) => (
              <div key={i} className="testimonial-card">
                <span className="testimonial-mark">&ldquo;</span>
                <p className="testimonial-text">{text.replace(/^[\u201C\u201D""]|[\u201C\u201D""]$/g, '')}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
