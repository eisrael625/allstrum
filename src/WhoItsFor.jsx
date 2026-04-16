import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import TextType from './TextType';
import camp     from './Camp.jpg';
import soldier  from './Soldier.jpeg';
import campfire from './assets/vitaly-gariev-qRq0eoSCj-Q-unsplash.jpg';
import kidsMusic from './assets/vitaly-gariev-NVWc_fyctlk-unsplash.jpg';
import './WhoItsFor.css';

const CARDS = [
  {
    img: camp,
    imgPos: 'center',
    title: 'Campers Who Wanted to Play',
    desc: 'A few years ago, as a counselor at a camp for children with special needs, I saw campers who loved music and desperately wanted to feel like they were creating it themselves. Their excitement at playing was unforgettable.',
  },
  {
    img: kidsMusic,
    imgPos: 'center top',
    title: 'Inspire Kids to Love Music',
    desc: 'AllStrum lets children skip the barrier and go straight to the joy. From their very first session, they can strum along to songs they actually know and love.',
  },
  {
    img: campfire,
    imgPos: 'center',
    title: 'Casual Playing',
    desc: "Not everyone who picks up an instrument wants to become a musician. AllStrum is for those people too. Music doesn't always have to be a pursuit — sometimes it just has to feel good.",
  },
  {
    img: soldier,
    imgPos: 'center top',
    title: 'Musicians Who Lost the Ability',
    desc: "A soldier injured in battle, a girl whose tremor prevents her from holding chords, a man paralyzed in one arm — their stories pushed this project forward from a prototype ukulele to the AllStrum Guitar.",
  },
];

/* ── Animation variants ── */
const rowVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const cardVariants = {
  hidden:   { opacity: 0, y: 52 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Single card ── */
function WhoCard({ card, index, hoveredIdx, setHoveredIdx }) {
  const innerRef = useRef(null);
  const [tilt, setTilt]         = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);

  const isHovered = hoveredIdx === index;
  const isDimmed  = hoveredIdx !== null && !isHovered;

  const handleMouseMove = useCallback((e) => {
    const el = innerRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width  - 0.5;
    const cy = (e.clientY - r.top)  / r.height - 0.5;
    setTilt({ x: cy * -7, y: cx * 7 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHoveredIdx(null);
  }, [setHoveredIdx]);

  const outerClass = [
    'wif-card-outer',
    isHovered && 'wif-card-outer--hovered',
    isDimmed  && 'wif-card-outer--dimmed',
    expanded  && 'wif-card-outer--expanded',
  ].filter(Boolean).join(' ');

  return (
    <motion.div className={outerClass} variants={cardVariants}>
      <div
        ref={innerRef}
        className="wif-card"
        style={{
          backgroundImage:    `url(${card.img})`,
          backgroundPosition: card.imgPos,
          /* tilt is fast (0.1s) while mouse moves, slow (0.45s) on reset */
          transition: (tilt.x || tilt.y)
            ? 'transform 0.1s ease, box-shadow 0.35s ease'
            : 'transform 0.45s ease, box-shadow 0.35s ease',
          transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
        onMouseEnter={() => setHoveredIdx(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setExpanded(p => !p)}
        role="button"
        tabIndex={0}
        aria-label={card.title}
        onKeyDown={e => e.key === 'Enter' && setExpanded(p => !p)}
      >
        <div className="wif-card__overlay">
          <h3 className="wif-card__title">{card.title}</h3>
          <p className="wif-card__desc">{card.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ── */
export default function WhoItsFor() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <section id="story" className="wif-section">

      <motion.div
        className="wif-header"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <TextType
          as="h2"
          className="wif-title"
          text={[
            'Who AllStrum Is For',
            'Beginners. Dreamers. Everyone.',
            'Kids taking their first steps.',
            'Musicians finding their way back.',
          ]}
          typingSpeed={75}
          deletingSpeed={50}
          pauseDuration={2000}
          showCursor
          cursorCharacter="_"
          cursorBlinkDuration={0.5}
        />
      </motion.div>

      <motion.div
        className="wif-row"
        variants={rowVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
      >
        {CARDS.map((card, i) => (
          <WhoCard
            key={card.title}
            card={card}
            index={i}
            hoveredIdx={hoveredIdx}
            setHoveredIdx={setHoveredIdx}
          />
        ))}
      </motion.div>

    </section>
  );
}
