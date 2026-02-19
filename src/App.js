// App.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import camp from './Camp.jpg';
import soldier from './Soldier.jpeg';
import campfire from './assets/vitaly-gariev-qRq0eoSCj-Q-unsplash.jpg';
import kidsMusic from './assets/vitaly-gariev-NVWc_fyctlk-unsplash.jpg';
import YouTubeVideo from './Youtube';
import Slideshow from './Slideshow';
import VideoModal from './VideoModal';
import './App.css';

const PRODUCTS = {
  guitar: {
    key: 'guitar',
    name: 'AllStrum Guitar',
    tagline: 'Play full songs on guitar from day one. No experience needed.',
    primaryVideoId: 'Tc2Rj1Ny0Yw',
    detailsTitle: 'Why AllStrum?',
    featureCards: [
      {
        title: 'Inclusive Design',
        body: 'Whether you are a singer who has always wanted to accompany yourself, a parent searching for the perfect first instrument for your child, a hobbyist who never quite found the time to take lessons, or someone with a disability or special need who deserves to feel the joy of making music — AllStrum meets you exactly where you are. ',
      },
      {
        title: 'Smart Control',
        body: 'The AllStrum companion app connects to the instrument and shifts chords automatically, so you can focus entirely on rhythm and feel. Browse your favorite songs and play along in real time, or slow things down and work through specific strumming patterns to build your skills at your own pace.',
      },
      {
        title: 'Real Instrument',
        body: 'AllStrum attaches to a real guitar or ukulele without compromising the instrument\'s sound or feel. Bring it to a campfire or a family gathering and what people hear is a real instrument played by you.',
      },
    ],
  },
  ukulele: {
    key: 'ukulele',
    name: 'AllStrum Ukulele',
    tagline: 'Where it all started. Now available to everyone.',
    primaryVideoId: 'jZytVzkcJic',
    detailsTitle: 'The Original AllStrum Ukulele',
    detailsIntro:
      'The AllStrum Ukulele was the first prototype built to help campers with special needs feel the joy of creating music on their own.',
    featureCards: [
      {
        title: 'Camp Prototype',
        body: 'Inspired directly by campers who wanted to really play, not just listen.',
      },
      {
        title: 'Simple Chords',
        body: 'Focused on a small set of ukulele chords that could cover many songs.',
      },
      {
        title: 'Proof of Concept',
        body: 'Demonstrated that app-controlled chords plus strumming is a powerful, accessible combo.',
      },
    ],
  },
};

const VIDEO_CARDS = [
  {
    videoId: 'Tc2Rj1Ny0Yw',
    title: 'AllStrum Guitar Demo',
  },
  {
    videoId: 'Vy46onQp99c',
    title: 'AllStrum Ukulele Technical Walkthrough',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function App() {
  const [activeProduct, setActiveProduct] = useState('guitar');
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

  const currentProduct = PRODUCTS[activeProduct];

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
              <h1 className="hero-title">Music for everybody.</h1>
              <p className="hero-subtitle">
                Adaptive devices that let anyone strum the chords to their favorite songs.
              </p>

              <div className="product-tabs">
                <button
                  className={`product-tab ${activeProduct === 'guitar' ? 'active' : ''}`}
                  onClick={() => setActiveProduct('guitar')}
                >
                  AllStrum Guitar
                </button>
                <button
                  className={`product-tab ${activeProduct === 'ukulele' ? 'active' : ''}`}
                  onClick={() => setActiveProduct('ukulele')}
                >
                  AllStrum Ukulele
                </button>
              </div>

              <div className="product-highlight">
                <h2 className="product-name">{currentProduct.name}</h2>
                <p className="product-tagline">{currentProduct.tagline}</p>
                <div className="hero-ctas">
                  <button className="btn primary" onClick={handlePreOrderClick}>
                    Pre-order Now
                  </button>
                  <a href="#videos" className="btn ghost">
                    Watch Demo
                  </a>
                </div>
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
                <YouTubeVideo videoId={currentProduct.primaryVideoId} />
              </div>
            </motion.div>

          </div>
        </section>

        {/* ── PRODUCT DETAILS ── */}
        <section className="section product-details">
          <motion.div
            className="product-details-inner"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="product-details-header">
              <h3>{PRODUCTS.guitar.detailsTitle}</h3>
            </div>

            <div className="product-feature-grid">
              {PRODUCTS.guitar.featureCards.map((card) => (
                <div key={card.title} className="feature-card">
                  <h4>{card.title}</h4>
                  <p>{card.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── STORY ── */}
        <section id="story" className="section story">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2>Who AllStrum Is For</h2>
          </motion.div>

          <div className="story-grid">

            <motion.article
              className="story-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <div className="story-image">
                <img src={camp} alt="Camper playing ukulele" />
              </div>
              <div className="story-content">
                <h3>Campers Who Wanted to Play</h3>
                <p>
                  A few years ago, as a counselor at a camp for children with special needs, I saw campers who loved
                  music and desperately wanted to feel like they were creating it themselves.
                </p>
                <p>
                  Many didn't have the fine motor skills to play full songs on their own. I
                  found myself holding the ukulele together with them and holding the chords down for them while they
                  strummed. Their excitement at playing was unforgettable.
                </p>
                <p>
                  From that experience, the idea of the AllStrum was born: an instrument where users can
                  simply strum, while the device handles the chords, so that everyone can play music that they love.
                </p>
              </div>
            </motion.article>

            <motion.article
              className="story-card story-card--reverse"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <div className="story-image">
                <img src={kidsMusic} alt="Child playing ukulele" />
              </div>
              <div className="story-content">
                <h3>Inspire Kids to Love Music</h3>
                <p>
                  Learning an instrument is one of the most rewarding things a child can do, but the early stages
                  can be frustrating enough to make them quit before they ever fall in love with it. Months of scales
                  and finger exercises before playing a single real song is a lot to ask of a kid who just wants to
                  make music.
                </p>
                <p>
                  AllStrum lets children skip the barrier and go straight to the joy. From their very first session,
                  they can strum along to songs they actually know and love.
                </p>
              </div>
            </motion.article>

            <motion.article
              className="story-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <div className="story-image">
                <img src={campfire} alt="Friends playing guitar at a campfire" />
              </div>
              <div className="story-content">
                <h3>Casual Playing</h3>
                <p>
                  Not everyone who picks up an instrument wants to become a musician. Some people just want to strum
                  along to their favorite songs at the end of a long day, bring a guitar to a gathering without the
                  pressure of performing, or finally do something with the instrument that's been sitting in the corner
                  for years.
                </p>
                <p>
                  AllStrum is for those people too. Music doesn't always have to be a pursuit. Sometimes it is just has to feel good.
                </p>
              </div>
            </motion.article>

            <motion.article
              className="story-card story-card--reverse"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              <div className="story-image">
                <img src={soldier} alt="Veteran playing guitar" />
              </div>
              <div className="story-content">
                <h3>Musicians Who Lost the Ability to Play</h3>
                <p>
                  At a Veterans Day assembly in high school, I heard about a soldier with great musical talent who could no longer
                  play guitar after being injured in battle. I was supposed to write a note thanking him for his
                  service, but it felt incomplete.
                </p>
                <p>
                  I kept thinking about what it would mean to actually do something, not just express gratitude. That
                  question stayed with me. Since then, I&apos;ve heard from many others with the same desire to play—
                  a girl whose tremor prevents her from holding chords, a man paralyzed in one arm, and more.
                </p>
                <p>
                  Their stories pushed this project forward: from a prototype ukulele to the more powerful, flexible
                  AllStrum Guitar.
                </p>
              </div>
            </motion.article>

          </div>
        </section>

        {/* ── VIDEOS ── */}
        <section id="videos" className="section videos">
          <motion.div
            className="section-header"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2>See It In Action</h2>
          </motion.div>

          <div className="videos-grid">
            {VIDEO_CARDS.map((vid, i) => (
              <motion.div
                key={vid.videoId}
                className="video-card"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: i * 0.1 }}
              >
                <h3>{vid.title}</h3>
                <button
                  className="video-thumbnail-btn"
                  onClick={() => setModalVideoId(vid.videoId)}
                  aria-label={`Play ${vid.title}`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${vid.videoId}/maxresdefault.jpg`}
                    alt={vid.title}
                    className="video-thumbnail-img"
                    onError={(e) => {
                      e.target.src = `https://img.youtube.com/vi/${vid.videoId}/hqdefault.jpg`;
                    }}
                  />
                  <div className="video-play-overlay">
                    <div className="video-play-icon">&#9654;</div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
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
            <h2>Recognition & Patent</h2>
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
            <span className="badge badge-outline">Patent Pending</span>
          </motion.div>

          <motion.p
            className="awards-body"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            The AllStrum Ukulele and AllStrum Guitar have been recognized by the Yale Student Innovation Grant and
            the Yale Student Milestone Grant, and are working to reach the people who can benefit most.
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
              Contact{' '}
              <a href="mailto:Eytan.Israel@Yale.edu" className="link">
                Eytan.Israel@Yale.edu
              </a>{' '}
              for any inquiries, or find me on{' '}
              <a
                href="https://www.linkedin.com/in/eytan-israel-a2a55078/"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                LinkedIn
              </a>{' '}
              to get updates.
            </p>
            <p>The AllStrum Ukulele and AllStrum Guitar are Patent Pending, All Rights Reserved.</p>
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
