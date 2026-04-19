import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './AppFeatures.css';

/* ── SVG icons (brand palette, 2px stroke, 32×32) ── */
const SongsIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    <path d="M11.5 22V10.5l14-3V19" stroke="#0f518a" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8.5" cy="22" r="3.5" stroke="#0f518a" strokeWidth="1.9"/>
    <circle cx="22.5" cy="19" r="3.5" stroke="#5ec4ec" strokeWidth="1.9"/>
  </svg>
);

const ChordsIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    <rect x="5" y="4" width="20" height="22" rx="3" stroke="#0f518a" strokeWidth="1.9"/>
    <line x1="11" y1="4" x2="11" y2="26" stroke="#0f518a" strokeWidth="1.3" opacity="0.25"/>
    <line x1="16" y1="4" x2="16" y2="26" stroke="#0f518a" strokeWidth="1.3" opacity="0.25"/>
    <line x1="21" y1="4" x2="21" y2="26" stroke="#0f518a" strokeWidth="1.3" opacity="0.25"/>
    <line x1="5"  y1="10" x2="25" y2="10" stroke="#0f518a" strokeWidth="1.3" opacity="0.25"/>
    <line x1="5"  y1="16" x2="25" y2="16" stroke="#0f518a" strokeWidth="1.3" opacity="0.25"/>
    <circle cx="11" cy="16" r="2.6" fill="#5ec4ec"/>
    <circle cx="21" cy="10" r="2.6" fill="#5ec4ec"/>
    <circle cx="16" cy="16" r="2.6" fill="#0f518a"/>
  </svg>
);

const ComposeIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    <path d="M19.5 4.5L25.5 10.5L10 26H4V20L19.5 4.5Z" stroke="#0f518a" strokeWidth="1.9" strokeLinejoin="round"/>
    <path d="M16.5 7.5L22.5 13.5" stroke="#5ec4ec" strokeWidth="1.9" strokeLinecap="round"/>
    <line x1="3" y1="26" x2="9" y2="26" stroke="#0f518a" strokeWidth="1.9" strokeLinecap="round"/>
  </svg>
);

const TempoIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    <path d="M6 28a9 9 0 0118 0" stroke="#0f518a" strokeWidth="1.9" strokeLinecap="round"/>
    <circle cx="15" cy="19" r="5.5" stroke="#0f518a" strokeWidth="1.9"/>
    <line x1="15" y1="19" x2="19.5" y2="14.5" stroke="#5ec4ec" strokeWidth="2" strokeLinecap="round"/>
    <line x1="15" y1="19" x2="15" y2="15" stroke="#0f518a" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="4" x2="18" y2="4" stroke="#0f518a" strokeWidth="1.9" strokeLinecap="round"/>
    <line x1="15" y1="4" x2="15" y2="9" stroke="#0f518a" strokeWidth="1.9" strokeLinecap="round"/>
  </svg>
);

const SyncIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    <circle cx="9"  cy="10" r="4.5" stroke="#0f518a" strokeWidth="1.9"/>
    <circle cx="21" cy="10" r="4.5" stroke="#5ec4ec" strokeWidth="1.9"/>
    <path d="M2 27c0-3.866 3.134-7 7-7h3" stroke="#0f518a" strokeWidth="1.9" strokeLinecap="round"/>
    <path d="M28 27c0-3.866-3.134-7-7-7h-3" stroke="#5ec4ec" strokeWidth="1.9" strokeLinecap="round"/>
    <path d="M13 20h4" stroke="#0f518a" strokeWidth="1.9" strokeLinecap="round"/>
  </svg>
);

const StreakIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    <path
      d="M15 2.5C15 2.5 8 9.5 8 16a7 7 0 0014 0C22 9.5 15 2.5 15 2.5Z"
      stroke="#F5C87A" strokeWidth="1.9" strokeLinejoin="round"
      fill="rgba(245,200,122,0.18)"
    />
    <path
      d="M15 17.5C15 17.5 12 19 12 21.5a3 3 0 006 0C18 19 15 17.5 15 17.5Z"
      fill="#F5C87A"
    />
  </svg>
);

const FEATURES = [
  {
    id: 'songs',
    Icon: SongsIcon,
    title: 'Play Your Favorite Songs',
    desc: 'Browse a growing catalog and play along in real time. The app shifts every chord for you — you bring the rhythm.',
  },
  {
    id: 'chords',
    Icon: ChordsIcon,
    title: 'Practice Specific Chords',
    desc: 'Zero in on the chords you find hardest. Loop a transition, slow it down, and build muscle memory at your own pace.',
  },
  {
    id: 'compose',
    Icon: ComposeIcon,
    title: 'Compose Your Own Music',
    desc: 'Arrange your own chord progressions, name them, and play them back. Write originals from your very first session.',
  },
  {
    id: 'tempo',
    Icon: TempoIcon,
    title: 'Set Your Tempo',
    desc: "Start slow, build speed. The app matches your pace exactly — no metronome anxiety, just progress on your terms.",
  },
  {
    id: 'sync',
    Icon: SyncIcon,
    title: 'Sync Up With Others',
    desc: 'Play together in real time. Teachers are already bringing AllStrum into classroom settings for group lessons and collaborative playing — making music a shared experience from day one.',
  },
  {
    id: 'streak',
    Icon: StreakIcon,
    title: 'Build Your Playing Streak',
    desc: 'Track daily sessions and watch your streak grow. Even five minutes counts. Consistency builds players faster than long, infrequent sessions.',
  },
];

const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function AppFeatures() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="af-section">

      <motion.div
        className="af-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="af-eyebrow">The Companion App</span>
        <h2 className="af-title">Everything You Need to Play</h2>
        <p className="af-subtitle">
          The AllStrum app is the brain behind the instrument. Six features designed
          to make every session feel rewarding.
        </p>
      </motion.div>

      <motion.div
        className="af-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
      >
        {FEATURES.map((f) => (
          <motion.div
            key={f.id}
            className={`af-card${activeId === f.id ? ' af-card--active' : ''}`}
            variants={cardVariants}
            onHoverStart={() => setActiveId(f.id)}
            onHoverEnd={() => setActiveId(null)}
          >
            <div className="af-card__icon-wrap">
              <f.Icon />
            </div>
            <h3 className="af-card__title">{f.title}</h3>
            <p className="af-card__desc">{f.desc}</p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}
