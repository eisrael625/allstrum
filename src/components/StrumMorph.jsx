import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './StrumMorph.css';

const AUDIENCES = [
  { word: 'Families',     color: '#F472B6' },
  { word: 'Campers', color: '#34D399' },
  { word: 'Kids',         color: '#38BDF8' },
  { word: 'Therapists',   color: '#A78BFA' },
  { word: 'Veterans',     color: '#F87171' },
  { word: 'Grandparents', color: '#F5C87A' },
  { word: 'Educators',    color: '#FCD34D' },
];

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const PICK_SRC = process.env.PUBLIC_URL + '/android-chrome-512x512.png';

function Pick({ alt = 'a', upper = false }) {
  return (
    <span
      role="img"
      aria-label={alt}
      className={upper ? 'sm-pick sm-pick--upper' : 'sm-pick'}
      style={{ WebkitMaskImage: `url(${PICK_SRC})`, maskImage: `url(${PICK_SRC})` }}
    />
  );
}

function ScrambleText({ text }) {
  const [revealed, setRevealed] = useState(0);
  const [randoms, setRandoms] = useState(() =>
    Array.from({ length: text.length }, () => CHARS[Math.floor(Math.random() * CHARS.length)])
  );
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = null;
    setRevealed(0);
    setRandoms(Array.from({ length: text.length }, () => CHARS[Math.floor(Math.random() * CHARS.length)]));

    const run = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / 650, 1);
      const count = Math.floor(progress * text.length);
      setRevealed(count);
      setRandoms(Array.from({ length: text.length }, () =>
        CHARS[Math.floor(Math.random() * CHARS.length)]
      ));
      if (progress < 1) rafRef.current = requestAnimationFrame(run);
      else setRevealed(text.length);
    };

    rafRef.current = requestAnimationFrame(run);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [text]);

  return (
    <>
      {text.split('').map((ch, i) => {
        if (i < revealed) {
          return (ch === 'a' || ch === 'A')
            ? <Pick key={i} alt={ch} upper={ch === 'A'} />
            : <span key={i}>{ch}</span>;
        }
        return <span key={i}>{randoms[i] ?? ''}</span>;
      })}
    </>
  );
}

export default function StrumMorph() {
  const [idx, setIdx] = useState(0);
  const audience = AUDIENCES[idx];

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % AUDIENCES.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="strum-morph">
      {/* Background glow */}
      <div className="sm-glow-layer" aria-hidden="true">
        {AUDIENCES.map((a, i) => (
          <motion.div
            key={i}
            className="sm-glow"
            style={{ background: `radial-gradient(ellipse at 50% 50%, ${a.color}22 0%, transparent 65%)` }}
            animate={{ opacity: i === idx ? 1 : 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      <div className="sm-orb-layer" aria-hidden="true">
        {[0, 1, 2, 3, 4, 5].map(n => (
          <div
            key={n}
            className={`sm-orb sm-orb--${n + 1}`}
            style={{ backgroundColor: audience.color }}
          />
        ))}
      </div>

      {/* Scan line on transition */}
      <motion.div
        key={`scan-${idx}`}
        className="sm-scan"
        aria-hidden="true"
        initial={{ top: 0, opacity: 0.5 }}
        animate={{ top: '105%', opacity: 0 }}
        transition={{ duration: 0.65, ease: 'linear' }}
      />

      {/* "[Word] Strum" */}
      <div className="sm-brand" aria-live="polite" aria-atomic="true">
        <motion.span
          className="sm-word"
          animate={{ color: audience.color }}
          transition={{ duration: 0.45 }}
        >
          <ScrambleText key={idx} text={audience.word} />
        </motion.span>
        <span className="sm-suffix"> Strum</span>
      </div>

    </div>
  );
}
