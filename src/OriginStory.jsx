import React from 'react';
import { motion } from 'framer-motion';
import campImg from './Camp.jpg';
import './OriginStory.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export default function OriginStory() {
  return (
    <section className="origin-section">
      <div className="origin-inner">

        {/* Image column */}
        <motion.div
          className="origin-image-col"
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <figure className="origin-figure">
            <div className="origin-image-frame">
              <img src={campImg} alt="Campers at summer camp" className="origin-image" />
            </div>
            <figcaption className="origin-caption">
              In memory of Yona Brief, pictured center, whose kindness and love of guitar continue to inspire us.
            </figcaption>
          </figure>
        </motion.div>

        {/* Text column */}
        <div className="origin-text-col">

          <motion.span
            className="origin-eyebrow"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            How It Started
          </motion.span>

          <motion.h2
            className="origin-heading"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            It Started at a Summer Camp
          </motion.h2>

          <motion.blockquote
            className="origin-quote"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.16, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            "I watched a camper hold a ukulele for the first time and wish, with everything in him,
            that he could play. That moment changed everything."
          </motion.blockquote>

          <motion.div
            className="origin-body"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.22, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>
              A few years ago, Eytan was a counselor at a summer camp for children with special
              needs. He watched campers who loved music — who felt it deeply, who desperately wanted
              to be part of it — but had no way to actually play. The barrier was never interest.
              It was the instrument.
            </p>
            <p>
              So he built one that removed the barrier. The first AllStrum was a modified ukulele,
              connected to an app that shifted chords automatically while a camper strummed. No
              theory. No finger positions. Just music — and the look on a kid's face the first time
              they played a real song.
            </p>
            <p>
              That prototype became AllStrum. And the campers who inspired it are still why
              everything we build starts with accessibility first.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
