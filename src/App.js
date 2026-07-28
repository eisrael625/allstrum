// App.js
import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig, motion } from 'framer-motion';
import Header from './components/Header';
import YouTubeVideo from './components/Youtube';
import SocialLinks from './components/SocialLinks';
import { openPreOrder } from './lib/links';
import WhyAllStrum from './sections/WhyAllStrum';
import WhoItsFor from './sections/WhoItsFor';
import UserGroups from './sections/UserGroups';
import DemoSection from './sections/DemoSection';
import AppAnimation from './pages/AppAnimation';
import logo from './white-logo.webp';
import './App.css';

const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function Hero() {
  const handlePreOrderClick = openPreOrder;

  return (
    <section id="intro" className="section hero">
      <svg aria-hidden="true" className="deco-svg deco-svg--1" viewBox="0 0 50 110" overflow="visible">
        <path className="deco-path" pathLength="100" d="M 8,90 C 6,80 16,72 26,76 C 36,80 36,90 28,95 C 20,100 10,100 8,90 Z" style={{ animationDelay: '2.4s' }} />
        <path className="deco-path" pathLength="100" d="M 27,76 L 27,20" style={{ animationDelay: '2.8s' }} />
        <path className="deco-path" pathLength="100" d="M 27,20 C 44,25 48,42 32,54" style={{ animationDelay: '3.1s' }} />
      </svg>

      <svg aria-hidden="true" className="deco-svg deco-svg--3" viewBox="0 0 72 110" overflow="visible">
        <path className="deco-path" pathLength="100" d="M 5,88 C 3,78 13,70 23,74 C 33,78 33,88 25,93 C 17,98 7,98 5,88 Z" style={{ animationDelay: '3.6s' }} />
        <path className="deco-path" pathLength="100" d="M 23,74 L 23,14" style={{ animationDelay: '4.0s' }} />
        <path className="deco-path" pathLength="100" d="M 40,93 C 38,83 48,75 58,79 C 68,83 68,93 60,98 C 52,103 42,103 40,93 Z" style={{ animationDelay: '4.4s' }} />
        <path className="deco-path" pathLength="100" d="M 58,79 L 58,18" style={{ animationDelay: '4.8s' }} />
        <path className="deco-path" pathLength="100" d="M 23,14 L 58,18" style={{ animationDelay: '5.1s' }} />
        <path className="deco-path" pathLength="100" d="M 23,22 L 58,26" style={{ animationDelay: '5.2s' }} />
      </svg>

      <div className="hero-inner">
        <motion.div
          className="hero-text"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <h1 className="hero-title">
            Music for{' '}
            <span className="hl-word">
              everybody.
              <svg
                aria-hidden="true"
                className="hl-z-stroke"
                viewBox="0 0 200 50"
                preserveAspectRatio="none"
                overflow="visible"
              >
                <path
                  className="hl-z-path"
                  pathLength="100"
                  d="M 5,14 C 58,5 128,4 194,13 C 132,22 66,33 10,40 C 65,36 148,33 196,42"
                />
              </svg>
            </span>
          </h1>
          <p className="hero-subtitle">
            The AllStrum attaches to a guitar or ukulele and automatically holds down chords in real time, so anyone can play just by strumming.
          </p>
          <div className="hero-ctas">
            <button className="btn primary" onClick={handlePreOrderClick}>
              Pre-order now
            </button>
          </div>
        </motion.div>

        <motion.div
          className="hero-media"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <div className="hero-video-card">
            <YouTubeVideo videoId="sSYVzyxQE1w" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo !== 'app-section') return;
    window.setTimeout(() => {
      document.querySelector('.phone-section')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, 0);
  }, [location.state]);

  return (
    <div className="home-page">
      <Hero />
      <WhyAllStrum />
      <section id="who-its-for" className="audience-section">
        <WhoItsFor />
        <UserGroups />
      </section>
      <DemoSection />
      <AppAnimation />
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand-block">
          <img src={logo} alt="AllStrum" className="site-footer__logo" />
          <div className="site-footer__legal">
            <p>Copyright © {year} AllStrum. All rights reserved.</p>
            <a className="site-footer__email" href="mailto:info@allstrum.com">info@allstrum.com</a>
          </div>
          <SocialLinks className="site-footer__socials" />
        </div>
      </div>
    </footer>
  );
}

function AppRoutes() {
  const { pathname } = useLocation();
  const isContactPage = pathname === '/contact';

  return (
    <div className={`App${isContactPage ? ' App--contact' : ''}`}>
      <Header />
      <main>
        <Suspense fallback={<div className="route-page" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/origin" element={<AboutPage />} />
            <Route path="/gallery" element={<AboutPage />} />
            <Route path="/testimonials" element={<AboutPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <AppRoutes />
    </MotionConfig>
  );
}

export default App;
