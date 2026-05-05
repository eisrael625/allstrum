import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoCanvas from '../components/VideoCanvas';
import appIntroVideo from '../assets/project-ac913ca8-4fa9-4430-b019-523f60e61988.webm';

export default function AppAnimation() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const activeRef = useRef(false);
  const navigate = useNavigate();

  const replayVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    video.load?.();
    video.drawFrame?.();
    video.play()?.catch(() => {});
  };

  const syncVideo = useCallback(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const rect = section.getBoundingClientRect();
    const viewportMid = window.innerHeight / 2;
    const sectionContainsViewportMid = rect.top <= viewportMid && rect.bottom >= viewportMid;

    if (sectionContainsViewportMid) {
      if (activeRef.current) return;
      activeRef.current = true;
      video.load?.();
      video.drawFrame?.();
      const play = () => {
        video.drawFrame?.();
        video.play()?.catch(() => {
          video.drawFrame?.();
        });
      };

      if (video.readyState >= 2) play();
      else video.addEventListener('canplay', play, { once: true });
      return;
    }

    if (!activeRef.current) return;
    activeRef.current = false;
    video.pause();
    video.currentTime = 0;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) syncVideo();
    }, { threshold: [0, 0.35, 0.5, 0.65, 1] });

    observer.observe(section);
    window.addEventListener('resize', syncVideo);
    window.addEventListener('pageshow', syncVideo);
    document.addEventListener('visibilitychange', syncVideo);
    window.setTimeout(syncVideo, 120);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncVideo);
      window.removeEventListener('pageshow', syncVideo);
      document.removeEventListener('visibilitychange', syncVideo);
    };
  }, [syncVideo]);

  return (
    <section id="app-section" className="phone-section" ref={sectionRef}>
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
            <button className="replay-btn" onClick={replayVideo} type="button">
              Replay
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
