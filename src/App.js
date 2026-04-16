// App.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import YouTubeVideo from './Youtube';
import Slideshow from './Slideshow';
import VideoModal from './VideoModal';
import WhyAllStrum from './WhyAllStrum';
import WhoItsFor from './WhoItsFor';
import { PointerHighlight } from './components/ui/pointer-highlight';
import './App.css';

const VIDEO_DEMOS = {
  guitar:  { videoId: 'Tc2Rj1Ny0Yw', title: 'AllStrum Guitar Demo' },
  ukulele: { videoId: 'jZytVzkcJic', title: 'AllStrum Ukulele Demo' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function App() {
  const [activeDemo, setActiveDemo]   = useState('guitar');
  const [fadingDemo, setFadingDemo]   = useState(false);
  const [modalVideoId, setModalVideoId] = useState(null);

  const testimonials = [
    '"Yes. Josh enjoys music and has played with ukuleles before, but does not have the ability (nor interest so far) in creating chords. A device like this would allow him to play a familiar song and get further enjoyment out of playing the instrument."',
    '"Yes! Sam has Cerebral Palsy and is deaf & hard of hearing. His physical disability prevents him from using his hands without pain and tremors. But this technology would greatly benefit his ability to create and contribute creatively with peers. He sometimes has difficulty communicating and regulating his emotions. He uses music to help comfort and soothe him during these difficult times."',
    '"Yes! My daughter Sarah is autistic, and a gestalt language processor, which means that she is very attentive to intonation, cadence, rhythm and melody. As such, she is an extremely musical child and benefits from apps like GarageBand and music therapy. Her fine motor skills are not well developed though, so an adaptive musical instrument like this would be a wonderful way for her to experience playing an instrument."',
    '"He would love to create music in this way! He would be able to work on rhythm, melody, harmony, fine motor skills holding and strumming the ukulele. What a great springboard for the socialization that music brings! I envision confidence following suit. Thank you for this amazing invention!"',
    '"Yes! Kate loves music. Many of her siblings are taking music lessons and she feels very left out."',
    '"Yes. My son loves music and would love to play an instrument but can\'t manage the coordination of playing chords while strumming due to his Down Syndrome."',
  ];

  const handlePreOrderClick = () => {
    window.location.href = 'https://forms.gle/gxEsbb1r3G3446Xg7';
  };

  const handleDemoSwitch = (key) => {
    if (key === activeDemo || fadingDemo) return;
    setFadingDemo(true);
    setTimeout(() => {
      setActiveDemo(key);
      setFadingDemo(false);
    }, 280);
  };

  const currentDemo = VIDEO_DEMOS[activeDemo];

  return (
    <div className="App">
      <Header />
      <main>

        {/* ── HERO ── */}
        <section id="products" className="section hero">
          <div className="hero-inner">

            <motion.div
              className="hero-text"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <h1 className="hero-title">
                Music for{' '}
                <PointerHighlight
                  rectangleClassName="bg-neutral-200 dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600"
                  pointerClassName="text-yellow-500"
                >
                  <span style={{ position: 'relative', zIndex: 10 }}>everybody.</span>
                </PointerHighlight>
              </h1>
              <p className="hero-subtitle">
                Devices that let anyone strum the chords to their favorite songs.
              </p>
              <div className="hero-ctas">
                <button className="btn primary" onClick={handlePreOrderClick}>
                  Pre-order Now
                </button>
              </div>
            </motion.div>

            <motion.div
              className="hero-media"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <div className="hero-video-card">
                <YouTubeVideo videoId="1W-GXqHRtwM" />
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── WHY ALLSTRUM ── */}
        <WhyAllStrum />

        {/* ── WHO IT'S FOR ── */}
        <WhoItsFor />

        {/* ── DEMO VIDEOS ── */}
        <section id="videos" className="section demo-section">

          <motion.div
            className="demo-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="demo-heading">See It In Action</h2>
          </motion.div>

          <motion.div
            className="demo-toggle-row"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.1 }}
          >
            <div className="product-tabs">
              <button
                className={`product-tab ${activeDemo === 'guitar' ? 'active' : ''}`}
                onClick={() => handleDemoSwitch('guitar')}
              >
                AllStrum Guitar
              </button>
              <button
                className={`product-tab ${activeDemo === 'ukulele' ? 'active' : ''}`}
                onClick={() => handleDemoSwitch('ukulele')}
              >
                AllStrum Ukulele
              </button>
            </div>
          </motion.div>

          <motion.div
            className={`demo-video-area${fadingDemo ? ' demo-video-area--fading' : ''}`}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              className="video-thumbnail-btn"
              onClick={() => setModalVideoId(currentDemo.videoId)}
              aria-label={`Play ${currentDemo.title}`}
            >
              <img
                src={`https://img.youtube.com/vi/${currentDemo.videoId}/maxresdefault.jpg`}
                alt={currentDemo.title}
                className="video-thumbnail-img"
                onError={(e) => {
                  e.target.src = `https://img.youtube.com/vi/${currentDemo.videoId}/hqdefault.jpg`;
                }}
              />
              <div className="video-play-overlay">
                <div className="video-play-icon">&#9654;</div>
              </div>
            </button>
          </motion.div>

        </section>

        {/* ── TESTIMONIALS ── */}
        <section id="testimonials" className="section testimonials">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2>What People Are Saying</h2>
            <p>Feedback from families, educators, and users who have experienced AllStrum Instruments firsthand.</p>
          </motion.div>
          <Slideshow testimonials={testimonials} />
        </section>

        {/* ── AWARDS ── */}
        <section id="awards" className="section awards">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2>Recognition</h2>
            <p>AllStrum Instruments have been supported and recognized for their potential impact.</p>
          </motion.div>

          <motion.div
            className="badge-row"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <span className="badge">Yale Student Innovation Grant</span>
            <span className="badge">Yale Student Milestone Grant</span>
            <span className="badge">Startup Yale Rothberg Prize Finalist</span>
          </motion.div>

          <motion.p
            className="awards-body"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            The AllStrum Ukulele and AllStrum Guitar have been recognized by the Yale Student Innovation Grant and
            the Yale Student Milestone Grant, are one of four finalists for the '26 Startup Yale Rothberg Catalyzer Prize, and are working to reach the people who can benefit most.
          </motion.p>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="section contact">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2>Get In Touch</h2>
          </motion.div>

          <motion.div
            className="contact-body"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p>
              <a href="mailto:info@allstrum.com" className="link">info@allstrum.com</a>
              {' · '}
              <a href="https://www.linkedin.com/company/all-strum/" target="_blank" rel="noreferrer" className="link">LinkedIn</a>
            </p>
            <p>Patent Pending. All Rights Reserved.</p>
            <button className="btn primary mt-24" onClick={handlePreOrderClick}>
              Pre-order Now
            </button>
          </motion.div>
        </section>

        {/* ── VIDEO MODAL ── */}
        {modalVideoId && (
          <VideoModal
            videoId={modalVideoId}
            title="AllStrum Video"
            onClose={() => setModalVideoId(null)}
          />
        )}

      </main>
    </div>
  );
}

export default App;
