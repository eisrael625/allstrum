// App.js
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './components/Header';
import YouTubeVideo from './components/Youtube';
import TestimonialSection from './sections/TestimonialSection';
import WhyAllStrum from './sections/WhyAllStrum';
import WhoItsFor from './sections/WhoItsFor';
import UserGroups from './sections/UserGroups';
import OriginStory from './sections/OriginStory';
import DemoSection from './sections/DemoSection';
import Awards from './sections/Awards';
import AppAnimation from './pages/AppAnimation';
import FeaturesPage from './pages/FeaturesPage';
import StrumMorph from './components/StrumMorph';
import gallery3710 from './assets/gallery-3710.webp';
import gallery4269 from './assets/gallery-4269.webp';
import gallery4276 from './assets/gallery-4276.webp';
import gallery4263 from './assets/gallery-4263.webp';
import gallery4237 from './assets/gallery-4237.webp';
import gallery4134 from './assets/gallery-4134.webp';
import gallery3238 from './assets/gallery-3238.webp';
import gallery3230 from './assets/gallery-3230.webp';
import gallery4038 from './assets/gallery-4038.webp';
import gallery4042 from './assets/gallery-4042.webp';
import gallery3971 from './assets/gallery-3971.webp';
import gallery3701 from './assets/gallery-3701.webp';
import gallery4050 from './assets/gallery-4050.webp';
import gallery4051 from './assets/gallery-4051.webp';
import gallery4052 from './assets/gallery-4052.webp';
import gallery4055 from './assets/gallery-4055.webp';
import as1 from './assets/AS1-gallery.webp';
import as2 from './assets/AS2-gallery.webp';
import as3 from './assets/AS3-gallery.webp';
import as4 from './assets/AS4-gallery.webp';
import './App.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const galleryImages = [
  { src: gallery4038, alt: 'AllStrum being played on outdoor campus steps', orientation: 'wide' },
  { src: as1, alt: 'AllStrum guitar setup product photo', orientation: 'landscape' },
  { src: gallery3710, alt: 'AllStrum founders holding a guitar and device outside a campus building', orientation: 'portrait' },
  { src: gallery4050, alt: 'AllStrum being played by a seated player outdoors', orientation: 'wide' },
  { src: as3, alt: 'AllStrum close-up product photo', orientation: 'portrait' },
  { src: gallery3238, alt: 'AllStrum indoor demonstration with a player smiling', orientation: 'landscape' },
  { src: gallery4042, alt: 'AllStrum demonstration with a player seated outdoors', orientation: 'wide' },
  { src: as2, alt: 'AllStrum mounted device product photo', orientation: 'square' },
  { src: gallery3971, alt: 'AllStrum prototype displayed vertically', orientation: 'portrait' },
  { src: gallery4052, alt: 'AllStrum guitar demonstration outdoors', orientation: 'wide' },
  { src: gallery3701, alt: 'AllStrum guitar and device product photo', orientation: 'landscape' },
  { src: gallery4269, alt: 'AllStrum prototype photo', orientation: 'portrait' },
  { src: gallery3230, alt: 'AllStrum indoor demonstration by a window', orientation: 'portrait' },
  { src: gallery4055, alt: 'AllStrum device and guitar resting on an outdoor chair', orientation: 'wide' },
  { src: as4, alt: 'AllStrum device detail product photo', orientation: 'portrait' },
  { src: gallery4276, alt: 'AllStrum device with guitar', orientation: 'portrait' },
  { src: gallery4051, alt: 'AllStrum guitar demonstration near a swing', orientation: 'wide', position: '34% center' },
  { src: gallery4263, alt: 'AllStrum guitar demonstration', orientation: 'portrait' },
  { src: gallery4237, alt: 'AllStrum demonstration moment', orientation: 'portrait' },
  { src: gallery4134, alt: 'AllStrum player experience photo', orientation: 'portrait' },
];

const galleryImageSizes = '(max-width: 560px) 92vw, (max-width: 900px) 46vw, 31vw';
const galleryThumbSizes = '(max-width: 560px) 92vw, (max-width: 900px) 46vw, 23vw';
const visibleGalleryCount = 5;
const galleryRotationDelay = 3000;


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function Hero() {
  const handlePreOrderClick = () => {
    window.open('https://form.typeform.com/to/tIFZxh7l', '_blank', 'noopener,noreferrer');
  };

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

      <div className="scroll-hint" aria-hidden="true">
        <span className="scroll-hint__label">Scroll to Learn More</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
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

function OriginPage() {
  return (
    <div className="route-page origin-page">
      <OriginStory />
    </div>
  );
}

function GalleryPage() {
  const [galleryStart, setGalleryStart] = useState(0);
  const [rotationReset, setRotationReset] = useState(0);
  const [visibleCount, setVisibleCount] = useState(() => (
    window.innerWidth <= 560 ? galleryImages.length : visibleGalleryCount
  ));
  const shiftGallery = (direction) => {
    setGalleryStart((index) => (
      (index + (direction * visibleCount) + galleryImages.length) % galleryImages.length
    ));
    setRotationReset((reset) => reset + 1);
  };
  const visibleImages = Array.from({ length: visibleCount }, (_, offset) => {
    const index = (galleryStart + offset) % galleryImages.length;
    return { ...galleryImages[index], index };
  });

  useEffect(() => {
    const updateVisibleCount = () => {
      const nextCount = window.innerWidth <= 560 ? galleryImages.length : visibleGalleryCount;
      setVisibleCount(nextCount);
      if (nextCount === galleryImages.length) {
        setGalleryStart(0);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  useEffect(() => {
    if (visibleCount === galleryImages.length) return undefined;
    const timer = window.setInterval(() => {
      setGalleryStart((index) => (
        (index + visibleCount + galleryImages.length) % galleryImages.length
      ));
    }, galleryRotationDelay);
    return () => window.clearInterval(timer);
  }, [visibleCount, rotationReset]);

  return (
    <div className="route-page">
      <section className="gallery-page">
        <div className="gallery-page__intro">
          <h1 className="page-eyebrow">See it for yourself</h1>
        </div>

        <div className="gallery-page__grid">
          {visibleCount < galleryImages.length && (
            <button
              className="gallery-arrow gallery-arrow--prev"
              type="button"
              aria-label="Previous photos"
              onClick={() => shiftGallery(-1)}
            >
              &lsaquo;
            </button>
          )}
          {visibleImages.map((image, i) => (
            <figure
              key={`${image.src}-${galleryStart}`}
              className={`gallery-tile gallery-tile--${image.orientation}${i === 0 ? ' gallery-tile--feature' : ''}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                decoding="async"
                loading={i < 4 ? 'eager' : 'lazy'}
                fetchPriority={i < 4 ? 'high' : 'low'}
                sizes={i === 0 ? galleryImageSizes : galleryThumbSizes}
                style={image.position ? { objectPosition: image.position } : undefined}
              />
            </figure>
          ))}
          {visibleCount < galleryImages.length && (
            <button
              className="gallery-arrow gallery-arrow--next"
              type="button"
              aria-label="Next photos"
              onClick={() => shiftGallery(1)}
            >
              &rsaquo;
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

function TestimonialsPage() {
  return (
    <div className="route-page">
      <TestimonialSection />
      <Awards />
    </div>
  );
}

function ContactPage() {
  const handlePreOrderClick = () => {
    window.open('https://form.typeform.com/to/tIFZxh7l', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="route-page route-page--locked">
      <section className="contact-page">
        <motion.div
          className="contact-page__copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1>Bring AllStrum to Your Community</h1>
          <div className="contact-page__actions">
            <a className="contact-link" href="mailto:info@allstrum.com">info@allstrum.com</a>
            <button className="btn primary" onClick={handlePreOrderClick}>Pre-order Now</button>
          </div>
        </motion.div>

        <StrumMorph />
      </section>
    </div>
  );
}

function AppRoutes() {
  const { pathname } = useLocation();
  const showHeader = pathname !== '/features';

  return (
    <div className="App">
      {showHeader && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/origin" element={<OriginPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}

export default App;
