import React, { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../white Logo.png';
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

  const handlePreOrder = () => {
    window.open('https://form.typeform.com/to/tIFZxh7l', '_blank', 'noopener,noreferrer');
  };

  const isLightPage = location.pathname === '/features';
  const transparentOnApp = overAppSection && !isCompact;
  const visuallyScrolled = scrolled && !transparentOnApp && !isLightPage;
  const floatingHeader = scrolled || transparentOnApp || isLightPage;

  const bgColor = visuallyScrolled
    ? 'rgba(190, 205, 225, 0.18)'
    : (transparentOnApp || isLightPage ? 'rgba(190, 205, 225, 0.10)' : 'rgba(8, 16, 32, 0.0)');

  const shadow = visuallyScrolled
    ? '0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.1)'
    : (transparentOnApp || isLightPage ? '0 8px 32px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.14)' : 'none');

  return (
    <div className="hd-root">
      <motion.header
        className={`hd-bar${floatingHeader ? ' hd-bar--scrolled' : ''}${transparentOnApp ? ' hd-bar--light-transparent' : ''}${isLightPage ? ' hd-bar--light-page' : ''}`}
        animate={{
          width: isCompact
            ? 'calc(100vw - 1rem)'
            : (floatingHeader ? 'min(1120px, calc(100vw - 3rem))' : 'min(1440px, 100vw)'),
          top: isCompact ? '8px' : (floatingHeader ? '16px' : '0px'),
          borderRadius: isCompact ? '22px' : (floatingHeader ? '100px' : '0px'),
          backgroundColor: bgColor,
          boxShadow: shadow,
          backdropFilter: visuallyScrolled || isCompact || transparentOnApp || isLightPage ? 'blur(16px)' : 'none',
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
