import React from 'react';
import { motion } from 'framer-motion';
import guitarImg  from '../assets/AS1.jpeg';
import ukuleleImg from 'src/ukulelePic.jpg';
import './DemoSection.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } },
};

function ProductShowcase({ side, img, eyebrow, title }) {
  return (
    <div className={`ds-showcase ds-showcase--${side}`}>
      <img
        src={img}
        alt={title}
        className="ds-showcase__img"
      />

      <div className={`ds-showcase__fade ds-showcase__fade--${side}`} />

      <motion.div
        className={`ds-showcase__content ds-showcase__content--${side}`}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <span className="ds-showcase__eyebrow">{eyebrow}</span>
        <h2 className="ds-showcase__title">{title}</h2>
        <div className="ds-showcase__rule" />
      </motion.div>
    </div>
  );
}

export default function DemoSection() {
  return (
    <section id="products" className="ds-section">

      {/* ── Product showcases ── */}
      <ProductShowcase
        side="right"
        img={ukuleleImg}
        eyebrow="Where It All Started"
        title="AllStrum Ukulele"
      />

      <ProductShowcase
        side="left"
        img={guitarImg}
        eyebrow="The Upgrade"
        title="AllStrum Guitar"
      />

    </section>
  );
}
