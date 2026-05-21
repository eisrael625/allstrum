import React, { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../white-logo.webp';
import './Header.css';

const NAV_ITEMS = [
  { name: 'Home',         link: '/'             },
  { name: 'Features',     link: '/features'     },
  { name: 'About',        link: '/about'        },
  { name: 'Contact',      link: '/contact'      },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [overAppSection, setOverAppSection] = useState(false);
  const [overLightSection, setOverLightSection] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(() => window.innerWidth <= 1180);
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

  useEffect(() => {
    const updateLightSectionState = () => {
      const sections = document.querySelectorAll('[data-header-theme="light"]');
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom > 80) {
          setOverLightSection(true);
          return;
        }
      }
      setOverLightSection(false);
    };

    updateLightSectionState();
    window.addEventListener('scroll', updateLightSectionState, { passive: true });
    window.addEventListener('resize', updateLightSectionState);
    return () => {
      window.removeEventListener('scroll', updateLightSectionState);
      window.removeEventListener('resize', updateLightSectionState);
    };
  }, [location.pathname]);

  const handlePreOrder = () => {
    window.open('https://form.typeform.com/to/tIFZxh7l', '_blank', 'noopener,noreferrer');
  };

  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const darkTinted = overLightSection;
  const transparentOnApp = overAppSection && !isCompact && !darkTinted;
  const visuallyScrolled = (scrolled && !transparentOnApp) || darkTinted;
  const floatingHeader = scrolled || transparentOnApp || darkTinted;

  const bgColor = darkTinted
    ? 'rgba(10, 26, 48, 0.62)'
    : visuallyScrolled
      ? 'rgba(190, 205, 225, 0.18)'
      : (transparentOnApp ? 'rgba(190, 205, 225, 0.10)' : 'rgba(8, 16, 32, 0.0)');

  const shadow = darkTinted
    ? '0 10px 36px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(255, 255, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
    : visuallyScrolled
      ? '0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.1)'
      : (transparentOnApp ? '0 8px 32px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.14)' : 'none');

  return (
    <div className="hd-root">
      <motion.header
        className={`hd-bar${floatingHeader ? ' hd-bar--scrolled' : ''}${transparentOnApp ? ' hd-bar--light-transparent' : ''}`}
        animate={{
          width: isCompact
            ? 'calc(100vw - 1rem)'
            : (floatingHeader ? 'min(1120px, calc(100vw - 3rem))' : 'min(1440px, 100vw)'),
          top: isCompact ? '8px' : (floatingHeader ? '16px' : '0px'),
          borderRadius: isCompact ? '22px' : (floatingHeader ? '100px' : '0px'),
          backgroundColor: bgColor,
          boxShadow: shadow,
          backdropFilter: visuallyScrolled || isCompact || transparentOnApp ? 'blur(16px)' : 'none',
        }}
        transition={{ type: 'spring', stiffness: 180, damping: 30 }}
      >
        <div className="hd-inner">

          {/* Logo */}
          <Link to="/" className="hd-logo" onClick={handleHomeClick}>
            <img src={logo} alt="AllStrum" className="hd-logo-img" />
          </Link>

          {/* Desktop nav */}
          <nav className="hd-nav">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.link}
                className={({ isActive }) => `hd-link${isActive ? ' hd-link--active' : ''}`}
                onClick={item.link === '/' ? handleHomeClick : undefined}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          <button className="hd-cta" onClick={handlePreOrder}>
            Pre-order now
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

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="hd-mobile-menu"
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
                onClick={item.link === '/' ? handleHomeClick : () => setMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            <button
              className="hd-cta hd-cta--mobile"
              onClick={() => { setMenuOpen(false); handlePreOrder(); }}
            >
              Pre-order now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Header;
