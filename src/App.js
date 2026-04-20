// App.js
import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import YouTubeVideo from './Youtube';
import TestimonialSection from './TestimonialSection';
import WhyAllStrum from './WhyAllStrum';
import WhoItsFor from './WhoItsFor';
import UserGroups from './UserGroups';
import OriginStory from './OriginStory';
import AppFeatures from './AppFeatures';
import DemoSection from './DemoSection';
import Awards from './Awards';
// import { PointerHighlight } from './components/ui/pointer-highlight';
// import { Highlighter } from './components/ui/highlighter';
import './App.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function App() {
  const handlePreOrderClick = () => {
    window.open('https://form.typeform.com/to/tIFZxh7l', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="App">
      <Header />
      <main>

        {/* ── HERO ── */}
        <section id="home" className="section hero">

          {/* ── Drawn music notes (scroll away with hero) ── */}
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
                {/* <PointerHighlight
                  rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
                  pointerClassName="text-yellow-500"
                >
                  <span style={{ position: 'relative', zIndex: 10 }}>everybody.</span>
                </PointerHighlight> */}
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
                Adaptive music devices that help anyone play real songs on guitar or ukulele, just by strumming.
              </p>
              <div className="hero-ctas">
                <button className="btn primary" onClick={handlePreOrderClick}>
                  Pre-order Now
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

        {/* ── WHY ALLSTRUM ── */}
        <WhyAllStrum />

        {/* ── WHO IT'S FOR (typewriter heading → bridges into user groups) ── */}
        <WhoItsFor />

        {/* ── USER GROUPS ── */}
        <UserGroups />

        {/* ── ORIGIN STORY ── */}
        <OriginStory />

        {/* ── APP FEATURES ── */}
        <AppFeatures />

        {/* ── PRODUCT SHOWCASES ── */}
        <DemoSection />

        {/* ── TESTIMONIALS ── */}
        <TestimonialSection />

        {/* ── AWARDS ── */}
        <Awards />

        {/* ── CONTACT ── */}
        <footer id="contact" className="ct-strip">
          <motion.div
            className="ct-inner"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ct-left">
              <span className="ct-label">Get in touch</span>
              <div className="ct-links">
                <a href="mailto:info@allstrum.com" className="ct-link">info@allstrum.com</a>
                <span className="ct-sep">·</span>
                <a href="https://www.linkedin.com/company/all-strum/" target="_blank" rel="noreferrer" className="ct-link">LinkedIn</a>
              </div>
            </div>
            <button className="ct-btn" onClick={handlePreOrderClick}>
              Pre-order Now
            </button>
          </motion.div>
          <p className="ct-legal">Patent Pending. All Rights Reserved.</p>
        </footer>


      </main>
    </div>
  );
}

export default App;
