import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './TestimonialSection.css';

/* ── Testimonial data ── */
const TESTIMONIALS = [
  {
    id: 0,
    short: '"A device like this would allow him to play a familiar song and get further enjoyment out of playing."',
    full: '"Yes. Josh enjoys music and has played with ukuleles before, but does not have the ability (nor interest so far) in creating chords. A device like this would allow him to play a familiar song and get further enjoyment out of playing the instrument."',
    name: 'Parent of Josh',
    role: 'Special Needs Community',
    initials: 'PJ',
    accent: '#5ec4ec',
  },
  {
    id: 1,
    short: '"This technology would greatly benefit his ability to create and contribute creatively with peers."',
    full: '"Yes! Sam has Cerebral Palsy and is deaf & hard of hearing. His physical disability prevents him from using his hands without pain and tremors. But this technology would greatly benefit his ability to create and contribute creatively with peers. He uses music to help comfort and soothe him during difficult times."',
    name: 'Parent of Sam',
    role: 'Cerebral Palsy Community',
    initials: 'PS',
    accent: '#a78bfa',
  },
  {
    id: 2,
    short: '"An adaptive musical instrument like this would be a wonderful way for her to experience playing."',
    full: '"Yes! My daughter Sarah is autistic, and a gestalt language processor — she is very attentive to intonation, cadence, rhythm and melody. Her fine motor skills are not well developed, so an adaptive musical instrument like this would be a wonderful way for her to experience playing an instrument."',
    name: 'Parent of Sarah',
    role: 'Autism Community',
    initials: 'PS',
    accent: '#f472b6',
  },
  {
    id: 3,
    short: '"What a great springboard for the socialization that music brings! I envision confidence following suit."',
    full: '"He would love to create music in this way! He would be able to work on rhythm, melody, harmony, fine motor skills holding and strumming the ukulele. What a great springboard for the socialization that music brings! I envision confidence following suit. Thank you for this amazing invention!"',
    name: 'Music Educator',
    role: 'Special Education Teacher',
    initials: 'ME',
    accent: '#34d399',
  },
  {
    id: 4,
    short: '"Kate loves music. Many of her siblings are taking lessons and she feels very left out."',
    full: '"Yes! Kate loves music. Many of her siblings are taking music lessons and she feels very left out."',
    name: 'Parent of Kate',
    role: 'Music Enthusiast Family',
    initials: 'PK',
    accent: '#F5C87A',
  },
  {
    id: 5,
    short: '"My son loves music and would love to play an instrument but can\'t manage the coordination due to Down Syndrome."',
    full: '"Yes. My son loves music and would love to play an instrument but can\'t manage the coordination of playing chords while strumming due to his Down Syndrome."',
    name: 'Parent of a Music Lover',
    role: 'Down Syndrome Community',
    initials: 'PM',
    accent: '#fb923c',
  },
  {
    id: 6,
    short: '"When my participants can play with their friends and accomplish something so cool it changes everything!"',
    full: '"When my participants can play with their friends and accomplish something so cool like playing an instrument it changes everything! Their mood gets better and more confident. This device can be really instrumental for our participants!"',
    name: 'Camp Counselor',
    role: 'Therapeutic Recreation',
    initials: 'CC',
    accent: '#5ec4ec',
  },
  {
    id: 7,
    short: '"I would love to order some for my camp!"',
    full: '"I would love to order some for my camp!"',
    name: 'Camp Director',
    role: 'Summer Camp Program',
    initials: 'CD',
    accent: '#34d399',
  },
  {
    id: 8,
    short: '"Great for grandparents to connect with young children!"',
    full: '"Great for grandparents to connect with young children!"',
    name: 'Community Member',
    role: 'Intergenerational Connection',
    initials: 'CM',
    accent: '#a78bfa',
  },
  {
    id: 9,
    short: '"My son LOVES music. I have been searching for something to enable him to enjoy music more."',
    full: '"My son LOVES music. I have been searching for something to enable him to enjoy music more, despite him being unable to do many fine motor activities."',
    name: 'Parent of a Music Lover',
    role: 'Fine Motor Challenges Community',
    initials: 'PM',
    accent: '#f472b6',
  },
];

/* ── Small background card ── */
function BgCard({ item }) {
  return (
    <div className="ts-bg-card">
      <p className="ts-bg-card__quote">{item.short}</p>
      <div className="ts-bg-card__footer">
        <div className="ts-bg-card__meta">
          <span className="ts-bg-card__name">{item.name}</span>
          <span className="ts-bg-card__role">{item.role}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Scrolling row (cards duplicated for seamless loop) ── */
function ScrollRow({ direction, speed }) {
  return (
    <div className="ts-scroll-row">
      <div
        className={`ts-scroll-track ts-scroll-track--${direction}`}
        style={{ '--speed': `${speed}s` }}
      >
        {[...TESTIMONIALS, ...TESTIMONIALS].map((item, i) => (
          <BgCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

/* ── Main export ── */
export default function TestimonialSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const timerRef = useRef(null);

  const advance = useCallback(() => {
    setActiveIdx(i => (i + 1) % TESTIMONIALS.length);
  }, []);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 5500);
  }, [advance]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const goTo = (idx) => {
    setActiveIdx(idx);
    resetTimer();
  };

  const prev = () => { goTo((activeIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length); };
  const next = () => { goTo((activeIdx + 1) % TESTIMONIALS.length); };

  const active = TESTIMONIALS[activeIdx];

  return (
    <section className="ts-section" id="testimonials">

      {/* ── Scrolling background rows ── */}
      <div className="ts-bg" aria-hidden="true">
        <ScrollRow direction="left"  speed={44} />
        <ScrollRow direction="right" speed={36} />
      </div>

      {/* ── Gradient overlays: edge fades + center vignette ── */}
      <div className="ts-overlay ts-overlay--edges"  />
      <div className="ts-overlay ts-overlay--vignette" />

      {/* ── Foreground content ── */}
      <div className="ts-foreground">

        {/* Header */}
        <motion.div
          className="ts-header"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="ts-heading">Hear What People Are Saying</h2>
        </motion.div>

        {/* Featured card */}
        <div className="ts-featured-wrap">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              className="ts-featured-card"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{    opacity: 0, y: -14, scale: 0.98 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              style={{ '--accent': active.accent }}
            >
              {/* Glow ring keyed to testimonial accent */}
              <div className="ts-featured-card__glow" />

              <p className="ts-featured-card__quote">{active.full}</p>

                      <div className="ts-featured-card__footer">
                <div className="ts-featured-card__meta">
                  <span className="ts-featured-card__name">{active.name}</span>
                  <span className="ts-featured-card__role">{active.role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="ts-nav">
          <button className="ts-arrow" onClick={prev} aria-label="Previous">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="ts-dots">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                className={`ts-dot${i === activeIdx ? ' ts-dot--active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                style={i === activeIdx ? { background: active.accent } : {}}
              />
            ))}
          </div>

          <button className="ts-arrow" onClick={next} aria-label="Next">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
