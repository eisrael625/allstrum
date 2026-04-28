// App.js
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import YouTubeVideo from './Youtube';
import TestimonialSection from './TestimonialSection';
import WhyAllStrum from './WhyAllStrum';
import WhoItsFor from './WhoItsFor';
import UserGroups from './UserGroups';
import OriginStory from './OriginStory';
import DemoSection from './DemoSection';
import Awards from './Awards';
import AppAnimation from './pages/AppAnimation';
import FeaturesPage from './pages/FeaturesPage';
import as1 from './assets/AS1-gallery.webp';
import as2 from './assets/AS2-gallery.webp';
import as3 from './assets/AS3-gallery.webp';
import as4 from './assets/AS4-gallery.webp';
import as5 from './assets/AS5-gallery.webp';
import './App.css';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const galleryImages = [
  { src: as1, alt: 'AllStrum guitar device in use', title: 'Guitar Setup' },
  { src: as2, alt: 'AllStrum device on an instrument', title: 'Mounted Device' },
  { src: as3, alt: 'AllStrum close-up with guitar', title: 'Playing Close-Up' },
  { src: as4, alt: 'AllStrum device close-up', title: 'Device Detail' },
  { src: as5, alt: 'AllStrum guitar demonstration', title: 'Live Demo' },
];

const contactAudiences = [
  'Individuals',
  'Schools',
  'Therapy Centers',
  'Senior Homes',
  'Camps',
  'Community Programs',
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
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
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <WhyAllStrum />
      <WhoItsFor />
      <UserGroups />
      <DemoSection />
      <AppAnimation />
    </>
  );
}

function OriginPage() {
  return (
    <div className="route-page">
      <OriginStory />
    </div>
  );
}

function GalleryPage() {
  return (
    <div className="route-page">
      <section className="gallery-page">
        <div className="gallery-page__header">
          <span className="page-eyebrow">Gallery</span>
          <h1>AllStrum Up Close</h1>
        </div>
        <div className="gallery-page__grid">
          {galleryImages.map((image, i) => (
            <motion.figure
              key={image.src}
              className="gallery-tile"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={image.src} alt={image.alt} width="560" height="420" decoding="async" />
              <figcaption>{image.title}</figcaption>
            </motion.figure>
          ))}
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
    <div className="route-page">
      <section className="contact-page">
        <motion.div
          className="contact-page__copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="page-eyebrow">Contact</span>
          <h1>Bring AllStrum to Your Community</h1>
          <p>
            We want to hear from individuals, families, schools, therapy centers, senior living
            communities, camps, and music programs building more accessible ways to play.
          </p>
          <div className="contact-page__actions">
            <a className="contact-link" href="mailto:info@allstrum.com">info@allstrum.com</a>
            <button className="btn primary" onClick={handlePreOrderClick}>Pre-order Now</button>
          </div>
        </motion.div>

        <div className="contact-orbit" aria-hidden="true">
          {contactAudiences.map((item, i) => (
            <motion.div
              key={item}
              className="contact-orbit__item"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AppRoutes() {
  return (
    <div className="App">
      <Header />
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
    <BrowserRouter>
      <ScrollToTop />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
