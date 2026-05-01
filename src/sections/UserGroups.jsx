import React from 'react';
import { motion } from 'framer-motion';
import camp             from '../assets/accessible-1.webp';
import guitarcasual     from '../assets/guitar-casual.webp';
import kidsMusic        from '../kids-music.webp';
import returningplayers from '../assets/returninplayers.jpg';
import './UserGroups.css';

const GROUPS = [
  {
    img: camp,
    imgPos: 'center 20%',
    title: 'Adaptive Players',
    desc: 'Built from day one for people with physical or cognitive differences. Playing music shouldn\'t be out of anyone\'s reach.',
  },
  {
    img: guitarcasual,
    imgPos: 'center 20%',
    title: 'Casual Strummers',
    desc: 'Not everyone wants to practice scales. Sometimes you just want to play by a campfire. AllStrum makes that possible from your very first session.',
  },
  {
    img: kidsMusic,
    imgPos: 'center top',
    title: 'Young Learners',
    desc: 'Give kids the thrill of playing real songs before theory gets in the way. Let confidence and a love of music come first. The hard work can wait.',
  },
  {
    img: returningplayers,
    imgPos: 'center top',
    title: 'Older Adults',
    desc: 'For anyone who stepped away from music because of an injury, a tremor, or simply the passage of time, AllStrum helps you pick up where you left off.',
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
    <div className="ug-section">
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
              <h3 className="ug-card__title">{g.title}</h3>
              <p className="ug-card__desc">{g.desc}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
