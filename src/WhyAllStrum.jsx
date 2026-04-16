import React from 'react';
import { motion } from 'framer-motion';
import BounceCards from './BounceCards';
import as1 from './assets/AS1.jpeg';
import as2 from './assets/AS2.png';
import as3 from './assets/AS3.png';
import as4 from './assets/AS4.png';
import as5 from './assets/AS5.jpeg';
import './WhyAllStrum.css';

/* ── Inline SVG icons ── */
const InclusiveIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    <circle cx="15" cy="7.5" r="3.5" fill="#0f518a" />
    <path d="M7 25c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#0f518a" strokeWidth="2" strokeLinecap="round" />
    <circle cx="5.5" cy="11" r="2.5" fill="rgba(94,196,236,0.7)" />
    <circle cx="24.5" cy="11" r="2.5" fill="rgba(94,196,236,0.7)" />
    <path d="M2.5 22.5c0-3.038 2.462-5.5 5.5-5.5" stroke="rgba(94,196,236,0.7)" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M27.5 22.5c0-3.038-2.462-5.5-5.5-5.5" stroke="rgba(94,196,236,0.7)" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M15 17l-2.5 3.5 2.5 1.2 2.5-1.2L15 17z" fill="#5ec4ec" />
  </svg>
);

const SmartControlIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    <rect x="3" y="9" width="24" height="16" rx="3.5" stroke="#0f518a" strokeWidth="2" />
    <path d="M9 18 L12.5 13 L16 17 L19.5 11" stroke="#5ec4ec" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9" cy="18" r="1.8" fill="#0f518a" />
    <circle cx="19.5" cy="11" r="1.8" fill="#5ec4ec" />
    <path d="M11 6h8" stroke="#0f518a" strokeWidth="2" strokeLinecap="round" />
    <circle cx="11" cy="6" r="1.3" fill="#F5C87A" />
    <circle cx="19" cy="6" r="1.3" fill="#F5C87A" />
  </svg>
);

const GuitarIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
    {/* Headstock */}
    <rect x="10.5" y="0.5" width="7" height="3.5" rx="1.5" fill="#0f518a" />
    {/* Tuning pegs */}
    <circle cx="9.5" cy="2.2" r="1.2" fill="#5ec4ec" opacity="0.75" />
    <circle cx="18.5" cy="2.2" r="1.2" fill="#5ec4ec" opacity="0.75" />
    {/* Nut */}
    <rect x="12" y="4" width="4" height="1" rx="0.5" fill="#5ec4ec" opacity="0.8" />
    {/* Neck */}
    <rect x="12.5" y="5" width="3" height="8.5" fill="#0f518a" opacity="0.8" />
    {/* Guitar body */}
    <path
      d="M12.5 13.5 C8 14 5.5 17 6.5 20 C7 21.5 9.5 21.5 9.5 23 C9.5 26 11.5 27.5 14 27.5 C16.5 27.5 18.5 26 18.5 23 C18.5 21.5 21 21.5 21.5 20 C22.5 17 20 14 15.5 13.5 Z"
      stroke="#0f518a" strokeWidth="1.8" fill="rgba(15,81,138,0.1)" strokeLinejoin="round"
    />
    {/* Sound hole */}
    <circle cx="14" cy="21.5" r="2.6" stroke="#5ec4ec" strokeWidth="1.4" fill="none" />
    {/* Center string */}
    <line x1="14" y1="0.5" x2="14" y2="27.5" stroke="rgba(94,196,236,0.38)" strokeWidth="0.9" />
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
      'Whether you are a singer who has always wanted to accompany yourself, a parent searching for the perfect first instrument for your child, a hobbyist who never quite found the time to take lessons, or someone with a disability or special need who deserves to feel the joy of making music — AllStrum meets you exactly where you are.',
  },
  {
    id: 'smart',
    Icon: SmartControlIcon,
    accentColor: '#0f518a',
    glowColor: 'rgba(15,81,138,0.18)',
    title: 'Smart Control',
    body:
      'The AllStrum companion app connects to the instrument and shifts chords automatically, so you can focus entirely on rhythm and feel. Browse your favorite songs and play along in real time, or slow things down and work through specific strumming patterns to build your skills at your own pace.',
  },
  {
    id: 'real',
    Icon: GuitarIcon,
    accentColor: '#c89a30',
    glowColor: 'rgba(245,200,122,0.28)',
    title: 'Real Instrument',
    body:
      "AllStrum attaches to a real guitar or ukulele without compromising the instrument's sound or feel. Bring it to a campfire or a family gathering and what people hear is a real instrument played by you.",
  },
];

/* ── Floating background notes ── */
const BG_NOTES = [
  { symbol: '♪', x: '7%',  delay: 0,  dur: 20, color: 'rgba(255,182,193,0.55)' },  // pastel pink
  { symbol: '♫', x: '21%', delay: 4,  dur: 26, color: 'rgba(180,160,230,0.5)'  },  // pastel lavender
  { symbol: '♩', x: '38%', delay: 9,  dur: 18, color: 'rgba(150,220,200,0.55)' },  // pastel mint
  { symbol: '♪', x: '57%', delay: 2,  dur: 23, color: 'rgba(255,210,150,0.55)' },  // pastel peach
  { symbol: '♫', x: '74%', delay: 6,  dur: 22, color: 'rgba(150,200,240,0.55)' },  // pastel sky
  { symbol: '♩', x: '89%', delay: 12, dur: 17, color: 'rgba(210,180,230,0.5)'  },  // pastel lilac
  { symbol: '♪', x: '93%', delay: 1,  dur: 28, color: 'rgba(180,225,185,0.5)'  },  // pastel sage
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

/* ── Component ── */
export default function WhyAllStrum() {
  return (
    <section className="why-section">

      {/* Floating background music notes */}
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
        {/* Slow ambient glow blobs */}
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

      {/* Gallery bridge */}
      <motion.div
        className="why-gallery-bridge"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="why-gallery-line" />
        <p className="why-gallery-label">See the device up close</p>
        <div className="why-gallery-line" />
      </motion.div>

      {/* Bounce Cards gallery */}
      <div className="why-gallery">
        <BounceCards
          className="custom-bounceCards"
          images={[as1, as2, as3, as4, as5]}
          containerWidth={1100}
          containerHeight={520}
          animationDelay={0.3}
          animationStagger={0.1}
          easeType="elastic.out(1, 0.5)"
          transformStyles={[
            "rotate(5deg) translate(-320px)",
            "rotate(0deg) translate(-160px)",
            "rotate(-3deg)",
            "rotate(4deg) translate(160px)",
            "rotate(-5deg) translate(320px)",
          ]}
          enableHover={true}
        />
      </div>

    </section>
  );
}
