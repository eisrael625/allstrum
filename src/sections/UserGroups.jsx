import React from 'react';
import { motion } from 'framer-motion';
import responsiveImages from '../assets/resized';
import './UserGroups.css';

const cardImageSizes = '(max-width: 560px) 92vw, (max-width: 1080px) 46vw, 23vw';

const GROUPS = [
  {
    img: responsiveImages['gallery-4276'],
    imgPos: 'center 40%',
    alt: 'An adaptive player strumming a guitar fitted with the AllStrum device',
    title: 'Adaptive Players',
    desc: 'Built from day one for people with physical or cognitive differences. Playing music shouldn\'t be out of anyone\'s reach.',
  },
  {
    img: responsiveImages['guitar-casual'],
    imgPos: 'center 20%',
    alt: 'Friends casually playing guitar together outdoors',
    title: 'Casual Strummers',
    desc: 'Not everyone wants to practice scales. Sometimes you just want to play by a campfire. AllStrum makes that possible from your very first session.',
  },
  {
    img: responsiveImages['kids-music'],
    imgPos: 'center top',
    imgPosMobile: 'center 45%',
    alt: 'A young child playing a ukulele',
    title: 'Young Learners',
    desc: 'Give kids the thrill of playing real songs before theory gets in the way. Let confidence and a love of music come first. The hard work can wait.',
  },
  {
    img: responsiveImages['returninplayers'],
    imgPos: 'center top',
    alt: 'An older adult smiling while playing guitar',
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
              <img
                className="ug-card__photo"
                src={g.img.src}
                srcSet={g.img.srcSet}
                sizes={cardImageSizes}
                alt={g.alt}
                loading="lazy"
                decoding="async"
                style={{
                  objectPosition: g.imgPos,
                  '--img-pos-mobile': g.imgPosMobile || g.imgPos,
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
