// App.js
import React, { useEffect } from 'react';
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
import gallery3710 from './assets/IMG_3710.JPG';
import gallery4269 from './assets/Copy of IMG_4269.png';
import gallery4276 from './assets/Copy of IMG_4276.png';
import gallery4263 from './assets/Copy of IMG_4263 (1).png';
import gallery4237 from './assets/Copy of IMG_4237 (1).png';
import gallery4134 from './assets/Copy of IMG_4134.png';
import gallery3238 from './assets/Copy of IMG_3238.png';
import gallery3230 from './assets/IMG_3230.png';
import gallery4038 from './assets/IMG_4038.JPG';
import gallery4042 from './assets/IMG_4042.JPG';
import gallery3971 from './assets/IMG_3971.jpeg';
import gallery3701 from './assets/IMG_3701.JPG';
import gallery4050 from './assets/IMG_4050.JPG';
import gallery4051 from './assets/IMG_4051.JPG';
import gallery4052 from './assets/IMG_4052.JPG';
import gallery4055 from './assets/IMG_4055.JPG';
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
  { src: gallery4051, alt: 'AllStrum guitar demonstration near a swing', orientation: 'wide' },
  { src: gallery4263, alt: 'AllStrum guitar demonstration', orientation: 'portrait' },
  { src: gallery4237, alt: 'AllStrum demonstration moment', orientation: 'portrait' },
  { src: gallery4134, alt: 'AllStrum player experience photo', orientation: 'portrait' },
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
    </section>
  );
}

function HomePage() {
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
  const [featuredImage, secondImage, thirdImage, ...supportingImages] = galleryImages;

  return (
    <div className="route-page">
      <section className="gallery-page">
        <div className="gallery-page__intro">
          <h1 className="page-eyebrow">See it for yourself</h1>
        </div>

        <div className="gallery-feature">
          <motion.figure
            className="gallery-feature__main"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={featuredImage.src} alt={featuredImage.alt} decoding="async" />
          </motion.figure>

          <div className="gallery-feature__side">
            {[secondImage, thirdImage].map((image, i) => (
              <motion.figure
                key={image.src}
                className={`gallery-tile gallery-tile--compact gallery-tile--${image.orientation}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.12 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src={image.src} alt={image.alt} decoding="async" />
              </motion.figure>
            ))}
          </div>
        </div>

        <div className="gallery-page__grid">
          {supportingImages.map((image, i) => (
            <motion.figure
              key={image.src}
              className={`gallery-tile gallery-tile--${image.orientation}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={image.src} alt={image.alt} decoding="async" />
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
    <>
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}

export default App;
