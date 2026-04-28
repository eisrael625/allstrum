import React from 'react';
import { motion } from 'framer-motion';
import TextType from '../components/TextType';
import './WhoItsFor.css';

export default function WhoItsFor() {
  return (
    <section id="who-its-for" className="wif-section">
      <motion.div
        className="wif-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <TextType
          as="h2"
          className="wif-title"
          text="Who AllStrum Is For"
          typingSpeed={75}
          loop={false}
          showCursor
          cursorCharacter="_"
          cursorBlinkDuration={0.5}
          startOnVisible
        />
        <p className="wif-lead">Four different starting points. One instrument.</p>
      </motion.div>
    </section>
  );
}
