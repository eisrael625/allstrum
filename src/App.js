// import React, { useEffect, useState } from 'react';
// import Header from './Header';
// import uke from './croppedUke.png';
// import camp from './Camp.jpg';
// import soldier from './Soldier.jpeg';
// import testimony1 from './1.png';
// import testimony2 from './2.png';
// import testimony3 from './3.png';
// import testimony4 from './4.png';
// import testimony5 from './5.png';
// import testimony6 from './6.png';
// import YouTubeVideo from './Youtube';
// import Slideshow from './Slideshow';
// import './App.css'; // Import CSS file

// const colorPalette = {
//   blue: '#0F518A',
//   cream: '#FCF3E2',
//   orange: '#FF8943',
//   lightblue: '#5EC4EC'
// };


// function App() {
//   const [visibleSections, setVisibleSections] = useState([]);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const handleScroll = () => {
//     const sections = document.querySelectorAll('.section');
//     const awardsSection = document.querySelector('.AwardsAndContact');
//     const awardsSectionTop = awardsSection.getBoundingClientRect().top;
//     const windowHeight = window.innerHeight;

//     if (awardsSectionTop < windowHeight * 0.75) {
//       awardsSection.classList.add('visible');
//     } else {
//       awardsSection.classList.remove('visible');
//     }

//     sections.forEach((section) => {
//       const sectionTop = section.getBoundingClientRect().top;
//       if (sectionTop < windowHeight * 0.75) {
//         section.classList.add('visible');
//       } else {
//         section.classList.remove('visible');
//       }
//     });
//   };

//   const images = [
//     testimony1,
//     testimony2,
//     testimony3,
//     testimony4,
//     testimony5,
//     testimony6
//     // Add more image URLs as needed
//   ];
//   const handlePreOrderClick = () => {
//     window.location.href = "https://forms.gle/gxEsbb1r3G3446Xg7";
// };

//   return (
//     <div className="App">
//       <Header />
//       <div className="sideBySide">
//         {/* <div className="Full_Image">
//           <img className="ukePic" src={uke} alt="Full Diagram of Device" />
//         </div> */}
//         <div className="youtubeContainer">
//           {/* <h1 className="mobile_video_description section">Demonstration</h1> */}
//         <div className="backgroundImage"></div>
//           <div className="youtubeVid">
          
//             <YouTubeVideo videoId="jZytVzkcJic" />
//           {/* <YouTubeVideo videoId="Vy46onQp99c" /> */}
//           </div>
//         </div>
//       </div>

//       <h1 className="Inspiration_Text section">Inspiration</h1>
//       <div className="Inspiration section">
//         <div className="Camp">
//           <h2>The Accessible Instrument</h2>
//           <img className="Inspiration_Pics" src={camp} alt="child playing ukulele" />
//           <p className="Inspiration_Paragraph">
//             The inspiration for the device came to me a few years ago when I was a counselor at a camp for children
//             with special needs. Several of my campers loved music and wanted to feel like they were creating their own
//             music, but didn’t have the fine motor skills or the intellectual capacity to hold down the chords one after
//             another and make a song. At the time, my solution was to hold the ukulele together with them, as they
//             strummed. They were so excited to be creating music. Out of this, the Accessible Ukulele idea came to me.
//             Now, by simply selecting a series of chords or clicking on a pre-loaded song on the companion app, a user
//             could play a whole song just by strumming, with the chords being held down one after another automatically.
//           </p>
//         </div>
//         <div className="Soldiers">
//           <h2>Music For All</h2>
//           <img className="Inspiration_Pics" src={soldier} alt="soldier playing guitar" />
//           <p className="Inspiration_Paragraph">
//             In my school’s Veteran’s day assembly, I heard the story of a soldier who had great musical talent, but,
//             unfortunately, lost his ability to play the guitar after he was injured in battle. I was tasked with writing
//             him a note, expressing my gratefulness for his sacrifice, but it seemed in-genuine. I thought, “Maybe I
//             could fix his problem, and not just sympathize with it.” Since then, I have heard the stories of so many
//             individuals who have lost ability to play an instrument they held so closely to their heart. Whether it was
//             a girl who developed a tremor in one of her hands, making it impossible to hold down chords, or a man who
//             got paralyzed in one arm, the stories of individuals not being able to pursue music pained me. I had a deep
//             desire to help.
//           </p>
//         </div>
//       </div>
      
//       <h1 className="Inspiration_Text section">Customer's Testimonies</h1>
//       <Slideshow className="slideshowaa section" images={images} />
//       <h1 className="Inspiration_Text section">Walk Through</h1>
//       <div className="youtubeContainer section">
//           {/* <h1 className="mobile_video_description section">Demonstration</h1> */}
//         <div className="backgroundImage2"></div>
//           <div className="youtubeVid">
          
//             {/* <YouTubeVideo videoId="jZytVzkcJic" /> */}
//           <YouTubeVideo videoId="Vy46onQp99c" />
//           </div>
//         </div>
//       <h1 onClick={handlePreOrderClick} className="preorder section">Pre-Order Now!</h1>
//       <div className="AwardsAndContact section">
//         <h2>Awards and Patent</h2>
//         <p>
//           The Accessible Ukulele has already won the Yale Student Innovation Grant and the Yale Student Milestone Grant
//           and is working to get into the world and to the people who can benefit from this product.
//         </p>
//         <p>The Accessible Ukulele is Patent Pending, All Rights Reserved</p>
//         <p>
//           Contact me at <a href="mailto:Eytan.Israel@Yale.edu">Eytan.Israel@Yale.edu</a> for any inquiries. Find me on <a href="https://www.linkedin.com/in/eytan-israel-a2a55078/">LinkedIn</a> to get updates!
//         </p>
//       </div>
//     </div>
//   );
// }

// export default App;


// App.js
import React, { useState } from 'react';
import Header from './Header';
import camp from './Camp.jpg';
import soldier from './Soldier.jpeg';
import testimony1 from './1.png';
import testimony2 from './2.png';
import testimony3 from './3.png';
import testimony4 from './4.png';
import testimony5 from './5.png';
import testimony6 from './6.png';
import YouTubeVideo from './Youtube';
import Slideshow from './Slideshow';
import './App.css';

const colorPalette = {
  blue: '#0F518A',
  cream: '#FCF3E2',
  orange: '#FF8943',
  lightblue: '#5EC4EC',
};

const PRODUCTS = {
  guitar: {
    key: 'guitar',
    name: 'Accessible Guitar',
    tagline: 'Strum full songs on a real guitar—no chord fingerings required.',
    primaryVideoId: 'Tc2Rj1Ny0Yw', // New guitar demo
    detailsTitle: 'Why the Accessible Guitar?',
    detailsIntro:
      'The Accessible Guitar is the next step in adaptive instruments, designed so that anyone can sit with friends and actually play songs on a real guitar.',
    bullets: [
      'Plays any chord combination within the first three frets.',
      'Ideal for people with limited finger mobility, one functional arm, or coordination challenges.',
      'App-controlled chord progression: pick custom chords or load pre-made songs.',
      'Built as a culmination of years of prototyping, starting from the Accessible Ukulele.',
    ],
    featureCards: [
      {
        title: 'Inclusive Design',
        body: 'Engineered for users with physical and cognitive disabilities, beginners, and anyone who wants to jump straight into playing.',
      },
      {
        title: 'Real Instrument',
        body: 'Works with a real guitar so the feel, sound, and social experience are authentic.',
      },
      {
        title: 'Smart Control',
        body: 'A companion app automatically shifts chords while the user focuses purely on strumming.',
      },
    ],
  },
  ukulele: {
    key: 'ukulele',
    name: 'Accessible Ukulele',
    tagline: 'The original prototype that proved anyone can strum real songs.',
    primaryVideoId: 'jZytVzkcJic', // Original uke demo
    detailsTitle: 'The Original Accessible Ukulele',
    detailsIntro:
      'The Accessible Ukulele was the first prototype built to help campers with special needs feel the joy of creating music on their own.',
    bullets: [
      'Inpired by working at a camp for children with special needs.',
      'Enabled simple chord progressions with limited, pre-set chord combinations.',
      'Showed how powerful adaptive instruments can be for confidence and joy.',
      'Laid the groundwork that led directly to the more flexible Accessible Guitar.',
    ],
    featureCards: [
      {
        title: 'Camp Prototype',
        body: 'Inspired directly by campers who wanted to really play, not just listen.',
      },
      {
        title: 'Simple Chords',
        body: 'Focused on a small set of Ukulele chords that could cover many songs.',
      },
      {
        title: 'Proof of Concept',
        body: 'Demonstrated that app-controlled chords plus strumming is a powerful, accessible combo.',
      },
    ],
  },
};

function App() {
  const [activeProduct, setActiveProduct] = useState('guitar');

  const images = [testimony1, testimony2, testimony3, testimony4, testimony5, testimony6];

  const handlePreOrderClick = () => {
    window.location.href = 'https://forms.gle/gxEsbb1r3G3446Xg7';
  };

  const currentProduct = PRODUCTS[activeProduct];

  return (
    <div className="App">
      <Header />
      <main>
        {/* Hero + Product Tabs */}
        <section id="products" className="section hero">
          <div className="hero-inner">
            <div className="hero-text">
              <p className="hero-eyebrow">Accessible Instruments by Eytan Israel</p>
              <h1 className="hero-title">Music for everybody.</h1>
              <p className="hero-subtitle">
                Adaptive devices that let anyone strum real chords on real instruments—no fine motor skills required.
              </p>

              <div className="product-tabs">
                <button
                  className={`product-tab ${activeProduct === 'guitar' ? 'active' : ''}`}
                  onClick={() => setActiveProduct('guitar')}
                >
                  Accessible Guitar
                </button>
                <button
                  className={`product-tab ${activeProduct === 'ukulele' ? 'active' : ''}`}
                  onClick={() => setActiveProduct('ukulele')}
                >
                  Accessible Ukulele
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
              </div>


            <div className="hero-media">
              <div className="hero-video-card">
                <YouTubeVideo videoId={currentProduct.primaryVideoId} />
              </div>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="section product-details">
          <div className="product-details-inner">
            <div className="product-details-text">
              <h3>{currentProduct.detailsTitle}</h3>
              <p className="product-details-intro">{currentProduct.detailsIntro}</p>
              <ul className="product-details-list">
                {currentProduct.bullets.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="product-feature-grid">
              {currentProduct.featureCards.map((card) => (
                <div key={card.title} className="feature-card">
                  <h4>{card.title}</h4>
                  <p>{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section id="story" className="section story">
          <div className="section-header">
            <h2>Why I Built These Instruments</h2>
            <p>
              The Accessible Ukulele and Accessible Guitar grew out of real people, real stories, and a desire to turn
              empathy into action.
            </p>
          </div>

          <div className="story-grid">
            <article className="story-card">
              <div className="story-image">
                <img src={camp} alt="Camper playing ukulele" />
              </div>
              <div className="story-content">
                <h3>Campers Who Wanted to Truly Play</h3>
                <p>
                  A few years ago, as a counselor at a camp for children with special needs, I saw campers who loved
                  music and desperately wanted to feel like they were creating it themselves.
                </p>
                <p>
                  Many didn’t have the fine motor skills or cognitive bandwidth to hold chords one after another. I
                  found myself holding the ukulele together with them and holding the chords down for them while they strummed. Their excitement at
                  “playing” was unforgettable.
                </p>
                <p>
                  From that experience, the idea of the Accessible Ukulele was born: an instrument where users can
                  simply strum, while the device handles the chords.
                </p>
              </div>
            </article>

            <article className="story-card story-card--reverse">
              <div className="story-image">
                <img src={soldier} alt="Veteran playing guitar" />
              </div>
              <div className="story-content">
                <h3>Musicians Who Lost the Ability to Play</h3>
                <p>
                  At a Veterans Day assembly, I heard about a soldier with great musical talent who could no longer play
                  guitar after being injured in battle. I was supposed to write a note thanking him for his service—but
                  it felt incomplete.
                </p>
                <p>
                  I thought: maybe I could actually help fix his problem, not just sympathize with it. Since then,
                  I&apos;ve heard from many others: a girl whose tremor prevents her from holding chords, a man
                  paralyzed in one arm, and more.
                </p>
                <p>
                  Their stories pushed this project forward: from a prototype ukulele to the more powerful, flexible
                  Accessible Guitar.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* Videos Section */}
        <section id="videos" className="section videos">
          <div className="section-header">
            <h2>See It In Action</h2>
            <p>Watch the Accessible Guitar and Accessible Ukulele in use, and dig into the technical walkthrough.</p>
          </div>

          <div className="videos-grid">
            <div className="video-card">
              <h3>Accessible Guitar Demo</h3>
              <div className="video-wrapper">
                <YouTubeVideo videoId="Tc2Rj1Ny0Yw" />
              </div>
              <p className="video-caption">
                Overview of how the Accessible Guitar works for users and how it enables full songs with simple
                strumming.
              </p>
            </div>

            <div className="video-card">
              <h3>Accessible Ukulele Technical Walkthrough</h3>
              <div className="video-wrapper">
                <YouTubeVideo videoId="Vy46onQp99c" />
              </div>
              <p className="video-caption">
                A look at the original Accessible Ukulele prototype and the technical concepts behind the system.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="section testimonials">
          <div className="section-header">
            <h2>What People Are Saying</h2>
            <p>Feedback from families, educators, and users who have seen the Accessible Instruments in action.</p>
          </div>
          <div className="testimonials-slideshow">
            <Slideshow images={images} />
          </div>
        </section>

        {/* Awards & Contact */}
        <section id="contact" className="section awards-contact">
          <div className="section-header">
            <h2>Awards, Patent & Contact</h2>
            <p>
              The Accessible Ukulele and Accessible Guitar have been supported and recognized for their potential
              impact.
            </p>
          </div>

          <div className="badge-row">
            <span className="badge">Yale Student Innovation Grant</span>
            <span className="badge">Yale Student Milestone Grant</span>
            <span className="badge badge-outline">Patent Pending</span>
          </div>

          <div className="awards-contact-text">
            <p>
              The Accessible Ukulele has already won the Yale Student Innovation Grant and the Yale Student Milestone
              Grant and is working to get into the world and to the people who can benefit from this product.
            </p>
            <p>The Accessible Ukulele and Accessible Guitar are Patent Pending, All Rights Reserved.</p>
            <p>
              Contact me at{' '}
              <a href="mailto:Eytan.Israel@Yale.edu" className="link">
                Eytan.Israel@Yale.edu
              </a>{' '}
              for any inquiries. Find me on{' '}
              <a
                href="https://www.linkedin.com/in/eytan-israel-a2a55078/"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                LinkedIn
              </a>{' '}
              to get updates!
            </p>
            <button className="btn primary mt-24" onClick={handlePreOrderClick}>
              Pre-order Accessible Devices
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
