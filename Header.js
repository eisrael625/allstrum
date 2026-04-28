<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> d87fb9563dfdd669ea0cd37771806888e11191ed
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import logo from './assets/allstrum_vector.png';
import './Header.css';

const NAV_ITEMS = [
  { name: 'Products',      link: '#products'     },
  { name: "Who It's For",  link: '#who-its-for'  },
  { name: 'Testimonials',  link: '#testimonials'  },
  { name: 'Recognition',   link: '#awards'        },
  { name: 'Contact',       link: '#contact'       },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
<<<<<<< HEAD
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 860);
=======
  const [isCompact, setIsCompact] = useState(() => window.innerWidth <= 1180);
>>>>>>> d87fb9563dfdd669ea0cd37771806888e11191ed
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleResize = () => {
      const compact = window.innerWidth <= 1180;
      setIsCompact(compact);
      if (!compact) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 60);
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 860);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePreOrder = () => {
    window.open('https://form.typeform.com/to/tIFZxh7l', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="hd-root">
      <motion.header
        className={`hd-bar${scrolled ? ' hd-bar--scrolled' : ''}`}
        animate={{
<<<<<<< HEAD
          width: scrolled ? (isMobile ? '92%' : '72%') : '100%',
          top: scrolled ? '16px' : '0px',
          borderRadius: scrolled ? '100px' : '0px',
=======
          width: isCompact
            ? 'calc(100vw - 1rem)'
            : (scrolled ? 'min(1120px, calc(100vw - 3rem))' : 'min(1440px, 100vw)'),
          top: isCompact ? '8px' : (scrolled ? '16px' : '0px'),
          borderRadius: isCompact ? '22px' : (scrolled ? '100px' : '0px'),
>>>>>>> d87fb9563dfdd669ea0cd37771806888e11191ed
          backgroundColor: scrolled
            ? 'rgba(8, 16, 32, 0.88)'
            : 'rgba(8, 16, 32, 0.0)',
          boxShadow: scrolled
            ? '0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)'
            : 'none',
          backdropFilter: scrolled || isCompact ? 'blur(14px)' : 'none',
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 30 }}
      >
        <div className="hd-inner">

          {/* Logo */}
          <a href="#products" className="hd-logo">
            <img src={logo} alt="AllStrum" className="hd-logo-img" />
          </a>

          {/* Desktop nav */}
          <nav className="hd-nav">
            {NAV_ITEMS.map((item) => (
              <a key={item.name} href={item.link} className="hd-link">
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <button className="hd-cta" onClick={handlePreOrder}>
            Pre-order Now
          </button>

          {/* Hamburger */}
          <button
            className="hd-hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hd-burger-line${menuOpen ? ' hd-burger-line--open-1' : ''}`} />
            <span className={`hd-burger-line${menuOpen ? ' hd-burger-line--open-2' : ''}`} />
            <span className={`hd-burger-line${menuOpen ? ' hd-burger-line--open-3' : ''}`} />
          </button>

        </div>
      </motion.header>

      {/* Mobile menu — top position accounts for scrolled pill shift */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="hd-mobile-menu"
            style={{ top: scrolled ? '88px' : '72px' }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="hd-mobile-link"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <button
              className="hd-cta hd-cta--mobile"
              onClick={() => { setMenuOpen(false); handlePreOrder(); }}
            >
              Pre-order Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
