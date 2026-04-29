<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> d87fb9563dfdd669ea0cd37771806888e11191ed
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from './assets/allstrum_vector.png';
import './Header.css';

const NAV_ITEMS = [
  { name: 'Home',         link: '/'             },
  { name: 'Origin',       link: '/origin'       },
  { name: 'Gallery',      link: '/gallery'      },
  { name: 'Testimonials', link: '/testimonials' },
  { name: 'Contact',      link: '/contact'      },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [overAppSection, setOverAppSection] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
<<<<<<< HEAD
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 860);
=======
  const [isCompact, setIsCompact] = useState(() => window.innerWidth <= 1180);
>>>>>>> d87fb9563dfdd669ea0cd37771806888e11191ed
  const { scrollY } = useScroll();
  const location = useLocation();

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
<<<<<<< HEAD
    const checkMobile = () => setIsMobile(window.innerWidth <= 860);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
=======
    const updateAppSectionState = () => {
      if (location.pathname !== '/') {
        setOverAppSection(false);
        return;
      }

      const section = document.querySelector('.phone-section');
      if (!section) {
        setOverAppSection(false);
        return;
      }

      const rect = section.getBoundingClientRect();
      setOverAppSection(rect.top <= 80 && rect.bottom > 80);
    };

    updateAppSectionState();
    window.addEventListener('scroll', updateAppSectionState, { passive: true });
    window.addEventListener('resize', updateAppSectionState);
    return () => {
      window.removeEventListener('scroll', updateAppSectionState);
      window.removeEventListener('resize', updateAppSectionState);
    };
  }, [location.pathname]);
>>>>>>> ei/codexTest

  const handlePreOrder = () => {
    window.open('https://form.typeform.com/to/tIFZxh7l', '_blank', 'noopener,noreferrer');
  };

  const transparentOnApp = overAppSection && !isCompact;
  const visuallyScrolled = scrolled && !transparentOnApp;
  const floatingHeader = scrolled || transparentOnApp;

  return (
    <div className="hd-root">
      <motion.header
        className={`hd-bar${floatingHeader ? ' hd-bar--scrolled' : ''}${transparentOnApp ? ' hd-bar--light-transparent' : ''}`}
        animate={{
<<<<<<< HEAD
          width: scrolled ? (isMobile ? '92%' : '72%') : '100%',
          top: scrolled ? '16px' : '0px',
          borderRadius: scrolled ? '100px' : '0px',
=======
          width: isCompact
            ? 'calc(100vw - 1rem)'
<<<<<<< HEAD
            : (scrolled ? 'min(1120px, calc(100vw - 3rem))' : 'min(1440px, 100vw)'),
          top: isCompact ? '8px' : (scrolled ? '16px' : '0px'),
          borderRadius: isCompact ? '22px' : (scrolled ? '100px' : '0px'),
>>>>>>> d87fb9563dfdd669ea0cd37771806888e11191ed
          backgroundColor: scrolled
=======
            : (floatingHeader ? 'min(1120px, calc(100vw - 3rem))' : 'min(1440px, 100vw)'),
          top: isCompact ? '8px' : (floatingHeader ? '16px' : '0px'),
          borderRadius: isCompact ? '22px' : (floatingHeader ? '100px' : '0px'),
          backgroundColor: visuallyScrolled
>>>>>>> ei/codexTest
            ? 'rgba(8, 16, 32, 0.88)'
            : (transparentOnApp ? 'rgba(8, 16, 32, 0.48)' : 'rgba(8, 16, 32, 0.0)'),
          boxShadow: visuallyScrolled
            ? '0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)'
            : (transparentOnApp ? '0 8px 32px rgba(0,0,0,0.16), 0 0 0 1px rgba(255,255,255,0.08)' : 'none'),
          backdropFilter: visuallyScrolled || isCompact || transparentOnApp ? 'blur(14px)' : 'none',
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 30 }}
      >
        <div className="hd-inner">

          {/* Logo */}
          <Link to="/" className="hd-logo" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="AllStrum" className="hd-logo-img" />
          </Link>

          {/* Desktop nav */}
          <nav className="hd-nav">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                className={({ isActive }) => `hd-link${isActive ? ' hd-link--active' : ''}`}
              >
                {item.name}
              </NavLink>
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
              <NavLink
                key={item.name}
                to={item.link}
                className={({ isActive }) => `hd-mobile-link${isActive ? ' hd-mobile-link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </NavLink>
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
