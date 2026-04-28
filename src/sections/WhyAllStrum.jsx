import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './WhyAllStrum.css';

/* ── Inline SVG icons — product-specific, no emoji style ── */

/* Hand sweeping across strings = the act of strumming, accessible to anyone */
const InclusiveIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    {/* Strings */}
    <line x1="7"  y1="5" x2="7"  y2="22" stroke="#5ec4ec" strokeWidth="1.4" strokeLinecap="round" opacity="0.55"/>
    <line x1="12" y1="4" x2="12" y2="22" stroke="#5ec4ec" strokeWidth="1.4" strokeLinecap="round" opacity="0.55"/>
    <line x1="17" y1="4" x2="17" y2="22" stroke="#5ec4ec" strokeWidth="1.4" strokeLinecap="round" opacity="0.55"/>
    <line x1="22" y1="5" x2="22" y2="22" stroke="#5ec4ec" strokeWidth="1.4" strokeLinecap="round" opacity="0.55"/>
    {/* Strum arc — the hand sweeping across */}
    <path d="M4 13 Q14.5 9.5 26 14" stroke="#0f518a" strokeWidth="2.2" strokeLinecap="round"/>
    {/* Pick at the end of the stroke */}
    <circle cx="26" cy="14" r="2.8" fill="#F5C87A"/>
  </svg>
);

/* Phone showing a chord diagram = the companion app controlling chords */
const SmartControlIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    {/* Phone outline */}
    <rect x="7.5" y="1.5" width="15" height="27" rx="3" stroke="#0f518a" strokeWidth="1.9"/>
    {/* Screen area */}
    <rect x="9.5" y="5" width="11" height="18" rx="1.5" fill="rgba(15,81,138,0.07)"/>
    {/* Fret lines on screen */}
    <line x1="9.5" y1="10" x2="20.5" y2="10" stroke="#0f518a" strokeWidth="1.1" opacity="0.3"/>
    <line x1="9.5" y1="14" x2="20.5" y2="14" stroke="#0f518a" strokeWidth="1.1" opacity="0.3"/>
    <line x1="9.5" y1="18" x2="20.5" y2="18" stroke="#0f518a" strokeWidth="1.1" opacity="0.3"/>
    {/* String lines on screen */}
    <line x1="12" y1="5" x2="12" y2="23" stroke="#0f518a" strokeWidth="1.1" opacity="0.3"/>
    <line x1="15" y1="5" x2="15" y2="23" stroke="#0f518a" strokeWidth="1.1" opacity="0.3"/>
    <line x1="18" y1="5" x2="18" y2="23" stroke="#0f518a" strokeWidth="1.1" opacity="0.3"/>
    {/* Chord dots — fingering pattern */}
    <circle cx="12" cy="10" r="2"   fill="#5ec4ec"/>
    <circle cx="18" cy="14" r="2"   fill="#5ec4ec"/>
    <circle cx="15" cy="18" r="2"   fill="#0f518a"/>
    {/* Home indicator */}
    <line x1="13.5" y1="26" x2="16.5" y2="26" stroke="#0f518a" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

/* Clean acoustic guitar body + neck = real physical instrument */
const GuitarIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    {/* Neck */}
    <rect x="13" y="1.5" width="4" height="11" rx="2" stroke="#0f518a" strokeWidth="1.9" fill="none"/>
    {/* Nut */}
    <line x1="12.5" y1="4.5" x2="17.5" y2="4.5" stroke="#5ec4ec" strokeWidth="1.6" strokeLinecap="round"/>
    {/* Body — classic figure-8 acoustic shape */}
    <path
      d="M15 12.5
         C10.5 12.5 7 15.5 7 19
         C7 21.5 8.5 23 10 23.5
         C8.5 24 7.5 25 7.5 26
         C7.5 27.8 10.8 29 15 29
         C19.2 29 22.5 27.8 22.5 26
         C22.5 25 21.5 24 20 23.5
         C21.5 23 23 21.5 23 19
         C23 15.5 19.5 12.5 15 12.5Z"
      stroke="#0f518a" strokeWidth="1.9" fill="rgba(15,81,138,0.08)"
    />
    {/* Sound hole */}
    <circle cx="15" cy="20.5" r="3" stroke="#5ec4ec" strokeWidth="1.6" fill="none"/>
    {/* Single center string */}
    <line x1="15" y1="1.5" x2="15" y2="29" stroke="rgba(94,196,236,0.32)" strokeWidth="0.9"/>
  </svg>
);

/* ── Card data ── */
const CARDS = [
  {
    id: 'inclusive',
    Icon: InclusiveIcon,
    accentColor: '#5ec4ec',
    glowColor: 'rgba(94,196,236,0.22)',
    title: 'Inclusive Design',
    body:
      "Whether you're a singer who has always wanted to accompany yourself, a parent searching for the perfect first instrument for your child, or someone with a disability, AllStrum meets you where you are.",
  },
  {
    id: 'smart',
    Icon: SmartControlIcon,
    accentColor: '#0f518a',
    glowColor: 'rgba(15,81,138,0.18)',
    title: 'Smart Control',
    body:
      'The AllStrum app pairs wirelessly with your instrument and shifts chords automatically, so you can focus entirely on rhythm and feel. Browse your favorite songs, compose your own music, or slow things down and work through specific strumming patterns to build your skills at your own pace.',
  },
  {
    id: 'real',
    Icon: GuitarIcon,
    accentColor: '#c89a30',
    glowColor: 'rgba(245,200,122,0.28)',
    title: 'Real Instrument',
    body:
      "The instrument you love shouldn't change. AllStrum attaches to your real guitar or ukulele without compromising the sound or feel. Bring it to a campfire or family gathering and what people hear is a real instrument, played by you.",
  },
];

/* ── Floating background notes ── */
const BG_NOTES = [
  { symbol: '♪', x: '7%',  delay: 0,  dur: 20, color: 'rgba(255,182,193,0.55)' },
  { symbol: '♫', x: '21%', delay: 4,  dur: 26, color: 'rgba(180,160,230,0.5)'  },
  { symbol: '♩', x: '38%', delay: 9,  dur: 18, color: 'rgba(150,220,200,0.55)' },
  { symbol: '♪', x: '57%', delay: 2,  dur: 23, color: 'rgba(255,210,150,0.55)' },
  { symbol: '♫', x: '74%', delay: 6,  dur: 22, color: 'rgba(150,200,240,0.55)' },
  { symbol: '♩', x: '89%', delay: 12, dur: 17, color: 'rgba(210,180,230,0.5)'  },
  { symbol: '♪', x: '93%', delay: 1,  dur: 28, color: 'rgba(180,225,185,0.5)'  },
];

/* ── Framer-motion variants ── */
const titleVariants = {
  hidden:  { opacity: 0, y: 20, letterSpacing: '-0.06em' },
  visible: { opacity: 1, y: 0,  letterSpacing: '-0.02em',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.16 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Mobile breakpoint (matches BounceCards CSS override) ── */
const MOBILE_BP = 767;

/* ── Component ── */
export default function WhyAllStrum() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= MOBILE_BP);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BP);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className="why-section">

      {/* Floating notes + ambient glow blobs */}
      <div className="why-bg" aria-hidden="true">
        {BG_NOTES.map((n, i) => (
          <span
            key={i}
            className="why-note"
            style={{
              left: n.x,
              animationDelay: `${n.delay}s`,
              animationDuration: `${n.dur}s`,
              color: n.color,
            }}
          >
            {n.symbol}
          </span>
        ))}
        <div className="why-blob why-blob--blue"  />
        <div className="why-blob why-blob--purple" />
        <div className="why-blob why-blob--yellow" />
      </div>

      {/* Section header */}
      <div className="why-header">
        <motion.h2
          className="why-title"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          Why AllStrum?
        </motion.h2>
      </div>

      {/* Cards grid */}
      <motion.div
        className="why-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
      >
        {CARDS.map((card) => (
          <motion.div
            key={card.id}
            className="why-card"
            variants={cardVariants}
            whileHover={{ y: -12, transition: { type: 'spring', stiffness: 280, damping: 18 } }}
            style={{ '--glow': card.glowColor, '--accent': card.accentColor }}
          >
            {/* Glow overlay (fades in on hover via CSS) */}
            <div className="why-card__glow" />

            {/* Icon */}
            <div className="why-card__icon-wrap">
              <card.Icon />
              {/* Ripple rings */}
              <div className="why-card__ripple" />
              <div className="why-card__ripple why-card__ripple--2" />
            </div>

            {/* Content */}
            <h3 className="why-card__title">{card.title}</h3>
            <p className="why-card__body">{card.body}</p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
