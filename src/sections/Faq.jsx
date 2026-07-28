import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Faq.css';

export const FAQ_ITEMS = [
  {
    q: 'How much does AllStrum cost?',
    a: 'AllStrum is still in development and therefore an exact price is not yet available. Pricing will range from $150 - $250 for the device itself, or $450 - $550 for device and guitar package. Reserve yours now and we’ll follow up with more concrete details as soon as we are ready to ship.',
  },
  {
    q: 'Is AllStrum only for people with disabilities?',
    a: 'No. AllStrum was born in the adaptive community, but it’s for anyone who wants to play. It’s a learning tool for beginners, a motivating aid in physical and occupational therapy, and a way to keep casual players strumming. Fender’s research found that 90% of new guitar owners quit within their first year. AllStrum removes the steepest part of the learning curve so you’re playing real songs from day one.',
  },
  {
    q: 'How is AllStrum different from ChordBuddy?',
    a: 'ChordBuddy only supports a limited set of chords, so you can’t play complex songs or choose your key. It also still requires the dexterity and cognitive ability to know each chord and transition between them yourself. AllStrum holds chords down for you automatically in real time from the app: pick a song, choose your key, and just strum.',
  },
  {
    q: 'What instruments does AllStrum work with?',
    a: 'AllStrum attaches to a real guitar or ukulele. You’re playing an actual instrument, not a toy or a simulator.',
  },
  {
    q: 'Do I need any musical experience?',
    a: 'None at all. The companion app handles the chords while you strum, so you can play a real song in your very first session. The fun part, however, is that you WILL get better as you continue to play. Your strumming pattern, sense of rhythm, and timing will make you go from a beginner to an intermediate player in no time.',
  },
  {
    q: 'Can AllStrum be used as a learning tool?',
    a: 'Absolutely. AllStrum is a great way to learn how to play guitar or ukulele. You can gain a sense or rhythm, start strumming, and get a feel for the insturments and chords. This is half the battle. When you are ready, just snap AllStrum off and you are back to your standard guitar'
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function FaqItem({ item, isOpen, onToggle, id }) {
  return (
    <div className={`faq-item${isOpen ? ' faq-item--open' : ''}`}>
      <h3 className="faq-item__heading">
        <button
          type="button"
          className="faq-item__question"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${id}`}
        >
          <span>{item.q}</span>
          <span className="faq-item__chevron" aria-hidden="true">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6l5 5 5-5" />
            </svg>
          </span>
        </button>
      </h3>
      <div id={`faq-answer-${id}`} className="faq-item__answer" hidden={!isOpen}>
        <p>{item.a}</p>
      </div>
    </div>
  );
}

export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="faq-section">
      <div className="faq-inner">
        <motion.div
          className="faq-header"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className="faq-eyebrow">Questions &amp; Answers</span>
          <h2 className="faq-heading">Frequently Asked Questions</h2>
        </motion.div>

        <motion.div
          className="faq-list"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem
              key={item.q}
              id={i}
              item={item}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
