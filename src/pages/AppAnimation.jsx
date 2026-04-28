import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoCanvas from '../VideoCanvas';
import appIntroVideo from '../assets/project-ac913ca8-4fa9-4430-b019-523f60e61988.webm';

export default function AppAnimation() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      const video = videoRef.current;
      if (!video) return;

      if (entry.isIntersecting) {
        const play = () => video.play()?.catch(() => {});
        if (video.readyState >= 3) play();
        else video.addEventListener('canplay', play, { once: true });
      } else {
        video.pause();
      }
    }, { threshold: 0.3 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="phone-section" ref={sectionRef}>
      <div className="phone-layout phone-layout--reversed">
        <div className="phone-copy">
          <span className="phone-eyebrow">The Companion App</span>
          <h2 className="phone-headline">
            <span className="phone-line phone-line-1">A Smarter</span>
            <span className="phone-line phone-line-2">Way to Play</span>
          </h2>
          <p className="phone-subtext">
            Pick songs, shift chords, compose progressions, and set the tempo from one simple app.
          </p>
          <button className="see-more-btn" onClick={() => navigate('/features')}>
            See Full App Features
          </button>
        </div>

        <div className="phone-video-wrap">
          <div className="phone-video-slot">
            <VideoCanvas ref={videoRef} src={appIntroVideo} preload="metadata" loop={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
