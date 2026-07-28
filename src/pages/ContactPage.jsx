import React from 'react';
import { motion } from 'framer-motion';
import StrumMorph from '../components/StrumMorph';
import SocialLinks from '../components/SocialLinks';
import { openReserve, openInterestForm } from '../lib/links';

export default function ContactPage() {

  return (
    <div className="route-page route-page--locked">
      <section className="contact-page">
        <motion.div
          className="contact-page__copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1>Bring AllStrum to Your Community</h1>
          <div className="contact-page__actions">
            <a className="contact-link" href="mailto:info@allstrum.com">info@allstrum.com</a>
            <button className="btn primary" onClick={openReserve}>Reserve yours</button>
            <button className="btn ghost" onClick={openInterestForm}>Get notified when available</button>
          </div>
          <SocialLinks className="contact-page__socials" />
        </motion.div>

        <StrumMorph />
      </section>
    </div>
  );
}
