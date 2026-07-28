import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import OriginStory from '../sections/OriginStory';
import TestimonialSection from '../sections/TestimonialSection';
import Awards from '../sections/Awards';
import Faq from '../sections/Faq';
import usePrefersReducedMotion from '../lib/usePrefersReducedMotion';
import responsiveImages from '../assets/resized';

const galleryImages = [
  { img: 'gallery-4038', alt: 'AllStrum being played on outdoor campus steps', orientation: 'wide' },
  { img: 'as1-gallery', alt: 'AllStrum guitar setup product photo', orientation: 'landscape' },
  { img: 'gallery-3710', alt: 'AllStrum founders holding a guitar and device outside a campus building', orientation: 'portrait' },
  { img: 'gallery-4050', alt: 'AllStrum being played by a seated player outdoors', orientation: 'wide' },
  { img: 'as3-gallery', alt: 'AllStrum close-up product photo', orientation: 'portrait' },
  { img: 'gallery-3238', alt: 'AllStrum indoor demonstration with a player smiling', orientation: 'landscape' },
  { img: 'gallery-4042', alt: 'AllStrum demonstration with a player seated outdoors', orientation: 'wide' },
  { img: 'as2-gallery', alt: 'AllStrum mounted device product photo', orientation: 'square' },
  { img: 'gallery-3971', alt: 'AllStrum prototype displayed vertically', orientation: 'portrait' },
  { img: 'gallery-4052', alt: 'AllStrum guitar demonstration outdoors', orientation: 'wide' },
  { img: 'gallery-3701', alt: 'AllStrum guitar and device product photo', orientation: 'landscape' },
  { img: 'gallery-4269', alt: 'AllStrum prototype photo', orientation: 'portrait' },
  { img: 'gallery-3230', alt: 'AllStrum indoor demonstration by a window', orientation: 'portrait' },
  { img: 'gallery-4055', alt: 'AllStrum device and guitar resting on an outdoor chair', orientation: 'wide' },
  { img: 'as4-gallery', alt: 'AllStrum device detail product photo', orientation: 'portrait' },
  { img: 'gallery-4276', alt: 'AllStrum device with guitar', orientation: 'portrait' },
  { img: 'gallery-4051', alt: 'AllStrum guitar demonstration near a swing', orientation: 'wide', position: '34% center' },
  { img: 'gallery-4263', alt: 'AllStrum guitar demonstration', orientation: 'portrait' },
  { img: 'gallery-4237', alt: 'AllStrum demonstration moment', orientation: 'portrait' },
  { img: 'gallery-4134', alt: 'AllStrum player experience photo', orientation: 'portrait' },
];

const galleryImageSizes = '(max-width: 560px) 92vw, (max-width: 900px) 46vw, 31vw';
const galleryThumbSizes = '(max-width: 560px) 92vw, (max-width: 900px) 46vw, 23vw';
const visibleGalleryCount = 5;
const galleryRotationDelay = 6000;

const slideVariants = {
  enter: (direction) => ({ opacity: 0, x: direction > 0 ? 60 : -60, scale: 0.98 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction) => ({ opacity: 0, x: direction > 0 ? -60 : 60, scale: 0.98 }),
};

function GallerySection() {
  const [galleryStart, setGalleryStart] = useState(0);
  const [rotationReset, setRotationReset] = useState(0);
  const [visibleCount, setVisibleCount] = useState(() => (
    window.innerWidth <= 560 ? 1 : visibleGalleryCount
  ));
  const [slideDirection, setSlideDirection] = useState(1);
  const [hoverPaused, setHoverPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [userPaused, setUserPaused] = useState(false);
  const touchStartX = useRef(null);

  const autoRotate = !userPaused && !hoverPaused && !prefersReducedMotion;

  const shiftGallery = (direction) => {
    setSlideDirection(direction);
    setGalleryStart((index) => (
      (index + (direction * visibleCount) + galleryImages.length) % galleryImages.length
    ));
    setRotationReset((reset) => reset + 1);
  };
  const visibleImages = Array.from({ length: visibleCount }, (_, offset) => {
    const index = (galleryStart + offset) % galleryImages.length;
    return { ...galleryImages[index], index };
  });

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 45) shiftGallery(dx < 0 ? 1 : -1);
  };

  useEffect(() => {
    const updateVisibleCount = () => {
      const nextCount = window.innerWidth <= 560 ? 1 : visibleGalleryCount;
      setVisibleCount(nextCount);
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  useEffect(() => {
    if (visibleCount === galleryImages.length || !autoRotate) return undefined;
    const timer = window.setInterval(() => {
      setSlideDirection(1);
      setGalleryStart((index) => (
        (index + visibleCount + galleryImages.length) % galleryImages.length
      ));
    }, galleryRotationDelay);
    return () => window.clearInterval(timer);
  }, [visibleCount, rotationReset, autoRotate]);

  const isCarousel = visibleCount === 1;
  const currentImage = visibleImages[0];

  return (
    <section className="gallery-page" data-header-theme="light">
      <div className="gallery-page__intro">
        <h2>See AllStrum in Action</h2>
      </div>

      <div
        className={`gallery-page__grid${isCarousel ? ' gallery-page__grid--carousel' : ''}`}
        onTouchStart={isCarousel ? handleTouchStart : undefined}
        onTouchEnd={isCarousel ? handleTouchEnd : undefined}
        onMouseEnter={() => setHoverPaused(true)}
        onMouseLeave={() => setHoverPaused(false)}
        onFocus={() => setHoverPaused(true)}
        onBlur={() => setHoverPaused(false)}
      >
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
        {isCarousel ? (
          <AnimatePresence mode="wait" custom={slideDirection} initial={false}>
            <motion.figure
              key={`${currentImage.img}-${galleryStart}`}
              className="gallery-tile gallery-tile--carousel"
              custom={slideDirection}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={responsiveImages[currentImage.img].src}
                srcSet={responsiveImages[currentImage.img].srcSet}
                alt={currentImage.alt}
                decoding="async"
                loading="eager"
                fetchPriority="high"
                sizes={galleryImageSizes}
                style={currentImage.position ? { objectPosition: currentImage.position } : undefined}
              />
            </motion.figure>
          </AnimatePresence>
        ) : (
          visibleImages.map((image, i) => (
            <figure
              key={`${image.img}-${galleryStart}`}
              className={`gallery-tile gallery-tile--${image.orientation}${i === 0 ? ' gallery-tile--feature' : ''}`}
            >
              <img
                src={responsiveImages[image.img].src}
                srcSet={responsiveImages[image.img].srcSet}
                alt={image.alt}
                decoding="async"
                loading={i < 4 ? 'eager' : 'lazy'}
                fetchPriority={i < 4 ? 'high' : 'low'}
                sizes={i === 0 ? galleryImageSizes : galleryThumbSizes}
                style={image.position ? { objectPosition: image.position } : undefined}
              />
            </figure>
          ))
        )}
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

      <div className="gallery-controls">
        <button
          className="gallery-pause"
          type="button"
          aria-pressed={userPaused}
          aria-label={userPaused ? 'Resume slideshow' : 'Pause slideshow'}
          onClick={() => setUserPaused((paused) => !paused)}
        >
          {userPaused ? (
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M4.5 2.8a.8.8 0 0 1 1.2-.7l8 5.2a.8.8 0 0 1 0 1.4l-8 5.2a.8.8 0 0 1-1.2-.7V2.8z" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="3.5" y="2.5" width="3.4" height="11" rx="1" /><rect x="9.1" y="2.5" width="3.4" height="11" rx="1" /></svg>
          )}
        </button>
        {isCarousel && (
          <div className="gallery-counter" aria-live="polite">
            <span className="gallery-counter__current">{galleryStart + 1}</span>
            <span className="gallery-counter__divider">/</span>
            <span className="gallery-counter__total">{galleryImages.length}</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="route-page about-page">
      <OriginStory />
      <GallerySection />
      <TestimonialSection />
      <Awards />
      <Faq />
    </div>
  );
}
