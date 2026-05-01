import React from 'react';
import { motion } from 'framer-motion';
import tsaiImg        from '../assets/tsai.webp';
import startupYaleImg from '../assets/startup-yale.webp';
import yaleLogoImg    from '../assets/yale-logo.webp';
import { EncryptedText } from '../components/ui/encrypted-text';
import './Awards.css';

const AWARDS = [
  {
    img:   tsaiImg,
    alt:   'TSAI City',
    title: 'Yale Student Innovation and Milestone Grants',
    sub:   'Recognized for measurable progress toward impact',
  },
  {
    img:   startupYaleImg,
    alt:   'Start Up Yale',
    title: 'Rothberg Catalyzer Prize',
    sub:   "Audience Choice Award — Startup Yale '26",
  },
  {
    img:   yaleLogoImg,
    alt:   'Yale University',
    title: 'Yale News',
    sub:   "Featured on Yale Instagram, News, and other socials",
  },
];

const cardVariants = {
  hidden:  () => ({ opacity: 0, x: 50, y: 8, rotate: 0 }),
  visible: (i) => ({
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: { duration: 0.64, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Awards() {
  return (
    <section id="awards" className="aw-section">
      <div className="aw-inner">

        {/* ── LEFT ── */}
        <motion.div
          className="aw-left"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="aw-eyebrow">Awards &amp; Grants</span>
          <h2 className="aw-heading">
            <EncryptedText
              text="Recognition"
              revealDelayMs={110}
              flipDelayMs={70}
              charset="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
              encryptedClassName="aw-char--encrypted"
              revealedClassName="aw-char--revealed"
            />
          </h2>
          <p className="aw-sub">
            Validated by Yale's most competitive innovation programs.
          </p>
          <div className="aw-rule" />
        </motion.div>

        {/* ── RIGHT — stacked cards ── */}
        <div className="aw-right">
          <div className="aw-stack">
            {AWARDS.map((award, i) => (
              <motion.div
                key={i}
                className={`aw-card aw-card--${i + 1}`}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.26, ease: 'easeOut' },
                }}
              >
                <div className="aw-card__logo-wrap">
                  <img src={award.img} alt={award.alt} className="aw-card__logo" />
                </div>
                <div className="aw-card__body">
                  <span className="aw-card__title">{award.title}</span>
                  <span className="aw-card__sub">{award.sub}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
