import React from 'react';
import { motion } from 'framer-motion';
import productImg from '../assets/AS4-gallery.webp';
import './WhyAllStrum.css';

const FEATURES = [
  {
    id: 'inclusive',
    title: 'Inclusive Design',
    body: "AllStrum meets you where you're at, regardless of ability or disability.",
  },
  {
    id: 'smart',
    title: 'Smart Control',
    body: 'Make music at your own pace.',
  },
  {
    id: 'real',
    title: 'Real Instrument',
    body: 'Play on a real guitar or ukulele.',
  },
];

const listVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Component ── */
export default function WhyAllStrum() {
  return (
    <section className="why-section">

      {/* Full-bleed image */}
      <div className="why-img-positioner" aria-hidden="true">
        <img src={productImg} alt="" className="why-img" />
      </div>

      {/* Gradient fade — darkens right side for text */}
      <div className="why-fade" />


      {/* Overlaid text */}
      <motion.div
        className="why-content"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.span className="why-eyebrow" variants={itemVariants}>
          Why AllStrum?
        </motion.span>

        {FEATURES.map((f) => (
          <motion.div key={f.id} className="why-feature" variants={itemVariants}>
            <h3 className="why-feature__title">{f.title}</h3>
            <p className="why-feature__body">{f.body}</p>
          </motion.div>
        ))}

        <motion.div className="why-rule" variants={itemVariants} />
      </motion.div>

    </section>
  );
}
