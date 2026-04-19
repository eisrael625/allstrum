import React from 'react';
import { motion } from 'framer-motion';
import guitarImg  from './assets/AS1.jpeg';
import ukuleleImg from 'src/ukulelePic.jpg';
import './DemoSection.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } },
};

function ProductShowcase({ side, img, eyebrow, title, desc }) {
  const isRight = side === 'right';
  return (
    <div className={`ds-showcase ds-showcase--${side}`}>
      {/* Full-bleed product image */}
      <img
        src={img}
        alt={title}
        className="ds-showcase__img"
      />

      {/* Gradient that darkens the text side */}
      <div className={`ds-showcase__fade ds-showcase__fade--${side}`} />

      {/* Text block */}
      <motion.div
        className={`ds-showcase__content ds-showcase__content--${side}`}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <span className="ds-showcase__eyebrow">{eyebrow}</span>
        <h2 className="ds-showcase__title">{title}</h2>
        <p className="ds-showcase__desc">{desc}</p>
        <div className="ds-showcase__rule" />
      </motion.div>
    </div>
  );
}

export default function DemoSection() {
  return (
    <section id="videos" className="ds-section">

      {/* ── Product showcases ── */}
      <ProductShowcase
        side="right"
        img={guitarImg}
        eyebrow="The Guitar"
        title="AllStrum Guitar"
        desc="Attaches to any standard guitar without modifying the instrument. The companion app connects wirelessly and shifts chords in real time — you focus entirely on strumming. No theory, no finger positions. Just the feel of a real guitar in your hands from the very first session."
      />

      <ProductShowcase
        side="left"
        img={ukuleleImg}
        eyebrow="Where It All Started"
        title="AllStrum Ukulele"
        desc="The original AllStrum prototype — built for campers who wanted to play but couldn't manage chord positions. Smaller, lighter, and immediately accessible. The same app-powered chord system in a form that goes anywhere and welcomes anyone."
      />

    </section>
  );
}
