import React from 'react';
import { motion } from 'framer-motion';
import guitarImg  from '../assets/AS1.jpeg';
import ukuleleImg from 'src/ukulelePic.jpg';
import './DemoSection.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } },
};

function ProductShowcase({ img, eyebrow, title }) {
  return (
    <motion.article
      className="ds-product"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <img
        src={img}
        alt={title}
        className="ds-product__img"
      />

      <div className="ds-product__fade" />

      <div className="ds-product__content">
        <span className="ds-product__eyebrow">{eyebrow}</span>
        <h2 className="ds-product__title">{title}</h2>
        <div className="ds-product__rule" />
      </div>
    </motion.article>
  );
}

export default function DemoSection() {
  return (
    <section id="products" className="ds-section">

      <div className="ds-products">
        <ProductShowcase
          img={ukuleleImg}
          eyebrow="Where It All Started"
          title="AllStrum Ukulele"
        />

        <ProductShowcase
          img={guitarImg}
          eyebrow="The Upgrade"
          title="AllStrum Guitar"
        />
      </div>

    </section>
  );
}
