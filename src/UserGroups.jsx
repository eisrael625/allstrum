import React from 'react';
import { motion } from 'framer-motion';
import camp             from './assets/accesible1.jpg';
import guitarcasual     from './assets/guitarcasual.jpeg';
import kidsMusic        from './vitaly-gariev-NVWc_fyctlk-unsplash.jpg';
import returningplayers from './assets/returninplayers.jpg';
import './UserGroups.css';

const GROUPS = [
  {
    img: camp,
    imgPos: 'center 20%',
    label: 'ACCESSIBILITY',
    title: 'Adaptive Players',
    desc: 'Built from day one for people with physical or cognitive differences. AllStrum removes every barrier between a person and the music they want to make.',
  },
  {
    img: guitarcasual,
    imgPos: 'center 20%',
    label: 'EVERYDAY JOY',
    title: 'Casual Strummers',
    desc: 'Not everyone wants to practice scales. Sometimes you just want to play by a campfire. AllStrum makes that possible from your very first session.',
  },
  {
    img: kidsMusic,
    imgPos: 'center top',
    label: 'CONFIDENCE FIRST',
    title: 'Young Learners',
    desc: "Give kids the thrill of real songs before theory gets in the way. AllStrum builds confidence and a genuine love of music — the hard work can come later.",
  },
  {
    img: returningplayers,
    imgPos: 'center top',
    label: 'SECOND CHANCES',
    title: 'Older Adults',
    desc: 'An injury, a tremor, years away from the instrument — AllStrum helps you pick up where life made you stop. The music was always still there.',
  },
];

const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export default function UserGroups() {
  return (
    <section className="ug-section">
      <motion.div
        className="ug-grid"
        variants={gridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
      >
        {GROUPS.map((g) => (
          <motion.article key={g.title} className="ug-card" variants={cardVariants}>
            <div className="ug-card__photo-wrap">
              <div
                className="ug-card__photo"
                style={{
                  backgroundImage:    `url(${g.img})`,
                  backgroundPosition: g.imgPos,
                }}
              />
            </div>
            <div className="ug-card__body">
              <span className="ug-card__label">{g.label}</span>
              <h3 className="ug-card__title">{g.title}</h3>
              <p className="ug-card__desc">{g.desc}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
