import React, { useEffect, useState } from 'react';
import Header from './Header';
import uke from './croppedUke.png';
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
import './App.css'; // Import CSS file

function App() {
  const [visibleSections, setVisibleSections] = useState([]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const sections = document.querySelectorAll('.section');
    const awardsSection = document.querySelector('.AwardsAndContact');
    const awardsSectionTop = awardsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (awardsSectionTop < windowHeight * 0.75) {
      awardsSection.classList.add('visible');
    } else {
      awardsSection.classList.remove('visible');
    }

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('visible');
      } else {
        section.classList.remove('visible');
      }
    });
  };

  const images = [
    testimony1,
    testimony2,
    testimony3,
    testimony4,
    testimony5,
    testimony6
    // Add more image URLs as needed
  ];
  const handlePreOrderClick = () => {
    window.location.href = "https://forms.gle/gxEsbb1r3G3446Xg7";
};

  return (
    <div className="App">
      <Header />
      <div className="sideBySide">
        <div className="Full_Image">
          <img className="ukePic" src={uke} alt="Full Diagram of Device" />
        </div>
        <div className="youtubeContainer">
          <h1 className="mobile_video_description section">Demonstration</h1>
          <div className="youtubeVid">
               < YouTubeVideo />
          </div>
        </div>
      </div>

      <h1 className="Inspiration_Text section">Inspiration</h1>
      <div className="Inspiration section">
        <div className="Camp">
          <h2>The Accessible Instrument</h2>
          <img className="Inspiration_Pics" src={camp} alt="child playing ukulele" />
          <p className="Inspiration_Paragraph">
            The inspiration for the device came to me a few years ago when I was a counselor at a camp for children
            with special needs. Several of my campers loved music and wanted to feel like they were creating their own
            music, but didn’t have the fine motor skills or the intellectual capacity to hold down the chords one after
            another and make a song. At the time, my solution was to hold the ukulele together with them, as they
            strummed. They were so excited to be creating music. Out of this, the Accessible Ukulele idea came to me.
            Now, by simply selecting a series of chords or clicking on a pre-loaded song on the companion app, a user
            could play a whole song just by strumming, with the chords being held down one after another automatically.
          </p>
        </div>
        <div className="Soldiers">
          <h2>Music For All</h2>
          <img className="Inspiration_Pics" src={soldier} alt="soldier playing guitar" />
          <p className="Inspiration_Paragraph">
            In my school’s Veteran’s day assembly, I heard the story of a soldier who had great musical talent, but,
            unfortunately, lost his ability to play the guitar after he was injured in battle. I was tasked with writing
            him a note, expressing my gratefulness for his sacrifice, but it seemed in-genuine. I thought, “Maybe I
            could fix his problem, and not just sympathize with it.” Since then, I have heard the stories of so many
            individuals who have lost ability to play an instrument they held so closely to their heart. Whether it was
            a girl who developed a tremor in one of her hands, making it impossible to hold down chords, or a man who
            got paralyzed in one arm, the stories of individuals not being able to pursue music pained me. I had a deep
            desire to help.
          </p>
        </div>
      </div>

      <h1 className="Inspiration_Text section">Customer's Testimonies</h1>
      <Slideshow className="slideshowaa section" images={images} />
      <h1 onClick={handlePreOrderClick} className="preorder section">Pre-Order Now!</h1>
      <div className="AwardsAndContact section">
        <h2>Awards</h2>
        <p>
          The Accessible Ukulele has already won the Yale Student Innovation Grant and the Yale Student Milestone Grant
          and is working to get into the world and to the people who can benefit from this product.
        </p>
        <p>
          Contact me at <a href="mailto:Eytan.Israel@Yale.edu">Eytan.Israel@Yale.edu</a> for any inquiries.
        </p>
      </div>
    </div>
  );
}

export default App;


